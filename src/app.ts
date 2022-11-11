import * as d3 from 'd3'

import { fetchCalendarData } from './calendar'
import { calendars } from './config'
import { drawDays, drawMonths, drawWeeks } from './intervals'
import { daysIntoYear, daysToRadians } from './utils'
import { getExcludedCalendars, setExcludedCalendars } from './state'

export const setupCalendars = async () => {
  const calendarEl = document.getElementById('calendar')
  const width = calendarEl?.clientWidth || 600
  const height = calendarEl?.clientHeight || 600
  const radius = Math.min(width, height) / 2 - 10
  const centerX = width / 2
  const centerY = height / 2
  const outerMargin = radius * 0.12
  const innerMargin = radius * 0.2
  const activeCalendars = calendars.filter(
    (calendar: any) => !getExcludedCalendars().includes(calendar.name)
  )
  const lineWidth =
    activeCalendars.length === 0
      ? radius - outerMargin - innerMargin
      : (radius - outerMargin - innerMargin) / activeCalendars.length
  const baseFontSize = (radius / 400) * 100

  const svg = d3.select(calendarEl).attr('viewBox', [0, 0, width, height])

  const zoomableGroup = svg.append('g').attr('id', 'zoomableGroup')

  const rootGroup = zoomableGroup
    .append('g')
    .attr('transform', `translate(${centerX},${centerY})`)
    .attr('font-size', `${baseFontSize}%`)

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const year = today.getFullYear()

  const data = await fetchCalendarData(year)

  //draw background
  for (const [index, calendar] of activeCalendars.entries()) {
    if (getExcludedCalendars().includes(calendar.name)) {
      break
    }
    const temp = d3
      .arc()
      .innerRadius(radius - outerMargin - lineWidth * index)
      .outerRadius(radius - outerMargin - lineWidth * (index + 1))
      .startAngle(0)
      .endAngle(2 * Math.PI)
    rootGroup
      .append('path')
      .attr('class', `cal-${calendar.name}`)
      .attr('d', <any>temp)
      .attr('fill', calendar.color)
      .attr('opacity', 0.5)

    //draw events
    if (calendar.calendarId) {
      console.log(data, calendar.calendarId)
      const calendarData = data.find(
        (el: { key: string }) => el.key == calendar.calendarId
      )
      if (calendarData) {
        console.log(calendarData)
        for (const item of calendarData.events) {
          console.log(item.id, item.summary, item.start, item.end)
          const startDate = new Date(item.start.date)
          const endDate = new Date(item.end.date)
          const event = d3
            .arc()
            .innerRadius(radius - outerMargin - lineWidth * index)
            .outerRadius(radius - outerMargin - lineWidth * (index + 1))
            .startAngle(daysToRadians(daysIntoYear(startDate, year), year))
            .endAngle(daysToRadians(daysIntoYear(endDate, year), year))
          rootGroup
            .append('path')
            .attr('class', `cal-${calendar.name}`)
            .attr('id', item.id)
            .attr('d', <any>event)
            .attr('fill', calendar.eventColor)
            .style('cursor', 'pointer')
            .on('click', () => {
              drawCenterText(
                item.summary,
                item.location,
                startDate,
                endDate,
                calendar.eventColor
              )
            })
        }
      }
    }
    //draw holidays
    if (calendar.holidayId) {
      console.log(data, calendar.holidayId)
      const calendarData = data.find(
        (el: { key: string }) => el.key == calendar.holidayId
      )
      if (calendarData) {
        console.log(calendarData)
        for (const item of calendarData.events) {
          console.log(item.id, item.summary, item.start, item.end)
          const startDate = new Date(item.start.date)
          const endDate = new Date(item.end.date)
          const event = d3
            .arc()
            .innerRadius(radius - outerMargin - lineWidth * index)
            .outerRadius(radius - outerMargin - lineWidth * (index + 1))
            .startAngle(daysToRadians(daysIntoYear(startDate, year), year))
            .endAngle(daysToRadians(daysIntoYear(endDate, year), year))
          rootGroup
            .append('path')
            .attr('class', `cal-${calendar.name}`)
            .attr('id', item.id)
            .attr('d', <any>event)
            .attr('fill', 'white')
            .style('cursor', 'pointer')
            .on('click', () => {
              drawCenterText(item.summary, '', startDate, endDate, 'white')
            })
        }
      }
    }
  }

  //draw today
  const now = d3
    .arc()
    .innerRadius(radius - outerMargin - lineWidth * activeCalendars.length)
    .outerRadius(radius)
    .startAngle(daysToRadians(daysIntoYear(today, year), year))
    .endAngle(daysToRadians(daysIntoYear(tomorrow, year), year))
  rootGroup
    .append('path')
    .attr('class', 'now')
    .attr('d', <any>now)
    .attr('fill', 'black')
    .attr('opacity', 0.2)

  //draw center area
  const centerArea = d3
    .arc()
    .innerRadius(0)
    .outerRadius(innerMargin * 0.6)
    .startAngle(0)
    .endAngle(2 * Math.PI)
  rootGroup
    .append('path')
    .attr('id', 'centerArea')
    .attr('d', <any>centerArea)
    .attr('transform', 'rotate(-90)')
    .attr('fill', 'white')
    .attr('opacity', 0.8)
  //.style('stroke', 'black')
  //.style('stroke-width', '0.05em')

  rootGroup
    .append('text')
    .attr('id', 'centerTextStart')
    .append('textPath')
    .style('letter-spacing', '-0.03em')
    .attr('xlink:href', '#centerArea')
    .style('font-size', '1.05em')
    .attr('startOffset', '100%')
    .style('text-anchor', 'end')
    .attr('font-weight', 800)
    .text(
      'PREFERABLE\u00A0\u00A0FUTURE\u00A0\u00A0OF\u00A0\u00A0THE\u00A0\u00A0YEAR.'
    )
  rootGroup
    .append('text')
    .attr('id', 'centerText1')
    .attr('d', <any>centerArea)
    .attr('dy', '-1.0em')
    .style('text-anchor', 'middle')
    .style('font-size', '0.7em')
    .text('')
  rootGroup
    .append('text')
    .attr('id', 'centerText2')
    .attr('d', <any>centerArea)
    .attr('dy', '0.3em')
    .style('text-anchor', 'middle')
    .style('font-size', '0.7em')
    .text('')
  rootGroup
    .append('text')
    .attr('id', 'centerText3')
    .attr('d', <any>centerArea)
    .attr('dy', '1.6em')
    .style('text-anchor', 'middle')
    .style('font-size', '0.7em')
    .text()

  //draw intervals
  drawDays(year, rootGroup, radius, innerMargin, outerMargin)
  drawWeeks(year, rootGroup, radius, innerMargin, outerMargin)
  drawMonths(year, rootGroup, radius, innerMargin)

  //handle zoom
  const zoomed = ({ transform }) => {
    zoomableGroup.attr(
      'transform',
      `translate(${transform.x},${transform.y}) scale(${transform.k})`
    )
  }

  svg.call(
    d3
      .zoom()
      .scaleExtent([1, 8])
      .translateExtent([
        [0, 0],
        [width, height]
      ])
      .on('zoom', zoomed) as any
  )
}

