import { useForm } from 'react-hook-form'
import { sono } from '../fonts/sono'
import FieldsetContainer from './FieldsetContainer'
import FieldsetLegend from './FieldsetLegend'
import RadioDotted from './RadioDotted'

export default function PaperworkProgress ({
  register
}: {
  register: ReturnType<typeof useForm>['register']
}) {
  return (
    <FieldsetContainer className="bg-paper-white rounded-md fixed right-8 bottom-24 max-w-78">
      <fieldset>
        <FieldsetLegend
          className="border-b-2 border-b-paper-pink"
          title="Required Paperwork"
          type="title"
        >
          <></>
        </FieldsetLegend>
        {/* <p className={"text-paper-black border-b border-b-paper-blue-mid border-dashed text-sm p-4 " + sono.className}>Fill out some information to issue a rain check for your loved one(s).</p> */}
        <RadioDotted className="border-paper-blue-mid" fieldName="name" label="Name(s) of Recipient(s)" register={register} required />
        <RadioDotted className="border-paper-blue-mid" fieldName="name" label="Canceled Event Information" register={register} required />
        <RadioDotted className="border-paper-blue-mid" fieldName="name" label="Accent Color" register={register} />
        <RadioDotted className="border-paper-blue-mid" fieldName="name" label="Reason for Rain Check" register={register} required />
        <RadioDotted className="border-paper-blue-mid" fieldName="name" label="New Event Information" register={register} required />
        <RadioDotted className="border-paper-blue-mid" fieldName="name" label="Message" register={register} required />
      </fieldset>
      <div className={"text-sm text-center p-4 " + sono.className }>
        <div className="p-4 rounded-md border border-paper-black border-dashed">Issue Rain Check</div>
        {/* <div className={"p-4 rounded-md bg-paper-green " + sono_bold.className }>Issue Rain Check</div> */}
      </div>
    </FieldsetContainer>
  )
}
