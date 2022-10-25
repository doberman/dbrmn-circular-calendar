import * as d3 from 'd3'
import { fetchCalendarData } from './calendar'
import { Calendar, Interval } from './models'
import { setInterval } from './state'
import { daysIntoYear, getMonthName, daysToRadians } from './utils'

const year = 2022
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

const calendars: Calendar[] = [
  { name: 'nordic', color: '#FCC698', eventColor: '#EB3723', id: '' },
  {
    name: 'stockholm',
    color: '#F2B4C0',
    eventColor: '#EA3223',
    id: 'c_2fe0659714526532f92a40cb05e4110bac72323435baf9d0b7352920f58620b4@group.calendar.google.com'
  },
  { name: 'copenhagen', color: '#F2B8F9', eventColor: '#E73EF3', id: '' },
  { name: 'oslo', color: '#D4B8F7', eventColor: '#5E28F6', id: '' },
  { name: 'helsinki', color: '#BED0FA', eventColor: '#0C47F5', id: '' },
  { name: 'ey', color: '#FEFEC3', eventColor: '#FEFD54', id: '' }
]

const intervals: Interval[] = [
  { name: 'days', number: 365 },
  { name: 'weeks', number: 52 },
  { name: 'months', number: 12 }
]

const calendarEl = document.getElementById('calendar')
const width = calendarEl?.clientWidth || 600
const height = calendarEl?.clientHeight || 600
const radius = Math.min(width, height) / 2
const centerX = width / 2
const centerY = height / 2
const lineWidth = radius / (calendars.length + 2)
//const lineWidth2 = radius / (calendars.length - 2)

const svg = d3
  .select('#calendar')
  .append('g')
  .attr('transform', `translate(${centerX},${centerY})`)

export const setupCalendars = async () => {
  //draw background
  for (const [index, calendar] of calendars.entries()) {
    const temp = d3
      .arc()
      .innerRadius(radius - lineWidth * (index + 1))
      .outerRadius(radius - lineWidth * index)
      .startAngle(0)
      .endAngle(2 * Math.PI)
    svg
      .append('path')
      .attr('class', `cal-${calendar.name}`)
      .attr('d', <any>temp)
      .attr('fill', calendar.color)

    //draw today
    const now = d3
      .arc()
      .innerRadius(radius - lineWidth * (index + 1))
      .outerRadius(radius - lineWidth * index)
      .startAngle(daysToRadians(daysIntoYear(today, year)))
      .endAngle(daysToRadians(daysIntoYear(tomorrow, year)))
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
          .innerRadius(radius - lineWidth * (index + 1))
          .outerRadius(radius - lineWidth * index)
          .startAngle(
            daysToRadians(daysIntoYear(new Date(item.start.date), year))
          )
          .endAngle(daysToRadians(daysIntoYear(new Date(item.end.date), year)))

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

  //draw intervals
  for (const interval of intervals) {
    const radialLines = interval.number
    const angle = (2 * Math.PI) / radialLines
    const startrads = interval.name == 'days' ? 0.8 : 0 //dont know why this is needed, but days wont align if 0
    let lines: any[] = []
    let textLines: any[] = []
    for (let k = startrads; k < radialLines; k++) {
      let x1 = (radius - lineWidth * calendars.length) * Math.cos(angle * k)
      let y1 = (radius - lineWidth * calendars.length) * Math.sin(angle * k)
      let x2 = radius * Math.cos(angle * k)
      let y2 = radius * Math.sin(angle * k)
      let tx1 =
        (radius - lineWidth * (calendars.length + 2)) * Math.cos(angle * k)
      let ty1 =
        (radius - lineWidth * (calendars.length + 2)) * Math.sin(angle * k)
      lines.push(
        d3.line()([
          [x1, y1],
          [x2, y2]
        ])
      )
      if (k > radialLines / 2) {
        textLines.push(
          d3.line()([
            [x1, y1],
            [tx1, ty1]
          ])
        )
      } else {
        textLines.push(
          d3.line()([
            [tx1, ty1],
            [x1, y1]
          ])
        )
      }
    }

    const group = svg.append('g')
    group
      .selectAll(`.${interval.name}`)
      .data(lines)
      .enter()
      .append('path')
      .attr('d', (d, i) => lines[i])
      .attr('stroke', '#6B6B6B')
      .attr('class', interval.name)

    group
      .selectAll(`.${interval.name}_label`)
      .data(textLines)
      .enter()
      .append('path')
      .attr('id', (d, i) => `${interval.name}_${i}`)
      .attr('d', (d, i) => textLines[i])
      .attr('stroke', '#fff')
      .attr('class', interval.name)
      .attr('transform', 'rotate(-105)')

    //draw labels
    if (interval.name == 'months') {
      for (const [i, line] of textLines.entries()) {
        group
          .append('text')
          .append('textPath')
          .attr('xlink:href', `#${interval.name}_${i}`)
          .style('text-anchor', i > radialLines / 2 ? 'start' : 'end')
          .style('alignment-baseline', 'middle')
          .style('font-size', '0.75em')
          .attr('startOffset', i > radialLines / 2 ? '5%' : '95%')
          .attr('class', interval.name)
          .text(getMonthName(i))
      }
    }
  }
}

export const selectInterval = (name: string) => {
  const selectClasslist = ['ring-2', 'ring-black', 'ring-inset']
  for (const interval of intervals) {
    if (interval.name == name) {
      d3.selectAll(`.${interval.name}`).style('visibility', 'visible')
      document.getElementById(interval.name)?.classList.add(...selectClasslist)
      setInterval(interval.name)
    } else {
      d3.selectAll(`.${interval.name}`).style('visibility', 'hidden')
      document
        .getElementById(interval.name)
        ?.classList.remove(...selectClasslist)
    }
  }
}

export const toggleCalendar = (name: string) => {
  const selectClass = 'text-gray-400'
  const element = d3.selectAll(`.cal-${name}`)
  const visibility = element.style('visibility')
  visibility == 'visible'
    ? element.style('visibility', 'hidden')
    : element.style('visibility', 'visible')
  document.getElementById(name)?.classList.toggle(selectClass)
}
