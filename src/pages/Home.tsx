import { ReserveRoom } from "@/components/reserve-room"
import { Button } from "@/components/ui/button"
import { useSessionStorage } from "@/hooks/useSessionStorage"

import { Toaster } from "@/components/ui/sonner"
import { BookingsContextProvider } from "@/contexts/BookingsContext"
import { RegisterGuest } from "@/components/register-guest"
import { GuestsContextProvider } from "@/contexts/GuestsContext"
import { SearchGuest } from "@/components/search-guest"
import { CreateEvent } from "@/components/create-event"
import { VerifyGasPrice } from "@/components/verify-gas-price"
import { RepairAir } from "@/components/repair-air"

export function HomePage() {
  const { sessionValue } = useSessionStorage('user', '')
  return(
    <BookingsContextProvider>
    <GuestsContextProvider>
      <div className="w-screen h-screen">
        <section className="pt-16 pl-4 flex flex-col items-center">
          <h2 className="text-2xl text-zinc-50 font-semibold w-[90%] sm:w-1/2 tracking-tight text-center">Bem vindo ao hotel Flaming Dragon, {sessionValue}! É um prazer imenso ter você por aqui!</h2>

          <p className="text-xl text-zinc-200 my-4">Escolha uma opção:</p>

          <section className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
            <ReserveRoom>
              <Button variant="secondary">Reservar quarto</Button>
            </ReserveRoom>

            <SearchGuest>
              <Button variant="secondary">Procurar hóspedes</Button>
            </SearchGuest>


            <RegisterGuest>
              <Button variant="secondary">Cadastrar hóspede</Button>
            </RegisterGuest>

            <CreateEvent>
              <Button variant="secondary">Agendar evento</Button>
            </CreateEvent>

            <VerifyGasPrice>
              <Button variant="secondary">Verificar preço do álcool e gasolina</Button>
            </VerifyGasPrice>

            <RepairAir>
              <Button variant="secondary">Reparar ar condicionado</Button>
            </RepairAir>
          </section>

          <Toaster />
        </section>
      </div>
    </GuestsContextProvider>
    </BookingsContextProvider>
  )
}