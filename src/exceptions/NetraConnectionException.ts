export class NetraConnectionException extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
