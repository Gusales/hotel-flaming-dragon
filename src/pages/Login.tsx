import HotelLogo from '@/assets/images/purple-dragon.png'
import { FormLogin } from "@/components/form-login";

export function LoginPage() {
  return(
    <main className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col sm:flex-row gap-6">
        <section className="text-white text-center space-y-2 ">
          <img src={HotelLogo} alt="Logo do Hotel" width={250} className="m-auto" />
          <h1 className="font-bold text-2xl">Hotel Dragão Flamejante</h1>
          <p>Um local para nobres guerreiros descansarem</p>
        </section>
        <section>
          <FormLogin />
        </section>
      </div>
    </main>
  )
}