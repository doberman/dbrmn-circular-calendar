const margin = { top: 25, right: 25, bottom: 25, left: 25 },
  width = 950 - margin.left - margin.right,
  height = 950 - margin.top - margin.bottom

// Build Day Numbers
function pad(n: string | number) {
  return n < 10 ? '0' + n : n
}

function getDaysArray(year: number) {
  let numDaysInMonth: number[],
    daysInWeek: string[],
    daysIndex: {
      [x: string]: any
      Sun?: number
      Mon?: number
      Tue?: number
      Wed?: number
      Thu?: number
      Fri?: number
      Sat?: number
    },
    index: number,
    i: number,
    l: number,
    daysArray: string[]

  numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  daysInWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  daysIndex = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

  daysArray = []

  for (let m = 0; m < 12; m++) {
    index = daysIndex[new Date(year, m, 1).toString().split(' ')[0]]
    for (i = 0, l = numDaysInMonth[m]; i < l; i++) {
      daysArray.push(pad(i + 1) + ' ' + daysInWeek[index++])
      if (index == 7) index = 0
    }
  }
  return daysArray
}

const year = 2022

const days = getDaysArray(year)

const svg = d3
    .select('body')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g'),
  pi = Math.PI

const arc = d3
  .arc()
  .innerRadius(850)
  .outerRadius(851)
  .startAngle(0)
  .endAngle(-pi * 1.99999)

const path = svg
  .append('path')
  .attr('d', arc)
  .attr('id', 'path1')
  .attr('transform', 'translate(900,900)')
  .attr('fill', '#f00')

// Draw lines
function daysInYear(year: number) {
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    // Leap year
    return 366
  } else {
    // Not a leap year
    return 365
  }
}

var dt = new Date(year + '/01/01')
var day = dt.getDay()
var startrads = ((2 * pi) / daysInYear(year)) * day
//---center point(width,height)---
var cx = width
var cy = height
var r = 850 //--radius--
var radialLines = 52 //---create 52 lines---
var angle = (2 * Math.PI) / radialLines //---angle between each line---
var radialPoints = []
for (var k = startrads; k < radialLines; k++) {
  var x2 = r * Math.cos(angle * k) + cx
  var y2 = r * Math.sin(angle * k) + cy
  radialPoints.push([x2, y2])
}
//---your d3 SVG parent element---
svg
  .selectAll('line') //---an empty selection---
  .data(radialPoints)
  .enter()
  .append('svg:line')
  .attr('x1', cx)
  .attr('y1', cy)
  .attr('x2', function (p) {
    return p[0]
  })
  .attr('y2', function (p) {
    return p[1]
  })
  .attr('stroke', 'grey')

svg
  .selectAll('text')
  .data(days)
  .enter()
  .append('text')
  .attr('transform', function (d, i) {
    return (
      'translate(' +
      (850 * Math.cos((i * 2 * Math.PI) / 365) + width) +
      ',' +
      (850 * Math.sin((i * 2 * Math.PI) / 365) + height) +
      ')rotate(' +
      (i * 360) / 365 +
      ')'
    )
  })
  .text(function (d) {
    return d
  })
