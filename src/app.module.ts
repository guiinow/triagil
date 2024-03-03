import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsModule } from './modules/teams/teams.module';
import * as ormconfig from './ormconfig';

@Module({
  imports: [
    TeamsModule,
    TypeOrmModule.forRoot(ormconfig.AppDataSource.options),
    ThrottlerModule.forRoot([
      {
        ttl: 5000, //5 segundos para a requisição existir na memoria
        limit: 10, //10 requisições a cada 5 segundos
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
