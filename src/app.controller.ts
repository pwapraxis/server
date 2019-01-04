import { Controller, Get, Headers, Render } from '@nestjs/common';
import { IpService } from './ip/ip.service';
import { PushService } from './push/push.service';
import { TodoService } from './sync/todo.service';

@Controller()
export class AppController {
  constructor(
    private readonly pushService: PushService,
    private readonly todoService: TodoService,
    private readonly ipService: IpService,
  ) {
  }

  @Get()
  @Render('index')
  root(@Headers('x-forwarded-for') forwardedFor: string) {
    const ip = this.ipService.extractIp(forwardedFor);
    return {
      publicKey: this.pushService.vapidKeys.publicKey,
      subscriptions: this.pushService.getForPresentation(ip),
      todos: this.todoService.getAll(ip),
      version: require('../package.json').version,
      ip,
    };
  }
}
