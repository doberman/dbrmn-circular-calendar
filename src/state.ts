export const setInterval = (interval: string) =>
  localStorage.setItem('interval', interval)
export const getInterval = () => localStorage.getItem('interval') || 'weeks'
