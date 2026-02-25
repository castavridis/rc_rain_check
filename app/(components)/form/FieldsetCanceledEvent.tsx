import type { UseFormRegister, FieldValues } from 'react-hook-form'
import FieldsetContainer from './FieldsetContainer'
import FieldsetLegend from './FieldsetLegend'
import InputDotted from './InputDotted'
import LocationInput from './LocationInput'

export default function FieldsetCanceledEvent ({
  register
}: {
  register: UseFormRegister<FieldValues>
}) {
  return (
    <FieldsetContainer className="bg-paper-blue w-[320px] transform -rotate-[0.25deg]">
      <fieldset>
        <FieldsetLegend
          className="border-b-2 border-paper-blue-mid"
          title="Canceled Event Information"
          type="title"
          required
        >
          <InputDotted className="border-paper-blue-dark" fieldName="name" placeholder="Event Name" label="Name(s)" register={register} />
          <InputDotted className="border-paper-blue-dark" fieldName="name" placeholder="Event Name" label="Description" register={register} />
          <InputDotted className="border-paper-blue-dark" fieldName="name" placeholder="Event Name" label="Date" type="date" register={register} />
          <InputDotted className="border-paper-blue-dark" fieldName="name" placeholder="Event Name" label="Time" type="time" register={register} />
          <LocationInput />
        </FieldsetLegend>
      </fieldset>
    </FieldsetContainer>
  )
}
