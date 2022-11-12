import {
  setCalendarData,
  getCalendarData,
  setLocalData,
  getLocalData
} from './state'

export const fetchCalendarData = async () => {
  const cache = getCalendarData()

  if (cache) {
    return cache
  } else {
    //https://developers.google.com/calendar/api/v3/reference/events/list
    const url =
      'https://europe-west1-dbrmn-circular-calendar.cloudfunctions.net/events'

    const response = await fetch(url)
    if (!response.ok) {
      console.log`An error has occured: ${response.status}`
      return null
    }
    const data = await response.json()
    console.log(data)
    setCalendarData(data)
    setLocalData(data)
    return data
  }
}

export const fetchLocalData = () => {
  return getLocalData()
}
