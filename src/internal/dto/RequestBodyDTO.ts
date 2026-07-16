import { BaseDTO } from './BaseDTO';
import { RequestBody } from '../../models/RequestBody';

export class RequestBodyDTO extends BaseDTO {
  content: Object;
  contentType?: string;
  isMultipart?: boolean;

  constructor(content: Object, contentType?: string, isMultipart?: boolean) {
    super();
    this.content = content;
    this.contentType = contentType;
    this.isMultipart = isMultipart;
  }

  static fromDataModel(model: RequestBody) {
    return new RequestBodyDTO(
      model.content,
      model.contentType,
      model.isMultipart
    );
  }

  static fromJSON(json: string) {
    const parsedJSON = JSON.parse(json);
    return new RequestBodyDTO(
      parsedJSON.content,
      parsedJSON.contentType,
      parsedJSON.isMultipart
    );
  }

  toDataModel(): RequestBody {
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
    };
  }
}
