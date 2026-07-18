import { RequestBody } from './RequestBody';

export interface RequestBodyPartProps {
  name: string;
  requestBody: RequestBody;
  fileName?: string;
}

export class RequestBodyPart {
  name: string;
  requestBody: RequestBody;
  fileName?: string;

  constructor(props: RequestBodyPartProps) {
    this.name = props.name;
    this.requestBody = props.requestBody;
    this.fileName = props.fileName;
  }

  static file(
    name: string,
    fileName: string,
    bytes: Uint8Array,
    contentType?: string
  ): RequestBodyPart {
    return new RequestBodyPart({
      name: name,
      fileName: fileName,
      requestBody: RequestBody.createBytes(bytes, contentType),
    });
  }

  static formData(name: string, value: string): RequestBodyPart {
    return new RequestBodyPart({
      name: name,
      fileName: undefined,
      requestBody: RequestBody.createJson(value, 'text/plain'),
    });
  }
}
