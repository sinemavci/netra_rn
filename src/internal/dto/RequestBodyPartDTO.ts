import { BaseDTO } from './BaseDTO';
import { RequestBodyPart } from '../../models/RequestBodyPart';
import { RequestBodyDTO } from './RequestBodyDTO';

export class RequestBodyPartDTO extends BaseDTO {
  name: string;
  body: RequestBodyDTO;
  filename?: string;

  constructor(name: string, body: RequestBodyDTO, filename?: string) {
    super();
    this.name = name;
    this.body = body;
    this.filename = filename;
  }

  static fromDataModel(model: RequestBodyPart) {
    return new RequestBodyPartDTO(
      model.name,
      RequestBodyDTO.fromDataModel(model.body),
      model.filename
    );
  }

  static fromJSON(json: string) {
    const parsedJSON = JSON.parse(json);
    return new RequestBodyPartDTO(
      parsedJSON.name,
      RequestBodyDTO.fromJSON(parsedJSON.body),
      parsedJSON.filename
    );
  }

  toDataModel(): RequestBodyPart {
    return new RequestBodyPart({
      name: this.name,
      body: this.body.toDataModel(),
      filename: this.filename,
    });
  }

  toJSON() {
    return {
      name: this.name,
      body: this.body.toJSON(),
      filename: this.filename,
    };
  }
}
