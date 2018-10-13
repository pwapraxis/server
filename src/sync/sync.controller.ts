import { Body, Controller, Post } from '@nestjs/common';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Controller('sync')
export class SyncController {
    constructor(private readonly todoService: TodoService) {
    }

    @Post()
    root(@Body() todos: Todo[]): Todo[] {
        return this.todoService.sync(todos);
    }
}
