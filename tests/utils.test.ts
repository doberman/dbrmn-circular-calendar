import {
  daysIntoYear,
  daysInYear,
  weekOneStartOffset,
  numberOfWeeksInYear
} from '../src/utils'

describe('daysIntoYear', () => {
  test('1/1 2022 should be day number 1', () => {
    const year = 2022
    const date = new Date(year, 0, 1, 12)
    expect(daysIntoYear(date, year)).toBe(1)
  })

  test('31/12 2022 should be day number 365', () => {
    const year = 2022
    const date = new Date(year, 11, 31, 12)
    expect(daysIntoYear(date, year)).toBe(365)
  })

  test('31/12 2024 should be day number 366', () => {
    const year = 2022
    const date = new Date(year, 11, 31, 12)
    expect(daysIntoYear(date, year)).toBe(365)
  })
})

describe('daysInYear', () => {
  test('days in 2022 should be 365', () => {
    expect(daysInYear(2022)).toBe(365)
  })

  test('days in 2024 should be 366', () => {
    expect(daysInYear(2024)).toBe(366)
  })
})

describe('weekOneStartOffset', () => {
  test('start of week 1 in 2022 should be 2 days into the year, ie 3/1', () => {
    expect(weekOneStartOffset(2022)).toBe(2)
  })

  test('start of week 1 in 2023 should be 1 day into the year, ie 2/1', () => {
    expect(weekOneStartOffset(2023)).toBe(1)
  })

  test('start of week 1 in 2024 should be 0 day into the year, ie 1/1', () => {
    expect(weekOneStartOffset(2024)).toBe(0)
  })

  test('start of week 1 in 2025 should be 5 days into the year, ie 6/1', () => {
    expect(weekOneStartOffset(2025)).toBe(5)
  })

  test('start of week 1 in 2026 should be -2 days into the year, ie 29/12', () => {
    expect(weekOneStartOffset(2026)).toBe(-2)
  })

  test('start of week 1 in 2028 should be 2 days into the year, ie 3/1', () => {
    expect(weekOneStartOffset(2028)).toBe(2)
  })

  describe('numberOfWeeksInYear', () => {
    test('number of weeks in 2022 should be 52', () => {
      expect(numberOfWeeksInYear(2022)).toBe(52)
    })

    test('number of weeks in 2026 should be 53', () => {
      expect(numberOfWeeksInYear(2026)).toBe(53)
    })
  })
})
