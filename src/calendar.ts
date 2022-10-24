const API_KEY = process.env.GOOGLE_CALENDAR_API_KEY

export const fetchCalendarData = async (calendarId: string, year: number) => {
  //https://developers.google.com/calendar/api/v3/reference/events/list
  const url =
    'https://www.googleapis.com/calendar/v3/calendars/' +
    calendarId +
    '/events?key=' +
    API_KEY +
    `&timeMin=${year}-01-01T00:00:00Z` +
    `&timeMax=${year}-12-31T00:00:00Z`

  console.log(url)

  const response = await fetch(url)
  if (!response.ok) {
    console.log`An error has occured: ${response.status}`
    return null
  }
  const data = await response.json()
  return data
}
