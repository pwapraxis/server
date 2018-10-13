import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TodoService } from './sync/todo.service';
import { PushService } from './push/push.service';
import { SyncController } from './sync/sync.controller';
import { PushController } from './push/push.controller';

@Module({
  imports: [],
  controllers: [AppController, SyncController, PushController],
  providers: [TodoService, PushService, Logger],
})
export class AppModule {}
