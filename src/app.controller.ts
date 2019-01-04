import { Controller, Get, Render, Req } from '@nestjs/common';
import { Request } from 'express';
import { PushService } from './push/push.service';
import { TodoService } from './sync/todo.service';

@Controller()
export class AppController {
  constructor(
    private readonly pushService: PushService,
    private readonly todoService: TodoService,
  ) {
  }

  @Get()
  @Render('index')
  root(@Req() { ip }: Request) {
    return {
      publicKey: this.pushService.vapidKeys.publicKey,
      subscriptions: this.pushService.getForPresentation(ip),
      todos: this.todoService.getAll(ip),
      version: require('../package.json').version,
    };
  }
}
