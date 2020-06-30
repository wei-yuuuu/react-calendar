import React from 'react'
import Calendar from './components/Calendar'

function App() {
  return (
    <Calendar>
      <h1>Test</h1>
      <Calendar.Header />
      <Calendar.Table />
    </Calendar>
  )
}

export default App
