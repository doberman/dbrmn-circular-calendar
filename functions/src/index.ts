import * as functions from 'firebase-functions'

import type { Response, https } from 'firebase-functions'

import { GoogleAuth } from 'googleapis-common'
import { google } from 'googleapis'

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

interface Calendar {
  key: string
  id?: string
  events?: any
}

const calendars: Calendar[] = [
  { key: 'DBRMN_STO_STUDIO', id: process.env.DBRMN_STO_STUDIO_CAL_ID },
  {
    key: 'DBRMN_STO_STUDIO_PUBLIC_HOLIDAYS',
    id: process.env.DBRMN_STO_STUDIO_PUBLIC_HOLIDAYS_CAL_ID
  },
  { key: 'DBRMN_COP_STUDIO', id: process.env.DBRMN_COP_STUDIO_CAL_ID },
  {
    key: 'DBRMN_COP_STUDIO_PUBLIC_HOLIDAYS',
    id: process.env.DBRMN_COP_STUDIO_PUBLIC_HOLIDAYS_CAL_ID
  },
  { key: 'DBRMN_OSL_STUDIO', id: process.env.DBRMN_OSL_STUDIO_CAL_ID },
  {
    key: 'DBRMN_OSL_STUDIO_PUBLIC_HOLIDAYS',
    id: process.env.DBRMN_OSL_STUDIO_PUBLIC_HOLIDAYS_CAL_ID
  },
  { key: 'DBRMN_HEL_STUDIO', id: process.env.DBRMN_HEL_STUDIO_CAL_ID },
  {
    key: 'DBRMN_HEL_STUDIO_PUBLIC_HOLIDAYS',
    id: process.env.DBRMN_HEL_STUDIO_PUBLIC_HOLIDAYS_CAL_ID
  }
]

const fetchCalendarData = async (calendarId: string, year: number) => {
  const auth: GoogleAuth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT,
    scopes: [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/calendar'
    ]
  })

  console.log('GOOGLE_SERVICE_ACCOUNT', process.env.GOOGLE_SERVICE_ACCOUNT)
  console.log(
    'GOOGLE_APPLICATION_CREDENTIALS',
    process.env.GOOGLE_APPLICATION_CREDENTIALS
  )

  if (!calendarId) {
    console.log('No calendar id found for key')
    return []
  }

  const api = google.calendar({ version: 'v3', auth })
  const res = await api.events.list({
    calendarId: calendarId,
    timeMin: `${year}-01-01T00:00:00Z`,
    timeMax: `${year}-12-31T00:00:00Z`,
    singleEvents: true,
    orderBy: 'startTime'
  })
  const events = res.data.items
  if (!events || events.length === 0) {
    console.log('No upcoming events found.')
    return 'error'
  }

  return events
}

export const events = functions.region('europe-west1').https.onRequest(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (req: https.Request, response: Response<any>) => {
    const data = await Promise.all(
      calendars.map(async (calendar) => {
        functions.logger.log('id', calendar.id)
        const res = await fetchCalendarData(calendar.id as string, 2022)
        return { key: calendar.key, events: res }
      })
    )
    response.set('Access-Control-Allow-Origin', '*')
    response.send(data)
    return
  }
)
