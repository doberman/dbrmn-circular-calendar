import ls from 'localstorage-slim'
import type { User } from './types'

export const setUser = (user: User) => ls.set('user', JSON.stringify(user))
export const getUser = () => JSON.parse(ls.get('user') ?? 'null') as User | null

export const setCalendarData = (data: any) =>
  ls.set('calendarData', JSON.stringify(data), { ttl: 120 })
export const getCalendarData = () =>
  JSON.parse(ls.get('calendarData') ?? 'null')

export const setLocalData = (data: any) =>
  ls.set('localData', JSON.stringify(data))
export const getLocalData = () => JSON.parse(ls.get('localData') ?? 'null')

export const setExcludedCalendars = (list: string[]) =>
  ls.set('excludedCalendars', JSON.stringify(list))
export const getExcludedCalendars = () =>
  JSON.parse(ls.get('excludedCalendars') ?? '[]')

export const setExcludedIntervals = (list: string[]) =>
  ls.set('excludedIntervals', JSON.stringify(list))
export const getExcludedIntervals = () =>
  JSON.parse(ls.get('excludedIntervals') ?? '[]')
