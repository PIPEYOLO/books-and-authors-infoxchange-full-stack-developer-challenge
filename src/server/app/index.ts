import e from "express";
import authorRouter from "./routes/author.js";
import { connectToDatabase } from "../services/db/conn.js";
import { Author, Book } from "../services/db/models/index.js";
import { parseQueryOptions } from "../services/utils/options/index.js";
import { AUTHOR_NOT_FOUND_ERROR, BOOK_NOT_FOUND_ERROR, KnownError, UNKNOWN_ERROR } from "../services/error/index.js";
import bookRouter from "./routes/book.js";

connectToDatabase();

const app = e();

app.get("/api/hello", (_, res) => {
  res.send("hola asdqw")
})

app.use("/api/author", authorRouter)
app.use("/api/book", bookRouter)

app.get("/api/books", async (req, res) => {
  const { limit, skip } = req.query;
  try{
    const options = parseQueryOptions({ limit, skip });
    console.log(options);
    const books = await Book.find({}).skip(options.skip).limit(options.limit); // no hay books
    console.log(books)
    if(books.length === 0) throw BOOK_NOT_FOUND_ERROR.getWithCustomMessage("No more books found");
    res.send(books);
  }
  catch(error) {
    if(error instanceof KnownError) {
      res.status(error.status).send(error);
    }
    else res.status(UNKNOWN_ERROR.status).send(UNKNOWN_ERROR);
  };

});


app.get("/api/authors", async (req, res) => {
  const { limit, skip } = req.query;
  try{
    const options = parseQueryOptions({ limit, skip });
    const authors = await Author.find({}).skip(options.skip).limit(options.limit);
    if(authors.length === 0) throw AUTHOR_NOT_FOUND_ERROR.getWithCustomMessage("No more authors found");
    res.send(authors);
  }
  catch(error) {
    if(error instanceof KnownError) {
      res.status(error.status).send(error);
    }
    else res.status(UNKNOWN_ERROR.status).send(UNKNOWN_ERROR);
  };

});

export default app;

