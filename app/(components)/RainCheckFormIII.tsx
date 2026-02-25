"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import FieldsetName from './form/FieldsetName'
import FieldsetCanceledEvent from './form/FieldsetCanceledEvent'
import FieldsetAccent from './form/FieldsetAccent'
import FieldsetMessage from './form/FieldsetMessage'
import FieldsetNewEvent from './form/FieldsetNewEvent'
import FieldsetReason from './form/FieldsetReason'
import PaperworkProgress from './form/PaperworkProgress'


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
