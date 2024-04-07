import { useContext } from 'react'
import { BookingsContext } from '@/contexts/BookingsContext'

export function useBookings() {
  return useContext(BookingsContext)
}