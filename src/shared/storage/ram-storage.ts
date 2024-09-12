import { IStorage } from './storage.ts';

export class RamStorage implements IStorage {
  constructor(private readonly cache: Record<string, any> = {}) {}

  async get<T>(key: string): Promise<T | null> {
    return this.cache[key] ?? null;
  }

  async remove(key: string): Promise<void> {
    delete this.cache[key];
  }

  async set<T>(key: string, value: T): Promise<void> {
    this.cache[key] = value;
  }
}
