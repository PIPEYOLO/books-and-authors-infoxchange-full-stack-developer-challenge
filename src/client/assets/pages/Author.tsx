import ErrorPage from '../components/ErrorPage'
import Nav from '../components/Nav'
import { EditAuthorButton } from '../components/Buttons'
import useAuthor from '../hooks/useAuthor'
import { useParams } from 'react-router-dom'

export default function AuthorPage () {
  const { _id } = useParams()
  const { author, error } = useAuthor(_id as string)

  return (
    <div className='h-full w-full flex flex-col items-center gap-5'>
      <Nav />
      {author && (
        <div className='flex flex-col'>
          <h4>Name: {author.first_name + ' ' + author.last_name}</h4>
        </div>
      )}
      <EditAuthorButton _id={_id as string} />

      {error && <div><ErrorPage {...error} /></div>}
    </div>
  )
}
