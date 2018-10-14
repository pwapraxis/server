import { CorsMiddleware } from '@nest-middlewares/cors';
import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { PushController } from './push/push.controller';
import { PushService } from './push/push.service';
import { SyncController } from './sync/sync.controller';
import { TodoService } from './sync/todo.service';
import { StorageService } from './storage.service';

@Module({
  imports: [],
  controllers: [AppController, SyncController, PushController],
  providers: [TodoService, PushService, Logger, StorageService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
