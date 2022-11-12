/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from 'd3'
import {
  daysIntoYear,
  daysInYear,
  dayInMonth,
  monthName,
  weekOneStartOffset,
  numberOfWeeksInYear,
  padWithZero
} from './utils'

export const drawMonths = (
  year: number,
  svg: any,
  radius: number,
  innerMargin: number
) => {
  const name = 'months'
  const numberOfMonths = 12
  const lines: any[] = []
  const labelLines: any[] = []
  for (let n = 1; n <= numberOfMonths; n++) {
    const angle =
      (2 * Math.PI) /
      (daysInYear(year) / daysIntoYear(new Date(year, n, 0), year))
    const angle2 =
      (2 * Math.PI) /
      (daysInYear(year) / daysIntoYear(new Date(year, n - 1, 0), year))
    const x1 = innerMargin * Math.cos(angle)
    const y1 = innerMargin * Math.sin(angle)
    const x2 = radius * Math.cos(angle2)
    const y2 = radius * Math.sin(angle2)
    const x3 = radius * Math.cos(angle)
    const y3 = radius * Math.sin(angle)

    lines.push(
      d3.line()([
        [x1, y1],
        [x3, y3]
      ])
    )
    labelLines.push(
      d3.line()([
        [x2, y2],
        [x3, y3]
      ])
    )
  }

  //draw lines
  const group = svg.append('g')
  group
    .selectAll(`.${name}`)
    .data(lines)
    .enter()
    .append('path')
    .attr('d', (_d: any, i: number) => lines[i])
    .attr('stroke', '#000')
    .attr('stroke-width', '0.06em')
    .attr('transform', 'rotate(-90)')
    .attr('class', `interval-${name}`)

  //draw outer circle
  const outerCircle = d3
    .arc()
    .innerRadius(radius)
    .outerRadius(radius)
    .startAngle(0)
    .endAngle(2 * Math.PI)
  group
    .append('path')
    .attr('d', <any>outerCircle)
    .attr('stroke', 'black')
    .attr('id', 'outerCircle')
    .attr('class', `interval-${name}`)
    .style('stroke-width', '0.01em')

  //draw labels
  group
    .selectAll(`.${name}_label`)
    .data(labelLines)
    .enter()
    .append('path')
    .attr('id', (_d: any, i: number) => `${name}_${i + 1}`)
    .attr('d', (_d: any, i: number) => labelLines[i])
    .attr('stroke', '#f00')
    .style('opacity', 0)
    .attr('class', `interval-${name}`)
    .attr('transform', 'rotate(-90)')
  for (const [i] of labelLines.entries()) {
    group
      .append('text')
      .attr('dy', '0.3em')
      .append('textPath')
      .attr('xlink:href', `#${name}_${i + 1}`)
      .style('text-anchor', 'middle')
      .style('font-size', '0.7em')
      .attr('startOffset', '50%')
      .attr('class', `interval-${name}`)
      .text(monthName(i))
  }
}

