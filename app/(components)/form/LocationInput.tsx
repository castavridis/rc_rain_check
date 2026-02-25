"use client"

import type { SearchBoxRetrieveResponse } from '@mapbox/search-js-core'
import { LocationData } from '../../(lib)/rain-checks/typesII'
import { sono } from '../fonts/sono'
import dynamic from 'next/dynamic'
const SearchBox = dynamic(
  () => import('@mapbox/search-js-react').then(mod => mod.SearchBox),
  { ssr: false }
)

export default function LocationInput () {
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
