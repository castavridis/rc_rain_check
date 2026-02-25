import type { UseFormRegister, FieldValues } from 'react-hook-form'
import { sono_bold } from '../fonts/sono'
import FieldsetContainer from './FieldsetContainer'
import FieldsetLegend from './FieldsetLegend'
import RadioDotted from './RadioDotted'

export default function FieldsetReason({
  register
}: {
  register: UseFormRegister<FieldValues>
}) {
  return (
    <FieldsetContainer className="bg-paper-yellow transform w-34 rotate-1">
      <fieldset>
        <FieldsetLegend
          className={"border-b-2 border-paper-yellow-mid px-4 py-3 text-sm " + sono_bold.className}
          title="Reason for Rain Check"
          type="title"
          required
        >
          <></>
        </FieldsetLegend>
        <RadioDotted className="border-paper-yellow-dark" fieldName="name" placeholder="Event Name" label="Health" register={register} />
        <RadioDotted className="border-paper-yellow-dark" fieldName="name" placeholder="Event Name" label="Work" register={register} />
        <RadioDotted className="border-paper-yellow-dark" fieldName="name" placeholder="Event Name" label="Family" register={register} />
        <RadioDotted className="border-paper-yellow-dark" fieldName="name" placeholder="Event Name" label="Conflict" register={register} />
        <RadioDotted className="border-paper-yellow-dark" fieldName="name" placeholder="Event Name" label="Travel" register={register} />
        <RadioDotted className="border-paper-yellow-dark" fieldName="name" placeholder="Event Name" label="Emergency" register={register} />
        <RadioDotted className="border-paper-yellow-dark" fieldName="name" placeholder="Event Name" label="Capacity" register={register} />
        <RadioDotted className="border-paper-yellow-dark" fieldName="name" placeholder="Event Name" label="Other" register={register} />
      </fieldset>
    </FieldsetContainer>
  )
}
