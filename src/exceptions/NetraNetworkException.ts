export class NetraNetworkException extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
