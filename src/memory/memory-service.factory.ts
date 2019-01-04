import { Logger } from '@nestjs/common';
import { IsolatedMemoryService } from './isolated-memory.service';
import { MemoryService } from './memory.service';
import { SingleMemoryService } from './single-memory.service';

export function memoryServiceFactory(logger: Logger): MemoryService {
  // tslint:disable-next-line:no-string-literal
  if (global[isolatedGlobalProperty]) {
    logger.log('Running in isolated mode.', 'MemoryService');
    return new IsolatedMemoryService();
  }

  return new SingleMemoryService();
}

export const isolatedGlobalProperty = '__runIsolated';
export const memoryServiceFactoryDeps = [Logger];
