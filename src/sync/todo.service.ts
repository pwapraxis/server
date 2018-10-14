import { Injectable, Logger } from '@nestjs/common';
import { PushService } from '../push/push.service';
import { Todo } from './todo';

@Injectable()
export class TodoService {
    todoStore: Todo[] = [
      { id: 'f648198f-e12a-4f68-b2c7-6b61a3fcab01', title: 'PWA-Buch lesen', done: false },
      { id: '2db0d3e5-69f6-48ee-ad2a-13bf0b0ef9fe', title: 'Angular lernen', done: false },
    ];

    constructor(private readonly logger: Logger, private readonly pushService: PushService) {
    }

    sync(todos: Todo[]): Todo[] {
        todos.forEach(newTodo => {
            const existingTodo = this.todoStore.find(t => t.id === newTodo.id);

            if ((!existingTodo || existingTodo && existingTodo.done === false) && newTodo.done) {
                this.pushService.pushToAll('Todo erledigt!', `"${newTodo.title}" ist jetzt erledigt.`);
            }

            if (existingTodo) {
              this.logger.log(`Updating todo with ID ${newTodo.id}`);
              Object.assign(existingTodo, newTodo);
            } else {
              this.logger.log(`Adding todo with ID ${newTodo.id}`);
              this.todoStore.push(newTodo);
            }
        });
        return this.todoStore;
    }
}
