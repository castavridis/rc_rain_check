'use client'

import dynamic from 'next/dynamic'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const SearchBox = dynamic(
  () => import('@mapbox/search-js-react').then(mod => mod.SearchBox),
  { ssr: false }
)

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'
export default function RainCheckForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const {

  } = useForm({})

  const handleLocationSelect = () => {}
  const onSubmit = () => {}

  return (
    <div>
      <form>

      </form>
    </div>
  )
}