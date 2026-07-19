import { RequestBodyPartDTO } from '../internal/dto/RequestBodyPartDTO';
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

  static toBase64(bytes: Uint8Array): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let result = '';
    let i = 0;
    while (i < bytes.length) {
      const a = bytes[i++] ?? 0;
      const b = bytes[i++] ?? 0;
      const c = bytes[i++] ?? 0;
      result += chars[a >> 2];
      result += chars[((a & 3) << 4) | (b >> 4)];
      result += chars[((b & 15) << 2) | (c >> 6)];
      result += chars[c & 63];
    }
    const pad = bytes.length % 3;
    if (pad === 1) result = result.slice(0, -2) + '==';
    else if (pad === 2) result = result.slice(0, -1) + '=';
    return result;
  }

  static createBytes(
    bytes: Uint8Array,
    contentType = 'application/octet-stream'
  ): RequestBody {
    return new RequestBody({
      content: RequestBody.toBase64(bytes),
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
      content: parts.map((part: RequestBodyPart) => {
        return RequestBodyPartDTO.fromDataModel(part).toJSON();
      }),
      contentType: 'multipart/form-data',
      isMultipart: true,
    });
  }
}
