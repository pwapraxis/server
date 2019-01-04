import { IpService } from '../ip/ip.service';
import { SyncController } from './sync.controller';
import { TodoService } from './todo.service';

describe('SyncController', () => {
  let sut: SyncController;

  let todoServiceMock: TodoService;
  let ipServiceMock: IpService;

  const ip = 'IP';

  beforeEach(() => {
    todoServiceMock = { sync: jest.fn() } as any;
    ipServiceMock = { extractIp: jest.fn(() => ip) } as any;

    sut = new SyncController(todoServiceMock, ipServiceMock);
  });

  describe('root', () => {
    it('should pass data to TodoService', () => {
      const forwardedFor = 'FORWARD';
      const todos = [];

      sut.root(forwardedFor, todos);

      expect(ipServiceMock.extractIp).toHaveBeenCalledWith(forwardedFor);
      expect(todoServiceMock.sync).toHaveBeenCalledWith(todos, ip);
    });
  });
});
