import { db } from '@/database/pgp';
import type ServicesModel from '@/models/services-model';

export default new class ServicesRepository {
    status(callback: (service: ServicesModel) => void, failback: (error: any) => void): void {
        const query = `SELECT (
            SELECT COUNT(*) FROM forums) AS forum,
            (SELECT COUNT(*) FROM users) AS user_count,
            (SELECT COUNT(*) FROM threads) AS thread,
            (SELECT COUNT(*) FROM posts) AS post`;

        db.one(query).then((data: any) => {
            const service: ServicesModel = {
                forum: parseInt(data.forum, 10),
                user: parseInt(data.user_count, 10),
                thread: parseInt(data.thread, 10),
                post: parseInt(data.post, 10),
            };
            callback(service);
        }).catch((error: any) => {
            failback(error);
        });
    }

    clear(callback: () => void, failback: (error: any) => void): void {
        const query = 'TRUNCATE TABLE forum_users, votes, posts, threads, forums, users;';
        db.none(query).then(() => {
            callback();
        }).catch((error: any) => {
            failback(error);
        });
    }
};
