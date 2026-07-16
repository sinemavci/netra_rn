import type { OfflinePolicyAction } from './OfflinePolicyAction';
import type { SlowNetworkPolicyAction } from './SlowNetworkPolicyAction';
import { CacheOptions } from './CacheOptions';
import type { RequestBody } from './RequestBody';
import 'react-native-get-random-values';
import uuid from 'react-native-uuid';

export interface RequestOptionsProps {
  url: string;
  offlinePolicyAction?: OfflinePolicyAction;
  slowNetworkPolicyAction?: SlowNetworkPolicyAction;
  cacheOptions?: CacheOptions;
  headers?: Map<string, string>;
  cancelOnDispose?: boolean;
  body?: RequestBody;
}

export class RequestOptions {
  id: string;
  url: string;
  offlinePolicyAction?: OfflinePolicyAction;
  slowNetworkPolicyAction?: SlowNetworkPolicyAction;
  cacheOptions?: CacheOptions;
  headers?: Map<string, string>;
  cancelOnDispose?: boolean;
  body?: RequestBody;

  constructor(props: RequestOptionsProps) {
    this.id = uuid.v4().toString();
    this.url = props.url;
    this.body = props.body;
    this.headers = props.headers;
    this.offlinePolicyAction = props.offlinePolicyAction;
    this.slowNetworkPolicyAction = props.slowNetworkPolicyAction;
    this.cacheOptions = props.cacheOptions ?? new CacheOptions();
    this.cancelOnDispose = props.cancelOnDispose ?? false;
  }
}
