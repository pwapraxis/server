import { Injectable } from '@nestjs/common';
import { MemoryService } from './memory.service';

@Injectable()
export class IsolatedMemoryService extends MemoryService {
  private userStores = new Map<string, Map<string, any>>();

  getStore<T>(key: string, username: string, defaultValue: T): T {
    const userStore = this.getOrCreateStore(this.userStores, username, new Map<string, any[]>());
    return this.getOrCreateStore(userStore, key, defaultValue);
  }
}