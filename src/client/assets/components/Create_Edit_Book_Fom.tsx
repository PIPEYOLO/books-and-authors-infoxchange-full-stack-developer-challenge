import { FormEvent, MouseEvent, useCallback, useEffect, useState } from "react";
import useBook from "../hooks/useBook"
import ErrorPage from "./ErrorPage";
import { createBook, editBook } from "../utils/fetch";
import Input from "./Input";
import { Button } from "./Buttons";
import ErrorMessage from "./ErrorMessage";
import { AxiosError } from "axios";

export default function Create_Edit_Book_Form({ _id }: { _id?: string}) {

  const bookIsBeingEdited = _id != undefined;

  const { book: bookInitialData, error: getError, goToResource } = useBook(_id as string, { doInitialFetch: bookIsBeingEdited }); // this will only be defined if book is beeing edited
  const [ bookDataToSend, setBookDataToSend ] = useState<BookCreationPayload | BookEditionPayload>({ name: "", isbn: "", author_id: "" });
  const [ sendError, setSendError ] = useState<ErrorType | null>(null);

  // bookDataToSend.
  useEffect(() => {
    if(bookInitialData !== null) { // is beeing editted
      setBookDataToSend({ name: bookInitialData.name, isbn: bookInitialData.isbn })
    }
  }, [ bookInitialData, getError ]);

  const onSumbitButton_click = useCallback(async (ev: MouseEvent) => {
    ev.preventDefault();
    let result;
    try {
      if(bookIsBeingEdited) {
        result = await editBook(_id, bookDataToSend);
      }
      else {
        if((bookDataToSend as BookCreationPayload).author_id === "") {
          setSendError({ message: "author must be defined" })
        }
        else {
          result = await createBook(bookDataToSend as BookCreationPayload)
        }
      }
      goToResource();
    }
    catch(error) {
      const errorData = (error as AxiosError)?.response?.data as ErrorType
      setSendError(errorData ?? { message: "Something went wrong" });
    }


  }, [ bookDataToSend ]);

  if(getError !== null) {
    return <div><ErrorPage { ...getError } /></div>
  }

  return (
    <form className="flex flex-col items-start justify-center gap-5" onSubmit={useCallback((ev: FormEvent) => ev.preventDefault(), [])}>
      <div className="flex flex-col">
        <label>Name</label>
        <Input 
          placeholder={bookInitialData?.name}
          value={bookDataToSend.name} 
          onChange={useCallback((ev: any) => setBookDataToSend({ ...bookDataToSend, name: ev.target.value }), [ bookDataToSend ])}
        />
      </div> 
      <div className="flex flex-col">
        <label>Isbn</label>
        <Input 
          placeholder={bookInitialData?.isbn}
          value={bookDataToSend.isbn} 
          onChange={useCallback((ev: any) => setBookDataToSend({ ...bookDataToSend, isbn: ev.target.value }), [ bookDataToSend ])}
        />
      </div>    
      <div className={`flex flex-col ${bookIsBeingEdited ? "hidden" : ""}`}>
        <label>Author</label>
        <Input 
          value={(bookDataToSend as BookCreationPayload).author_id} 
          onChange={useCallback((ev: any) => setBookDataToSend({ ...bookDataToSend, author_id: ev.target.value }), [ bookDataToSend ])}
        />
      </div>    

      { sendError && <div><ErrorMessage { ...sendError } /></div>}

      <Button onClick={onSumbitButton_click}>
        { bookIsBeingEdited ? "Apply changes" : "Create" }
      </Button>
    </form>
  )
}