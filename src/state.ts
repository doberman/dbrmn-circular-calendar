import { User } from './models'

export const setUser = (user: User) =>
  localStorage.setItem('user', JSON.stringify(user))
export const getUser = () =>
  JSON.parse(localStorage.getItem('user') ?? 'null') as User | null

export const setCalendarData = (data: any) =>
  sessionStorage.setItem('calendarData', JSON.stringify(data))
export const getCalendarData = () =>
  JSON.parse(sessionStorage.getItem('calendarData') ?? 'null')
