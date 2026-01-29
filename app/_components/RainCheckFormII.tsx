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
      let base_url = "https://api.mapbox.com/styles/v1/"
      // base_url += "castavridis/cmkya624n006p01qr4dsbb5iq/"
      base_url += "mapbox/satellite-v9/"
      base_url += `static/${selectedLocation.longitude}`
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4">
        <div>
          <div className="ticket-container">
            <div className="ticket flex">
              <label htmlFor="recipient_name">
                <span className="font-bold">To: </span>
                <input className="p-2 border-b" type="text" style={{ fontFamily: 'cursive'}} placeholder="Recipient's name" />
              </label>
            </div>
          </div>
          <div className="ticket-container from mt-0">
            <div className="ticket flex flex-col gap-4">
              <div className="mt-2">FROM</div>
              <label htmlFor="sender_name">
                <span className="font-bold">Name </span>
                <input id="sender_name" className="p-2 border-b" type="text" style={{ fontFamily: 'cursive'}} placeholder="Your name" />
              </label>
              <label htmlFor="sender_email">
                <span className="font-bold">Email </span>
                <input id="sender_email" className="p-2 border-b" type="text" style={{ fontFamily: 'cursive'}} placeholder="Your email" />
              </label>
              <label htmlFor="sender_reason">
                <span className="font-bold block mb-2">Cancellation Reason </span>
                <div className="p-2 border-b text-zinc-400 border-b-zinc-950" style={{
                  fontFamily: 'cursive'
                }}>
                  <select id="sender_reason">
                    <option>It better be good...</option>
                    <option>Health Issue</option>
                    <option>Work Conflict</option>
                    <option>Family Obligation</option>
                    <option>Scheduling Issue</option>
                    <option>Unexpected Travel</option>
                    <option>Emergency</option>
                    <option>Emotional Capacity</option>
                    <option>Other</option>
                  </select>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="bg-amber-50 rounded-md p-4">
          {
            errors?.message && 
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
            <div className="flex flex-col gap-4">
              <div>Proposed Event</div>
              <div>
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
              </div>
            </div>
        </div>
      </div>
    </form>
  )
}