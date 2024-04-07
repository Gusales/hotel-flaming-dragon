import { FormEvent, useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useNavigate } from "react-router-dom";


export function FormLogin() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [passwordIsWrong, setPasswordIsWrong] = useState(false)
  const { updateSessionStorage } = useSessionStorage<string>('user', '')
  const navigate = useNavigate()

  async function handleLogin(event: FormEvent<HTMLFormElement> ) {
    event.preventDefault();
    if (password !== '2678') {
      setPasswordIsWrong(true)
      setPassword('')
    }
    else{
      setPasswordIsWrong(false)
      updateSessionStorage(login)
      navigate('/home')
    }
  }
  return(
    <form className="p-4 rounded-lg bg-zinc-50 h-full w-[325px] space-y-5" onSubmit={handleLogin}>
      <h2 className="text-violet-800 font-bold text-2xl text-center">Login</h2>
      <div className="space-y-1">
        <Label htmlFor="user">Usuário</Label>
        <Input 
          type="text" 
          name="user" 
          id="user" 
          placeholder="Gabriel Azevedo" 
          value={login} 
          onChange={(e) => setLogin(e.target.value)}
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Senha</Label>
        <Input 
          type="password" 
          name="password" 
          id="password" 
          placeholder="******" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className={passwordIsWrong ? 'ring ring-red-600 focus:ring-red-600' : ''}
          required
        />
        <span className="font-bold text-red-600 text-lg block text-center mt-1">{passwordIsWrong && 'Senha Incorreta!'}</span>
      </div>
      <Button type="submit" className="w-full font-semibold text-lg">Entrar</Button>
    </form>
  )
}