import React from 'react'
import { useCalendar } from './Calendar'

function Header() {
  const { currentDate } = useCalendar()

  return (
    <div className="bg-gray-200 w-64 text-center">
      <button className="w-10 hover:bg-blue-300 duration-100">{'<'}</button>
      <span>{currentDate.toISOString().slice(0, 10)}</span>
      <button className="w-10 hover:bg-blue-300 duration-100">{'>'}</button>
    </div>
  )
}

export default Header
