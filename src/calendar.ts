const API_KEY = process.env.GOOGLE_CALENDAR_API_KEY

export const fetchCalendarData = async (year: number) => {
  //https://developers.google.com/calendar/api/v3/reference/events/list
  const url =
    'https://europe-west1-dbrmn-circular-calendar.cloudfunctions.net/events'

  console.log(url)

  const response = await fetch(url)
  if (!response.ok) {
    console.log`An error has occured: ${response.status}`
    return null
  }
  const data = await response.json()
  console.log(data)
  return data
}
