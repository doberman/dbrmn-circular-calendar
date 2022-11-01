export interface Calendar {
  name: string
  color: string
  eventColor: string
  calendarId: string
  holidayId?: string
}

export interface User {
  name: string
  'https://slack.com/user_id': string
}
