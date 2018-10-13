import { Injectable, Logger } from '@nestjs/common';
import { PushService } from '../push/push.service';
import { Todo } from './todo';

@Injectable()
export class TodoService {
    todoStore = new Map<string, Todo>();

    constructor(private readonly logger: Logger, private readonly pushService: PushService) {
    }

    sync(todos: Todo[]): Todo[] {
        todos.forEach(todo => {
            if (todo.deleted) {
                this.logger.log(`Deleting todo with ID ${todo.id}`);
                this.todoStore.delete(todo.id);
                return;
            }

            const existingTodo = this.todoStore.get(todo.id);
            if ((existingTodo && !existingTodo.done || !existingTodo) && todo.done) {
                this.pushService.pushToAll('Todo erledigt!', `${todo.title} ist jetzt erledigt.`);
            }

            this.logger.log(`Updating todo with ID ${todo.id}`);
            this.todoStore.set(todo.id, todo);
        });
        return Array.from(this.todoStore.values());
    }
}
