import React, {
  useRef,
  createContext,
  useContext,
  useCallback,
  useReducer,
  useEffect,
} from 'react'
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

type DispatchType = {
  next: () => void
  prev: () => void
}

const DispatchContext = createContext<DispatchType>({
  next: () => console.error(`next() must be used within [Calendar]`),
  prev: () => console.error(`prev() must be used within [Calendar]`),
})

export function useCalendar() {
  const context = useContext(CalendarContext)

  if (!context) {
    throw new Error('useCalendar must be used within [Calendar]')
  }

  return context
}

export function useDispatch() {
  const context = useContext(DispatchContext)

  if (!context) {
    throw new Error('useDispatch must be used within [Calendar]')
  }

  return context
}

type CalendarProps = {
  children: JSX.Element[] | JSX.Element
}

function Calendar({ children }: CalendarProps) {
  const currentDate = useRef<Date>(new Date())
  const fullDates = useRef<number[][]>([[], [], []])

  const forceUpdate = useReducer((s) => s + 1, 0)[1]

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

  const calFullDates = useCallback(() => {
    fullDates.current = [[], [], []]
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
  }, [date, firstDate])

  calFullDates()

  useEffect(() => {
    calFullDates()
  }, [calFullDates])

  const action = useCallback(
    (n) => {
      // rendered.current = false
      currentDate.current.setMonth(currentDate.current.getMonth() + n)
      forceUpdate()
    },
    [forceUpdate]
  )

  const value = {
    prevMonth: fullDates.current[0],
    curMonth: fullDates.current[1],
    nextMonth: fullDates.current[2],
    currentDate: currentDate.current,
  }

  const dispatch = {
    next: () => action(+1),
    prev: () => action(-1),
  }

  return (
    <CalendarContext.Provider value={value}>
      <DispatchContext.Provider value={dispatch}>
        <div className="flex items-center flex-col mt-20">{children}</div>
      </DispatchContext.Provider>
    </CalendarContext.Provider>
  )
}

Calendar.Header = Header
Calendar.Table = Table

export default Calendar
