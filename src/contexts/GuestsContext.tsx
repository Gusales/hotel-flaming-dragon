import { createContext, useState } from "react"

export interface Guests {
  name: string
  age: number
  total: number
  type: 'meia' | 'gratuidade' | 'inteira'
}

interface GuestsContextProps {
  guests: Guests[]
  setGuests: React.Dispatch<React.SetStateAction<Guests[] | []>>
  slots: number
  setSlots: React.Dispatch<React.SetStateAction<number>>
}

export const GuestsContext = createContext({} as GuestsContextProps)

export function GuestsContextProvider({ children }: { children: React.ReactNode }) {
  const [guests, setGuests] = useState<Guests[] | []>([])
  const [slots, setSlots] = useState(15)

  return(
    <GuestsContext.Provider value={{ guests, setGuests, slots, setSlots }}>
      { children }
    </GuestsContext.Provider>
  )
}