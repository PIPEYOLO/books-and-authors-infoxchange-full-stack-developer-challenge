
export default function ErrorMessage ({ message }: ErrorType) {
  return (
    <div className='text-white bg-red-600'>
      {message}
    </div>
  )
}
