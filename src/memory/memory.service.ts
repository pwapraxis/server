export abstract class MemoryService {
  abstract getStore<T>(key: string, username: string, defaultValue: T): T;

  protected getOrCreateStore<T>(stores: Map<string, T>, key: string, defaultValue: T) {
    if (stores.has(key)) {
      return stores.get(key);
    }

    stores.set(key, defaultValue);
    return defaultValue;
  }
}
