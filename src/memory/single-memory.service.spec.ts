import { SingleMemoryService } from './single-memory.service';

describe('SingleMemoryService', () => {
  let sut: SingleMemoryService;

  beforeEach(() => {
    sut = new SingleMemoryService();
  });

  describe('getStore', () => {
    const key = 'KEY';

    it('should return an existing store', () => {
      const store = {};
      // @ts-ignore
      (sut as any).stores = new Map<string, any>([[key, store]]);

      const result = sut.getStore(key, 'ignored', null);

      expect(result).toBe(store);
    });

    it('should create a store with default value if it does not exist yet', () => {
      const store = {};

      const result = sut.getStore(key, 'ignored', store);

      expect(result).toBe(store);
    });
  });
});
