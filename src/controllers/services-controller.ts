import type ServicesModel from '@/models/services-model';
import ServicesRepository from '@/repositories/services-repository';

export default new class ServicesController {
    async status(request: any, reply: any) {
        const callback = (service: ServicesModel): void => {
            reply.code(200).send(service);
        };

        const failback = (error: any): void => {
            reply.code(500).send(error);
        };

        ServicesRepository.status(callback, failback);
    }

    async clear(requst: any, reply: any) {
        const callback = (): void => {
            reply.code(200).send(null);
        };

        const failback = (error: any): void => {
            reply.code(500).send(error);
        };

        ServicesRepository.clear(callback, failback);
    }

};
