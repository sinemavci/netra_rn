export class Duration {
  private readonly ms: number;

  private constructor(ms: number) {
    this.ms = ms;
  }

  static milliseconds(value: number): Duration {
    return new Duration(value);
  }

  static seconds(value: number): Duration {
    return new Duration(value * 1000);
  }

  static minutes(value: number): Duration {
    return new Duration(value * 60_000);
  }

  static hours(value: number): Duration {
    return new Duration(value * 3_600_000);
  }

  static days(value: number): Duration {
    return new Duration(value * 86_400_000);
  }

  static zero(): Duration {
    return new Duration(0);
  }

  get totalMilliseconds(): number {
    return this.ms;
  }

  toJSON(): number {
    return this.ms;
  }
}
