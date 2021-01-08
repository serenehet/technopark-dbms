import VoteSerializer from '@/serializers/vote-serializer';
import VotesRepository from '@/repositories/votes-repository';

export default new class VotesController {
    async createVote(request: any, reply: any) {
        const slug = request.params.slug;
        const vote = VoteSerializer.serializeRequest(request);
        const response = VotesRepository.createVote(vote, slug);

        response.then(() => {
            VotesRepository.getVoteInfo(slug).then((data: any) => {
                reply.code(200).send(data);
            }).catch((error: any) => {
                reply.code(500).send(error);
            });
        });

        response.catch(() => {
            reply.code(404).send({
                message: 'Can\'t find user with id #\n',
            });
        });
    }
};

