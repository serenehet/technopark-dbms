import { db } from '@/database/pgp';
import type ThreadModel from '@/models/thread-model';

export default new class ThreadsRepository {
    createThread(thread: ThreadModel): Promise<any> {
        const query = `
        INSERT INTO threads (author, created, forum, message, title, slug) VALUES
        ((SELECT nickname FROM users WHERE nickname=$1),
        $2, (SELECT slug FROM forums WHERE slug=$3),$4, $5, $6)
        RETURNING author, created, forum, message, title, votes, id ${thread.slug ? ', slug' : ''}`;

        return db.one(query, [
            thread.author,
            thread.created,
            thread.forum,
            thread.message,
            thread.title,
            thread.slug,
        ]);
    }

    getThreadsBySlug(slug: string): Promise<any> {
        return db.one(
            'SELECT * FROM threads WHERE slug=$1',
            [slug],
        );
    }

    getThreads(desc: string, limit: string, since: string, slug: string): Promise<any> {
        let sortArg: string, limitArg: string, sinceArg: string;

        if (desc === 'true') {
            sortArg = 'DESC';
        } else {
            sortArg = 'ASC';
        }

        if (limit) {
            limitArg = `LIMIT ${limit}`;
        }

        if (since) {
            if (desc === 'true') {
                sinceArg = `AND created <= '${since}'`;
            } else {
                sinceArg = `AND created >= '${since}'`;
            }
        } else {
            sinceArg = '';
        }

        return db.any(
            `SELECT * FROM threads WHERE forum=$1 ${sinceArg} ORDER BY created ${sortArg} ${limit ? limitArg : ''};`,
            [slug],
        );
    }

    getThreadInfoBySlug(slug: any): Promise<any> {
        let query = 'SELECT author, created, forum, id, message, votes, slug, title FROM threads WHERE';
        if (isNaN(slug)) {
            query += ' slug = $1';
        } else {
            query += ' id = $1';
        }

        return db.one(
            query,
            [slug],
        );
    }

    getThreadsID(id: any): Promise<any> {
        return db.one(
            'SELECT threads.id FROM threads WHERE threads.id = $1',
            [id],
        );
    }

    updateThread(title: string, message: string, slug: any): Promise<any> {
        let query;
        let args = [];
        let i = 1;
        if (!title && !message) {
            query = `
            SELECT created, id, title,
            slug, message, author,
            forum FROM threads WHERE `;
            if (isNaN(slug)) {
                query += 'slug = $1';
            } else {
                query += 'id = $1';
            }
            args = [slug];
        } else {
            query = 'UPDATE threads SET ';
            if (title) {
                query += `title = $${i++},`;
                args.push(title);
            }

            if (message) {
                query += `message = $${i++},`;
                args.push(message);
            }
            query = query.slice(0, -1);
            query += ' WHERE ';
            if (isNaN(slug)) {
                query += `slug = $${i++} RETURNING created, id, title, slug, message, author, forum`;
            } else {
                query += `id = $${i++} RETURNING created, id, title,slug, message,author, forum`;
            }
            args.push(slug);
        }

        return db.one(
            query,
            args,
        );
    }
};
