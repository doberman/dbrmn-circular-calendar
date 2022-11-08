import ls from 'localstorage-slim'
import type { User } from './types'

export const setUser = (user: User) => ls.set('user', JSON.stringify(user))
export const getUser = () => JSON.parse(ls.get('user') ?? 'null') as User | null

export const setCalendarData = (data: any) =>
  ls.set('calendarData', JSON.stringify(data), { ttl: 120 })
export const getCalendarData = () =>
  JSON.parse(ls.get('calendarData') ?? 'null')
