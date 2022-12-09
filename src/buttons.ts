/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as d3 from 'd3'

import {
  getExcludedCalendars,
  setExcludedCalendars,
  getExcludedIntervals,
  setExcludedIntervals,
  getSelectedYear,
  setSelectedYear
} from './state'
import { setupCalendars } from './app'
import { fetchLocalData } from './data'
import { currentYear } from './utils'

export const toggleInterval = (name: string) => {
  const disabledTextColor = 'text-gray-400'
  const opacity = 'opacity-50'
  document.getElementById(name)?.classList.toggle(disabledTextColor)
  document.getElementById(name)?.classList.toggle(opacity)
  const elements = d3.selectAll(`.interval-${name}`)
  const visibility = elements.style('visibility')
  visibility === 'visible'
    ? elements.style('visibility', 'hidden')
    : elements.style('visibility', 'visible')
  let excludedIntervals = getExcludedIntervals()
  if (visibility === 'visible') {
    excludedIntervals.push(name)
  } else {
    excludedIntervals = excludedIntervals.filter(
      (item: string) => item !== name
    )
  }
  setExcludedIntervals(excludedIntervals)
}

export const initIntervals = () => {
  const excludedIntervals = getExcludedIntervals()
  for (const name of excludedIntervals) {
    const disabledTextColor = 'text-gray-400'
    const opacity = 'opacity-50'
    document.getElementById(name)?.classList.add(disabledTextColor)
    document.getElementById(name)?.classList.add(opacity)
    d3.selectAll(`.interval-${name}`).style('visibility', 'hidden')
  }
}

export const toggleCalendar = async (name: string) => {
  toggleCalendarButton(name)
  const elements = d3.selectAll(`.cal-${name}`)
  let excludedCalendars = getExcludedCalendars()
  if (elements.empty()) {
    excludedCalendars = excludedCalendars.filter(
      (item: string) => item !== name
    )
  } else {
    excludedCalendars.push(name)
  }
  setExcludedCalendars(excludedCalendars)
  document.getElementById('zoomableGroup')?.remove()
  setupCalendars(await fetchLocalData(getSelectedYear()))
}

const toggleCalendarButton = (name: string) => {
  const disabledTextColor = 'text-gray-400'
  const opacity = 'opacity-50'
  const border = 'before:border-0'
  document.getElementById(name)?.classList.toggle(disabledTextColor)
  document.getElementById(name)?.classList.toggle(opacity)
  document.getElementById(name)?.classList.toggle(border)
}

export const initCalendarButtons = () => {
  const excludedCalendars = getExcludedCalendars()
  for (const name of excludedCalendars) {
    toggleCalendarButton(name)
  }
}

const toggleYearButton = (name: string, enabled: boolean) => {
  const disabledTextColor = 'text-gray-400'
  const opacity = 'opacity-50'
  if (enabled) {
    document.getElementById(name)?.classList.remove(disabledTextColor)
    document.getElementById(name)?.classList.remove(opacity)
  } else {
    document.getElementById(name)?.classList.add(disabledTextColor)
    document.getElementById(name)?.classList.add(opacity)
  }
}

export const initYear = () => {
  const yearNow = currentYear()
  document.getElementById('year_now')!.textContent = yearNow.toString()
  document.getElementById('year_prev')!.textContent = (yearNow - 1).toString()
  document.getElementById('year_next')!.textContent = (yearNow + 1).toString()

  const selectedYear = getSelectedYear() || currentYear()
  if (selectedYear === yearNow) {
    toggleYearButton('year_prev', false)
    toggleYearButton('year_next', false)
  } else if (selectedYear < yearNow) {
    toggleYearButton('year_now', false)
    toggleYearButton('year_next', false)
  } else {
    toggleYearButton('year_now', false)
    toggleYearButton('year_prev', false)
  }
  setSelectedYear(selectedYear)
}

export const selectYear = async (year: number) => {
  const yearNow = currentYear()
  if (year !== getSelectedYear()) {
    setSelectedYear(year)
    if (year === yearNow) {
      toggleYearButton('year_now', true)
      toggleYearButton('year_prev', false)
      toggleYearButton('year_next', false)
    } else if (year < yearNow) {
      toggleYearButton('year_now', false)
      toggleYearButton('year_prev', true)
      toggleYearButton('year_next', false)
    } else {
      toggleYearButton('year_now', false)
      toggleYearButton('year_prev', false)
      toggleYearButton('year_next', true)
    }
    document.getElementById('zoomableGroup')?.remove()
    document.getElementById('loading')?.classList.replace('hidden', 'flex')
    document.getElementById('calendar')?.classList.replace('flex', 'hidden')
    setupCalendars(await fetchLocalData(year))
    document.getElementById('loading')?.classList.replace('flex', 'hidden')
    document.getElementById('calendar')?.classList.replace('hidden', 'flex')
  }
}
