import { Bookings } from '@/@types/booking-type'
import { createContext, useState } from 'react'

const roomsNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

type BookingsContextProps = {
  bookings: Bookings[]
  setBookings: React.Dispatch<React.SetStateAction<Bookings[] | []>>
  avaliableRooms: number[]
  setAvaliableRooms: React.Dispatch<React.SetStateAction<number[] | []>>
}

export const BookingsContext = createContext({} as BookingsContextProps)

export function BookingsContextProvider({children}:{children: React.ReactNode}) {
  const [bookings, setBookings] = useState<Bookings[] | []>([])
  const [avaliableRooms, setAvaliableRooms] = useState<number[] | []>(roomsNumber)

  return (
    <BookingsContext.Provider value={{ bookings, setBookings, avaliableRooms, setAvaliableRooms }}>
      { children }
    </BookingsContext.Provider>
  )
}