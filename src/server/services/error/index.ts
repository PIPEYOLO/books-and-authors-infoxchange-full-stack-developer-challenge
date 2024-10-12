
interface KnownErrorPayloadData extends KnownErrorType {};

export class KnownError implements KnownErrorType {
  message
  status
  data
  code
  constructor ({ message, status, data, code }: KnownErrorPayloadData) {
    this.message = message
    this.status = status
    this.data = data
    this.code = code
  }

  getWithCustomMessage (message: string): KnownError {
    return new KnownError({ ...this, message })
  }
};

export const NOT_FOUND_ERROR = new KnownError({ status: 404, message: 'Not found', code: 'NOT_FOUND_ERROR' })
export const AUTHOR_NOT_FOUND_ERROR = NOT_FOUND_ERROR.getWithCustomMessage('Author not found')
export const BOOK_NOT_FOUND_ERROR = NOT_FOUND_ERROR.getWithCustomMessage('Book not found')

export const UNVALID_ID_ERROR = new KnownError({ status: 400, message: '_id provided must be a 24 chars hexstring', code: 'UNVALID_ID_ERROR' })
export const UNVALID_PAYLOAD_DATA_ERROR = new KnownError({ status: 400, message: 'data provided is unvalid', code: 'UNVALID_PAYLOAD_DATA_ERROR' })

export const UNKNOWN_ERROR = new KnownError({ status: 500, message: 'Something wrong happened!', code: 'UNKNOWN_ERROR' })
