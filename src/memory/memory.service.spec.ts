import { MemoryService } from './memory.service';

describe('MemoryService', () => {
  let sut: MemoryService;

  class TestClass extends MemoryService {
    getStore<T>(key: string, username: string, defaultValue: T): T {
      return undefined;
    }
  }

  beforeEach(() => {
    sut = new TestClass();
  });

  describe('getOrCreateStore', () => {
    const key = 'KEY';

    it('should return existing store', () => {
      const store = {};
      // @ts-ignore
      const stores = new Map<string, any>([[key, store]]);

      const result = (sut as any).getOrCreateStore(stores, key, null);

      expect(result).toBe(store);
    });

    it('should create store from default value', () => {
      const store = {};
      // @ts-ignore
      const stores = new Map<string, any>();

      const result = (sut as any).getOrCreateStore(stores, key, store);

      expect(result).toBe(store);
    });

    it('should add store created from default value', () => {
      const store = {};
      // @ts-ignore
      const stores = new Map<string, any>();

      (sut as any).getOrCreateStore(stores, key, store);

      expect(stores.get(key)).toBe(store);
    });
  });
});
