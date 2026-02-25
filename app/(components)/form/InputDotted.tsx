import { HTMLInputTypeAttribute } from 'react'
import type { UseFormRegister, FieldValues } from 'react-hook-form'
import { sono } from '../fonts/sono'

export default function InputDotted ({
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
  let classes = "w-full border-b border-dashed px-4 py-3 text-sm flex justify-between " + sono.className
  if (className) {
    classes += " " + className
  }
  return (
    <label className={classes}>
      <span className="inline-block">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input className="ml-2 text-right text-paper-black" placeholder={placeholder} {...register(fieldName)} type={type} />
    </label>
  )
}
