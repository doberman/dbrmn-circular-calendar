const API_KEY = process.env.GOOGLE_CALENDER_API_KEY

export const fetchCalenderData = async (calenderId: string) => {
  const url =
    'https://www.googleapis.com/calendar/v3/calendars/' +
    calenderId +
    '/events?key=' +
    API_KEY +
    '&timeMax=2021-12-31T00:00:00Z' +
    '&timeMax=2022-12-31T00:00:00Z'

  console.log(url)

  const response = await fetch(url)
  if (!response.ok) {
    console.log`An error has occured: ${response.status}`
    return null
  }
  const data = await response.json()
  return data
}
