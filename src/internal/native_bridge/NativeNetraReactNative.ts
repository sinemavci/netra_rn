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
}

export default TurboModuleRegistry.getEnforcing<Spec>('NetraReactNative');
