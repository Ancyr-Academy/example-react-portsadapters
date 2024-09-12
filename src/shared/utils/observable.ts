export type Listener<T> = (value: T) => void;

export class Observable<T> {
  private listeners: Listener<T>[] = [];

  constructor(private value: T) {}

  addListener(listener: Listener<T>) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  get() {
    return this.value;
  }

  set(value: T) {
    this.value = value;

    for (const listener of this.listeners) {
      listener(value);
    }
  }
}
