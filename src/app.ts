import * as d3 from 'd3';

import { fetchCalendarData } from './calendar';
import { calendars, year } from './config';
import { drawDays, drawMonths, drawWeeks } from './intervals';
import { daysIntoYear, daysToRadians } from './utils';

export const setupCalendars = async () => {
  const calendarEl = document.getElementById('calendar')
  const width = calendarEl?.clientWidth || 600
  const height = calendarEl?.clientHeight || 600
  const radius = Math.min(width, height) / 2
  const centerX = width / 2
  const centerY = height / 2
  const lineWidth = radius / (calendars.length + 3)
  const svg = d3
    .select('#calendar')
    .append('g')
    .attr('transform', `translate(${centerX},${centerY})`)

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  //draw background
  for (const [index, calendar] of calendars.entries()) {
    const temp = d3
      .arc()
      .innerRadius(radius - lineWidth * (index + 2))
      .outerRadius(radius - lineWidth * (index + 1))
      .startAngle(0)
      .endAngle(2 * Math.PI)
    svg
      .append('path')
      .attr('class', `cal-${calendar.name}`)
      .attr('d', <any>temp)
      .attr('fill', calendar.color)
      .attr('opacity', 0.5)

    //draw today
    const now = d3
      .arc()
      .innerRadius(radius - lineWidth * (index + 2))
      .outerRadius(radius - lineWidth * (index + 1))
      .startAngle(daysToRadians(daysIntoYear(today, year), year))
      .endAngle(daysToRadians(daysIntoYear(tomorrow, year), year))
    svg
      .append('path')
      .attr('class', 'now')
      .attr('d', <any>now)
      .attr('fill', 'white')
      .attr('opacity', 0.5)

    //draw events
    if (calendar.id) {
      const data = await fetchCalendarData(calendar.id, year)
      for (const item of data.items) {
        console.log(item.id, item.summary, item.start, item.end)
        const event = d3
          .arc()
          .innerRadius(radius - lineWidth * (index + 2))
          .outerRadius(radius - lineWidth * (index + 1))
          .startAngle(
            daysToRadians(daysIntoYear(new Date(item.start.date), year), year)
          )
          .endAngle(
            daysToRadians(daysIntoYear(new Date(item.end.date), year), year)
          )

        svg
          .append('path')
          .attr('class', `cal-${calendar.name}`)
          .attr('id', item.id)
          .attr('d', <any>event)
          .attr('fill', calendar.eventColor)
          .append('svg:title')
          .text(function (d) {
            return item.summary
          })
        // svg
        //   .append('text')
        //   .append('textPath')
        //   .attr('xlink:href', `#${item.id}`)
        //   .style('text-anchor', 'start')
        //   .attr('startOffset', '0%')
        //   .text(function (d) {
        //     return item.summary
        //   })
      }
    }
  }
  drawMonths(svg, radius, lineWidth, calendars.length)
  drawWeeks(svg, radius, lineWidth, calendars.length)
  drawDays(svg, radius, lineWidth, calendars.length)
}

export const toggleInterval = (name: string) => {
  const disabledTextColor = 'text-gray-400'
  const opacity='opacity-50'
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
