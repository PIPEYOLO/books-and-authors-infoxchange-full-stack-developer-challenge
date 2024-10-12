interface Author {
  _id: string
  first_name: string
  last_name: string
}

interface Book {
  _id: string
  name: string
  isbn: string
  author: Author
}

interface ErrorType {
  message: string
  status?: number
  data?: Object
  code?: string
}

type SkipOption = number
type LimitOption = number
type SearchOption = string

interface QueryOptions {
  skip?: SkipOption
  limit?: LimitOption
  search?: SearchOption
}
