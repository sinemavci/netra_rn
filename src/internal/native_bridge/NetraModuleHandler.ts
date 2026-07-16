import type { RequestOptions, Response } from '../../models';
import { RequestOptionsDTO } from '../dto/RequestOptionsDTO';
import { ResponseDTO } from '../dto/ResponseDTO';
import NetraReactNative from './NativeNetraReactNative';

export class NetraModuleHandler {
  async get(
    clientId: string,
    requestOptions: RequestOptions
  ): Promise<Response | undefined> {
    let response;
    try {
      const _requestOptions =
        RequestOptionsDTO.fromDataModel(requestOptions).toJSONString();
      const responseJson = await NetraReactNative.get(
        clientId,
        _requestOptions
      );
      response = ResponseDTO.fromJSON(responseJson).toDataModel();
    } catch (e) {
      console.error(e); //todo
    }
    return response;
  }

  async build(
    baseUrl: string,
    convertedType?: string,
    headers?: string,
    circuitBreakerOptions?: string
  ) {
    let clientId;
    try {
      clientId = NetraReactNative.build(
        baseUrl,
        convertedType,
        headers,
        circuitBreakerOptions
      );
    } catch (e) {
      console.error(e); //todo
    }
    return clientId;
  }
}
