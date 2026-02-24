import { z } from "zod"

function idHelper(table_name: string) {
  const _z = z
    .number()
    .int()
    .positive(`${table_name} ID must be positive`)
  return _z
}

export type Response = {
  id: number
  created_at: Date
  result: "accept" | "decline"
  message_id: number
}
export const ResponseSchema = z.object({
  // id: z.number(),
  // created_at: z.date(),
  result: z.literal(["accept", "decline"]),
  message_id: idHelper("Message").nullish(),
})
export type ResponseData = z.infer<typeof ResponseSchema>

export type Location = {
  id: number
  display_name: string
  latitude: number
  longitude: number
  address: string
}
export const LocationSchema = z.object({
  place_name: z.string().min(1, "Location name is required"),
  address: z.string().min(1, "Address is required"),
  latitude: z.number(),
  longitude: z.number(),
})
export type LocationData = z.infer<typeof LocationSchema>

export type Event = {
  id: string
  created_at: Date
  user_id: number
  location_id: number
  title: string
  description: string
  datetime: Date
}
export const EventSchema = z.object({
  user_id: idHelper("User"),
  location_id: idHelper("Location"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  datetime: z.date().min(new Date(), "A future date must be chosen.")
})
export type EventData = z.infer<typeof EventSchema>
export const PrevEventSchema = EventSchema.extend({
  location_id: idHelper("Location").nullish(),
})
export type PrevEventSchema = z.infer<typeof PrevEventSchema>

export type User = {
  id: string
  created_at: Date
  first_name: string
  last_name: string
  email: string
  phone: string
  roles: ["sender", "recipient"] // can be both
}
export const UserSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().nullish(),
  email: z.email(),
  phone: z.string().min(10, "Please enter a 10-digit phone number"),
  roles: z.literal(["sender", "recipient"])
})
export type UserData = z.infer<typeof UserSchema>

export type Message = {
  id: number
  created_at: Date
  user_id: number
  display_name: string
  message: string

  // Not implemented
  color: string
}
export const MessageSchema = z.object({
  user_id: UserSchema,
  display_name: z.string().nullish(),
  message: z.string().min(1, "If you\'d like to send a message, please add one."),
  color: z.string().nullish(),
})
export type MessageData = z.infer<typeof MessageSchema>

export type Category = {
  id: number
  graphic: string
  name: string
  description: string
}
export const CategorySchema = z.object({
  id: idHelper("Category"),
})
export type CategoryData = z.infer<typeof CategorySchema>

// type Palette = {
//   id: number
//   colors: string[]
// }
// type Composition = {
//   // ??
// }
// type Theme = {
//   // ??
// }

export type RainCheck = {
  // Metadata
  id: number
  created_at: Date
  creation_location_id: number // (optional) To create forecast-related visualizations

  sender_id: number // Sender
  category_id: number
  message_id: number
  recipient_id: number // Passively make recipient
  new_event_id: number   // Proposed event
  prev_event_id: number // Canceled event data (optional)
  response_id: number

  // Design (not implemented)
  ogg_id: number
  palette_id: number
  custom_composition_id: number
}
export const RainCheckFormSchema = z.object({
  creation_location: LocationSchema.nullish(),
  category_id: idHelper("Category"),
  message: z.string().nullish(),
  recipient: UserSchema,
  new_event: EventSchema,
  prev_event: PrevEventSchema.nullish(),
})
export type RainCheckFormData = z.infer<typeof RainCheckFormSchema>