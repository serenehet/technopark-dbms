import users from './controllers/users-controller';
import forums from './controllers/forums-controller';
import threads from './controllers/threads-controller';
import posts from './controllers/posts-controller';
import votes from './controllers/votes-controller';
import services from './controllers/services-controller';

import fastify from 'fastify';

import { EXTERNAL_PORT } from './constants/constants-server';


// main сервера
(() => {
    const server = fastify();

    server.addContentTypeParser('application/json',
        { parseAs: 'buffer' },
        (req: any, body: any, done: any) => {
            if (body.length > 0) {
                done(null, JSON.parse(body));
            } else {
                done(null, {});
            }
        });

    server.listen(EXTERNAL_PORT, '0.0.0.0', () => {
        console.log(`Server on port ${EXTERNAL_PORT}`);
    });

    server.post('/api/forum/create', forums.createForum);
    server.get('/api/forum/:slug/details', forums.getForumInfo);
    server.post('/api/forum/:slug/create', threads.createThread);
    server.get('/api/forum/:slug/users', forums.getForumUsers);
    server.get('/api/forum/:slug/threads', threads.getThreads);
    server.get('/api/post/:slug/details', posts.getPostInfo);
    server.post('/api/post/:id/details', posts.updatePost);
    server.post('/api/service/clear', services.clear);
    server.get('/api/service/status', services.status);
    server.post('/api/thread/:slug/create', posts.createPost);
    server.get('/api/thread/:slug/details', threads.getThreadInfo);
    server.post('/api/thread/:slug/details', threads.updateThread);
    server.get('/api/thread/:slug/posts', threads.getPosts);
    server.post('/api/thread/:slug/vote', votes.createVote);
    server.post('/api/user/:nickname/create', users.createUser);
    server.get('/api/user/:nickname/profile', users.getUserInfo);
    server.post('/api/user/:nickname/profile', users.updateUserInfo);
})();
