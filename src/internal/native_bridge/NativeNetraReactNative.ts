import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  get(clientId: string, requestOptions: string): Promise<string | undefined>;

  post(clientId: string, requestOptions: string): Promise<string | undefined>;

  put(clientId: string, requestOptions: string): Promise<string | undefined>;

  patch(clientId: string, requestOptions: string): Promise<string | undefined>;

  delete(clientId: string, requestOptions: string): Promise<string | undefined>;

  build(
    baseUrl: string,
    convertedType?: string,
    headers?: string,
    circuitBreakerOptions?: string
  ): Promise<string | undefined>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NetraReactNative');
