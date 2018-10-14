import { Controller, Get, Render } from '@nestjs/common';
import { PushService } from './push/push.service';
import { StorageService } from './storage.service';
import { TodoService } from './sync/todo.service';

@Controller()
export class AppController {
  constructor(
    private readonly pushService: PushService,
    private readonly todoService: TodoService,
    private readonly storageService: StorageService,
  ) {
  }

  @Get()
  @Render('index')
  root() {
    return {
      publicKey: this.pushService.vapidKeys.publicKey,
      subscriptions: this.pushService.getForPresentation(),
      todos: this.todoService.todoStore,
      version: require('../package.json').version,
      storageLocation: this.storageService.getLocation(),
    };
  }
}
