export class Optional<T> {
  constructor(private value: T | null) {}

  static of<T>(value: T | null) {
    return new Optional(value);
  }

  isNull() {
    return this.value === null;
  }

  get() {
    if (this.value === null) {
      throw new Error('Optional is empty');
    }

    return this.value;
  }
}
