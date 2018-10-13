import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PushService } from '../push/push.service';
import { TodoService } from './todo.service';

describe('TodoService', () => {
    let service: TodoService;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TodoService, Logger, {
                provide: PushService,
                useValue: {}
            }],
        }).compile();
        service = module.get<TodoService>(TodoService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
