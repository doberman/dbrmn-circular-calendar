import * as d3 from 'd3'

const calenderEl = document.getElementById('calender')
const width = calenderEl?.clientWidth || 600
const height = calenderEl?.clientHeight || 600
const radius = Math.min(width, height) / 2
const centerX = width / 2
const centerY = height / 2
const lineWidth = 50

console.log(`Width: ${width}, height: ${height}, radius: ${radius}`)

const svg = d3
  .select('#calender')
  .append('g')
  .attr('transform', `translate(${centerX},${centerY})`)

const arc = d3
  .arc()
  .innerRadius(radius - lineWidth)
  .outerRadius(radius)
  .startAngle(100)
  .endAngle(2 * 180)

svg.append('path').attr('class', 'arc').attr('d', arc).attr('fill', '#FCC698')
