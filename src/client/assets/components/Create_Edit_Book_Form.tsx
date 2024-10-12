import { FormEvent, MouseEvent, useCallback, useEffect, useState } from 'react'
import useBook from '../hooks/useBook.js'
import ErrorPage from './ErrorPage.js'
import { createBook, editBook } from '../utils/fetch.js'
import Input from './Input.js'
import { Button } from './Buttons.js'
import ErrorMessage from './ErrorMessage.js'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Create_Edit_Book_Form ({ _id }: { _id?: string }) {
  const bookIsBeingEdited = _id != undefined
  const navigate = useNavigate()

  const { book: bookInitialData, error: getError } = useBook(_id as string, { doInitialFetch: bookIsBeingEdited }) // this will only be defined if book is beeing edited
  const [bookDataToSend, setBookDataToSend] = useState<BookCreationPayload | BookEditionPayload>({ name: '', isbn: '', author_id: '' })
  const [sendError, setSendError] = useState<ErrorType | null>(null)

  // bookDataToSend.
  useEffect(() => {
    if (bookInitialData !== null) { // is beeing editted
      setBookDataToSend({ name: bookInitialData.name, isbn: bookInitialData.isbn })
    }
  }, [bookInitialData, getError])

  const onSumbitButton_click = useCallback(async (ev: MouseEvent) => {
    ev.preventDefault()
    let result
    try {
      if (bookIsBeingEdited) {
        result = await editBook(_id, bookDataToSend)
      } else {
        result = await createBook(bookDataToSend as BookCreationPayload)
      }
      const book: Book = result.data
      navigate(`/book/${book._id}`)
    } catch (error) {
      const errorData = (error as AxiosError)?.response?.data as ErrorType
      setSendError(errorData ?? { message: 'Something went wrong' })
    }
  }, [bookDataToSend])

  if (getError !== null) {
    return <div><ErrorPage {...getError} /></div>
  }

  return (
    <div className='h-full w-full flex items-center justify-center'>
      <form className='flex flex-col items-start justify-center gap-5' onSubmit={useCallback((ev: FormEvent) => ev.preventDefault(), [])}>
        <div className='flex flex-col'>
          <label>Name</label>
          <Input
            placeholder={bookInitialData?.name}
            value={bookDataToSend.name}
            onChange={useCallback((ev: any) => setBookDataToSend({ ...bookDataToSend, name: ev.target.value }), [bookDataToSend])}
          />
        </div>
        <div className='flex flex-col'>
          <label>Isbn</label>
          <Input
            placeholder={bookInitialData?.isbn}
            value={bookDataToSend.isbn}
            onChange={useCallback((ev: any) => setBookDataToSend({ ...bookDataToSend, isbn: ev.target.value }), [bookDataToSend])}
          />
        </div>
        <div className={`flex flex-col ${bookIsBeingEdited ? 'hidden' : ''}`}>
          <label>Author</label>
          <Input
            value={(bookDataToSend as BookCreationPayload).author_id}
            onChange={useCallback((ev: any) => setBookDataToSend({ ...bookDataToSend, author_id: ev.target.value }), [bookDataToSend])}
          />
        </div>

        {(sendError != null) && <div><ErrorMessage {...sendError} /></div>}

        <Button onClick={onSumbitButton_click}>
          {bookIsBeingEdited ? 'Apply changes' : 'Create'}
        </Button>
      </form>
    </div>
  )
}
