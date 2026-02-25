import { HTMLInputTypeAttribute } from 'react'
import type { UseFormRegister, FieldValues } from 'react-hook-form'
import { sono } from '../fonts/sono'

export default function RadioDotted ({
  register,
  fieldName,
  placeholder,
  label,
  className,
  required = false,
  type = "text",
}: {
  register: UseFormRegister<FieldValues>
  fieldName: string
  label: string
  className?: string
  placeholder?: string
  required?: boolean
  type?: HTMLInputTypeAttribute
}) {
  let classes = "w-full border-b border-dashed px-4 py-3 text-sm flex items-center " + sono.className
  if (className) {
    classes += " " + className
  }
  return (
    <label className={classes}>
      <input className="mr-2 text-paper-black" placeholder={placeholder} {...register(fieldName)} type="radio" />
      <span className="inline-block">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
    </label>
  )
}
