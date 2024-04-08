import { useContext } from 'react'
import { GuestsContext } from '@/contexts/GuestsContext' 

export function useGusts(){
  return useContext(GuestsContext)
}