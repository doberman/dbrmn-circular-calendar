import {
  setCalendarData,
  getCalendarData,
  setLocalData,
  getLocalData
} from './state'

export const fetchCalendarData = async (year: number) => {
  const cache = getCalendarData(year)

  if (cache) {
    return cache
  } else {
    //https://developers.google.com/calendar/api/v3/reference/events/list
    const url = `https://europe-west1-dbrmn-circular-calendar.cloudfunctions.net/events?year=${year}`

    const response = await fetch(url)
    if (!response.ok) {
      console.log`An error has occured: ${response.status}`
      return null
    }
    const data = await response.json()
    console.log(data)
    setCalendarData(data, year)
    setLocalData(data, year)
    return data
  }
}

export const fetchLocalData = async (year: number) => {
  const localData = getLocalData(year)
  if (localData) {
    return localData
  } else {
    return await fetchCalendarData(year)
  }
}
