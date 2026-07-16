import { CircuitBreakerOptions } from '../../models/CircuitBreakerOptions';
import { BaseDTO } from './BaseDTO';

export class CircuitBreakerOptionsDTO extends BaseDTO {
  failureThreshold?: number;
  retryDelayMs?: number;

  constructor(failureThreshold?: number, retryDelayMs?: number) {
    super();
    this.retryDelayMs = retryDelayMs;
    this.failureThreshold = failureThreshold;
  }

  static fromDataModel(model: CircuitBreakerOptions) {
    return new CircuitBreakerOptionsDTO(
      model.failureThreshold,
      model.retryDelayMs
    );
  }

  static fromJSON(json: string) {
    const parsedJSON = JSON.parse(json);
    return new CircuitBreakerOptionsDTO(
      parsedJSON.failureThreshold,
      parsedJSON.retryDelayMs
    );
  }

  toDataModel(): CircuitBreakerOptions {
    return new CircuitBreakerOptions({
      retryDelayMs: this.retryDelayMs,
      failureThreshold: this.failureThreshold,
    });
  }

  toJSON() {
    return {
      retryDelayMs: this.retryDelayMs,
      failureThreshold: this.failureThreshold,
    };
  }
}
