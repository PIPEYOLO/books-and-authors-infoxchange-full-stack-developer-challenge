import { useEffect, useState } from 'react'
import Book from './Book'
import { getBooks } from '../utils/fetch'
import ErrorPage from './ErrorPage'

export default function Books () {
  const [books, setBooks] = useState<Book[]>([])
  const [error, setError] = useState<ErrorType | null>(null)

  useEffect(() => {
    getBooks()
      .then(response => setBooks(response.data as Book[]))
      .catch(error => setError(error?.response?.data ?? { message: 'Something went wrong' }))
  }, [])

  return (
    <div className='w-full h-full flex flex-col border-2 border-black overflow-y-auto'>
      {books.map(book => <Book key={book._id} {...book} />)}
      {(error != null) && <div><ErrorPage {...error} /></div>}
    </div>
  )
}
