import * as d3 from 'd3'
import { Calender, Interval } from './models'

const calenders: Calender[] = [
  { name: 'nordic', color: '#FCC698' },
  { name: 'stockholm', color: '#F2B4C0' },
  { name: 'copenhagen', color: '#F2B8F9' },
  { name: 'oslo', color: '#D4B8F7' },
  { name: 'helsinki', color: '#BED0FA' },
  { name: 'ey', color: '#FEFEC3' }
]

const intervals: Interval[] = [
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

export const init = () => {
  for (const [index, calander] of calenders.entries()) {
    const temp = d3
      .arc()
      .innerRadius(radius - lineWidth * (index + 1))
      .outerRadius(radius - lineWidth * index)
      .startAngle(100)
      .endAngle(2 * 180)
    svg
      .append('path')
      .attr('class', calander.name)
      .attr('d', <any>temp)
      .attr('fill', calander.color)
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
      .attr('stroke', 'grey')
      .attr('class', interval.name)
  }
}

export const toggleIntervals = (name: string) => {
  for (const interval of intervals) {
    if (interval.name == name) {
      d3.selectAll(`.${interval.name}`).style('visibility', 'visible')
    } else {
      d3.selectAll(`.${interval.name}`).style('visibility', 'hidden')
    }
  }
}
