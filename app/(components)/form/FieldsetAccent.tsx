import type { UseFormRegister, FieldValues } from 'react-hook-form'
import { sono_bold } from '../fonts/sono'

export default function FieldsetAccent ({
  register
}: {
  register: UseFormRegister<FieldValues>
}) {
  return (
    <div className="bg-paper-white flex items-center rounded-md overflow-clip transform -rotate-[0.87deg] text-sm">
      <div className={"px-4 " + sono_bold.className }>Accent</div>
      <div className="w-12 h-12 bg-accent-blue"></div>
      <div className="w-12 h-12 bg-accent-red"></div>
      <div className="w-12 h-12 bg-accent-orange"></div>
      <div className="w-12 h-12 bg-accent-white"></div>
      <div className="w-12 h-12 bg-accent-green"></div>
    </div>
  )
}
