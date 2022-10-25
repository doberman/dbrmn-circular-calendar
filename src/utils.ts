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

export const daysInYear = (year: number) => {
  return (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365
}

export const monthName = (month: number) => {
  const date = new Date()
  date.setMonth(month)
  return date.toLocaleString([], { month: 'long' })
}

export const daysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate()
}

export const dayInMonth = (daysInYear: number, year: number) => {
  const date = new Date(year, 0, 1)
  date.setDate(date.getDate() + daysInYear + 1)
  console.log(daysInYear, date.getUTCDate())
  return date.getUTCDate()
}

export const daysToRadians = (days: number, year: number) => {
  return ((days - 1) / daysInYear(year)) * 2 * Math.PI
}
