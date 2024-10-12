import { useEffect, useState } from 'react'
import { getBook } from '../utils/fetch'

export default function useBook (_id: Book['_id'], { doInitialFetch }: { doInitialFetch: boolean } = { doInitialFetch: true }) {
  const [error, setError] = useState<ErrorType | null>(null)
  const [book, setBook] = useState<Book | null>(null)

  useEffect(() => {
    if (!doInitialFetch) return
    getBook(_id)
      .then(response => setBook(response.data))
      .catch(error => setError(error?.response?.data ?? { message: 'Something went wrong' }))
  }, [_id])

  return { error, book, setBook, setError }
}
