import { Injectable, Logger } from '@nestjs/common';
import { MemoryService } from '../memory/memory.service';
import { PushService } from '../push/push.service';
import { Todo } from './todo';

@Injectable()
export class TodoService {
  constructor(private readonly logger: Logger, private readonly pushService: PushService, private readonly memoryService: MemoryService) {
  }

  getAll(ip: string): Todo[] {
    return this.memoryService.getStore<Todo[]>('pwapraxis:todo', ip, [
      { id: 'f648198f-e12a-4f68-b2c7-6b61a3fcab01', title: 'PWA-Buch lesen', done: false },
      { id: '2db0d3e5-69f6-48ee-ad2a-13bf0b0ef9fe', title: 'Angular lernen', done: false },
    ]);
  }

  sync(todos: Todo[], ip: string): Todo[] {
    const todoStore = this.getAll(ip);
    todos.forEach(newTodo => {
      const existingTodo = todoStore.find(t => t.id === newTodo.id);

      if ((!existingTodo || existingTodo && existingTodo.done === false) && newTodo.done) {
        this.pushService.pushToAll('Todo erledigt!', `"${newTodo.title}" ist jetzt erledigt.`, ip);
      }

      if (existingTodo) {
        this.logger.log(`Updating todo with ID ${newTodo.id}`);
        Object.assign(existingTodo, newTodo);
      } else {
        this.logger.log(`Adding todo with ID ${newTodo.id}`);
        todoStore.push(newTodo);
      }
    });
    return todoStore;
  }
}
