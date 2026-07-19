import { BaseDTO } from './BaseDTO';
import { RequestBody } from '../../models/RequestBody';

export class RequestBodyDTO extends BaseDTO {
  content: Object;
  contentType?: string;
  isMultipart?: boolean;
  type?: string;

  constructor(
    content: Object,
    contentType?: string,
    isMultipart?: boolean,
    type?: string
  ) {
    super();
    this.content = content;
    this.contentType = contentType;
    this.isMultipart = isMultipart;
    this.type = type;
  }

  static fromDataModel(model: RequestBody) {
    let typeResult = 'json';
    if (model.isMultipart) {
      typeResult = 'multipart';
    } else if (typeof model.content === 'string') {
      if (
        model.contentType?.includes('octet-stream') ||
        model.contentType?.includes('image') ||
        model.contentType?.includes('video')
      ) {
        typeResult = 'raw';
      } else {
        typeResult = 'json';
      }
    } else if (model.content instanceof Map) {
      typeResult = 'map';
    } else if (model.content instanceof Array) {
      typeResult = 'raw';
    }
    return new RequestBodyDTO(
      model.isMultipart ? JSON.stringify(model.content) : model.content,
      model.contentType,
      model.isMultipart,
      typeResult
    );
  }

  static fromJSON(json: string) {
    const parsedJSON = JSON.parse(json);
    return new RequestBodyDTO(
      parsedJSON.content,
      parsedJSON.contentType,
      parsedJSON.isMultipart,
      parsedJSON.type
    );
  }

  toDataModel(): RequestBody {
    //todo
    return new RequestBody({
      content: this.content,
      contentType: this.contentType,
      isMultipart: this.isMultipart,
    });
  }

  toJSON() {
    return {
      content: this.content,
      contentType: this.contentType,
      isMultipart: this.isMultipart,
      type: this.type,
    };
  }
}
