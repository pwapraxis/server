import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { PushService } from './push/push.service';
import { StorageService } from './storage.service';
import { TodoService } from './sync/todo.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
        provide: PushService,
        useValue: {},
      }, {
        provide: TodoService,
        useValue: {},
      }, {
        provide: StorageService,
        useValue: {},
      }],
    }).compile();
  });

  it('should exist', () => {
    const appController = app.get<AppController>(AppController);
    expect(appController).toBeDefined();
  });
});
