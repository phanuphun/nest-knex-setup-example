import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from './databases/knex/knex.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import KnexConnInstant from './databases/knex/knex.connection';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        config: KnexConnInstant,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
