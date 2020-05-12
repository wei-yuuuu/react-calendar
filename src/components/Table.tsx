import React from 'react'
import Month from './Month'
import { useCalendar } from './Calendar'

function Table() {
  const { prevMonth, curMonth, nextMonth } = useCalendar()

  return (
    <div className="border w-64 h-64 flex flex-wrap justify-center duration-100">
      <Month dates={prevMonth} />
      <Month dates={curMonth} isCurrent={true} />
      <Month dates={nextMonth} />
    </div>
  )
}

export default Table
