import { MouseEventHandler, ReactElement } from 'react'
import { Link } from 'react-router-dom'

export function EditBookButton ({ _id }: { _id: Book['_id'] }) {
  return (
    <Button>
      <Link to={`/edit-book/${_id}`}>Edit</Link>
    </Button>
  )
}

export function EditAuthorButton ({ _id }: { _id: Book['_id'] }) {
  return (
    <Button>
      <Link to={`/edit-author/${_id}`}>Edit</Link>
    </Button>
  )
}

export function Button ({ onClick, children, className }: { onClick?: MouseEventHandler | (() => void), children: ReactElement | ReactElement[] | string, className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`border-2 bg-transparent ${className ?? ''}`}
    >
      {children}
    </button>
  )
}
