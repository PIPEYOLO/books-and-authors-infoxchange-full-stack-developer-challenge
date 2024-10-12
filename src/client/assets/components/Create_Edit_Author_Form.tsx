import { FormEvent, MouseEvent, useCallback, useEffect, useState } from 'react'
import ErrorPage from './ErrorPage'
import { createAuthor, editAuthor } from '../utils/fetch'
import Input from './Input'
import { Button } from './Buttons'
import ErrorMessage from './ErrorMessage'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import useAuthor from '../hooks/useAuthor'

export default function Create_Edit_Author_Form ({ _id }: { _id?: string }) {
  const authorIsBeingEdited = _id != undefined
  const navigate = useNavigate()

  const { author: authorInitialData, error: getError } = useAuthor(_id as string, { doInitialFetch: authorIsBeingEdited }) // this will only be defined if author is beeing edited
  const [authorDataToSend, setAuthorDataToSend] = useState<AuthorCreationPayload | AuthorEditionPayload>({ first_name: '', last_name: '' })
  const [sendError, setSendError] = useState<ErrorType | null>(null)

  // authorDataToSend.
  useEffect(() => {
    if (authorInitialData !== null) { // is beeing editted
      setAuthorDataToSend({ ...authorInitialData })
    }
  }, [authorInitialData, getError])

  const onSumbitButton_click = useCallback(async (ev: MouseEvent) => {
    ev.preventDefault()
    let result
    try {
      if (authorIsBeingEdited) {
        result = await editAuthor(_id, authorDataToSend)
      } else {
        result = await createAuthor(authorDataToSend)
      }
      const author: Author = result.data
      navigate(`/author/${author._id}`)
    } catch (error) {
      const errorData = (error as AxiosError)?.response?.data as ErrorType
      setSendError(errorData ?? { message: 'Something went wrong' })
    }
  }, [authorDataToSend])

  if (getError !== null) {
    return <div><ErrorPage {...getError} /></div>
  }

  return (
    <div className='h-full w-full flex items-center justify-center'>
      <form className='flex flex-col items-start justify-center gap-5' onSubmit={useCallback((ev: FormEvent) => ev.preventDefault(), [])}>
        <div className='flex flex-col'>
          <label>First name</label>
          <Input
            placeholder={authorInitialData?.first_name}
            value={authorDataToSend.first_name}
            onChange={useCallback((ev: any) => setAuthorDataToSend({ ...authorDataToSend, first_name: ev.target.value }), [authorDataToSend])}
          />
        </div>
        <div className='flex flex-col'>
          <label>Last name</label>
          <Input
            placeholder={authorInitialData?.last_name}
            value={authorDataToSend.last_name}
            onChange={useCallback((ev: any) => setAuthorDataToSend({ ...authorDataToSend, last_name: ev.target.value }), [authorDataToSend])}
          />
        </div>
        {(sendError != null) && <div><ErrorMessage {...sendError} /></div>}

        <Button onClick={onSumbitButton_click}>
          {authorIsBeingEdited ? 'Apply changes' : 'Create'}
        </Button>
      </form>
    </div>
  )
}
