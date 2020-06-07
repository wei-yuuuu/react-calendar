import React from 'react'
import { useCalendar, useDispatch } from './Calendar'

function Header() {
  const { currentDate } = useCalendar()
  const { next, prev } = useDispatch()

  return (
    <div className="bg-gray-200 w-64 text-center">
      <button className="w-10 hover:bg-blue-300 duration-100" onClick={prev}>
        {'<'}
      </button>
      <span>{currentDate.toISOString().slice(0, 10)}</span>
      <button className="w-10 hover:bg-blue-300 duration-100" onClick={next}>
        {'>'}
      </button>
    </div>
  )
}

export default Header
