import {
  OfflinePolicyAction,
  RetryPolicyAction,
} from '../../models/OfflinePolicyAction';
import { BaseDTO } from './BaseDTO';

export class OfflinePolicyActionDTO extends BaseDTO {
  identifier: string;
  retries?: number;
  retryDuration?: number;
  retryUnit?: string;

  constructor(
    identifier: string,
    retries?: number,
    retryDuration?: number,
    retryUnit?: string
  ) {
    super();
    this.identifier = identifier;
    this.retries = retries;
    this.retryDuration = retryDuration;
    this.retryUnit = retryUnit;
  }

  static fromDataModel(model: OfflinePolicyAction) {
    return new OfflinePolicyActionDTO(
      model.identifier,
      model instanceof RetryPolicyAction ? model.retries : undefined,
      model instanceof RetryPolicyAction ? model.retryInterval : undefined,
      model instanceof RetryPolicyAction ? 'MILLISECONDS' : undefined
    );
  }

  static fromJSON(json: string) {
    const parsedJSON = JSON.parse(json);
    return new OfflinePolicyActionDTO(
      parsedJSON.identifier,
      parsedJSON.retries,
      parsedJSON.retryInterval,
      parsedJSON.retryUnit
    );
  }

  toDataModel(): OfflinePolicyAction {
    return OfflinePolicyAction.fromIdentifier(
      this.identifier,
      this.retries,
      this.retryDuration
    );
  }

  toJSON() {
    return {
      identifier: this.identifier,
      retries: this.retries,
      retryDuration: this.retryDuration,
      retryUnit: this.retryUnit,
    };
  }
}
