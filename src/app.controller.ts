import { Controller, Get, Render } from '@nestjs/common';
import { PushService } from './push/push.service';
import { TodoService } from './sync/todo.service';

@Controller()
export class AppController {
    constructor(private readonly pushService: PushService, private readonly todoService: TodoService) {
    }

    @Get()
    @Render('index')
    root() {
        return {
            publicKey: this.pushService.vapidKeys.publicKey,
            subscriptions: this.pushService.subscriptions,
            todos: Array.from(this.todoService.todoStore.values()),
            version: require('../package.json').version
        };
    }
}
