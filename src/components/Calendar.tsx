import React, { useRef, useMemo, createContext, useContext } from 'react'
import Header from './Header'
import Table from './Table'

type ContextType = {
  prevMonth: number[]
  curMonth: number[]
  nextMonth: number[]
  currentDate: Date
}

const CalendarContext = createContext<ContextType>({
  prevMonth: [],
  curMonth: [],
  nextMonth: [],
  currentDate: new Date(),
})

export function useCalendar() {
  const context = useContext(CalendarContext)

  if (!context) {
    throw new Error('useCalendar must be used within [Calendar]')
  }

  return context
}

type CalendarProps = {
  children: JSX.Element[] | JSX.Element
}

function Calendar({ children }: CalendarProps) {
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

  const value = useMemo(() => {
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

    return {
      prevMonth: fullDates.current[0],
      curMonth: fullDates.current[1],
      nextMonth: fullDates.current[2],
      currentDate: currentDate.current,
    }
  }, [date, firstDate])

  return (
    <CalendarContext.Provider value={value}>
      <div className="flex items-center flex-col mt-20">{children}</div>
    </CalendarContext.Provider>
  )
}

Calendar.Header = Header
Calendar.Table = Table

export default Calendar
