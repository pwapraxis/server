import { Test, TestingModule } from '@nestjs/testing';
import { PushService } from './push.service';
import { Logger } from '@nestjs/common';

describe('PushService', () => {
  let service: PushService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PushService, Logger],
    }).compile();
    service = module.get<PushService>(PushService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
