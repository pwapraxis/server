import { SyncController } from './sync.controller';
import { TodoService } from './todo.service';

describe('SyncController', () => {
  let sut: SyncController;

  let todoServiceMock: TodoService;

  beforeEach(() => {
    todoServiceMock = { sync: jest.fn() } as any;

    sut = new SyncController(todoServiceMock);
  });

  describe('root', () => {
    it('should pass data to TodoService', () => {
      const todos = [];
      const ip = 'IP';

      sut.root(todos, { ip } as any);

      expect(todoServiceMock.sync).toHaveBeenCalledWith(todos, ip);
    });
  });
});
