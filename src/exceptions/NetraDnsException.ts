export class NetraDnsException extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
