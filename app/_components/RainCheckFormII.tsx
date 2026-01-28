'use client'

import dynamic from 'next/dynamic'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RainCheckFormData, RainCheckFormSchema } from '../_lib/rain-checks/typesII'
import type { SearchBoxFeatureSuggestion, SearchBoxRetrieveResponse } from '@mapbox/search-js-core'
import { LocationData } from '../_lib/rain-checks/typesII'

const SearchBox = dynamic(
  () => import('@mapbox/search-js-react').then(mod => mod.SearchBox),
  { ssr: false }
)

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'
export default function RainCheckForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null)
  const [rawLocation, setRawLocation] = useState<SearchBoxFeatureSuggestion>()
  const [mapImgSrc, setMapImgSrc] = useState("")
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors }
  } = useForm<RainCheckFormData>({
    resolver: zodResolver(RainCheckFormSchema),
    defaultValues: {}
  })

  const handleRetrieve = (res: SearchBoxRetrieveResponse) => {
    const location = res.features[0]
    if (location && location.geometry.coordinates.length >= 2) {
      const locationData: LocationData = {
        address: location.properties.full_address,
        place_name: location.properties.name_preferred 
          || location.properties.name,
        longitude: location.geometry.coordinates[0],
        latitude: location.geometry.coordinates[1],
      }
      setSelectedLocation(locationData)
      setRawLocation(location)
      // setValue('location', locationData)
    }
  }

  /**-119.0141,35.2937,15,0/300x200@2x?attribution=false&logo=false& */

  const map_image = async () => {
    if (selectedLocation) {
      let base_url = "https://api.mapbox.com/styles/v1/castavridis/cmkya624n006p01qr4dsbb5iq/static"
      base_url += `/${selectedLocation.longitude}`
      base_url += `,${selectedLocation.latitude},15,0`
      base_url += `/250x250@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`
      setMapImgSrc(`${base_url}&attribution=false&logo=false`)
    }
  }

  useEffect(() => {
    if (selectedLocation) {
      map_image()
    }
  }, [selectedLocation])

  const onSubmit = () => {}

  return (
    <div>
      {
        errors && 
          <div className="rounded-md bg-red-300 border border-red-600">
            {JSON.stringify(errors)}
          </div>
      }
      {
        selectedLocation &&
          <div className="rounded-md bg-green-200 border border-green-500">
            {JSON.stringify(selectedLocation)}
          </div>
      }
      {
        rawLocation &&
          <div className="rounded-md bg-yellow-50 border border-yellow-400">
            {JSON.stringify(rawLocation)}
          </div>
      }
      {
        selectedLocation && mapImgSrc.trim()
          && <img src={mapImgSrc} alt={`Satelite map view of ${selectedLocation.place_name}`} />
      }
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block">
          Location
        </label>
        <SearchBox
          accessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY!}
          options={{
            language: 'en',
            country: 'US',
          }}
          onRetrieve={handleRetrieve} />
      </form>
    </div>
  )
}