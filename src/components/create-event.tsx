import { FormEvent, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { AlertCircle } from "lucide-react";
import { WeekDays } from "./week-days";
import { formatCurrency } from "@/utils/formatCurrency";
import { toast } from "sonner";



export function CreateEvent({ children }:{children: React.ReactNode}) {
  const [partyGuestsNumber, setPartyGuestsNumber] = useState(0)
  const [duration, setDuration] = useState(1)
  const [time, setTime] = useState<string | number>()
  const [days, setDays] = useState('')
  const [enterprise, setEnterprise] = useState('')

  async function createEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast('Evento agendado com sucesso!',{
      description: `O evento ocorrerá ${days}, entre ${time}H às ${Number(time) + duration}H`
    })
    setPartyGuestsNumber(0)
    setDuration(1)
    setTime('')
    setDays('')
    setEnterprise('')
  }
  return(
    <Dialog>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vamos agendar um evento?</DialogTitle>
          <DialogDescription>
            <form className="space-y-4 mt-2" onSubmit={createEvent}>
              <div className="space-y-2">
                <Label htmlFor="party-guests-number">Qual o número de convidados para o seu evento?</Label>
                <Input id="party-guests-number" type="number" placeholder="Ex.: 100" value={partyGuestsNumber} onChange={e => setPartyGuestsNumber(Number(e.target.value))} />
                <div>
                {
                  partyGuestsNumber > 350
                  ? (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Ops!</AlertTitle>
                      <AlertDescription>
                      Quantidade de convidados superior à capacidade máxima.
                      </AlertDescription>
                    </Alert>
                  )
                  : partyGuestsNumber > 150 && partyGuestsNumber <= 220
                    ? (
                      <span className="block text-purple-600 font-semibold">Use o auditório Laranja (inclua mais {partyGuestsNumber - 150} cadeiras)</span>
                    )
                    : partyGuestsNumber > 0 && partyGuestsNumber <= 150
                      ? (
                        <span className="block text-purple-600 font-semibold">Use o auditório Laranja</span>
                      )
                      : partyGuestsNumber !== 0
                        ? (
                          <span className="block text-purple-600 font-semibold">Use o auditório Colorado</span>
                        )
                        : (
                          <></>
                        )
                }
              </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex gap-2 items-center">
                  <Label htmlFor="party-days">Selecione o dia:</Label>
                  <WeekDays id="party-days" onChange={e => setDays(e.target.value)} />
                </div>
                <p className="-mt-1">Auditório disponível das {days === 'dom' || days === 'sab' ? '7hs às 15hs' : '7hs às 23hs'}</p>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="time">Qual a hora do evento?</Label>
                <Input placeholder="Ex.: 12" value={time} onChange={e => setTime(Number(e.target.value) <= 23 ? Number(e.target.value) : 23)} max={23} id="time" className="w-fit" />
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="enterprise">Qual o nome da empresa?</Label>
                <Input placeholder="Ex.: Instituto PROA" value={enterprise} onChange={e => setEnterprise(e.target.value)} id="enterprise" className="w-fit" min={1} />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="duration">Qual a duração do evento em horas?</Label>
                  <Input placeholder="Ex.: 12" type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} id="duration" className="w-fit" min={1} />
                </div>
                <p>
                  {
                      (duration > 0) &&
                      ((days !== 'dom' && days !== 'sab') && (Number(time) + duration <= 23) || 
                      (days === 'dom' || days === 'sab') && (Number(time) + duration <= 15)) && (
                        <div className="space-y-3">
                          <p>{`Duração do evento: ${time}H às ${Number(time) + duration}H`}</p>
                          <p>{`São necessários ${Math.ceil((partyGuestsNumber / 12) + (duration / 2))} garçons`}</p>
                          <p className="mb-4">{`O evento precisará de ${Math.ceil(partyGuestsNumber * 0.2)} litros de café, ${Math.ceil(partyGuestsNumber * 0.5)} litros de água, ${Math.ceil(partyGuestsNumber * 7)} salgados`}</p>
                          <p>{`Custo dos garçons: ${formatCurrency((Math.ceil((partyGuestsNumber / 12) + (duration / 2))) * 10.50)}`}</p>
                          <p>{`Custo do buffet: ${formatCurrency((Math.ceil(partyGuestsNumber * 0.2) * 0.8) + (Math.ceil(partyGuestsNumber * 0.5) * 0.4) + ((Math.ceil(partyGuestsNumber * 7) / 100) * 34) )}`}</p>
                          <p className="font-bold">{`Valor total do evento: ${formatCurrency((Math.ceil(partyGuestsNumber * 0.2) * 0.8) + (Math.ceil(partyGuestsNumber * 0.5) * 0.4) + ((Math.ceil(partyGuestsNumber * 7) / 100) * 34) + (Math.ceil((partyGuestsNumber / 12) + (duration / 2))) * 10.50)}`}</p>
                        </div>
                    )
                  }
                </p>
              </div>

                {
                  ((Number(time) >= 0 && Number(time) < 7 || 
                  (days === ('dom' || 'sab')) && Number(time) > 15) || 
                  ((days === 'dom' || days === 'sab') && Number(time) + duration > 15) ||
                  (Number(time) + duration > 23)) 
                  && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Ops!</AlertTitle>
                      <AlertDescription>
                      Não é possível realizar o evento durante esse horário!
                      </AlertDescription>
                    </Alert>
                  )
                }
              <div className="space-x-2 mt-4 w-full flex justify-center">
                <Button 
                  variant="default" 
                  disabled={
                    partyGuestsNumber === 0 || 
                    partyGuestsNumber > 350 || 
                    Number(time) < 7 ||
                    ((days === 'dom' || days === 'sab') && Number(time) + duration > 15) ||
                    (Number(time) + duration > 23) ||
                    (duration <= 0)                   
                  }
                  type="submit"
                >
                  Continuar
                </Button>
                <Button variant="destructive" type="button" onClick={() => setPartyGuestsNumber(0)}>Cancelar</Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}