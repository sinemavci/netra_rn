export interface ResponseProps<T> {
  data?: T;
  statusCode?: number;
  statusMessage?: string;
  headers?: Record<string, string>;
}

export class Response<T> {
  data?: T;
  statusCode?: number;
  statusMessage?: string;
  headers?: Record<string, string>;

  constructor(props: ResponseProps<T>) {
    this.data = props.data;
    this.statusCode = props.statusCode;
    this.statusMessage = props.statusMessage;
    this.headers = props.headers;
  }

  static fromRaw<T>(raw: Record<string, unknown>): Response<T> {
    return new Response<T>({
      data: raw.data as T,
      statusCode: raw.statusCode as number,
      statusMessage: raw.statusMessage as string,
      headers: raw.headers as Record<string, string>,
    });
  }
}
