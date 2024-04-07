import { useBookings } from "@/hooks/useBookings"
import { ComponentProps, useEffect } from "react"

type SelectRoomsProps = ComponentProps<'select'>

export function SelectRooms(props: SelectRoomsProps) {
  const { avaliableRooms } = useBookings()

  useEffect(() => {}, [avaliableRooms])

  return(
    <select 
      {...props}
      className="flex h-10 w-fit items-center justify-between rounded-md border border-input bg-background cursor-pointer px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
    >
      {
        avaliableRooms.map(item => (
          <option 
            value={item}
            key={item}
          >
              {`Quarto ${item}`}
          </option>
        ))
      }
    </select>
  )
}