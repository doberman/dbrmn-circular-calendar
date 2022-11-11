import * as d3 from 'd3'

import { fetchCalendarData } from './calendar'
import { calendars } from './config'
import { drawDays, drawMonths, drawWeeks } from './intervals'
import { daysIntoYear, daysToRadians } from './utils'

export const setupCalendars = async (calendarEl: HTMLElement) => {
  const width = calendarEl?.clientWidth || 600
  const height = calendarEl?.clientHeight || 600
  const radius = Math.min(width, height) / 2 - 10
  const centerX = width / 2
  const centerY = height / 2
  const outerMargin = (radius / calendars.length) * 0.8
  const innerMargin = (radius / calendars.length) * 1.2
  const lineWidth = (radius - outerMargin - innerMargin) / calendars.length
  const baseFontSize = (radius / 400) * 100

  const svg = d3.select(calendarEl).attr('viewBox', [0, 0, width, height])

  const og = svg.append('g')

  const g = og
    .append('g')
    .attr('transform', `translate(${centerX},${centerY})`)
    .attr('font-size', `${baseFontSize}%`)

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const year = today.getFullYear()

  const data = await fetchCalendarData(year)

  //draw background
  for (const [index, calendar] of calendars.entries()) {
    const temp = d3
      .arc()
      .innerRadius(radius - outerMargin - lineWidth * index)
      .outerRadius(radius - outerMargin - lineWidth * (index + 1))
      .startAngle(0)
      .endAngle(2 * Math.PI)
    g.append('path')
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
          g.append('path')
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
          g.append('path')
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
    .innerRadius(radius - outerMargin - lineWidth * calendars.length)
    .outerRadius(radius)
    .startAngle(daysToRadians(daysIntoYear(today, year), year))
    .endAngle(daysToRadians(daysIntoYear(tomorrow, year), year))
  g.append('path')
    .attr('class', 'now')
    .attr('d', <any>now)
    .attr('fill', 'black')
    .attr('opacity', 0.2)

  //draw center area
  const centerArea = d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius - innerMargin * 1.1 - lineWidth * calendars.length)
    .startAngle(0)
    .endAngle(2 * Math.PI)
  g.append('path')
    .attr('id', 'centerArea')
    .attr('d', <any>centerArea)
    .attr('transform', 'rotate(-90)')
    .attr('fill', 'white')
    .attr('opacity', 0.8)
  //.style('stroke', 'black')
  //.style('stroke-width', '0.05em')

  g.append('text')
    .attr('id', 'centerTextStart')
    .attr('dy', '-0.1em')
    .append('textPath')
    .style('letter-spacing', '-0.025em')
    .attr('xlink:href', '#centerArea')
    .style('font-size', '1em')
    .attr('startOffset', '100%')
    .style('text-anchor', 'end')
    .attr('font-weight', 800)
    .text('PREFERABLE FUTURE OF THE YEAR.')
  g.append('text')
    .attr('id', 'centerText1')
    .attr('d', <any>centerArea)
    .attr('dy', '-1.0em')
    .style('text-anchor', 'middle')
    .style('font-size', '0.7em')
    .text('')
  g.append('text')
    .attr('id', 'centerText2')
    .attr('d', <any>centerArea)
    .attr('dy', '0.3em')
    .style('text-anchor', 'middle')
    .style('font-size', '0.7em')
    .text('')
  g.append('text')
    .attr('id', 'centerText3')
    .attr('d', <any>centerArea)
    .attr('dy', '1.6em')
    .style('text-anchor', 'middle')
    .style('font-size', '0.7em')
    .text()

  drawDays(year, g, radius, lineWidth, calendars.length, outerMargin)
  drawWeeks(
    year,
    g,
    radius,
    lineWidth,
    calendars.length,
    outerMargin,
    baseFontSize
  )
  drawMonths(year, g, radius, lineWidth, calendars.length, outerMargin)

  const zoomed = ({ transform }) => {
    og.attr(
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
  const disabledTextColor = 'text-gray-400'
  const opacity = 'opacity-50'
  const border = 'before:border-0'
  const element = d3.selectAll(`.cal-${name}`)
  const visibility = element.style('visibility')
  visibility == 'visible'
    ? element.style('visibility', 'hidden')
    : element.style('visibility', 'visible')
  document.getElementById(name)?.classList.toggle(disabledTextColor)
  document.getElementById(name)?.classList.toggle(opacity)
  document.getElementById(name)?.classList.toggle(border)
}
