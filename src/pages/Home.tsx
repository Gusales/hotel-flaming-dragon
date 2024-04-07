import { ReserveRoom } from "@/components/reserve-room"
import { Button } from "@/components/ui/button"
import { useSessionStorage } from "@/hooks/useSessionStorage"

import { Toaster } from "@/components/ui/sonner"
import { BookingsContextProvider } from "@/contexts/BookingsContext"

export function HomePage() {
  const { sessionValue } = useSessionStorage('user', '')
  return(
    <BookingsContextProvider>
      <div className="w-screen h-screen">
        <section className="pt-2 pl-4">
          <h2 className="text-2xl text-zinc-50 font-semibold w-1/2 tracking-tight">Bem vindo ao hotel Flaming Dragon, {sessionValue}! É um prazer imenso ter você por aqui!</h2>

          <p className="text-xl text-zinc-200 my-4">Escolha uma opção:</p>

          <ReserveRoom>
            <Button variant="secondary">Reservar quarto</Button>
          </ReserveRoom>

          <Toaster />
        </section>
      </div>
    </BookingsContextProvider>
  )
}