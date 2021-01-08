import PostsRepository from '@/repositories/posts-repository';
import ForumsRepository from '@/repositories/forums-repository';
import type ThreadModel from '@/models/thread-model';
import {
    DATA_CONFLICT_ERROR,
    DATA_NOT_FOUND_ERROR,
    NOT_NULL_ERROR
} from '@/constants/constants-database';
import { db } from '@/database/pgp';
import ThreadsRepository from '@/repositories/threads-repository';

export default new class ThreadsController {
    async createThread(request: any, reply: any) {
        const thread: ThreadModel = {
            forum: request.body.forum ? request.body.forum : request.params.slug,
            author: request.body.author,
            created: request.body.created,
            votes: null,
            id: null,
            title: request.body.title,
            message: request.body.message,
            slug: request.body.slug ? request.body.slug : null,
        };

        const response = ThreadsRepository.createThread(thread);

        response.then(async (data: any) => {
            await ForumsRepository.initForumUsers(thread);
            reply.code(201).send(data);
        });

        response.catch((error: any) => {
            if (error.code === DATA_CONFLICT_ERROR) {
                ThreadsRepository.getThreadsBySlug(thread.slug).then((data: any) => {
                    reply.code(409).send(data);
                }).catch((error: any) => {
                    reply.code(500).send(error);
                });
                return;
            } else if (error.code === NOT_NULL_ERROR) {
                reply.code(404).send(error);
                return;
            }
            reply.code(500).send(error);
        });
    }

    async getThreads(request: any, reply: any) {
        const desc = request.query.desc;
        const limit = request.query.limit;
        const since = request.query.since;
        const slug = request.params.slug;
        const response = ThreadsRepository.getThreads(desc, limit, since, slug);

        response.then((data: any[]) => {
            if (data.length === 0) {
                ForumsRepository.getForumsBySlug(slug).then(() => {
                    reply.code(200).send(data);
                }).catch((error: any) => {
                    if (error.code === 0) {
                        reply.code(404).send({
                            message: `Can't find threads by forum ${slug}`,
                        });
                        return;
                    }
                    reply.code(500).send(error);
                });
                return;
            }
            reply.code(200).send(data);
        });

        response.catch((error: any) => {
            if (error.code === DATA_NOT_FOUND_ERROR) {
                reply.code(404).send({
                    message: `Can't find threads by forum ${slug}`,
                });
                return;
            }
            reply.code(500).send(error);
        });
    }

    async getThreadInfo(request: any, reply: any) {
        const slug = request.params.slug;
        const response = ThreadsRepository.getThreadInfoBySlug(slug);

        response.then((data: any[]) => {
            if (data.length === 0) {
                reply.code(404).send({
                    message: `Can't find forum by slug ${slug}`,
                });
                return;
            }
            reply.code(200).send(data);
        });

        response.catch((error: any) => {
            if (error.code === 0) {
                reply.code(404).send({
                    message: `Can't find forum by slug ${slug}`,
                });
            }
        });
    }

    static getPostsByID(request: any, reply: any, id: any) {
        const response = PostsRepository.getPostsByID(request.query, id);

        response.then((data: any[]) => {
            if (data.length === 0) {
                ThreadsRepository.getThreadsID(id).then((values: any[]) => {
                    if (values.length === 0) {
                        reply.code(404).send({
                            message: 'Can\'t find thread with id #',
                        });
                        return;
                    }
                    reply.code(200).send([]);
                }).catch((error: any) => {
                    if (error.code === 0) {
                        reply.code(404).send({
                            message: 'Can\'t find thread with id #',
                        });
                        return;
                    }
                    reply.code(500).send(error);
                });
                return;
            }
            reply.code(200).send(data);

        });

        response.catch((error: any) => {
            if (error.code === 0) {
                reply.code(404).send({
                    message: 'Can\'t find thread with id #',
                });
                return;
            }
            reply.code(500).send(error);
        });
    }

    async getPosts(req: any, reply: any) {
        if (isNaN(req.params.slug)) {
            const response = db.one({
                text: 'SELECT id FROM threads WHERE slug=$1',
                values: [req.params.slug],
            });
            response.then((data: any) => {
                ThreadsController.getPostsByID(req, reply, data.id);
            });
            response.catch(() => {
                reply.code(404)
                    .send({
                        message: 'Can\'t find thread with id #',
                    });
            });
            return;
        }

        ThreadsController.getPostsByID(req, reply, req.params.slug);
    }

    async updateThread(request: any, reply: any) {
        const title = request.body.title;
        const message = request.body.message;
        const slug = request.params.slug;

        const response = ThreadsRepository.updateThread(title, message, slug);

        response.then((data: any) => {
            if (data.length === 0) {
                reply.code(404).send({
                    message: `Can't find thread by slug: ${slug}`,
                });
                return;
            }
            reply.code(200).send(data);
        });

        response.catch((error: any) => {
            if (error.code === 0) {
                reply.code(404).send({
                    message: `Can't find thread by slug: ${slug}`,
                });
                return;
            }
            reply.code(500).send(error);
        });
    }
};