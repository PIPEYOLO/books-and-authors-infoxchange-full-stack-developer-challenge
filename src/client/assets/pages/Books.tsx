import Books from "../components/Books";


export default function BooksPage() {

  return (
    <div className="h-full w-full flex flex-col gap-5 items-center justify-center">
      <h1>Books</h1>
      <div className="w-full md:w-[400px] h-full md:h-[600px]">
        <Books />  
      </div>
    </div>
  )
}

