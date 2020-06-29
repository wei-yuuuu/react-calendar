import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders today in header', () => {
  const { getByText } = render(<App />)
  const now = new Date().toISOString().slice(0, 10)
  expect(getByText(new RegExp(now, 'i'))).toBeInTheDocument()
})
