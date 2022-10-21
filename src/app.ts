import * as d3 from 'd3'
import { fetchCalenderData } from './calender'
import { Calender, Interval } from './models'
import { setInterval } from './state'

const calenders: Calender[] = [
  { name: 'nordic', color: '#FCC698', id: '' },
  {
    name: 'stockholm',
    color: '#F2B4C0',
    id: 'c_2fe0659714526532f92a40cb05e4110bac72323435baf9d0b7352920f58620b4@group.calendar.google.com'
  },
  { name: 'copenhagen', color: '#F2B8F9', id: '' },
  { name: 'oslo', color: '#D4B8F7', id: '' },
  { name: 'helsinki', color: '#BED0FA', id: '' },
  { name: 'ey', color: '#FEFEC3', id: '' }
]

const intervals: Interval[] = [
  { name: 'days', number: 365 },
  { name: 'weeks', number: 52 },
  { name: 'months', number: 12 }
]

const calenderEl = document.getElementById('calender')
const width = calenderEl?.clientWidth || 600
const height = calenderEl?.clientHeight || 600
const radius = Math.min(width, height) / 2
const centerX = width / 2
const centerY = height / 2
const lineWidth = radius / (calenders.length + 2)

const svg = d3
  .select('#calender')
  .append('g')
  .attr('transform', `translate(${centerX},${centerY})`)

export const init = async () => {
  
  for (const [index, calander] of calenders.entries()) {
    const temp = d3
      .arc()
      .innerRadius(radius - lineWidth * (index + 1))
      .outerRadius(radius - lineWidth * index)
      .startAngle(100)
      .endAngle(2 * 180)
    svg
      .append('path')
      .attr('class', `cal-${calander.name}`)
      .attr('d', <any>temp)
      .attr('fill', calander.color)

    if (calander.id) {
      console.log('calnder id not empty', calander.id)
      const data = await fetchCalenderData(calenders[1].id)
      for (const item of data.items) {
        console.log(item.summary, item.start, item.end)
      }

    }
  }

  for (const interval of intervals) {
    console.log(interval.name)
    const radialLines = interval.number
    const angle = (2 * Math.PI) / radialLines
    const startrads = 0.5
    let radialPoints: number[][] = []
    for (let k = startrads; k < radialLines; k++) {
      let x1 = (radius - lineWidth * calenders.length) * Math.cos(angle * k)
      let y1 = (radius - lineWidth * calenders.length) * Math.sin(angle * k)
      let x2 = radius * Math.cos(angle * k)
      let y2 = radius * Math.sin(angle * k)
      radialPoints.push([x1, y1, x2, y2])
    }

    svg
      .selectAll(`.${interval.name}`)
      .data(radialPoints)
      .enter()
      .append('svg:line')
      .attr('x1', function (p) {
        return p[0]
      })
      .attr('y1', function (p) {
        return p[1]
      })
      .attr('x2', function (p) {
        return p[2]
      })
      .attr('y2', function (p) {
        return p[3]
      })
      .attr('stroke', '#6B6B6B')
      .attr('class', interval.name)
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

export const toggleCalender = (name: string) => {
  const selectClass = 'text-gray-400'
  const element = d3.select(`.cal-${name}`)
  const visibility = element.style('visibility')
  console.log(visibility)
  visibility == 'visible'
    ? element.style('visibility', 'hidden')
    : element.style('visibility', 'visible')
  document.getElementById(name)?.classList.toggle(selectClass)
}
