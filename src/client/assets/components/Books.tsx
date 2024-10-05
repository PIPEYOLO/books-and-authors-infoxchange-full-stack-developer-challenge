import { useEffect, useState } from "react";
import Book from "./Book";
import booksData from "../mocks/books.json"


export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBooks(booksData as Book[]);
  }, [ ])

  return (
    <div className="w-full h-full flex flex-col border-2 border-black overflow-y-auto">
      {books.map(book => <Book key={ book._id } {...book} />)}
    </div>
  )
}