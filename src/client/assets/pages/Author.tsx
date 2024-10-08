import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAuthor } from "../utils/fetch";
import ErrorPage from "../components/ErrorPage";


export default function AuthorPage() {
  const { _id } = useParams();
  const [ error, setError ] = useState<ErrorType | null>(null);
  const [ author, setAuthor ] = useState<Author | null>(null);

  useEffect(() => {
    getAuthor(_id as string)
    .then(response => setAuthor(response.data))
    .catch(error => setError(error?.response?.data ?? { message: "Something went wrong" }));
  }, [ _id ]);


  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-5">
      <h2>author of _id '${_id}'</h2>
      { author && (
        <div className="flex flex-col">
          <h4>Name: { author.first_name + " " + author.last_name }</h4>
        </div>
      )}
      { error && <div><ErrorPage {...error} /></div>}
    </div>
  )
}