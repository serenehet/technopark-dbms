import type VoteModel from '@/models/vote-model';

export default new class VoteSerializer {
    serializeRequest(request: any): VoteModel {
        return {
            nickname: request.body.nickname,
            voice: request.body.voice,
        };
    }
};
