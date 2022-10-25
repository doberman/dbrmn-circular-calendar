import * as d3 from 'd3'
import { daysIntoYear, getDaysInMonth, getMonthName } from './utils'
import { year } from './config'

export const drawMonths = (
  svg: any,
  radius: number,
  lineWidth: number,
  numberOfCalendars: number
) => {
  const name = 'months'
  const numberOfMonths = 12
  let lines: any[] = []
  let labelLines: any[] = []
  for (let n = 1; n <= numberOfMonths; n++) {
    console.log(n, getDaysInMonth(n, year))
    const angle =
      (2 * Math.PI) / (365 / daysIntoYear(new Date(year, n, 0), year))
    const angle1 = (2 * Math.PI) / numberOfMonths
    console.log(angle, angle1)
    const x1 = (radius - lineWidth * (numberOfCalendars + 1)) * Math.cos(angle)
    const y1 = (radius - lineWidth * (numberOfCalendars + 1)) * Math.sin(angle)
    const x2 = radius * Math.cos(angle)
    const y2 = radius * Math.sin(angle)
    const tx1 = (radius - lineWidth) * Math.cos(angle)
    const ty1 = (radius - lineWidth) * Math.sin(angle)
    lines.push(
      d3.line()([
        [x1, y1],
        [x2, y2]
      ])
    )
    if (n >= numberOfMonths / 2) {
      labelLines.push(
        d3.line()([
          [x2, y2],
          [tx1, ty1]
        ])
      )
    } else {
      labelLines.push(
        d3.line()([
          [tx1, ty1],
          [x2, y2]
        ])
      )
    }
  }

  //draw lines
  const group = svg.append('g')
  group
    .selectAll(`.${name}`)
    .data(lines)
    .enter()
    .append('path')
    .attr('d', (_d: any, i: number) => lines[i])
    .attr('stroke', '#6B6B6B')
    .attr('stroke-width', '2')
    .attr('transform', 'rotate(1)') // TODO figure out a better way to start from top
    .attr('class', name)

  //draw labels
  group
    .selectAll(`.${name}_label`)
    .data(labelLines)
    .enter()
    .append('path')
    .attr('id', (_d: any, i: number) => `${name}_${i + 1}`)
    .attr('d', (_d: any, i: number) => labelLines[i])
    .attr('stroke', '#fff')
    .attr('class', name)
    .attr('transform', 'rotate(-75)')
  for (const [i] of labelLines.entries()) {
    group
      .append('text')
      .append('textPath')
      .attr('xlink:href', `#${name}_${i + 1}`)
      .style('text-anchor', i + 1 >= numberOfMonths / 2 ? 'end' : 'start')
      .style('alignment-baseline', 'middle')
      .style('font-size', '0.8em')
      .style('text-transform', 'capitalize')
      .attr('startOffset', i + 1 >= numberOfMonths / 2 ? '95%' : '5%')
      .attr('class', name)
      .text(getMonthName(i + 1))
  }
}
