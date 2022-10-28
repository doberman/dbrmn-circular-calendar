export interface Calendar {
  name: string
  color: string
  eventColor: string
  id: string
}

export interface User {
  name: string
  'https://slack.com/user_id': string
}
