import * as d3 from 'd3'
import { Calender } from './models'

const calenders: Calender[] = [
  { name: 'nordic', color: '#FCC698' },
  { name: 'stockholm', color: '#F2B4C0' },
  { name: 'copenhagen', color: '#F2B8F9' },
  { name: 'oslo', color: '#D4B8F7' },
  { name: 'helsinki', color: '#BED0FA' },
  { name: 'ey', color: '#FEFEC3' }
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
