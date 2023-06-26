/* eslint-disable no-unused-vars */
export class HttpError extends Error {
  constructor(
    public status: number,
    public statusMessage: string,
    message?: string | undefined,
    // eslint-disable-next-line no-undef
    options?: ErrorOptions | undefined
  ) {
    super(message, options);
  }
}
