"use client"

import { HTMLInputTypeAttribute, useState } from 'react'
import { useForm, type UseFormRegister, type FieldValues } from 'react-hook-form'
import zod from 'zod'
import type { SearchBoxFeatureSuggestion, SearchBoxRetrieveResponse } from '@mapbox/search-js-core'
import { LocationData } from '../(lib)/rain-checks/typesII'
import { young } from './fonts/young'
import { sono, sono_bold } from './fonts/sono'
import dynamic from 'next/dynamic'
import playPaperSound from '../(lib)/utils/rustling-paper'
const SearchBox = dynamic(
  () => import('@mapbox/search-js-react').then(mod => mod.SearchBox),
  { ssr: false }
)

function DottedInput ({
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
function DottedRadio ({
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
  let classes = "w-full border-b border-dashed px-4 py-3 text-sm flex items-center " + sono.className
  if (className) {
    classes += " " + className
  }
  return (
    <label className={classes}>
      <input className="mr-2 text-paper-black" placeholder={placeholder} {...register(fieldName)} type="radio" />
      <span className="inline-block">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
    </label>
  )
}

function FieldsetLegend ({
  children,
  title,
  type = 'label',
  className,
  required = false,
}: {
  children: React.ReactNode
  title: string
  type: 'label' | 'title'
  className?: string,
  required?: boolean
}): React.ReactElement {
  switch (type) {
    case 'label':
      return (
        <label className={"text-sm " + sono_bold.className}>
          { title }{ required && <span className="text-red-500">*</span> }
          { children }
        </label>
      )
    case 'title':
      let classes = "px-4 py-3 text-paper-black"
      if (className) {
        classes = classes + " " + className
      }
      return (
        <label className={young.className}>
          <div className={classes}>
            { title }{ required && <span className="inline-block ml-1 text-red-500">*</span> }
          </div>
          { children }
        </label>
      )
  }
}

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

function FieldsetContainer ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}): React.ReactElement {
  let classes = "rounded-md drop-shadow-fieldset"

  if (className) {
    classes = classes + " " + className
  }
  return (
    <div 
      className={classes}
    >
      { children }
    </div>
  )
}
function FieldsetName ({
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
function FieldsetCanceledEvent ({
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
          <DottedInput className="border-paper-blue-dark" fieldName="name" placeholder="Event Name" label="Name(s)" register={register} />
          <DottedInput className="border-paper-blue-dark" fieldName="name" placeholder="Event Name" label="Description" register={register} />
          <DottedInput className="border-paper-blue-dark" fieldName="name" placeholder="Event Name" label="Date" type="date" register={register} />
          <DottedInput className="border-paper-blue-dark" fieldName="name" placeholder="Event Name" label="Time" type="time" register={register} />
          <LocationInput />
        </FieldsetLegend>
      </fieldset>
    </FieldsetContainer>
  )
}
function FieldsetAccent ({
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
function FieldsetMessage ({
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
function FieldsetNewEvent ({
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
          <DottedInput className="border-paper-purple-dark" fieldName="name" placeholder="Event Name" label="Name(s)" register={register} />
          <DottedInput className="border-paper-purple-dark" fieldName="name" placeholder="Event Name" label="Description" register={register} />
          <DottedInput className="border-paper-purple-dark" fieldName="name" placeholder="Event Name" label="Date" type="date" register={register} />
          <DottedInput className="border-paper-purple-dark" fieldName="name" placeholder="Event Name" label="Time" type="time" register={register} />
          <LocationInput />
        </FieldsetLegend>
      </fieldset>
    </FieldsetContainer>
  )
}
function FieldsetReason({
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
        <DottedRadio className="border-paper-yellow-dark" fieldName="name" placeholder="Event Name" label="Health" register={register} />
        <DottedRadio className="border-paper-yellow-dark" fieldName="name" placeholder="Event Name" label="Work" register={register} />
        <DottedRadio className="border-paper-yellow-dark" fieldName="name" placeholder="Event Name" label="Family" register={register} />
        <DottedRadio className="border-paper-yellow-dark" fieldName="name" placeholder="Event Name" label="Conflict" register={register} />
        <DottedRadio className="border-paper-yellow-dark" fieldName="name" placeholder="Event Name" label="Travel" register={register} />
        <DottedRadio className="border-paper-yellow-dark" fieldName="name" placeholder="Event Name" label="Emergency" register={register} />
        <DottedRadio className="border-paper-yellow-dark" fieldName="name" placeholder="Event Name" label="Capacity" register={register} />
        <DottedRadio className="border-paper-yellow-dark" fieldName="name" placeholder="Event Name" label="Other" register={register} />
      </fieldset>
    </FieldsetContainer>
  )
}

function LocationInput () {
  function handleRetrieve(res: SearchBoxRetrieveResponse) {
    const location = res.features[0]
    if (location && location.geometry.coordinates.length >= 2) {
      const locationData: LocationData = {
        address: location.properties.full_address,
        place_name: location.properties.name_preferred 
          || location.properties.name,
        longitude: location.geometry.coordinates[0],
        latitude: location.geometry.coordinates[1],
      }
    }
  }

  return (
    <div className={"px-4 py-3 text-sm " + sono.className}>
      <label>
        <span className="inline-block mb-1">Location</span>
        <SearchBox
          accessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY!}
          options={{
            language: 'en',
            country: 'US',
          }}
          onRetrieve={handleRetrieve}
        />
      </label>
    </div>
  )
}

function PaperworkProgress ({
  register
}: {
  register: UseFormRegister<FieldValues>
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
        <DottedRadio className="border-paper-blue-mid" fieldName="name" label="Name(s) of Recipient(s)" register={register} required />
        <DottedRadio className="border-paper-blue-mid" fieldName="name" label="Canceled Event Information" register={register} required />
        <DottedRadio className="border-paper-blue-mid" fieldName="name" label="Accent Color" register={register} />
        <DottedRadio className="border-paper-blue-mid" fieldName="name" label="Reason for Rain Check" register={register} required />
        <DottedRadio className="border-paper-blue-mid" fieldName="name" label="New Event Information" register={register} required />
        <DottedRadio className="border-paper-blue-mid" fieldName="name" label="Message" register={register} required />
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