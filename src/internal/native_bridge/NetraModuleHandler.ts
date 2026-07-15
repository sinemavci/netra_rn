import NetraReactNative from './NativeNetraReactNative';

export class NetraModuleHandler {
  async get(clientId: string, requestOptions: string) {
    try {
      await NetraReactNative.get(clientId, requestOptions);
    } catch (e) {
      console.error(e); //todo
    }
  }
}
