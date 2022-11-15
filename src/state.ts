import ls from 'localstorage-slim'
import type { User } from './types'

export const setUser = (user: User) => ls.set('user', JSON.stringify(user))
export const getUser = () => JSON.parse(ls.get('user') ?? 'null') as User | null

export const setCalendarData = (data: any, year: number) =>
  ls.set(`calendarData-${year}`, JSON.stringify(data), { ttl: 120 })
export const getCalendarData = (year: number) =>
  JSON.parse(ls.get(`calendarData-${year}`) ?? 'null')

export const setLocalData = (data: any, year: number) =>
  ls.set(`localData-${year}`, JSON.stringify(data))
export const getLocalData = (year: number) =>
  JSON.parse(ls.get(`localData-${year}`) ?? 'null')

export const setExcludedCalendars = (list: string[]) =>
  ls.set('excludedCalendars', JSON.stringify(list))
export const getExcludedCalendars = () =>
  JSON.parse(ls.get('excludedCalendars') ?? '[]')

export const setExcludedIntervals = (list: string[]) =>
  ls.set('excludedIntervals', JSON.stringify(list))
export const getExcludedIntervals = () =>
  JSON.parse(ls.get('excludedIntervals') ?? '[]')

export const setYear = (year: number) => ls.set('year', JSON.stringify(year))
export const getYear = () => parseInt(JSON.parse(ls.get('year') ?? 'null'))
