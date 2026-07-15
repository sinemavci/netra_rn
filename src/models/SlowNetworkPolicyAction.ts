export abstract class SlowNetworkPolicyAction {
  readonly identifier: string;

  protected constructor(identifier: string) {
    this.identifier = identifier;
  }

  static readonly useCache = new UseCachePolicyAction();

  static wait(delayMs: number): WaitPolicyAction {
    return new WaitPolicyAction(delayMs);
  }

  static timeout(timeoutMs: number): TimeoutPolicyAction {
    return new TimeoutPolicyAction(timeoutMs);
  }

  static fromIdentifier(
    identifier: string,
    delayMs?: number,
    timeoutMs?: number
  ): SlowNetworkPolicyAction {
    switch (identifier) {
      case 'USE_CACHE':
        return new UseCachePolicyAction();

      case 'WAIT':
        return new WaitPolicyAction(delayMs ?? 1000);

      case 'TIMEOUT':
        return new TimeoutPolicyAction(timeoutMs ?? 1000);

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
  readonly delayMs: number;

  constructor(delayMs: number) {
    super('WAIT');
    this.delayMs = delayMs;
  }
}

export class TimeoutPolicyAction extends SlowNetworkPolicyAction {
  readonly timeoutMs: number;

  constructor(timeoutMs: number) {
    super('TIMEOUT');
    this.timeoutMs = timeoutMs;
  }
}
