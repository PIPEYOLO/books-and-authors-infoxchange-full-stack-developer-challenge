import { useCallback, useEffect, useState } from "react";
import { getBook } from "../utils/fetch";
import { useNavigate } from "react-router-dom";


export default function useBook(_id: string, { doInitialFetch }: { doInitialFetch: boolean } = { doInitialFetch: true }) {
  const navigate = useNavigate();

  const [ error, setError ] = useState<ErrorType | null>(null);
  const [ book, setBook ] = useState<Book | null>(null);

  useEffect(() => {
    if(doInitialFetch === false) return;
    getBook(_id)
    .then(response => setBook(response.data))
    .catch(error => setError(error?.response?.data ?? { message: "Something went wrong" }));
  }, [ _id ]);

  const goToResource = useCallback(() => {
    navigate(`/book/${_id}`)
  }, [ _id ]);

  return { error, book, setBook, setError, goToResource};
}