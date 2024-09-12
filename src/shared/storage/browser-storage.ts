import { IStorage } from './storage.ts';

export class BrowserStorage implements IStorage {
  async get<T>(key: string): Promise<T | null> {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }

    return JSON.parse(item);
  }

  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async set<T>(key: string, value: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
