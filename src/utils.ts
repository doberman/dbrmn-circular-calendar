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
    return daysInYear(year)
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
  date.setDate(date.getDate() + daysInYear)
  return date.getUTCDate()
}

export const daysToRadians = (days: number, year: number) => {
  return ((days - 1) / daysInYear(year)) * 2 * Math.PI
}

export const weekOneStartOffset = (year: number) => {
  const date = new Date(year, 0, 1, 12)
  const dayOfWeek = date.getUTCDay()

  if (numberOfWeeksInYear(year) > 52) {
    switch (dayOfWeek) {
      case 3: //wednesday
        return -1
      default: //thursday
        return -2
    }
  } else {
    switch (dayOfWeek) {
      case 0: //sunday
        return 1
      case 1: //monday
        return 0
      default:
        return 8 - dayOfWeek
    }
  }
}

export const numberOfWeeksInYear = (year: number) => {
  const date = new Date(year, 0, 1, 12)
  const isLeap = daysInYear(year) == 366

  //check for a Jan 1 that's a Thursday or a leap year that has a
  //Wednesday Jan 1. Otherwise it's 52
  return date.getUTCDay() === 4 || (isLeap && date.getUTCDay() === 3) ? 53 : 52
}

export const padWithZero = (number: number) => {
  return String(number).padStart(2, '0')
}
