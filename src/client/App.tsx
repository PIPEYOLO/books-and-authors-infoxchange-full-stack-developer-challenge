import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./__output.css";
import BooksPage from "./assets/pages/Books";
import BookPage from "./assets/pages/Book";
import AuthorPage from "./assets/pages/Author";
import CreateBookPage from "./assets/pages/CreateBook";
import CreateAuthorPage from "./assets/pages/CreateAuthor";
import EditBookPage from "./assets/pages/EditBook";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/book/:_id" element={<BookPage />} />
        <Route path="/author/:_id" element={<AuthorPage />} />
        <Route path="/create-book" element={<CreateBookPage />} />
        <Route path="/edit-book/:_id" element={<EditBookPage />} />
        <Route path="/create-author" element={<CreateAuthorPage />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
