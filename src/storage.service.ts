import { Injectable } from '@nestjs/common';
import { LocalStorage } from 'node-localstorage';
import * as path from 'path';

const STORAGE_LOCATION = './storage';

@Injectable()
export class StorageService {
  localStorage: LocalStorage;

  constructor() {
    this.localStorage = new LocalStorage(STORAGE_LOCATION);
  }

  getLocation(): string {
    return path.join(__dirname, STORAGE_LOCATION);
  }

  set<T>(id: string, value: T): void {
    this.localStorage.setItem(id, JSON.stringify(value));
  }

  get<T>(id: string): T {
    return JSON.parse(this.localStorage.getItem(id));
  }
}
