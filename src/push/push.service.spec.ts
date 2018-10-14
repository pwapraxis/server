import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from '../storage.service';
import { PushService } from './push.service';

describe('PushService', () => {
  let service: PushService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PushService, Logger, {
        provide: StorageService,
        useValue: { get: () => void 0, set: () => void 0 },
      }],
    }).compile();
    service = module.get<PushService>(PushService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
