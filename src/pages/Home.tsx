import { ReserveRoom } from "@/components/reserve-room"
import { Button } from "@/components/ui/button"
import { useSessionStorage } from "@/hooks/useSessionStorage"

import { Toaster } from "@/components/ui/sonner"
import { BookingsContextProvider } from "@/contexts/BookingsContext"
import { RegisterGuest } from "@/components/register-guest"
import { GuestsContextProvider } from "@/contexts/GuestsContext"

export function HomePage() {
  const { sessionValue } = useSessionStorage('user', '')
  return(
    <BookingsContextProvider>
    <GuestsContextProvider>
      <div className="w-screen h-screen">
        <section className="pt-2 pl-4">
          <h2 className="text-2xl text-zinc-50 font-semibold w-1/2 tracking-tight">Bem vindo ao hotel Flaming Dragon, {sessionValue}! É um prazer imenso ter você por aqui!</h2>

          <p className="text-xl text-zinc-200 my-4">Escolha uma opção:</p>

          <section className="flex flex-col gap-4 w-fit">
            <ReserveRoom>
              <Button variant="secondary">Reservar quarto</Button>
            </ReserveRoom>

            <RegisterGuest>
              <Button variant="secondary">Cadastrar hóspede</Button>
            </RegisterGuest>
          </section>

          <Toaster />
        </section>
      </div>
    </GuestsContextProvider>
    </BookingsContextProvider>
  )
}