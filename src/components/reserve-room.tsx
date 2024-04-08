import { ChangeEvent, FormEvent, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"


import { Label } from "./ui/label";
import { Input } from "./ui/input";

import { toast } from 'sonner'

import { formatCurrency } from "@/utils/formatCurrency";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { Button } from "./ui/button";
import { SelectRooms } from "./select";
import { useBookings } from "@/hooks/useBookings";
import { Bookings } from "@/@types/booking-type";

interface ReserveRoomProps {
  children: React.ReactNode;
}

export function ReserveRoom({ children }: ReserveRoomProps){
  const [price, setPrice] = useState<string | number>('')
  const [days, setDays] = useState(0)
  const [name, setName] = useState('')
  const [room, setRoom] = useState(0)

  const { sessionValue } = useSessionStorage('user', '')

  const { bookings, setBookings, avaliableRooms, setAvaliableRooms } = useBookings()

  function handleSelectRoom(e: ChangeEvent<HTMLSelectElement>) {
    setRoom(Number(e.target.value))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newBookings = bookings

    const booking: Bookings = {
      days,
      name,
      room,
      value: Number(price)
    }

    newBookings.push(booking)

    setBookings(newBookings)

    console.log(bookings)

    const newAvaliableRooms = avaliableRooms.filter(item => item !== room)
    setAvaliableRooms(newAvaliableRooms)

    setPrice('')
    setDays(0)
    setName('')

    toast(`Reserva para ${name} efetuada com sucesso!`)
  }

  return(
    <Dialog>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reservar um quarto</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="price">Qual o valor padrão da diária?</Label>
                <Input 
                  type="number" 
                  placeholder="R$ 0.00" 
                  id="price"
                  value={price}
                  onChange={e => setPrice(e.target.value)} 
                />
              </div>

              <div>
                <Label htmlFor="days">Quantas diárias serão necessárias?</Label>
                <Input 
                  type="number" 
                  placeholder="3" 
                  id="days" 
                  min={1} 
                  value={days}
                  onChange={e => setDays(parseInt(e.target.value))}  
                />
              </div>


              <div>
                <Label htmlFor="name">Qual o nome do hóspede?</Label>
                <Input 
                  id="name"
                  placeholder="Gabriel Azevedo"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Label htmlFor="rooms" className="text-base">Escolha um quarto</Label>
                <SelectRooms onChange={handleSelectRoom} id="rooms" />
              </div>


              {!(isNaN(Number(price)) || isNaN(days)) && (<p className="text-center text-[18px]">O valor de {days} {days < 2 ? 'dia' : 'dias'} de hospedagem é de {formatCurrency(Number(price) * days)}</p>)}

              { name !== '' && (
                <div className="transition-all space-y-4">
                  <p className="text-center text-base">{sessionValue}, deseja confirmar a hospedagem para {name}?</p>
                  <div className="flex gap-2">
                    <Button type="submit" variant="default">Sim</Button> 
                    <Button type="button" variant="secondary">Não</Button> 
                  </div>
                </div>
              )} 

            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}