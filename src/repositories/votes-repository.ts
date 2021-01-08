import { db } from '@/database/pgp';
import type VoteModel from '@/models/vote-model';


export default new class PostsRepository {
    createVote(vote: VoteModel, slug: any): Promise<any> {
        let query: string;

        if (isNaN(slug)) {
            query = `INSERT INTO votes (thread_id, user_id, voice)
            VALUES (
              (SELECT id FROM threads WHERE slug=$1), $2, $3
            )
            ON CONFLICT ON CONSTRAINT votes_user_thread_unique
            DO UPDATE SET voice = $3
            WHERE votes.thread_id = (SELECT id FROM threads WHERE slug = $1)
            AND votes.user_id = $2`;
        } else {
            query = `INSERT INTO votes (thread_id, user_id, voice)
            VALUES ($1, $2, $3)
            ON CONFLICT ON CONSTRAINT votes_user_thread_unique
            DO UPDATE SET voice = $3
            WHERE votes.thread_id = $1 AND votes.user_id = $2`;
        }

        return db.none({
            text: query,
            values: [slug, vote.nickname, vote.voice],
        });
    }

    getVoteInfo(slug: any): Promise<any> {
        let query = 'SELECT id, created, slug, title, forum, author, message, votes FROM threads WHERE ';

        if (isNaN(slug)) {
            query += `slug = '${slug}'`;
        } else {
            query += `id = '${slug}'`;
        }

        return db.one(query);
    }
};