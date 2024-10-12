import { useEffect, useState } from 'react'
import { getAuthor } from '../utils/fetch'

export default function useAuthor (_id: Author['_id'], { doInitialFetch }: { doInitialFetch: boolean } = { doInitialFetch: true }) {
  const [error, setError] = useState<ErrorType | null>(null)
  const [author, setAuthor] = useState<Author | null>(null)

  useEffect(() => {
    if (!doInitialFetch) return
    getAuthor(_id)
      .then(response => setAuthor(response.data))
      .catch(error => setError(error?.response?.data ?? { message: 'Something went wrong' }))
  }, [_id])

  return { error, author, setAuthor, setError }
}
