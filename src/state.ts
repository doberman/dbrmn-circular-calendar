export const setInterval = (interval: string) =>
  localStorage.setItem('interval', interval)
export const getInterval = () => localStorage.getItem('interval') || 'weeks'


export const setUser = (user: User) =>
  localStorage.setItem('user', JSON.stringify(user))
export const getUser = () =>
  JSON.parse(localStorage.getItem('user') ?? 'null') as User | null
