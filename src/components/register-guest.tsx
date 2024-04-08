import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

import { RegisterGuestForm } from "./register-guest-form";

export function RegisterGuest({ children }: { children: React.ReactNode }) {

  return(
    <Dialog>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar hóspedes</DialogTitle>
          <DialogDescription>
            <RegisterGuestForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}