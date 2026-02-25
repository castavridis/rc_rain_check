import type { UseFormRegister, FieldValues } from 'react-hook-form'
import FieldsetContainer from './FieldsetContainer'
import FieldsetLegend from './FieldsetLegend'
import InputDotted from './InputDotted'
import LocationInput from './LocationInput'

export default function FieldsetNewEvent ({
  register
}: {
  register: UseFormRegister<FieldValues>
}) {
  return (
    <FieldsetContainer className="bg-paper-purple w-[320px] transform -rotate-[0.125deg]">
      <fieldset>
        <FieldsetLegend
          className="border-b-2 border-paper-purple-mid"
          title="New Event Information"
          type="title"
          required
        >
          <InputDotted className="border-paper-purple-dark" fieldName="name" placeholder="Event Name" label="Name(s)" register={register} />
          <InputDotted className="border-paper-purple-dark" fieldName="name" placeholder="Event Name" label="Description" register={register} />
          <InputDotted className="border-paper-purple-dark" fieldName="name" placeholder="Event Name" label="Date" type="date" register={register} />
          <InputDotted className="border-paper-purple-dark" fieldName="name" placeholder="Event Name" label="Time" type="time" register={register} />
          <LocationInput />
        </FieldsetLegend>
      </fieldset>
    </FieldsetContainer>
  )
}
