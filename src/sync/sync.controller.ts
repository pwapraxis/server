import { Body, Controller, Headers, Post } from '@nestjs/common';
import { IpService } from '../ip/ip.service';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Controller('sync')
export class SyncController {
  constructor(private readonly todoService: TodoService, private readonly ipService: IpService) {
  }

  @Post()
  root(@Headers('x-forwarded-for') forwardedFor: string, @Body() todos: Todo[]): Todo[] {
    return this.todoService.sync(todos, this.ipService.extractIp(forwardedFor));
  }
}
