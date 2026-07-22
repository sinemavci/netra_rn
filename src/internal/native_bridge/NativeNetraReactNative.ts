import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  get(clientId: string, requestOptions: string): Promise<string>;

  post(clientId: string, requestOptions: string): Promise<string>;

  put(clientId: string, requestOptions: string): Promise<string>;

  patch(clientId: string, requestOptions: string): Promise<string>;

  delete(clientId: string, requestOptions: string): Promise<string>;

  build(
    baseUrl: string,
    convertedType?: string,
    headers?: string,
    circuitBreakerOptions?: string
  ): Promise<string>;

  getStream(clientId: string, requestOptions: string): void;

  on(clientId: string, eventName: string, eventId: string): Promise<number>;
  off(clientId: string, eventId: string): Promise<number>;

  addListener(eventName: string): void;
  removeListeners(count: number): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NetraReactNative');
