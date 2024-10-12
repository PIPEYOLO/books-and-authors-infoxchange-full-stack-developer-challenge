import Create_Edit_Book_Form from '../components/Create_Edit_Book_Form'
import Nav from '../components/Nav'

export default function CreateBookPage () {
  return (
    <div className='h-full w-full'>
      <Nav />
      <h1>Create Book</h1>
      <Create_Edit_Book_Form />
    </div>
  )
}
