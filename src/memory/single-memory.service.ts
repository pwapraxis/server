import { Injectable } from '@nestjs/common';
import { MemoryService } from './memory.service';

@Injectable()
export class SingleMemoryService extends MemoryService {
  private stores = new Map<string, any>();

  getStore<T>(key: string, username: string, defaultValue: T): T {
    return this.getOrCreateStore(this.stores, key, defaultValue);
  }
}