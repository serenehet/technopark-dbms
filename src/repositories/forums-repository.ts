import { db } from '@/database/pgp';
import type PostModel from '@/models/post-model';
import type ThreadModel from '@/models/thread-model';

class ForumsRepository {
    private db: typeof db;

    constructor() {
        this.db = db;
    }

    createForum(user: string, title: string, slug: string): Promise<any> {
        return db.one(
            'INSERT INTO forums (slug, title, "user") VALUES ($1, $2, (SELECT nickname FROM users WHERE nickname=$3)) RETURNING *',
            [slug, title, user],
        );
    }

    getForumInfoBySlug(slug: string): Promise<any> {
        return db.one({
            text: 'SELECT slug, title, "user" FROM forums WHERE slug=$1',
            values: [slug],
        });
    }

    getForumsBySlug(slug: string): Promise<any> {
        return db.one(
            'SELECT * FROM forums WHERE slug=$1;',
            [slug],
        );
    }

    getForumUsers(
        since: string,
        desc: string,
        limit: string,
        args: any[]): Promise<any> {

        let query = 'SELECT u.* FROM "users" u JOIN forum_users f ON u.id = f.user_id WHERE f.forum_slug = $1';
        let i = 2;
        if (since) {
            if (desc === 'true') {
                query += ` AND f.username < $${i++} `;
            } else {
                query += ` AND f.username > $${i++} `;
            }
            args.push(since);
        }
        if (desc === 'true') {
            query += ' ORDER BY f.username DESC ';
        } else {
            query += ' ORDER BY f.username ASC ';
        }
        if (limit) {
            query += ` LIMIT $${i++}`;
            args.push(limit);
        }

        return db.any(query, args);
    }

    getIdForumsBySlug(slug: string): Promise<any> {
        return db.one({
            text: 'SELECT id FROM forums WHERE slug = $1',
            values: [slug],
        });
    }

    getForumByKey(key: any): Promise<any> {
        let query = 'SELECT id AS thread_id, forum FROM threads WHERE ';
        if (isNaN(key)) {
            query += ' slug = $1';
        } else {
            query += ' id = $1';
        }

        return db.one(
            query,
            [key],
        );
    }

    async updateForums(users: any[], posts: PostModel[], forum: any): Promise<void> {
        await db.none(
            'UPDATE forums SET posts=forums.posts+$1 WHERE slug=$2',
            [posts.length, forum]
        );
        let query = 'INSERT INTO forum_users(user_id, forum_slug, username) VALUES';
        let index = 1;
        const args = [];
        for (let i = 0; i < users.length; i++) {
            query += `((SELECT id FROM users WHERE users.nickname = $${index + 1}), $${index}, $${index + 1}),`;
            index += 2;
            args.push(forum, users[i]);
        }
        query = query.slice(0, -1);
        query += ' ON CONFLICT DO NOTHING';

        await db.none(query, args);
    }

    async initForumUsers(thread: ThreadModel): Promise<void> {
        const query = `
        INSERT INTO forum_users(user_id,forum_slug, username) VALUES
         ((SELECT id FROM users WHERE users.nickname = $2), $1, $2) ON CONFLICT DO NOTHING`;

        return db.none(query,[thread.forum, thread.author]);
    }
}

export default new ForumsRepository();