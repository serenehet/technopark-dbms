import {
    NOT_NULL_ERROR,
    DATA_CONFLICT_ERROR,
} from '@/constants/constants-database';

import ForumsRepository from '@/repositories/forums-repository';

class ForumsController {

    async createForum(requst: any, reply: any) {
        const response = ForumsRepository.createForum(requst.body.user, requst.body.title, requst.body.slug);

        response.then((data: any) => {
            reply.code(201).send(data);
        });

        response.catch((error: any) => {
            if (error.code === DATA_CONFLICT_ERROR) {
                ForumsRepository.getForumInfoBySlug(requst.body.slug).then((value: any) => {
                    reply.code(409).send(value);
                });
            } else if (error.code === NOT_NULL_ERROR) {
                reply.code(404).send(error);
            }
        });
    }

    async getForumInfo(request: any, reply: any) {
        const response = ForumsRepository.getForumsBySlug(request.params.slug);

        response.then((data: any) => {
            if (data.length === 0) {
                reply.code(404).send({
                    message: `Can't find forum by slug ${request.params.slug}`,
                });
            }
            reply.code(200).send(data);
        });

        response.catch((err: any) => {
            if (err.code === 0) {
                reply.code(404).send({
                    message: `Can't find forum by slug ${request.params.slug}`,
                });
            }
        });
    }

    async getForumUsers(requst: any, reply: any) {
        const since = requst.query.since;
        const desc = requst.query.desc;
        const limit = requst.query.limit;
        const slug = requst.params.slug;
        const args = [slug];

        const response = ForumsRepository.getForumUsers(since, desc, limit, args);

        response.then((data: any) => {
            if (data.length === 0) {
                ForumsRepository.getIdForumsBySlug(slug).then((value: any) => {
                    if (value.length !== 0) {
                        reply.code(200).send([]);
                    } else {
                        reply.code(500).send({
                            message: 'Everything is empty',
                            value,
                        });
                    }
                }).catch((error: any) => {
                    if (error.code === 0) {
                        reply.code(404).send({
                            message: `Can't find forum by slug ${slug}`,
                        });
                    } else {
                        reply.code(500).send(error);
                    }
                });
            } else {
                reply.header('Content-Type', 'application/json').type('application/json').code(200).send(data);
            }
        });

        response.catch((err: any) => {
            if (err.code === 0) {
                reply.code(404).send({
                    message: `Can't find forum by slug ${slug}`,
                });
            } else {
                reply.code(500).send(err);
            }
        });
    }
}

export default new ForumsController();
