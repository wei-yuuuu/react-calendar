import React from 'react'
import { useCalendar } from './Calendar'

type MonthProps = { dates: number[] & any; isCurrent?: boolean }

function Month({ dates, isCurrent }: MonthProps) {
  const { currentDate } = useCalendar()
  const isToday = (date: number) => isCurrent && date === currentDate.getDate()

  return dates.map((date: number, i: number) => (
    <span
      key={i}
      className={`m-2 w-5 h-6 text-center ${
        !isCurrent && `text-gray-500 cursor-not-allowed`
      } ${isToday(date) && `bg-red-200`} ${
        isCurrent && `cursor-pointer hover:bg-blue-100`
      }
       `}
    >
      {date}
    </span>
  ))
}

export default Month
