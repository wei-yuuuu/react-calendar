import React from 'react'

type MonthProps = { dates: number[] & any; isCurrent?: boolean }

function Month({ dates, isCurrent }: MonthProps) {
  return dates.map((date: number, i: number) => (
    <span
      key={i}
      className={`m-2 w-5 cursor-pointer hover:bg-blue-100 text-center ${
        !isCurrent && `text-gray-500`
      } `}
    >
      {date}
    </span>
  ))
}

export default Month
