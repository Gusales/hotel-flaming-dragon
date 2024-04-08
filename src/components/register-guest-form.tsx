import { FormEvent, useState } from "react";

import { Input } from "./ui/input";

import { toast } from 'sonner'

import { formatCurrency } from "@/utils/formatCurrency";
import { useGusts } from "@/hooks/useGuest";

import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

export function RegisterGuestForm() {
  const [defaultPrice, setDefaultPrice] = useState<string | number>('')
  const [totalPrice, setTotalPrice] = useState(0)
  const [hidden, setHidden] = useState(true)
  const [guestName, setGuestName] = useState('')
  const [guestAge, setGuestAge] = useState<string | number>('')
  const [halfQntd, setHalfQntd] = useState(0)
  const [gratuity, setGratuity] = useState(0)

  const { setGuests, slots, setSlots } = useGusts()
  
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

    setSlots(state => state - 1)

    Number(guestAge) <= 6 ? setGratuity(state => state + 1) : Number(guestAge) >= 60 ? setHalfQntd(state => state + 1) : ''

    setGuestAge('')
    setGuestName('')
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
    <>
      {
        slots === 0
        ? (
          (
            <>
              <div className={`space-y-4 ${hidden ? 'hidden' : 'block'}`}>
                <h2>Limite de hóspedes atingido!</h2>
                <p>Deseja finalizar o cadastro dos hóspedes?</p>
                <Button variant="outline" type="button" onClick={handleFinishRegister}>Finalizar cadastro</Button>
                <Button variant="destructive" type="button" onClick={handleCancel} className="ml-4"> Cancelar </Button>
              </div>

              <div className={!hidden ? 'hidden' : 'block'}>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Limite de hóspedes atingido!</AlertTitle>
                  <AlertDescription>
                    No momento, estamos sem vagas :/
                  </AlertDescription>
                </Alert>
              </div>
            </>
          )
        )
        : (
          <>
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
          </>
        )
      }
    </>
  )
}