import type ForumModel from '@/models/forum-model';

export default new class ForumSerializer {
    serializeRelated(responseData: any): ForumModel {
        return {
            threads: responseData.forum_threads,
            posts: responseData.forum_posts,
            title: responseData.forum_title,
            user: responseData.forum_user_nickname,
            slug: responseData.forum_slug,
        };
    }
};
