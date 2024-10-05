import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBook } from "../utils/fetch";
import ErrorPage from "../components/ErrorPage";


export default function BookPage() {
  const { _id } = useParams();
  const [ error, setError ] = useState<ErrorType | null>(null);
  const [ book, setBook ] = useState<Book | null>(null);

  useEffect(() => {
    getBook(_id as string)
    .then(response => setBook(response.data))
    .catch(error => setError(error?.response.data ?? { message: "Something went wrong" }));
  }, [ _id ]);


  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h1>Book of _id '${_id}'</h1>
      { book && (
        <div className="flex flex-col">
          <h3>{ book.name }</h3>
          <p>{ book.isbn }</p>
          <Link to={`/author/${book.author._id}`}>{ `${book.author.first_name} ${book.author.last_name}` }</Link>
        </div>
      )}
      { error && <ErrorPage {...error} />}
    </div>
  )
}