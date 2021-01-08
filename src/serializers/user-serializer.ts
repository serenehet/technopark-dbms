import type UserModel from '../models/user-model';

export default new class UserSerializer {
    serializeRelated(data: any): UserModel {
        return {
            nickname: data.user_nickname,
            about: data.user_about,
            fullname: data.user_fullname,
            email: data.user_email,
        };
    }

    serializeRequest(request: any): UserModel {
        return {
            nickname: request.params.nickname,
            fullname: request.body.fullname,
            email: request.body.email,
            about: request.body.about,
        };
    }
};
