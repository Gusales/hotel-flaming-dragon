import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { AlertCircle } from "lucide-react";
import { WeekDays } from "./week-days";



export function CreateEvent({ children }:{children: React.ReactNode}) {
  const [partyGuestsNumber, setPartyGuestsNumber] = useState(0)
  const [time, setTime] = useState<string | number>()
  const [days, setDays] = useState('')
  return(
    <Dialog>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vamos agendar um evento?</DialogTitle>
          <DialogDescription>
            <form className="space-y-4 mt-2">
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
                <Input placeholder="Ex.: 12" value={time} onChange={e => setTime(Number(e.target.value))} id="time" className="w-fit" />
              </div>
                {
                  (Number(time) >= 0 && Number(time) < 7 || (days === ('dom' || 'sab')) && Number(time) > 15) && (
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
                <Button variant="default" disabled={partyGuestsNumber === 0 || partyGuestsNumber > 350 || Number(time) >= 0 && Number(time) < 7 || days === ('dom' || 'sab') && Number(time) > 15} type="submit">Continuar</Button>
                <Button variant="destructive" type="button" onClick={() => setPartyGuestsNumber(0)}>Cancelar</Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}