const drawCenterText = (
  text: string,
  location: string,
  startDate: Date,
  endDate: Date,
  color: string
) => {
  d3.select('#centerTextStart').text('')
  d3.select('#centerArea').style('fill', color)
  d3.select('#centerText1').text(text)

  let dateString = `${startDate.getDate()}/${
    startDate.getMonth() + 1
  } - ${endDate.getDate()}/${endDate.getMonth() + 1}`
  if (endDate.valueOf() - startDate.valueOf() <= 24 * 60 * 60 * 1000) {
    dateString = `${startDate.getDate()}/${startDate.getMonth() + 1}`
  }

  if (location) {
    d3.select('#centerText1').attr('dy', '-1.0em')
    d3.select('#centerText2').text(location)
    d3.select('#centerText2').attr('dy', '0.3em')
    d3.select('#centerText3').text(dateString)
    d3.select('#centerText3').attr('dy', '1.6em')
  } else {
    d3.select('#centerText1').attr('dy', '-0.4em')
    d3.select('#centerText2').text(dateString)
    d3.select('#centerText2').attr('dy', '1.1em')
    d3.select('#centerText3').text('')
  }
}

export const toggleInterval = (name: string) => {
  const disabledTextColor = 'text-gray-400'
  const opacity = 'opacity-50'
  const element = d3.selectAll(`.interval-${name}`)
  const visibility = element.style('visibility')
  visibility == 'visible'
    ? element.style('visibility', 'hidden')
    : element.style('visibility', 'visible')
  document.getElementById(name)?.classList.toggle(disabledTextColor)
  document.getElementById(name)?.classList.toggle(opacity)
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
  setupCalendars()
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
