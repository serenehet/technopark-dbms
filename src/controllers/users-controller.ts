import UserSerializer from '@/serializers/user-serializer';
import UsersRepository from '@/repositories/users-repository';
import {
    DATA_CONFLICT_ERROR,
} from '@/constants/constants-database';

export default new class UsersController {

    async createUser(request: any, reply: any) {
        const user = UserSerializer.serializeRequest(request);
        const response = UsersRepository.createUser(user);

        response.then((data: any) => {
            reply.code(201).send(data);
        });

        response.catch((error: any) => {
            if (error.code === DATA_CONFLICT_ERROR) {
                UsersRepository.getUsers(user.nickname, user.email).then((data: any) => {
                    reply.code(409).send(data);
                }).catch((error: any) => {
                    reply.code(500).send(error);
                });
            }
        });
    }

    async getUserInfo(request: any, reply: any) {
        const nickname: string = request.params.nickname;
        const response = UsersRepository.getUserInfo(nickname);

        response.then((data: any) => {
            if (data.length === 0) {
                reply.code(404).send({
                    message: `Can't find user by nickname ${nickname}`,
                });
            }
            reply.code(200).send(data);
        });

        response.catch((error: any) => {
            if (error.code === 0) {
                reply.code(404).send({
                    message: 'Can\'t find user with id #',
                });
            }
        });
    }

    async updateUserInfo(request: any, reply: any) {
        const user = UserSerializer.serializeRequest(request);
        const response = UsersRepository.updateUserInfo(user);

        response.then((data: any) => {
            if (data.length === 0) {
                reply.code(404).send({
                    message: `Can't find user by nickname ${user.nickname}`,
                });
                return;
            }
            reply.code(200).send(data);
        });

        response.catch((error: any) => {
            if (error.code === 0) {
                reply.code(404).send({
                    message: 'Can\'t find user with id #',
                });
                return;
            } else if (error.code === DATA_CONFLICT_ERROR) {
                reply.code(409).send({
                    message: 'Can\'t find user with id #',
                });
                return;
            }
            reply.code(409).send(error);
        });
    }
};
