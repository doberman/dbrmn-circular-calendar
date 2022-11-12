import * as d3 from 'd3'

import {
  getExcludedCalendars,
  setExcludedCalendars,
  getExcludedIntervals,
  setExcludedIntervals
} from './state'
import { setupCalendars } from './app'
import { fetchLocalData } from './data'

export const toggleInterval = (name: string) => {
  const disabledTextColor = 'text-gray-400'
  const opacity = 'opacity-50'
  document.getElementById(name)?.classList.toggle(disabledTextColor)
  document.getElementById(name)?.classList.toggle(opacity)
  const elements = d3.selectAll(`.interval-${name}`)
  const visibility = elements.style('visibility')
  visibility == 'visible'
    ? elements.style('visibility', 'hidden')
    : elements.style('visibility', 'visible')
  let excludedIntervals = getExcludedIntervals()
  if (visibility == 'visible') {
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

export const toggleCalendar = (name: string) => {
  toggleCalendarButton(name)
  const elements = d3.selectAll(`.cal-${name}`)
  let excludedCalendars = getExcludedCalendars()
  if (!elements.empty()) {
    excludedCalendars.push(name)
  } else {
    excludedCalendars = excludedCalendars.filter(
      (item: string) => item !== name
    )
  }
  setExcludedCalendars(excludedCalendars)
  document.getElementById('zoomableGroup')?.remove()
  setupCalendars(fetchLocalData())
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
