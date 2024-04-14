import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { formatCurrency } from "@/utils/formatCurrency";

interface RepairAirEnterprise {
  enterprise: string
  valueByDevice: number
  deviceQntd: number
  discountPercentage: number
  minDiscountDeviceQntd: number
  total: number
}


export function RepairAir({ children }: { children: React.ReactNode }) {
  const [enterprise, setEnterprise] = useState('')
  const [valueByDevice, setValueByDevice] = useState(0.00)
  const [deviceQntd, setDeviceQntd] = useState(0)
  const [discountPercentage, setDiscountPercentage] = useState(0)
  const [minDiscountDeviceQntd, setMinDiscountDeviceQntd] = useState(0)
  const [totalEnterprise, setTotalEnterprise] = useState<RepairAirEnterprise[] | []>([])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const total = minDiscountDeviceQntd > deviceQntd ? (deviceQntd * valueByDevice) : (deviceQntd * valueByDevice) - ((deviceQntd * valueByDevice) * (discountPercentage / 100))

    setTotalEnterprise(state => [...state, {
      enterprise,
      deviceQntd,
      discountPercentage,
      minDiscountDeviceQntd,
      valueByDevice,
      total
    }])

    toast(`O serviço da empresa ${enterprise} curstará ${formatCurrency(total)}`)

    setEnterprise('')
    setValueByDevice(0.00)
    setDiscountPercentage(0)
    setMinDiscountDeviceQntd(0)

  }

  function handleVerifyMinorPrice() {
    let minorPrice = totalEnterprise[0]

    totalEnterprise.forEach(item => {
      minorPrice = item.total < minorPrice.total ? item : minorPrice
    })

    toast('Menor orçamento', {
      description: `O orçamento de menor valor é o da empresa ${minorPrice.enterprise} por ${formatCurrency(minorPrice.total)}`,
      position: 'top-center'
    })
  }

  return(
    <Dialog>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manutenção de AR Condicionado</DialogTitle>
          <DialogDescription>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="enterprise">Qual o nome da empresa?</Label>
                  <Input required placeholder="Ex.: Empresa PROA" id="enterprise" value={enterprise} onChange={e => setEnterprise(e.target.value)} />
                </div>
                  <div className="grid grid-cols-2 space-y-2 items-center">
                    <Label htmlFor="valueByDevice">Qual o valor por aparelho?</Label>
                    <Input type="number" step={0.01} id="valueByDevice" required placeholder="Ex.: 0" value={valueByDevice} onChange={e => setValueByDevice(Number(e.target.value))} />
                    <Label htmlFor="qntd">Qual a quantidade de aparelhos?</Label>
                    <Input type="number" id="qntd" required placeholder="Ex.: 7" value={deviceQntd} onChange={e => setDeviceQntd(Number(e.target.value))} />
                    <Label htmlFor="percentage">Qual a porcentagem de desconto?</Label>
                    <Input type="number" id="percentage" required placeholder="Ex.: 12%" value={discountPercentage} onChange={e => setDiscountPercentage(Number(e.target.value))} />
                    <Label htmlFor="minPercentage">Qual o número mínimo de aparelhos para conseguir o desconto?</Label>
                    <Input type="number" id="minPercentage" required placeholder="Ex.: 3" value={minDiscountDeviceQntd} onChange={e => setMinDiscountDeviceQntd(Number(e.target.value))} />
                  </div>

                <div className="space-x-4 mb-4">
                  <Button type="submit">Adicionar</Button>
                  <Button type="button" variant="secondary" className="border border-zinc-400" onClick={handleVerifyMinorPrice}>Calcular</Button>
                  <Button type="button" variant="destructive">Cancelar</Button>
                </div>
              </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}