import { NetraModuleHandler } from '../internal/native_bridge/NetraModuleHandler';
import { CircuitBreakerOptions, type ConverterType, RequestOptions } from '.';
import 'react-native-get-random-values';
import uuid from 'react-native-uuid';
import { CircuitBreakerOptionsDTO } from '../internal/dto/CircuitBreakerOptionsDTO';

export interface NetraClientProps {
  baseUrl: string;
  converterType?: ConverterType;
  headers?: Map<string, string>;
  circuitBreakerOptions?: CircuitBreakerOptions;
}

class Deferred<T = void> {
  promise!: Promise<T>;
  resolve!: (value: T | PromiseLike<T>) => void;
  reject!: (reason?: any) => void;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

export class NetraClient {
  private id = uuid.v4().toString();
  private moduleHandler: NetraModuleHandler = new NetraModuleHandler();
  private initDeferred = new Deferred<void>();

  baseUrl: string;
  converterType?: ConverterType;
  headers?: Map<string, string>;
  circuitBreakerOptions?: CircuitBreakerOptions;

  constructor(props: NetraClientProps) {
    this.baseUrl = props.baseUrl;
    this.converterType = props.converterType;
    this.headers = props.headers;
    this.circuitBreakerOptions = props.circuitBreakerOptions;

    this.initializeNetraClient();
  }

  private async initializeNetraClient(): Promise<void> {
    try {
      const clientId = await this.moduleHandler?.build(
        this.baseUrl,
        this.converterType,
        this.headers !== undefined
          ? JSON.stringify(Object.fromEntries(this.headers))
          : undefined,
        this.circuitBreakerOptions !== undefined
          ? CircuitBreakerOptionsDTO.fromDataModel(
              this.circuitBreakerOptions
            ).toJSONString()
          : undefined
      );

      if (clientId) {
        this.id = clientId;
        //todo
        // this.observer = new ClientObserver({ clientId });
      }

      this.initDeferred.resolve();
    } catch (e) {
      this.initDeferred.reject(e);
    }
  }

  private ensureInitialized(): Promise<void> {
    return this.initDeferred.promise;
  }

  async get<T>(requestOptions: RequestOptions) {
    await this.ensureInitialized();
    return this.moduleHandler.get<T>(this.id, requestOptions);
  }

  async put<T>(requestOptions: RequestOptions) {
    await this.ensureInitialized();
    return this.moduleHandler.put<T>(this.id, requestOptions);
  }

  async post<T>(requestOptions: RequestOptions) {
    await this.ensureInitialized();
    return this.moduleHandler.post<T>(this.id, requestOptions);
  }

  async patch<T>(requestOptions: RequestOptions) {
    await this.ensureInitialized();
    return this.moduleHandler.patch<T>(this.id, requestOptions);
  }

  async delete<T>(requestOptions: RequestOptions) {
    await this.ensureInitialized();
    return this.moduleHandler.delete<T>(this.id, requestOptions);
  }

  async *getStream(requestOptions: RequestOptions): AsyncGenerator<number[]> {
    await this.ensureInitialized();
    yield* this.moduleHandler.getStream(this.id, requestOptions);
  }
}
