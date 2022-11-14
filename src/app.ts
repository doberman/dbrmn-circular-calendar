import * as d3 from 'd3'

import { calendars } from './config'
import { drawDays, drawMonths, drawWeeks } from './intervals'
import {
  daysIntoYear,
  daysToRadians,
  daysInYear,
  today,
  currentYear
} from './utils'
import { getExcludedCalendars } from './state'
import { initIntervals } from './buttons'
import logo from '../public/preferable-logo.svg'

export const setupCalendars = async (data: any) => {
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

  const year = currentYear()

  const svg = d3.select(calendarEl).attr('viewBox', [0, 0, width, height])

  //create groups for layering
  const zoomableGroup = svg.append('g').attr('id', 'zoomableGroup')
  const rootGroup = zoomableGroup
    .append('g')
    .attr('id', 'rootGroup')
    .attr('transform', `translate(${centerX},${centerY})`)
    .attr('font-size', `${baseFontSize}%`)
    .on('click', () => {
      resetCenter()
    })
  const backgroundAndHolidaysGroup = rootGroup
    .append('g')
    .attr('id', 'backgroundAndHolidaysGroup')
  const intervalsGroup = rootGroup.append('g').attr('id', 'intervalsGroup')
  const eventsGroup = rootGroup.append('g').attr('id', 'eventsGroup')
  const infoGroup = rootGroup.append('g').attr('id', 'infoGroup')

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
    backgroundAndHolidaysGroup
      .append('path')
      .attr('class', `cal-${calendar.name}`)
      .attr('d', <any>temp)
      .attr('fill', calendar.color)
      .attr('opacity', 0.5)

    //draw holidays
    if (calendar.holidayId) {
      const calendarData = data.find(
        (el: { key: string }) => el.key === calendar.holidayId
      )
      if (calendarData) {
        for (const item of calendarData.events) {
          const startDate = new Date(item.start.date)
          const endDate = new Date(item.end.date)
          const event = d3
            .arc()
            .innerRadius(radius - outerMargin - lineWidth * index)
            .outerRadius(radius - outerMargin - lineWidth * (index + 1))
            .startAngle(daysToRadians(daysIntoYear(startDate, year), year))
            .endAngle(daysToRadians(daysIntoYear(endDate, year), year))
          backgroundAndHolidaysGroup
            .append('path')
            .attr('class', `cal-${calendar.name}`)
            .attr('id', item.id)
            .attr('d', <any>event)
            .attr('fill', 'white')
            .style('cursor', 'pointer')
            .on('click', (event) => {
              drawCenterText(
                item.id,
                item.summary,
                '',
                startDate,
                endDate,
                'white'
              )
              event.stopPropagation()
            })

          //draw event line
          const angle =
            ((2 * Math.PI) / daysInYear(year)) *
              (daysIntoYear(startDate, year) - 1) -
            Math.PI / 2
          const x1 =
            (radius - outerMargin - lineWidth * (index + 1)) * Math.cos(angle)
          const y1 =
            (radius - outerMargin - lineWidth * (index + 1)) * Math.sin(angle)
          const x2 = innerMargin * 0.6 * Math.cos(angle)
          const y2 = innerMargin * 0.6 * Math.sin(angle)
          infoGroup
            .append('line')
            .attr('id', `line-${item.id}`)
            .attr('class', 'eventLine')
            .attr('x1', x1)
            .attr('y1', y1)
            .attr('x2', x2)
            .attr('y2', y2)
            .style('stroke', 'black')
            .style('stroke-width', '0.05em')
            .style('visibility', 'hidden')
        }
      }
    }

    //draw events
    if (calendar.calendarId) {
      const calendarData = data.find(
        (el: { key: string }) => el.key === calendar.calendarId
      )
      if (calendarData) {
        for (const item of calendarData.events) {
          const startDate = new Date(item.start.date)
          const endDate = new Date(item.end.date)
          const event = d3
            .arc()
            .innerRadius(radius - outerMargin - lineWidth * index)
            .outerRadius(radius - outerMargin - lineWidth * (index + 1))
            .startAngle(daysToRadians(daysIntoYear(startDate, year), year))
            .endAngle(daysToRadians(daysIntoYear(endDate, year), year))
          eventsGroup
            .append('path')
            .attr('class', `cal-${calendar.name}`)
            .attr('id', item.id)
            .attr('d', <any>event)
            .attr('fill', calendar.eventColor)
            .style('stroke', 'black')
            .style('stroke-width', '0.05em')
            .style('cursor', 'pointer')
            .on('click', (event) => {
              drawCenterText(
                item.id,
                item.summary,
                item.location,
                startDate,
                endDate,
                calendar.eventColor
              )
              event.stopPropagation()
            })

          //draw event line
          const angle =
            ((2 * Math.PI) / daysInYear(year)) *
              (daysIntoYear(startDate, year) - 1) -
            Math.PI / 2
          const x1 =
            (radius - outerMargin - lineWidth * (index + 1)) * Math.cos(angle)
          const y1 =
            (radius - outerMargin - lineWidth * (index + 1)) * Math.sin(angle)
          const x2 = innerMargin * 0.6 * Math.cos(angle)
          const y2 = innerMargin * 0.6 * Math.sin(angle)
          infoGroup
            .append('line')
            .attr('id', `line-${item.id}`)
            .attr('class', 'eventLine')
            .attr('x1', x1)
            .attr('y1', y1)
            .attr('x2', x2)
            .attr('y2', y2)
            .style('stroke', 'black')
            .style('stroke-width', '0.05em')
            .style('visibility', 'hidden')
        }
      }
    }
  }

  //draw today
  const todayAngle =
    ((2 * Math.PI) / daysInYear(year)) * (daysIntoYear(today(), year) - 0.5) -
    Math.PI / 2
  const x1 = (radius - outerMargin * 0.6) * Math.cos(todayAngle)
  const y1 = (radius - outerMargin * 0.6) * Math.sin(todayAngle)
  const now = d3
    .symbol()
    .type(d3.symbolTriangle)
    .size(outerMargin * 1.5)
  intervalsGroup
    .append('path')
    .attr('d', now)
    .attr('fill', 'black')
    .attr(
      'transform',
      `translate(${x1}, ${y1}) rotate(${(todayAngle * 180) / Math.PI - 90})`
    )

  //draw center area
  const centerArea = d3
    .arc()
    .innerRadius(0)
    .outerRadius(innerMargin * 0.6)
    .startAngle(0)
    .endAngle(2 * Math.PI)
  infoGroup
    .append('path')
    .attr('id', 'centerArea')
    .attr('d', <any>centerArea)
    .attr('transform', 'rotate(-90)')
    .attr('fill', 'white')
    .attr('opacity', 0.7)
    .style('stroke', 'black')
    .style('stroke-width', '0.05em')
    .style('visibility', 'hidden')
  infoGroup
    .append('image')
    .attr('id', 'centerLogo')
    .attr('xlink:href', logo)
    .attr('width', innerMargin * 1.45)
    .attr('height', innerMargin * 1.45)
    .attr('x', (-innerMargin * 1.45) / 2)
    .attr('y', (-innerMargin * 1.45) / 2)
    .attr('transform', 'rotate(-76)')
  infoGroup
    .append('text')
    .attr('id', 'centerText1')
    .attr('d', <any>centerArea)
    .attr('dy', '-1.0em')
    .style('text-anchor', 'middle')
    .style('font-size', '0.7em')
    .text('')
  infoGroup
    .append('text')
    .attr('id', 'centerText2')
    .attr('d', <any>centerArea)
    .attr('dy', '0.3em')
    .style('text-anchor', 'middle')
    .style('font-size', '0.7em')
    .text('')
  infoGroup
    .append('text')
    .attr('id', 'centerText3')
    .attr('d', <any>centerArea)
    .attr('dy', '1.6em')
    .style('text-anchor', 'middle')
    .style('font-size', '0.7em')
    .text()

  //draw intervals
  drawDays(year, intervalsGroup, radius, innerMargin, outerMargin)
  drawWeeks(year, intervalsGroup, radius, innerMargin, outerMargin)
  drawMonths(year, intervalsGroup, radius, innerMargin)
  initIntervals()

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
  id: string,
  text: string,
  location: string,
  startDate: Date,
  endDate: Date,
  color: string
) => {
  d3.select('#centerLogo').style('visibility', 'hidden')
  d3.selectAll('.eventLine').style('visibility', 'hidden')
  d3.select('#centerArea').style('visibility', 'visible')
  d3.select('#centerArea').style('fill', color)
  d3.select('#centerText1').text(text)
  d3.select(`#line-${id}`).style('visibility', 'visible')

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

const resetCenter = () => {
  d3.select('#centerText1').text('')
  d3.select('#centerText2').text('')
  d3.select('#centerText3').text('')
  d3.select('#centerArea').style('visibility', 'hidden')
  d3.selectAll('.eventLine').style('visibility', 'hidden')
  d3.select('#centerLogo').style('visibility', 'visible')
}
