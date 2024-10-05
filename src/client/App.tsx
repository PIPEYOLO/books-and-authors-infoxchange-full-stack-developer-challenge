import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./__output.css";
import BooksPage from "./assets/pages/Books";
import BookPage from "./assets/pages/Book";

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<BooksPage />} />
      <Route path="/book/:_id" element={<BookPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
