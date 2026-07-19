export class NetraSocketException extends Error {
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
    this.message = message;
  }
}
