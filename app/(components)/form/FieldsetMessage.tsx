import type { UseFormRegister, FieldValues } from 'react-hook-form'
import { sono } from '../fonts/sono'
import FieldsetContainer from './FieldsetContainer'
import FieldsetLegend from './FieldsetLegend'

export default function FieldsetMessage ({
  register
}: {
  register: UseFormRegister<FieldValues>
}) {
  return (
    <FieldsetContainer className="bg-paper-green px-4 py-3 w-80 h-80 transform -rotate-[0.25deg]">
      <fieldset>
        <FieldsetLegend
          className="w-full pb-4"
          title="Message"
          type="label"
          required
        >
          <textarea className={"mt-2 text-paper-green-mid w-full h-65 " + sono.className} placeholder="Write a meaningful message to your loved one(s)." {...register("message")} />
        </FieldsetLegend>
      </fieldset>
    </FieldsetContainer>
  )
}
