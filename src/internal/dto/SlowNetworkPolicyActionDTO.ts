import { Duration } from '../../models';
import {
  SlowNetworkPolicyAction,
  TimeoutPolicyAction,
  WaitPolicyAction,
} from '../../models/SlowNetworkPolicyAction';
import { BaseDTO } from './BaseDTO';

export class SlowNetworkPolicyActionDTO extends BaseDTO {
  identifier: string;
  delay?: number;
  timeout?: number;
  timeUnit?: string;

  constructor(
    identifier: string,
    delay?: number,
    timeout?: number,
    timeUnit?: string
  ) {
    super();
    this.identifier = identifier;
    this.delay = delay;
    this.timeout = timeout;
    this.timeUnit = timeUnit;
  }

  static fromDataModel(model: SlowNetworkPolicyAction) {
    return new SlowNetworkPolicyActionDTO(
      model.identifier,
      model instanceof WaitPolicyAction
        ? model.delay.totalMilliseconds
        : undefined,
      model instanceof TimeoutPolicyAction
        ? model.timeout.totalMilliseconds
        : undefined,
      model instanceof TimeoutPolicyAction ? 'MILLISECONDS' : undefined
    );
  }

  static fromJSON(json: string) {
    const parsedJSON = JSON.parse(json);
    return new SlowNetworkPolicyActionDTO(
      parsedJSON.identifier,
      parsedJSON.delay,
      parsedJSON.timeout,
      parsedJSON.timeUnit
    );
  }

  toDataModel(): SlowNetworkPolicyAction {
    return SlowNetworkPolicyAction.fromIdentifier(
      this.identifier,
      this.delay !== undefined ? Duration.milliseconds(this.delay) : undefined,
      this.timeout !== undefined
        ? Duration.milliseconds(this.timeout)
        : undefined
    );
  }

  toJSON() {
    return {
      identifier: this.identifier,
      delay: this.delay,
      timeout: this.timeout,
      timeUnit: this.timeUnit,
    };
  }
}
