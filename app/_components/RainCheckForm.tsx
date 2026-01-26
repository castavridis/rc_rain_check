'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { rainCheckFormSchema, type RainCheckFormData, type LocationData } from '../_lib/rain-checks/types'
import { SearchBox } from '@mapbox/search-js-react'

export default function RainCheckForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<RainCheckFormData>({
    resolver: zodResolver(rainCheckFormSchema),
    defaultValues: {
      title: '',
      proposed_datetime: null,
      location: null,
      category_id: null
    }
  })

  const handleLocationSelect = (result: { features: Array<{ properties: { full_address?: string; place_formatted?: string }; geometry: { coordinates: number[] } }> }) => {
    const feature = result.features[0]
    if (feature && feature.geometry.coordinates.length >= 2) {
      const locationData: LocationData = {
        address: feature.properties.full_address || feature.properties.place_formatted || '',
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        place_name: feature.properties.place_formatted
      }
      setSelectedLocation(locationData)
      setValue('location', locationData)
    }
  }

  const onSubmit = async (data: RainCheckFormData) => {
    setSubmitStatus('loading')
    setErrorMessage(null)

    try {
      const response = await fetch('/api/rain-checks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create rain check')
      }

      setSubmitStatus('success')
      setSelectedLocation(null)
      reset()
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-zinc-700">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="proposed_datetime" className="block text-sm font-medium text-zinc-700">
          Proposed Date & Time
        </label>
        <input
          id="proposed_datetime"
          type="datetime-local"
          {...register('proposed_datetime')}
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        {errors.proposed_datetime && (
          <p className="mt-1 text-sm text-red-500">{errors.proposed_datetime.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Location
        </label>
        <SearchBox
          accessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY!}
          options={{
            language: 'en',
            country: 'US'
          }}
          onRetrieve={handleLocationSelect}
        />
        {selectedLocation && (
          <p className="mt-1 text-sm text-zinc-500">{selectedLocation.address}</p>
        )}
        {errors.location && (
          <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category_id" className="block text-sm font-medium text-zinc-700">
          Category ID
        </label>
        <input
          id="category_id"
          type="number"
          {...register('category_id', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        {errors.category_id && (
          <p className="mt-1 text-sm text-red-500">{errors.category_id.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitStatus === 'loading'}
        className="w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-300"
      >
        {submitStatus === 'loading' ? 'Creating...' : 'Create Rain Check'}
      </button>

      {submitStatus === 'success' && (
        <p className="text-sm text-green-600">Rain check created successfully!</p>
      )}

      {submitStatus === 'error' && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}
    </form>
  )
}
