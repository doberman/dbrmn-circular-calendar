export const daysIntoYear = (date: Date, year: number) => {
  if (date.getFullYear() == year) {
    return (
      (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
        Date.UTC(date.getFullYear(), 0, 0)) /
      24 /
      60 /
      60 /
      1000
    )
  } else if (date.getFullYear() > year) {
    return 365
  } else {
    return 0
  }
}

export const getMonthName = (month: number) => {
  const date = new Date()
  date.setMonth(month)
  return date.toLocaleString([], { month: 'long' })
}

export const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate()
}

export const daysToRadians = (days: number) => {
  return ((days - 1) / 365) * 2 * Math.PI
}
