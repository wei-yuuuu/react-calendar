import React, { useRef } from 'react'

function Calendar() {
  const date = new Date()
  const dateForCount = new Date()

  const fullDates = useRef<number[]>([])

  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1)

  firstDate.setDate(firstDate.getDate() - firstDate.getDay())

  while (date.getMonth() === dateForCount.getMonth()) {
    fullDates.current.push(dateForCount.getDate())
    dateForCount.setDate(dateForCount.getDate() + 1)
  }

  return (
    <div className="flex items-center flex-col">
      <div className="bg-gray-200 w-64 text-center">
        <button className="w-10 hover:bg-blue-300 duration-100">{'<'}</button>
        <span>Calendar</span>
        <button className="w-10 hover:bg-blue-300 duration-100">{'>'}</button>
      </div>
      <div className="border w-64 h-64 flex flex-wrap justify-center">
        {fullDates.current.map((date, i) => (
          <span key={i} className="m-2 w-5">
            {date}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Calendar
