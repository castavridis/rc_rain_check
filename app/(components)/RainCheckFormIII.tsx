"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { sono } from './fonts/sono'
import playPaperSound from '../(lib)/utils/rustling-paper'
import FieldsetContainer from './form/FieldsetContainer'
import FieldsetLegend from './form/FieldsetLegend'
import RadioDotted from './form/RadioDotted'
import FieldsetName from './form/FieldsetName'
import FieldsetCanceledEvent from './form/FieldsetCanceledEvent'
import FieldsetAccent from './form/FieldsetAccent'
import FieldsetMessage from './form/FieldsetMessage'
import FieldsetNewEvent from './form/FieldsetNewEvent'
import FieldsetReason from './form/FieldsetReason'

function PaperSound ({
  children,
}: {
  children: React.ReactElement
}) {
  return (
    <div
      className="border-2 border-accent-red"
      onMouseEnter={() => playPaperSound('pickup') }
      onMouseLeave={() => playPaperSound('tap') }
    >
      { children }
    </div>
  )
}

function PaperworkProgress ({
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


export default function RainCheckFormIII (): React.ReactElement {
    const [isComplete, setIsComplete] = useState(false)
    // Each fieldset has their own ID
    const [currentFieldset, setCurrentFieldset] = useState(0)
    const {
      // control,
      register,
      handleSubmit,
    } = useForm()

    function submitHandler () {}
  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex gap-8">
          <div className="flex flex-col justify-center gap-8">
            <FieldsetName register={register} />
            <FieldsetCanceledEvent register={register} />
            <FieldsetAccent register={register} />
          </div>
          <div className="flex flex-col justify-center gap-8">
            <FieldsetReason register={register} />
          </div>
          <div className="flex flex-col justify-center gap-8">
            <FieldsetNewEvent register={register} />
            <FieldsetMessage register={register} />
          </div>
        </div>
        <PaperworkProgress register={register} />
        {/* <div className="rounded-sm bg-amber-50">
          {
            isComplete
              ? <button type="submit">Issue Rain Check</button>
              : <button type="button">Next</button>
          }
        </div> */}
      </form>
      {/* <img src="/assets/img/form.png" /> */}
      </div>
  )
}
