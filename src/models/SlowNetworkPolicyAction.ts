import { Duration } from './Duration';

export abstract class SlowNetworkPolicyAction {
  readonly identifier: string;

  protected constructor(identifier: string) {
    this.identifier = identifier;
  }

  static cache(): UseCachePolicyAction {
    return new UseCachePolicyAction();
  }

  static wait(delay: Duration): WaitPolicyAction {
    return new WaitPolicyAction(delay);
  }

  static timeout(timeout: Duration): TimeoutPolicyAction {
    return new TimeoutPolicyAction(timeout);
  }

  static fromIdentifier(
    identifier: string,
    delay?: Duration,
    timeout?: Duration
  ): SlowNetworkPolicyAction {
    switch (identifier) {
      case 'USE_CACHE':
        return new UseCachePolicyAction();

      case 'WAIT':
        return new WaitPolicyAction(delay ?? Duration.milliseconds(1000));

      case 'TIMEOUT':
        return new TimeoutPolicyAction(timeout ?? Duration.milliseconds(1000));

      default:
        throw new Error(`Unknown slow network policy: ${identifier}`);
    }
  }
}

export class UseCachePolicyAction extends SlowNetworkPolicyAction {
  constructor() {
    super('USE_CACHE');
  }
}

export class WaitPolicyAction extends SlowNetworkPolicyAction {
  readonly delay: Duration;

  constructor(delay: Duration) {
    super('WAIT');
    this.delay = delay;
  }
}

export class TimeoutPolicyAction extends SlowNetworkPolicyAction {
  readonly timeout: Duration;

  constructor(timeout: Duration) {
    super('TIMEOUT');
    this.timeout = timeout;
  }
}
