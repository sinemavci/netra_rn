export class NetraDnsException extends Error {
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
    this.message = message;
  }
}
