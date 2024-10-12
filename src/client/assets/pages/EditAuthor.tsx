import { useParams } from 'react-router-dom'
import Nav from '../components/Nav.js'
import Create_Edit_Author_Form from '../components/Create_Edit_Author_Form.js'

export default function EditAuthorPage () {
  const { _id } = useParams()
  return (
    <div className='h-full w-full'>
      <Nav />
      <h1>Edit Author</h1>
      <Create_Edit_Author_Form _id={_id as string} />
    </div>
  )
}
