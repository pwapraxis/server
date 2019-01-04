import { IsolatedMemoryService } from './isolated-memory.service';

describe('IsolatedMemoryService', () => {
  let sut: IsolatedMemoryService;

  beforeEach(() => {
    sut = new IsolatedMemoryService();
  });

  describe('getStore', () => {
    const key = 'KEY';
    const user = 'USER';

    describe('for an existing user', () => {
      beforeEach(() => {
        // @ts-ignore
        (sut as any).userStores = new Map<string, any>([[user, new Map<string, any>()]]);
      });

      it('should return an existing store', () => {
        const store = {};
        // @ts-ignore
        (sut as any).userStores.set(user, new Map<string, any>([[key, store]]));

        const result = sut.getStore(key, user, null);

        expect(result).toBe(store);
      });

      it('should create a store with default value if it does not exist yet', () => {
        const store = {};

        const result = sut.getStore(key, user, store);

        expect(result).toBe(store);
      });
    });

    describe('for a non-existing user', () => {
      it('should create a user store', () => {
        const store = {};

        const result = sut.getStore(key, user, store);

        expect((sut as any).userStores.get(user)).toBeDefined();
      });

      it('should create a new store with given default value', () => {
        const store = {};

        const result = sut.getStore(key, user, store);

        expect(result).toBe(store);
      });
    });
  });
});
