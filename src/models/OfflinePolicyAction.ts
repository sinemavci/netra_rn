export abstract class OfflinePolicyAction {
  readonly identifier: string;

  protected constructor(identifier: string) {
    this.identifier = identifier;
  }

  static readonly queue = new QueuePolicyAction();
  static readonly useCache = new UseCacheOfflinePolicyAction();
  static readonly throwError = new ThrowErrorPolicyAction();

  static retry(retries: number, retryDelayMs: number): RetryPolicyAction {
    return new RetryPolicyAction(retries, retryDelayMs);
  }

  static fromIdentifier(
    identifier: string,
    retries?: number,
    retryDelayMs?: number
  ): OfflinePolicyAction {
    switch (identifier) {
      case 'QUEUE':
        return new QueuePolicyAction();

      case 'USE_CACHE':
        return new UseCacheOfflinePolicyAction();

      case 'RETRY':
        return new RetryPolicyAction(retries ?? 1, retryDelayMs ?? 2000);

      case 'THROW_ERROR':
        return new ThrowErrorPolicyAction();

      default:
        throw new Error(`Unknown offline policy: ${identifier}`);
    }
  }
}

export class QueuePolicyAction extends OfflinePolicyAction {
  constructor() {
    super('QUEUE');
  }
}

export class UseCacheOfflinePolicyAction extends OfflinePolicyAction {
  constructor() {
    super('USE_CACHE');
  }
}

export class RetryPolicyAction extends OfflinePolicyAction {
  readonly retries: number;
  readonly retryDelayMs: number;

  constructor(retries: number, retryDelayMs: number) {
    super('RETRY');
    this.retries = retries;
    this.retryDelayMs = retryDelayMs;
  }
}

export class ThrowErrorPolicyAction extends OfflinePolicyAction {
  constructor() {
    super('THROW_ERROR');
  }
}
