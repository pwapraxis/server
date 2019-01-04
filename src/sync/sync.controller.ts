import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Controller('sync')
export class SyncController {
  constructor(private readonly todoService: TodoService) {
  }

  @Post()
  root(@Body() todos: Todo[], @Req() { ip }: Request): Todo[] {
    return this.todoService.sync(todos, ip);
  }
}
