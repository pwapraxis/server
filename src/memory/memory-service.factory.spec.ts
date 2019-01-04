import { TestingLogger } from '@nestjs/testing/services/testing-logger.service';
import { IsolatedMemoryService } from './isolated-memory.service';
import { isolatedGlobalProperty, memoryServiceFactory } from './memory-service.factory';
import { SingleMemoryService } from './single-memory.service';

describe('memoryServiceFactory', () => {
  it('should return an instance of SingleMemoryService by default', () => {
    const result = memoryServiceFactory(new TestingLogger());

    expect(result).toBeInstanceOf(SingleMemoryService);
  });

  it('should return an instance of SingleMemoryService by default', () => {
    global[isolatedGlobalProperty] = true;

    const result = memoryServiceFactory(new TestingLogger());

    expect(result).toBeInstanceOf(IsolatedMemoryService);
  });

  afterEach(() => {
    // tslint:disable-next-line
    delete global[isolatedGlobalProperty];
  });
});
