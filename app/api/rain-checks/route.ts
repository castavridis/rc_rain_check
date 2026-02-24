import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../../(lib)/supabase/server'
import { getSession } from '../../(lib)/auth/session'
import { rainCheckFormSchema } from '../../(lib)/rain-checks/types'

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 401 }
  )

  const body = await request.json()
  const result = rainCheckFormSchema.safeParse(body)
  if (!result.success) {
    const errors = result.error.issues.map(issue => ({
      path: issue.path.join('.'),
      message: issue.message
    }))
    return NextResponse.json(
      { error: 'Validation failed', details: errors },
      { status: 400 }
    )
  }

  const data = result.data
  const supabase = await createClient()
  let locationId: number | null = null

  // Handle location: find existing or create new
  if (data.location) {
    // Try to find existing location by coordinates (within ~10m precision)
    const { data: existingLocation } = await supabase
      .from('locations')
      .select('id')
      .gte('latitude', data.location.latitude - 0.0001)
      .lte('latitude', data.location.latitude + 0.0001)
      .gte('longitude', data.location.longitude - 0.0001)
      .lte('longitude', data.location.longitude + 0.0001)
      .limit(1)
      .single()

    if (existingLocation) {
      locationId = existingLocation.id
    } else {
      // Create new location
      const { data: newLocation, error: locationError } = await supabase
        .from('locations')
        .insert({
          address: data.location.address,
          latitude: data.location.latitude,
          longitude: data.location.longitude,
          place_name: data.location.place_name
        })
        .select('id')
        .single()

      if (locationError) {
        console.error('Location creation error:', locationError)
        return NextResponse.json({ error: 'Failed to create location' }, { status: 500 })
      }

      locationId = newLocation.id
    }
  }

  const { data: insertedData, error } = await supabase
    .from('rain_checks')
    .insert({
      user_id: session.user.rcId,
      title: data.title.trim(),
      location_id: locationId,
      proposed_datetime: data.proposed_datetime,
      category_id: data.category_id
    })
    .select()
    .single()

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: 'Failed to create rain check' }, { status: 500 })
  }

  return NextResponse.json(insertedData, { status: 201 })
}
