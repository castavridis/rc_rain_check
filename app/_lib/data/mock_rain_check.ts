import { z } from 'zod'

type RainCheck = {
  // Metadata
  id: number
  created_at: Date
  creation_location_id: number
  // creation_forecast_id: number
  
  sender_id: number // Sender
  category_id: number
  message_id: number

  recipient_id: number // Passively make recipient

  // Proposed event
  new_event_id: number
  // new_title: string
  // new_description: string
  // new_datetime: Date
  // new_location_id: number
 
  // Canceled event (optional)
  prev_event_id: number
  // prev_title: string
  // prev_description: string
  // prev_location_id: number
  // prev_datetime: Date
  
  response_id: number

  // Design (not implemented)
  ogg_id: number
  palette_id: number
  custom_composition_id: number
}

type Response = {
  id: number
  created_at: Date
  result: 'accept' | 'decline'
  message_id: number
}
const responseSchema = z.object({
  result: z.literal(["accept", "decline"]),
  message_id: z.number(),
})

type Location = {
  id: number
  display_name: string
  latitude: number
  longitude: number
  address: string
}
type Event = {
  id: string
  created_at: Date
  user_id: number
  location_id: number
  title: string
  description: string
  datetime: Date
}
type User = {
  id: string
  created_at: Date
  first_name: string
  last_name: string
  email: string
  phone: string
  roles: ['sender', 'recipient'] // can be both
}
type Message = {
  id: number
  created_at: Date
  user_id: number
  display_name: string
  message: string

  // Not implemented
  color: string
}
type Category = {
  id: number
  graphic: string
  name: string
  description: string
}
type Palette = {
  id: number
  colors: string[]
}
type Composition = {
  // ??
}
type Theme = {
  // ??
}


const rain_check = {
}

export default rain_check