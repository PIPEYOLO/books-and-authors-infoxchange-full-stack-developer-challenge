import { useParams } from "react-router-dom";
import Create_Edit_Book_Form from "../components/Create_Edit_Book_Fom";


export default function EditBookPage() {
  const { _id } = useParams();
  return (
    <div>
      <Create_Edit_Book_Form _id={_id as string} />
    </div>
  )
}