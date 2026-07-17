import { Response } from '../../models/Response';
import { BaseDTO } from './BaseDTO';

export class ResponseDTO extends BaseDTO {
  data?: unknown;
  statusCode?: number;
  statusMessage?: string;
  headers?: Record<string, string>;

  constructor(
    data?: unknown,
    statusCode?: number,
    statusMessage?: string,
    headers?: Record<string, string>
  ) {
    super();
    this.data = data;
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
    this.headers = headers;
  }

  static fromDataModel<T>(model: Response<T>): ResponseDTO {
    return new ResponseDTO(
      model.data,
      model.statusCode,
      model.statusMessage,
      model.headers
    );
  }

  static fromJSON(json: string) {
    const parsedJSON = JSON.parse(json);
    return new ResponseDTO(
      parsedJSON.data,
      parsedJSON.statusCode,
      parsedJSON.statusMessage,
      parsedJSON.headers
    );
  }

  toDataModel<T>(): Response<T> {
    return Response.fromRaw<T>({
      data: this.data,
      statusCode: this.statusCode,
      statusMessage: this.statusMessage,
      headers: this.headers,
    });
  }

  toJSON() {
    return {
      data: this.data,
      statusCode: this.statusCode,
      statusMessage: this.statusMessage,
      headers: this.headers,
    };
  }
}
