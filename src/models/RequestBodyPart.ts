import { RequestBody } from './RequestBody';

export interface RequestBodyPartProps {
  name: string;
  body: RequestBody;
  filename?: string;
}

export class RequestBodyPart {
  name: string;
  body: RequestBody;
  filename?: string;

  constructor(props: RequestBodyPartProps) {
    this.name = props.name;
    this.body = props.body;
    this.filename = props.filename;
  }

  static file(
    name: string,
    filename: string,
    bytes: Uint8Array,
    contentType = 'image/jpeg'
  ): RequestBodyPart {
    return new RequestBodyPart({
      name: name,
      filename: filename,
      body: RequestBody.createBytes(bytes, contentType),
    });
  }

  static formData(name: string, value: string): RequestBodyPart {
    return new RequestBodyPart({
      name: name,
      filename: undefined,
      body: RequestBody.createJson(value, 'text/plain'),
    });
  }
}
