import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { useSessionStorage } from "@/hooks/useSessionStorage";

export function VerifyGasPrice({ children }: { children: React.ReactNode }){
  const [alcoolWayne, setAlcoolWayne] = useState(0.00)
  const [gassWayne, setGasWayne] = useState(0.00)
  const [alcoolStark, setAlcoolStark] = useState(0.00)
  const [gasStark, setGasStark] = useState(0.00)
  const { sessionValue } = useSessionStorage('user', '')
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const totalGas = 42 * gassWayne < 42 * gasStark 
    ? { price: gassWayne, posto: 'Wayne Oil' }
    : { price: gasStark, posto: 'Stark Petrol' }

    const totalAlcool = 42 * alcoolWayne < 42 * alcoolStark
    ? { price: alcoolWayne, posto: 'Wayne Oil' }
    : { price: alcoolStark, posto: 'Stark Petrol' }

    const total = totalGas.price * 0.3 > totalAlcool.price
    ? { ...totalAlcool, type: 'álcool' }
    : { ...totalGas, type: 'gasolina' }

    toast(`${sessionValue}, é mais barato abastecer com ${total.type} no posto ${total.posto}`, {
      position: "top-center"
    })

    setAlcoolStark(0.00)
    setGasStark(0.00)
    setAlcoolWayne(0.00)
    setGasWayne(0.00)

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
              <form className="w-full h-full grid grid-cols-2 gap-4 mt-6 items-center" onSubmit={handleSubmit}>
                <Label>Qual o valor do álcool no posto Wayne Oil?</Label>
                <Input type="number" step={0.01} required placeholder="R$ 5,00" value={alcoolWayne} onChange={e => setAlcoolWayne(Number(e.target.value))} />
                <Label>Qual o valor da gasolina no posto Wayne Oil?</Label>
                <Input type="number" step={0.01} required placeholder="R$ 5,00" value={gassWayne} onChange={e => setGasWayne(Number(e.target.value))} />
                <Label>Qual o valor do álcool no posto Stark Petrol?</Label>
                <Input type="number" step={0.01} required placeholder="R$ 5,00" value={alcoolStark} onChange={e => setAlcoolStark(Number(e.target.value))} />
                <Label>Qual o valor da gasolina no posto Stark Petrol?</Label>
                <Input type="number" step={0.01} required placeholder="R$ 5,00" value={gasStark} onChange={e => setGasStark(Number(e.target.value))} />

                <div className="space-x-4 mb-4">
                  <Button type="submit">Calcular</Button>
                  <Button type="button" variant="destructive">Cancelar</Button>
                </div>
              </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}