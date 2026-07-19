import { Duration } from './Duration';

export abstract class OfflinePolicyAction {
  readonly identifier: string;

  protected constructor(identifier: string) {
    this.identifier = identifier;
  }

  static queue(): QueuePolicyAction {
    return new QueuePolicyAction();
  }

  static cache(): UseCacheOfflinePolicyAction {
    return new UseCacheOfflinePolicyAction();
  }

  static throwError(): ThrowErrorPolicyAction {
    return new ThrowErrorPolicyAction();
  }

  static retry(retries: number, retryInterval: Duration): RetryPolicyAction {
    return new RetryPolicyAction(retries, retryInterval);
  }

  static fromIdentifier(
    identifier: string,
    retries?: number,
    retryInterval?: Duration
  ): OfflinePolicyAction {
    switch (identifier) {
      case 'QUEUE':
        return new QueuePolicyAction();

      case 'USE_CACHE':
        return new UseCacheOfflinePolicyAction();

      case 'RETRY':
        return new RetryPolicyAction(
          retries ?? 1,
          retryInterval ?? Duration.milliseconds(2000)
        );

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
  readonly retryInterval: Duration;

  constructor(retries: number, retryInterval: Duration) {
    super('RETRY');
    this.retries = retries;
    this.retryInterval = retryInterval;
  }
}

export class ThrowErrorPolicyAction extends OfflinePolicyAction {
  constructor() {
    super('THROW_ERROR');
  }
}
