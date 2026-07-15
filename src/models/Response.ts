export interface ResponseProps {
  data?: Object;
  statusCode?: number;
  statusMessage?: string;
  headers?: Map<string, string>;
}

export class Response {
  data?: Object;
  statusCode?: number;
  statusMessage?: string;
  headers?: Map<string, string>;

  constructor(props: ResponseProps) {
    this.data = props.data;
    this.statusCode = props.statusCode;
    this.statusMessage = props.statusMessage;
    this.headers = props.headers;
  }
}
