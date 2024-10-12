import Create_Edit_Author_Form from '../components/Create_Edit_Author_Form'
import Nav from '../components/Nav'

export default function CreateAuthorPage () {
  return (
    <div className='h-full w-full'>
      <Nav />
      <h1>Create Author</h1>
      <Create_Edit_Author_Form />
    </div>
  )
}
