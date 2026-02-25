import type { UseFormRegister, FieldValues } from 'react-hook-form'
import { young } from '../fonts/young'
import FieldsetContainer from './FieldsetContainer'
import FieldsetLegend from './FieldsetLegend'

export default function FieldsetName ({
  register
}: {
  register: UseFormRegister<FieldValues>
}): React.ReactElement {
  // getFieldState to check invalid/error of fieldstates
  // setCurrentFieldset pulled from parent component
  return (
    <FieldsetContainer className="bg-paper-pink w-[320px] px-4 py-3 transform rotate-[0.5deg]">
      <fieldset>
        <FieldsetLegend
          className="border-b-2"
          title="Name(s) of Recipient(s)"
          type="label"
          required
        >
          <input className={young.className + " mt-2 text-2xl text-paper-pink-mid"} type="text" placeholder="Name(s)" {...register("name")} />
        </FieldsetLegend>
      </fieldset>
    </FieldsetContainer>
  )
}
