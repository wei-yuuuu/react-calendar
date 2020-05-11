import React, { useRef } from 'react'
import Month from './Month'

function Calendar() {
  const currentDate = useRef<Date>(new Date())
  const fullDates = useRef<number[][]>([[], [], []])

  const firstDate = new Date(
    currentDate.current.getFullYear(),
    currentDate.current.getMonth(),
    1
  )

  const date = new Date(
    currentDate.current.getFullYear(),
    currentDate.current.getMonth(),
    1
  )
  date.setDate(date.getDate() - date.getDay())

  // previous month
  while (date < firstDate) {
    fullDates.current[0].push(date.getDate())
    date.setDate(date.getDate() + 1)
  }

  // current month
  while (date.getMonth() === currentDate.current.getMonth()) {
    fullDates.current[1].push(date.getDate())
    date.setDate(date.getDate() + 1)
  }

  // next month
  while (date.getDay() > 0) {
    fullDates.current[2].push(date.getDate())
    date.setDate(date.getDate() + 1)
  }

  return (
    <div className="flex items-center flex-col mt-20">
      <div className="bg-gray-200 w-64 text-center">
        <button className="w-10 hover:bg-blue-300 duration-100">{'<'}</button>
        <span>{currentDate.current.toISOString().slice(0, 10)}</span>
        <button className="w-10 hover:bg-blue-300 duration-100">{'>'}</button>
      </div>
      <div className="border w-64 h-64 flex flex-wrap justify-center duration-100">
        <Month dates={fullDates.current[0]} />
        <Month dates={fullDates.current[1]} isCurrent={true} />
        <Month dates={fullDates.current[2]} />
      </div>
    </div>
  )
}

export default Calendar
