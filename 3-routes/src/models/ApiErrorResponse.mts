// export type ApiErrorResponse = {
//   message: string;
//   stacktrace: any;
// };

export class ApiErrorResponse {
  message: string;
  stacktrace: any;

  constructor(message: string, stacktrace: any) {
    this.message = message;
    this.stacktrace = stacktrace;
  }
}
