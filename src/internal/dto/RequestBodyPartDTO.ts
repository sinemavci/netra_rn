import { BaseDTO } from './BaseDTO';
import { RequestBodyPart } from '../../models/RequestBodyPart';
import { RequestBodyDTO } from './RequestBodyDTO';

export class RequestBodyPartDTO extends BaseDTO {
  name: string;
  requestBody: RequestBodyDTO;
  fileName?: string;

  constructor(name: string, requestBody: RequestBodyDTO, fileName?: string) {
    super();
    this.name = name;
    this.requestBody = requestBody;
    this.fileName = fileName;
  }

  static fromDataModel(model: RequestBodyPart) {
    return new RequestBodyPartDTO(
      model.name,
      RequestBodyDTO.fromDataModel(model.requestBody),
      model.fileName
    );
  }

  static fromJSON(json: string) {
    const parsedJSON = JSON.parse(json);
    return new RequestBodyPartDTO(
      parsedJSON.name,
      RequestBodyDTO.fromJSON(parsedJSON.requestBody),
      parsedJSON.fileName
    );
  }

  toDataModel(): RequestBodyPart {
    return new RequestBodyPart({
      name: this.name,
      requestBody: this.requestBody.toDataModel(),
      fileName: this.fileName,
    });
  }

  toJSON() {
    return {
      name: this.name,
      requestBody: this.requestBody.toJSON(),
      fileName: this.fileName,
    };
  }
}
