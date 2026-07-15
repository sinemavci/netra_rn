import type { RequestBodyPart } from './RequestBodyPart';

export interface RequestBodyProps {
  content: Object;
  contentType?: string;
  isMultipart?: boolean;
}

export class RequestBody {
  content: Object;
  contentType?: string = 'application/json; charset=utf-8';
  isMultipart?: boolean = false;

  constructor(props: RequestBodyProps) {
    this.content = props.content;
    this.contentType = props.contentType ?? 'application/json; charset=utf-8';
    this.isMultipart = props.isMultipart ?? false;
  }

  static createJson(
    json: string,
    contentType = 'application/json; charset=utf-8'
  ): RequestBody {
    return new RequestBody({
      content: json,
      contentType,
    });
  }

  static createBytes(
    bytes: Uint8Array | number[],
    contentType = 'application/json; charset=utf-8'
  ): RequestBody {
    return new RequestBody({
      content: bytes,
      contentType,
    });
  }

  static createMap(map: Record<string, any>): RequestBody {
    return new RequestBody({
      content: map,
    });
  }

  static multipart(parts: RequestBodyPart[]): RequestBody {
    return new RequestBody({
      // content: parts.map((part: RequestBodyPart) => {
      //
      // }),
      content: parts,
      contentType = 'multipart/form-data',
      isMultipart: true,
    });
  }

  //todo
  //   factory RequestBody.multipart(List<RequestBodyPart> parts) {
  //   return RequestBody._(
  //     content: jsonEncode(
  //   parts.map((it) {
  //   return RequestBodyPartDTO.fromDataModel(it).toJson();
  // }).toList(),
  // ),
}