export const drawWeeks = (
  year: number,
  svg: any,
  radius: number,
  innerMargin: number,
  outerMargin: number
) => {
  const name = 'weeks'
  const numberOfWeeks = numberOfWeeksInYear(year)
  const labelMargin = innerMargin * 0.82
  const weekOneOffset = -90 + weekOneStartOffset(year)

  const lines: any[] = []
  const labelLines: any[] = []
  for (let n = 0; n <= numberOfWeeks; n++) {
    const angle = (2 * Math.PI) / (daysInYear(year) / 7)
    const x1 = (radius - outerMargin) * Math.cos(angle * n)
    const y1 = (radius - outerMargin) * Math.sin(angle * n)
    const x2 = innerMargin * Math.cos(angle * n)
    const y2 = innerMargin * Math.sin(angle * n)
    const x3 = labelMargin * Math.cos(angle * n)
    const y3 = labelMargin * Math.sin(angle * n)
    lines.push(
      d3.line()([
        [x1, y1],
        [x2, y2]
      ])
    )
    if (n >= Math.ceil(numberOfWeeks / 2)) {
      labelLines.push(
        d3.line()([
          [x2, y2],
          [x3, y3]
        ])
      )
    } else {
      labelLines.push(
        d3.line()([
          [x3, y3],
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
    .attr('stroke', '#808080')
    .style('opacity', (_d: any, i: number) => (i === lines.length - 1 ? 0 : 1)) //hide the last week since its into the next year
    .attr('stroke-width', '0.03em')
    .attr('transform', `rotate(${weekOneOffset})`)
    .attr('class', `interval-${name}`)

  //draw labels
  group
    .selectAll(`.${name}_label`)
    .data(labelLines)
    .enter()
    .append('path')
    .attr('id', (_d: any, i: number) => `${name}_${i}`)
    .attr('d', (_d: any, i: number) => labelLines[i])
    .attr('stroke', '#808080')
    .attr('stroke-width', '0.03em')
    .style('opacity', (_d: any, i: number) =>
      i === labelLines.length - 1 ? 0 : 1
    ) //hide the last week since its into the next year
    .attr('class', `interval-${name}`)
    .attr('transform', `rotate(${weekOneOffset})`)
  for (let i = 0; i <= labelLines.length; i++) {
    group
      .append('text')
      .attr('dy', i >= numberOfWeeks / 2 ? '0.2em' : '-0.1em')
      .append('textPath')
      .attr('xlink:href', `#${name}_${i}`)
      .style('text-anchor', i >= numberOfWeeks / 2 ? 'start' : 'end')
      .style(
        'alignment-baseline',
        i >= numberOfWeeks / 2 ? 'mathematical' : 'alphabetic'
      )
      .style('font-size', '0.45em')
      .style('font-variant-numeric', 'tabular-nums')
      .attr('startOffset', i >= numberOfWeeks / 2 ? '20%' : '80%')
      .attr('class', `interval-${name}`)
      .text(i === 0 ? '' : padWithZero(i)) //hide the last week since its into the next year
  }
}

export const drawDays = (
  year: number,
  svg: any,
  radius: number,
  innerMargin: number,
  outerMargin: number
) => {
  const name = 'days'
  const numberOfDays = daysInYear(year)
  const lines: any[] = []
  const labelLines: any[] = []
  for (let n = 0; n < numberOfDays; n++) {
    const angle = (2 * Math.PI) / numberOfDays
    const x1 = (radius - outerMargin) * Math.cos(angle * n)
    const y1 = (radius - outerMargin) * Math.sin(angle * n)
    const x2 = innerMargin * Math.cos(angle * n)
    const y2 = innerMargin * Math.sin(angle * n)
    const x3 = radius * Math.cos(angle * n)
    const y3 = radius * Math.sin(angle * n)
    lines.push(
      d3.line()([
        [x1, y1],
        [x2, y2]
      ])
    )
    if (n > numberOfDays / 2) {
      labelLines.push(
        d3.line()([
          [x3, y3],
          [x1, y1]
        ])
      )
    } else {
      labelLines.push(
        d3.line()([
          [x1, y1],
          [x3, y3]
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
    .attr('stroke', '#C8C8C8')
    .attr('stroke-width', '0.02em')
    .attr('transform', 'rotate(-90)')
    .attr('class', `interval-${name}`)

  //draw labels
  group
    .selectAll(`.${name}_label`)
    .data(labelLines)
    .enter()
    .append('path')
    .attr('id', (_d: any, i: number) => `${name}_${i}`)
    .attr('d', (_d: any, i: number) => labelLines[i])
    .attr('stroke', 'black')
    .style('opacity', 0)
    .attr('class', `interval-${name}`)
    .attr('transform', 'rotate(-90)')
  for (const [i] of labelLines.entries()) {
    group
      .append('text')
      .attr('dy', i >= numberOfDays / 2 ? '0.15em' : '-0.05em')
      .append('textPath')
      .attr('xlink:href', `#${name}_${i}`)
      .style('text-anchor', i >= numberOfDays / 2 ? 'end' : 'start')
      .style(
        'alignment-baseline',
        i >= numberOfDays / 2 ? 'mathematical' : 'alphabetical'
      )
      .style('font-size', '0.35em')
      .style('font-variant-numeric', 'tabular-nums')
      .attr('startOffset', i >= numberOfDays / 2 ? '98%' : '2%')
      .attr('class', `interval-${name}`)
      .text(padWithZero(dayInMonth(i, year)))
  }
}
