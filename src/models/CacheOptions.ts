export class CacheOptions {
  ttl?: number;

  constructor(ttl: number = 600000) {
    this.ttl = ttl;
  }
}
