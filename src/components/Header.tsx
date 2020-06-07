import React from 'react'
import { useCalendar, useDispatch } from './Calendar'

function Header() {
  const { currentDate } = useCalendar()
  const { next, prev } = useDispatch()

  return (
    <>
      <div className="bg-gray-300 w-64 text-center">
        <button
          className="w-10 hover:bg-blue-300 duration-100 mr-6"
          onClick={prev}
        >
          {'<'}
        </button>
        <span>{currentDate.toISOString().slice(0, 10)}</span>
        <button
          className="w-10 hover:bg-blue-300 duration-100 ml-6"
          onClick={next}
        >
          {'>'}
        </button>
      </div>
      <ul className="bg-gray-200 w-64 flex flex-no-wrap justify-around">
        <li>S</li>
        <li>M</li>
        <li>T</li>
        <li>W</li>
        <li>T</li>
        <li>F</li>
        <li>S</li>
      </ul>
    </>
  )
}

export default Header
