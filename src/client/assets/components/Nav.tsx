import { useCallback } from "react";
import { Button } from "./Buttons";
import { useNavigate } from "react-router-dom";
import { IoMdContact } from "react-icons/io";
import { FaBook, FaPlus } from "react-icons/fa";


export default function Nav() {
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 left-0 w-full h-[70px] flex items-center justify-end gap-3 md:gap-5 p-3 shadow-lg">

      <Button
        className="relative h-full aspect-square p-2 bg-blue-600"
        onClick={useCallback(() => navigate("/create-book"), [])}
      >
        <FaBook />
        <FaPlus className="absolute top-3/4 left-3/4 block h-1/4 w-1/4" fill="#000"/>

      </Button>
    
      <Button
        className="relative h-full aspect-square p-1 bg-blue-600"
        onClick={useCallback(() => navigate("/create-book"), [])}
        >
          <IoMdContact />
          <FaPlus className="absolute top-3/4 left-3/4 block h-1/4 w-1/4" fill="#000"/>
        </Button>
    </nav>
  )
}