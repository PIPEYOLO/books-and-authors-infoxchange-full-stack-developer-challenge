import { ChangeEventHandler } from "react";


export default function Input({ placeholder, value, onChange }: { placeholder?: string, value: any, onChange: ChangeEventHandler }) {
  return (
    <input 
      placeholder={ placeholder}
      value={value}
      onChange={onChange}
      className="h-10 w-full block outline-none border-2 p-3"
    />
  )
}