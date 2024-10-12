import { useParams } from 'react-router-dom'
import Create_Edit_Book_Form from '../components/Create_Edit_Book_Form'
import Nav from '../components/Nav'

export default function EditBookPage () {
  const { _id } = useParams()
  return (
    <div className='h-full w-full'>
      <Nav />
      <h1>Edit Book</h1>
      <Create_Edit_Book_Form _id={_id as string} />
    </div>
  )
}
