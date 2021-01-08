import ForumsRepository from '@/repositories/forums-repository';
import PostsRepository from '@/repositories/posts-repository';
import {
    DATA_CONFLICT_ERROR,
    DATA_DONT_EXIST_ERROR,
} from '@/constants/constants-database';
import { NOT_NULL_ERROR } from '@/constants/constants-database';
import threadSerializer from '@/serializers/thread-serializer';
import postSerializer from '@/serializers/post-serializer';
import forumSerializer from '@/serializers/forum-serializer';
import userSerializer from '@/serializers/user-serializer';

export default new class PostsController {

    async createPost(request: any, reply: any) {
        const posts: any[] = request.body;
        const response = ForumsRepository.getForumByKey(request.params.slug);

        response.then((threadForumInfo: any) => {
            if (posts.length === 0) {
                reply.code(201).send([]);
            }
            if (threadForumInfo.length === 0) {
                reply.code(404).send({
                    message: `Can't find thread by slug ${request.params.slug}`,
                });
            }
            const forumUsers: any[] = [];
            PostsRepository.createPost(threadForumInfo, forumUsers, posts).then(async (data: any) => {
                await ForumsRepository.updateForums(forumUsers, posts, threadForumInfo.forum);
                reply.code(201).send(data);
            }).catch((error: any) => {
                if (error.code === NOT_NULL_ERROR) {
                    reply.code(409).send({
                        message: 'Parent post was created in another thread',
                    });
                } else if (error.code === DATA_DONT_EXIST_ERROR) {
                    reply.code(404).send({
                        message: 'User not found',
                    });
                } else {
                    reply.code(500).send(error);
                }
            });
        });

        response.catch((err: any) => {
            if (err.code === 0) {
                reply.code(404).send({
                    message: 'Can\'t find user with id #',
                });
            } else {
                reply.code(500).send(err);
            }
        });
    }

    async getPostInfo(request: any, reply: any) {
        const id = request.params.slug;
        const related = request.query.related;

        let userRelated: any;
        let threadRelated: any;
        let forumRelated: any;

        if (related) {
            userRelated = related.includes('user');
            threadRelated = related.includes('thread');
            forumRelated = related.includes('forum');
        }

        if (!related) {
            PostsRepository.getPostInfo(id).then((post: any) => {
                reply.code(200).send({
                    post,
                });
            }).catch((err: any) => {
                if (err.code === 0) {
                    reply.code(404).send({
                        message: `Can't find post with id ${id}`,
                    });
                } else {
                    reply.code(500).send(err);
                }
            });
            return;
        }

        const response = PostsRepository.getRelatedPostInfo(userRelated, threadRelated, forumRelated, id);

        response.then((responseData: any) => {
            const response: Record<string, any> = {};
            response.post = postSerializer.serializeRelated(responseData);
            if (forumRelated) {
                response.forum = forumSerializer.serializeRelated(responseData);
            }
            if (userRelated) {
                response.author = userSerializer.serializeRelated(responseData);
            }
            if (threadRelated) {
                response.thread = threadSerializer.serializeRelated(responseData);
            }
            reply.code(200).send(response);
        });

        response.catch((err: any) => {
            if (err.code === 0) {
                reply.code(404).send({
                    message: `Can't find thread with id ${id}`,
                });
            } else {
                reply.code(500).send(err);
            }
        });
    }

    async updatePost(request: any, reply: any) {
        const response = PostsRepository.updatePost(request.body.message, request.params.id);

        response.then((data: any) => {
            if (data.length === 0) {
                reply.code(404).send({
                    message: `Can't find post by id ${request.params.id}`,
                });
                return;
            }
            reply.code(200).send(data);
        });

        response.catch((error: any) => {
            if (error.code === 0) {
                reply.code(404).send({
                    message: `Can't find post by id ${request.params.id}`,
                });
                return;
            } else if (error.code === DATA_CONFLICT_ERROR) {
                reply.code(409).send({
                    message: 'Can\'t find user with id #',
                });
                return;
            }
            reply.code(500).send(error);
        });
    }
};
