export class CacheOptions {
  ttl?: number;

  constructor(prop?: number = 600000) {
    this.ttl = prop;
  }
}
