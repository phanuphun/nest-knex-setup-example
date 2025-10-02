import { Inject, Injectable } from '@nestjs/common';
import { KNEX_CONNECTION } from './knex.constants';
import { Knex } from 'knex';

@Injectable()
export class KnexService {
    constructor(
        @Inject(KNEX_CONNECTION) private readonly knex: Knex
    ) {}
    async checkConnection(): Promise<string> {
        const isConnected = await this.knex.raw('SELECT 1+1 AS result');
        if (isConnected) {
            return 'Working';
        }
        return 'Not Working';
    }
}
