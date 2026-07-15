export interface CircuitBreakerOptionsProps {
  failureThreshold?: number;
  retryDelayMs?: number;
}

export class CircuitBreakerOptions {
  failureThreshold?: number;
  retryDelayMs?: number;

  constructor(props: CircuitBreakerOptionsProps) {
    this.failureThreshold = props.failureThreshold;
    this.retryDelayMs = props.retryDelayMs;
  }
}
