import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { Knex, knex as createKnex } from 'knex';
import { KNEX_CONNECTION } from './knex.constants';
import { KnexService } from './knex.service';

export interface knexModuleOptions {
    config: Knex.Config;
}

export interface KnexModuleAsyncOptions {
    imports?: any[];
    useFactory: (...args: any[]) => knexModuleOptions | Promise<knexModuleOptions>;
    inject?: any[];
}

@Global()
@Module({
  providers: [KnexService],
  exports: [KnexService],
})
export class KnexModule {
    static forRoot(options: knexModuleOptions): DynamicModule {
        const knexProvider: Provider = {
            provide: KNEX_CONNECTION,
            useValue: createKnex(options.config),
        };

        return {
            module: KnexModule,
            providers: [knexProvider],
            exports: [knexProvider],
        };
    }

    static forRootAsync(options: KnexModuleAsyncOptions): DynamicModule {
        const asyncProvider: Provider = {
            provide: KNEX_CONNECTION,
            useFactory: async (...args: any[]) => {
                const opts = await options.useFactory(...args);
                return createKnex(opts.config);
            },
            inject: options.inject || [],
        };

        return {
            module: KnexModule,
            imports: options.imports || [],
            providers: [asyncProvider],
            exports: [asyncProvider],
        };
    }
}
