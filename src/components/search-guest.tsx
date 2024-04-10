import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

import { useGusts } from "@/hooks/useGuest";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


export function SearchGuest({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState('')
  const { guests } = useGusts()

  const isExistsUser = search.length > 0
  ? guests.filter(guest => guest.name.includes(search))
  : guests;

  return(
    <Dialog>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Procurar por hóspedes</DialogTitle>
          <DialogDescription className="space-y-6">
            <div className="space-y-2">
              <Label>Digite um nome: </Label>
              <Input placeholder="Ex.: Adriana Neves" value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            <h3 className="text-xl font-semibold text-zinc-800 tracking-tight">Hóspedes cadastrados</h3>

            <ol className="list-decimal ml-4 space-y-1">
              {
                isExistsUser.length > 0 
                ? (
                  isExistsUser.map((item, index) => {
                    return(
                      <li key={index}>
                        { item.name }
                      </li>
                    )
                  })
                )

                : (
                  <Alert>
                    <AlertTitle>Ops!</AlertTitle>
                    <AlertDescription>
                      Nenhum usuário foi encontrado!
                    </AlertDescription>
                  </Alert>
                )
              }
            </ol>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}