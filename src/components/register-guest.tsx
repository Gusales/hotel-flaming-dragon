import { FormEvent, useState } from "react";

import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";

import { toast } from 'sonner'

import { formatCurrency } from "@/utils/formatCurrency";

interface Guests {
  name: string
  age: number
  total: number
  type: 'meia' | 'gratuidade' | 'inteira'
}

export function RegisterGuest({ children }: { children: React.ReactNode }) {
  const [defaultPrice, setDefaultPrice] = useState<string | number>('')
  const [totalPrice, setTotalPrice] = useState(0)
  const [hidden, setHidden] = useState(true)
  const [guestName, setGuestName] = useState('')
  const [guestAge, setGuestAge] = useState<string | number>('')
  const [halfQntd, setHalfQntd] = useState(0)
  const [gratuity, setGratuity] = useState(0)
  const [guests, setGuests] = useState<Guests[] | []>([])
  
  function handleGetPrice(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setHidden(false)
  }

  function handleRegisterGuests(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const newTotalPrice = Number(guestAge) <= 6 ? 0 : Number(guestAge) >= 60 ? Number(defaultPrice) / 2 : Number(defaultPrice)
    setTotalPrice(state => state + newTotalPrice)

    setGuests(state => [...state, {
      age: Number(guestAge),
      name: guestName,
      total: newTotalPrice,
      type: Number(guestAge) <= 6 ? 'gratuidade' : Number(guestAge) >= 60 ? 'meia' : 'inteira'
    }])

    Number(guestAge) <= 6 ? setGratuity(state => state + 1) : Number(guestAge) >= 60 ? setHalfQntd(state => state + 1) : ''

    setGuestAge('')
    setGuestName('')
    console.log(guests)
  }

  function handleFinishRegister() {
    toast(`Cadastro de hóspedes e reserva no total de ${formatCurrency(Number(totalPrice))} finalizado com sucesso! ${gratuity} ${gratuity > 1 ? 'gratuidades' : 'gratuidade'} e ${halfQntd} ${halfQntd > 1 ? 'meias' : 'meia'}`)
    setTotalPrice(Number(defaultPrice))
    setHidden(state => !state)
    setDefaultPrice('')
  }

  function handleCancel() {
    setDefaultPrice('')
    setTotalPrice(0)
    setHidden(state => !state)
  }

  return(
    <Dialog>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar hóspedes</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleGetPrice} className={`space-y-4 ${!hidden ? 'hidden' : 'block'}`}>
              <Label htmlFor="price">Qual o valor padrão da diária?</Label>
              <Input 
                type="number" 
                placeholder="R$ 0.00" 
                id="price"
                value={defaultPrice}
                onChange={e => setDefaultPrice(Number(e.target.value))}
                required
              />

              <Button variant="default" type="submit">Confirmar</Button>
              </form>

              <form action="" onSubmit={handleRegisterGuests} className={`space-y-5 ${hidden ? 'hidden' : 'block'}`}>
                <p>Valor padrão da reserva: {formatCurrency(Number(defaultPrice))}</p>
                <div className="space-y-2">
                  <Label htmlFor="guest-name">Qual o nome da(o) hóspede?</Label>
                  <Input name="guest-name" id="guest-name" placeholder="Ex.: Rafael Sales" value={guestName} onChange={e => setGuestName(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guest-name">Qual a idade da(o) hóspede?</Label>
                  <Input type="number" name="guest-name" id="guest-name" value={guestAge} onChange={e => setGuestAge(Number(e.target.value))} placeholder="Ex.: 10" required />
                </div>

                <div className="space-y-0.5">
                  {guestName !== '' && (<p>{Number(guestAge) <= 6 && `${guestName} possui gratuidade`}</p>)}
                  <p>{Number(guestAge) >= 60 && `${guestName} paga meia ${formatCurrency((Number(defaultPrice) / 2))}`}</p>
                  <p>Preço total da reserva: <span className="font-bold">{formatCurrency(totalPrice)}</span></p>
                </div>

                <div className="space-x-2">
                  <Button variant="default" type="submit">Cadastrar</Button>
                  <Button variant="outline" type="button" onClick={handleFinishRegister}>Finalizar cadastro</Button>
                  <Button variant="destructive" type="button" onClick={handleCancel}> Cancelar </Button>
                </div>
              </form>

          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  
  )
}