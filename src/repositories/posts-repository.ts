import { db } from '@/database/pgp';
import type PostModel from '@/models/post-model';

class PostsRepository {

    createPost(thread: any, users: any[], posts: PostModel[]): Promise<any> {
        let query = 'INSERT INTO posts (edited, author, message,thread_id, parent_id, forum_slug) VALUES ';

        const args = [];
        let i = 1;

        for (let j = 0; j < posts.length; j++) {
            users.push(posts[j].author);

            if (posts[j].parent) {
                query += `(FALSE, $${i}, $${i + 1}, (SELECT (CASE WHEN EXISTS ( SELECT 1 FROM posts p WHERE p.id=$${i + 3} AND p.thread_id=$${i + 2})
        THEN $${i + 2} ELSE NULL END)), $${i + 3}, $${i + 4}),`;
                i += 5;
                args.push(...[posts[j].author, posts[j].message, thread.thread_id, posts[j].parent, thread.forum],);
            } else {
                query += `(FALSE, $${i}, $${i + 1}, $${i + 2}, NULL, $${i + 3}),`;
                i += 4;
                args.push(...[posts[j].author, posts[j].message, thread.thread_id, thread.forum]);
            }
        }

        query = query.slice(0, -1);
        query += ' RETURNING author, id, created, thread_id AS thread, parent_id AS parent, forum_slug AS forum, message';

        return db.any(query, args);
    }

    getPostInfo(id: number): Promise<any> {
        return db.one(
            'SELECT id, parent_id AS parent, thread_id AS thread, message, edited AS "isEdited", created, forum_slug AS forum, author FROM posts WHERE id = $1',
            [id],
        );
    }

    getRelatedPostInfo(user: boolean, thread: boolean, forum: boolean, id: number): Promise<any> {
        let query1 = `SELECT posts.id AS pid,
        posts.parent_id AS post_parent,
        posts.thread_id AS post_thread,
        posts.message AS post_message,
        posts.edited AS post_is_edited,
        posts.created AS post_created,posts.forum_slug AS post_forum_slug,
        posts.author AS post_author,`;

        let query2 = ' FROM posts ';

        if (user) {
            query1 += 'U.nickname AS user_nickname, U.about AS user_about,U.fullname AS user_fullname, U.email AS user_email,';
            query2 += 'LEFT JOIN users U ON U.nickname = posts.author ';
        }
        if (thread) {
            query1 += `threads.author AS thread_author,
            threads.created AS thread_created,threads.votes AS thread_votes,
            threads.id AS thread_id,
            threads.title AS thread_title,
            threads.message AS thread_message,threads.slug AS thread_slug,
            threads.forum AS thread_forum_slug,`;
            query2 += 'LEFT JOIN threads ON threads.id = posts.thread_id ';
        }
        if (forum) {
            query1 += 'F.slug AS forum_slug, F.threads AS forum_threads, F.title as forum_title,F.posts AS forum_posts, F."user" AS forum_user_nickname,';
            query2 += 'LEFT JOIN forums F ON F.slug = posts.forum_slug ';
        }
        query2 += ' WHERE posts.id = $1';
        const query = query1.slice(0, -1) + query2;

        return db.one(
            query,
            [id]
        );
    }

    updatePost(message: string, id: number): Promise<any> {
        let query: string;
        const args = [];

        if (message) {
            query = `UPDATE posts SET edited = message <> $1,
                message = $1 WHERE id = $2 RETURNING id,
                message,
                author,
                created,
                forum_slug AS forum,
                parent_id AS parent,
                thread_id AS thread,
                edited AS "isEdited"`;
            args.push(message, id);
        } else {
            query = 'SELECT id, author, message, created,forum_slug AS forum, thread_id AS thread FROM posts WHERE id=$1';
            args.push(id);
        }

        return db.one(query, args);
    }

    getPostsByID(params: Record<string, string>, id: any): Promise<any> {
        const { limit, since, desc } = params;
        const sort = params.sort ? params.sort : 'flat';

        let query;
        let args = [];
        if (sort === 'flat') {
            query = `
            SELECT id, thread_id AS thread, created,
            message, parent_id AS parent, author, forum_slug AS forum FROM
            (SELECT * FROM posts WHERE thread_id = $1 `;
            args = [id];
            let i = 2;
            if (since) {
                if (desc === 'true') {
                    query += ` AND id < $${i++}`;
                } else {
                    query += ` AND id > $${i++}`;
                }
                args.push(since);
            }
            query += ' ) p ';
            if (desc === 'true') {
                query += ' ORDER BY created DESC, id DESC ';
            } else {
                query += ' ORDER BY created, id  ';
            }

            if (limit) {
                query += ` LIMIT $${i++}`;
                args.push(limit);
            }
        } else if (sort === 'tree') {
            let sinceQuery;
            let descQuery;
            let limitSql;
            let i = 2;
            args = [];
            args.push(id);

            if (since) {
                sinceQuery = `
                 AND (path ${desc === 'true' ? '<' : '>'}
                (SELECT path FROM posts WHERE id = $${i++})) `;
                args.push(since);
            } else {
                sinceQuery = '';
            }

            if (desc === 'true') {
                descQuery = ' DESC ';
            } else {
                descQuery = '';
            }

            if (limit) {
                limitSql = ` LIMIT $${i++}`;
                args.push(limit);
            } else {
                limitSql = '';
            }

            query = `
            SELECT id, author, created, message, parent_id AS parent,
            forum_slug AS forum, thread_id AS thread
            FROM posts
            WHERE thread_id = $1 ${sinceQuery}
            ORDER BY path ${descQuery}
            ${limitSql}`;

        } else {
            args = [id];
            const descQuery = desc === 'true' ? 'DESC' : '';
            let sinceQuery;
            let limitSql;
            let k = 2;
            if (since) {
                sinceQuery = `
                AND id ${desc === 'true' ? '<' : '>'} (SELECT path[1] FROM posts WHERE id = $${k++})`;
                args.push(since);
            } else {
                sinceQuery = '';
            }

            if (limit) {
                limitSql = `LIMIT $${k++}`;
                args.push(limit);
            } else {
                limitSql = 'LIMIT 100000';
            }

            query = `
            SELECT author, created, forum_slug AS forum, id, edited,
            message, parent_id AS parent, thread_id AS thread
            FROM posts
            WHERE path[1] IN (
            SELECT id FROM posts
            WHERE thread_id=$1 AND parent_id IS NULL
            ${sinceQuery}
            ORDER BY id ${descQuery}
            ${limitSql}
            ) AND thread_id=$1
            ORDER BY path[1] ${descQuery}, path;`;
        }

        return db.any(
            query,
            args,
        );
    }
}

export default new PostsRepository();