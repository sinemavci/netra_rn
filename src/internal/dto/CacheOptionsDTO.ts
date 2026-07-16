import { CacheOptions } from '../../models/CacheOptions';
import { BaseDTO } from './BaseDTO';

export class CacheOptionsDTO extends BaseDTO {
  ttl?: number;

  constructor(ttl?: number) {
    super();
    this.ttl = ttl;
  }

  static fromDataModel(model: CacheOptions) {
    return new CacheOptionsDTO(model.ttl);
  }

  static fromJSON(json: string) {
    const parsedJSON = JSON.parse(json);
    return new CacheOptionsDTO(parsedJSON.ttl);
  }

  toDataModel(): CacheOptions {
    return new CacheOptions(this.ttl);
  }

  toJSON() {
    return {
      ttl: this.ttl,
    };
  }
}
