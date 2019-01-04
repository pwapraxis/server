import { CorsMiddleware } from '@nest-middlewares/cors';
import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { IpService } from './ip/ip.service';
import { memoryServiceFactory, memoryServiceFactoryDeps } from './memory/memory-service.factory';
import { MemoryService } from './memory/memory.service';
import { PushController } from './push/push.controller';
import { PushService } from './push/push.service';
import { SyncController } from './sync/sync.controller';
import { TodoService } from './sync/todo.service';
import { StorageService } from './storage.service';

@Module({
  imports: [],
  controllers: [AppController, SyncController, PushController],
  providers: [TodoService, PushService, Logger, StorageService, IpService, {
    provide: MemoryService,
    useFactory: memoryServiceFactory,
    inject: memoryServiceFactoryDeps,
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
