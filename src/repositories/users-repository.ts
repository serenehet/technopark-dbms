import { db } from '@/database/pgp';
import type UserModel from '@/models/user-model';

export default new class UsersRepository {
    createUser(user: UserModel): Promise<any> {
        return db.one({
            text: 'INSERT INTO users (nickname, fullname, email, about) VALUES ($1, $2, $3, $4) RETURNING *',
            values: [user.nickname, user.fullname, user.email, user.about],
        });
    }

    getUsers(nickname: string, email: string): Promise<any> {
        return db.any({
            text: 'SELECT * FROM users WHERE nickname=$1 OR email=$2',
            values: [nickname, email],
        });
    }

    getUserInfo(nickname: string): Promise<any> {
        return db.one({
            text: 'SELECT about, email, nickname, fullname FROM users WHERE nickname=$1;',
            values: [nickname],
        });
    }

    updateUserInfo(user: UserModel): Promise<any> {
        let query = 'UPDATE users SET ';
        if (user.fullname) {
            query += `fullname = '${user.fullname}', `;
        } else {
            query += 'fullname = fullname, ';
        }
        if (user.email) {
            query += `email = '${user.email}', `;
        } else {
            query += 'email = email, ';
        }
        if (user.about) {
            query += `about = '${user.about}' `;
        } else {
            query += 'about = about ';
        }
        query += `WHERE nickname = '${user.nickname}' RETURNING *`;

        return db.one(query);
    }
};