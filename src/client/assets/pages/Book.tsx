import { Link, useParams } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import useBook from "../hooks/useBook";
import {EditBookButton} from "../components/Buttons";
import Nav from "../components/Nav";


export default function BookPage() {
  const { _id } = useParams();
  const { book, error } = useBook(_id as string);

  return (
    <div className="h-full w-full flex flex-col items-center gap-5">
      <Nav />
      <h2>Book of _id '${_id}'</h2>
      { book && (
        <div className="flex flex-col">
          <h5>Name: <b>{ book.name }</b></h5>
          <p>Isbn: <b>{ book.isbn }</b></p>
          <p className="flex gap-3">Author:<Link to={`/author/${book.author._id}`}> { `${book.author.first_name} ${book.author.last_name}` }</Link></p>
        </div>
      )}
      <EditBookButton _id={ _id as string }/>
      { error && <div><ErrorPage {...error} /></div>}
    </div>
  )
}