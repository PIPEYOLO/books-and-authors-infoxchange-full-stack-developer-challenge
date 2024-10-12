import { ReactElement, useCallback } from 'react'
import { RiHealthBookFill } from 'react-icons/ri'
import { Button } from './Buttons'
import { useNavigate } from 'react-router-dom'
import { IoMdContact } from 'react-icons/io'
import { FaPlus } from 'react-icons/fa'

export default function Layout ({ children }: { children: ReactElement }) {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col'>
      <nav className='sticky top-0 left-0 w-full h-16 flex items-center justify-end gap-3 md:gap-5 p-3 shadow-lg'>

        <div className='h-full aspect-square'>
          <Button
            onClick={useCallback(() => navigate('/create-book'), [])}
          >
            <RiHealthBookFill />
          </Button>
        </div>

        <div className='relative h-full aspect-square'>
          <Button
            onClick={useCallback(() => navigate('/create-book'), [])}
          >
            <IoMdContact />
            <FaPlus className='absolute h-1/6 aspect-square top-full' />
          </Button>
        </div>
      </nav>
      {children}
    </div>
  )
}
