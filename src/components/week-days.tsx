import { ComponentProps } from "react"

type WeekDaysProps = ComponentProps<'select'>


export function WeekDays(props: WeekDaysProps) {
  return(
    <select 
      {...props}
      className="flex h-10 w-fit items-center justify-between rounded-md border border-input bg-background cursor-pointer px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
    >
      <option value="" className="disabled:hidden" disabled selected>dia</option>
      <option value="dom">Domingo</option>
      <option value="seg">Segunda</option>
      <option value="ter">Terça</option>
      <option value="qua">Quarta</option>
      <option value="qui">Quinta</option>
      <option value="sex">Sexta</option>
      <option value="sab">Sábado</option>

    </select>
  )
}