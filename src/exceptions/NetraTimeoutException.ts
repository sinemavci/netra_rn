export class NetraTimeoutException extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
