import { z } from 'zod'

export const locationSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  latitude: z.number(),
  longitude: z.number(),
  place_name: z.string().optional(),
})

export const rainCheckFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(500, 'Title must be 500 characters or less'),
  proposed_datetime: z
    .string()
    .nullable()
    .transform(val => val === '' ? null : val),
  location: locationSchema.nullable().optional(),
  category_id: z
    .number()
    .int()
    .positive('Category ID must be positive')
    .nullable()
    .optional()
    .transform(val => val ?? null),
})

export type LocationData = z.infer<typeof locationSchema>
export type RainCheckFormData = z.infer<typeof rainCheckFormSchema>

export interface RainCheck {
  id: number
  user_id: number | null
  created_in_location_id: number | null
  created_at: string
  location_id: number | null
  message_id: number | null
  proposed_datetime: string | null
  category_id: number | null
  title: string | null
}
