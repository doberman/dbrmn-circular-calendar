import * as d3 from 'd3'

import { fetchCalendarData } from './calendar'
import { calendars, year } from './config'
import { drawDays, drawMonths, drawWeeks } from './intervals'
import { daysIntoYear, daysToRadians } from './utils'

export const setupCalendars = async (calendarEl: HTMLElement) => {
  const width = calendarEl?.clientWidth || 600
  const height = calendarEl?.clientHeight || 600
  const radius = Math.min(width, height) / 2
  const centerX = width / 2
  const centerY = height / 2
  const outerMargin = (radius / calendars.length) * 1.1
  const innerMargin = (radius / calendars.length) * 1.2
  const lineWidth = (radius - outerMargin - innerMargin) / calendars.length

  const svg = d3.select(calendarEl).attr('viewBox', [0, 0, width, height])

  const og = svg.append('g')

  const g = og.append('g').attr('transform', `translate(${centerX},${centerY})`)

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

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
            .on('click', function () {
              d3.select('#centerArea').style('fill', calendar.eventColor)
              d3.select('#centerText1').text(item.summary)
              d3.select('#centerText1').attr('dy', -14)
              d3.select('#centerText2').text(item.location)
              d3.select('#centerText2').attr('dy', 2)
              let dateString = `${startDate.getDate()}/${
                startDate.getMonth() + 1
              } - ${endDate.getDate()}/${endDate.getMonth() + 1}`
              if (
                endDate.valueOf() - startDate.valueOf() <=
                24 * 60 * 60 * 1000
              ) {
                dateString = `${startDate.getDate()}/${
                  startDate.getMonth() + 1
                }`
              }
              d3.select('#centerText3').text(dateString)
              d3.select('#centerText3').attr('dy', 18)
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
            .on('click', function () {
              d3.select('#centerArea').style('fill', 'white')
              d3.select('#centerText1').text(item.summary)
              d3.select('#centerText1').attr('dy', -4)
              let dateString = `${startDate.getDate()}/${
                startDate.getMonth() + 1
              } - ${endDate.getDate()}/${endDate.getMonth() + 1}`
              if (
                endDate.valueOf() - startDate.valueOf() <=
                24 * 60 * 60 * 1000
              ) {
                dateString = `${startDate.getDate()}/${
                  startDate.getMonth() + 1
                }`
              }
              d3.select('#centerText2').text(dateString)
              d3.select('#centerText2').attr('dy', 12)
              d3.select('#centerText3').text('')
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

  drawMonths(g, radius, lineWidth, calendars.length, outerMargin)
  drawWeeks(g, radius, lineWidth, calendars.length, outerMargin)
  drawDays(g, radius, lineWidth, calendars.length, outerMargin)

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
