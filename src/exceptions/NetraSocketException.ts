export class NetraSocketException extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
