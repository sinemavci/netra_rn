export abstract class BaseDTO {
  abstract toJSON(): void;

  toJSONString() {
    return JSON.stringify(this.toJSON());
  }
}
