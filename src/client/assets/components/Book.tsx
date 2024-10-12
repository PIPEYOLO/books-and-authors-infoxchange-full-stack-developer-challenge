import { Link } from 'react-router-dom'

export default function Book ({ _id, name }: Book) {
  return (
    <article className='w-full h-10 flex items-center justify-center border-2'>
      <Link to={`/book/${_id}`}>{name}</Link>
    </article>
  )
}
