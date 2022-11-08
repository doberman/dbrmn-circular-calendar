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
  lineWidth: number,
  numberOfCalendars: number,
  outerMargin: number
) => {
  const name = 'months'
  const numberOfMonths = 12
  let lines: any[] = []
  let labelLines: any[] = []
  for (let n = 1; n <= numberOfMonths; n++) {
    const angle =
      (2 * Math.PI) /
      (daysInYear(year) / daysIntoYear(new Date(year, n, 0), year))
    const x1 =
      (radius - outerMargin - lineWidth * numberOfCalendars) * Math.cos(angle)
    const y1 =
      (radius - outerMargin - lineWidth * numberOfCalendars) * Math.sin(angle)
    const x2 = (radius - outerMargin) * Math.cos(angle)
    const y2 = (radius - outerMargin) * Math.sin(angle)
    const x3 = radius * Math.cos(angle)
    const y3 = radius * Math.sin(angle)

    lines.push(
      d3.line()([
        [x1, y1],
        [x3, y3]
      ])
    )
    if (n > numberOfMonths / 2) {
      labelLines.push(
        d3.line()([
          [x3, y3],
          [x2, y2]
        ])
      )
    } else {
      labelLines.push(
        d3.line()([
          [x2, y2],
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
    .attr('stroke', '#000')
    .attr('stroke-width', '0.06em')
    .attr('transform', 'rotate(-90)')
    .attr('class', `interval-${name}`)

  //draw labels
  group
    .selectAll(`.${name}_label`)
    .data(labelLines)
    .enter()
    .append('path')
    .attr('id', (_d: any, i: number) => `${name}_${i + 1}`)
    .attr('d', (_d: any, i: number) => labelLines[i])
    .attr('stroke', '#fff')
    .style('opacity', 0)
    .attr('class', `interval-${name}`)
    .attr('transform', 'rotate(-105)')
  for (const [i] of labelLines.entries()) {
    group
      .append('text')
      .append('textPath')
      .attr('xlink:href', `#${name}_${i + 1}`)
      .style('text-anchor', i >= numberOfMonths / 2 ? 'end' : 'start')
      .style('alignment-baseline', 'middle')
      .style('font-size', '0.7em')
      .style('text-transform', 'capitalize')
      .attr('startOffset', i >= numberOfMonths / 2 ? '80%' : '20%')
      .attr('class', `interval-${name}`)
      .text(monthName(i))
  }
}

export const drawWeeks = (
  year: number,
  svg: any,
  radius: number,
  lineWidth: number,
  numberOfCalendars: number,
  outerMargin: number,
  baseFontSize: number
) => {
  const name = 'weeks'
  const numberOfWeeks = numberOfWeeksInYear(year)
  const labelMargin =
    radius - outerMargin - lineWidth * numberOfCalendars - baseFontSize / 7
  const weekOneOffset = -90 + weekOneStartOffset(year)

  let lines: any[] = []
  let labelLines: any[] = []
  for (let n = 0; n <= numberOfWeeks; n++) {
    const angle = (2 * Math.PI) / (daysInYear(year) / 7)
    const x1 =
      (radius - outerMargin - lineWidth * numberOfCalendars) *
      Math.cos(angle * n)
    const y1 =
      (radius - outerMargin - lineWidth * numberOfCalendars) *
      Math.sin(angle * n)
    const x2 = (radius - outerMargin) * Math.cos(angle * n)
    const y2 = (radius - outerMargin) * Math.sin(angle * n)
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
          [x1, y1],
          [x3, y3]
        ])
      )
    } else {
      labelLines.push(
        d3.line()([
          [x3, y3],
          [x1, y1]
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
    .style('opacity', (_d: any, i: number) => (i == lines.length - 1 ? 0 : 1)) //hide the last week since its into the next year
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
      i == labelLines.length - 1 ? 0 : 1
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
      .text(i == 0 ? '' : padWithZero(i)) //hide the last week since its into the next year
  }
}

export const drawDays = (
  year: number,
  svg: any,
  radius: number,
  lineWidth: number,
  numberOfCalendars: number,
  outerMargin: number
) => {
  const name = 'days'
  const numberOfDays = daysInYear(year)
  let lines: any[] = []
  let labelLines: any[] = []
  for (let n = 0; n < numberOfDays; n++) {
    const angle = (2 * Math.PI) / numberOfDays
    const x1 =
      (radius - outerMargin - lineWidth * numberOfCalendars) *
      Math.cos(angle * n)
    const y1 =
      (radius - outerMargin - lineWidth * numberOfCalendars) *
      Math.sin(angle * n)
    const x2 = (radius - outerMargin) * Math.cos(angle * n)
    const y2 = (radius - outerMargin) * Math.sin(angle * n)
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
          [x2, y2]
        ])
      )
    } else {
      labelLines.push(
        d3.line()([
          [x2, y2],
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
      .append('textPath')
      .attr('xlink:href', `#${name}_${i}`)
      .style('text-anchor', i >= numberOfDays / 2 ? 'end' : 'start')
      .style(
        'alignment-baseline',
        i >= numberOfDays / 2 ? 'text-before-edge' : 'text-after-edge'
      )
      .style('font-size', '0.35em')
      .style('font-variant-numeric', 'tabular-nums')
      .attr('startOffset', i >= numberOfDays / 2 ? '98%' : '2%')
      .attr('class', `interval-${name}`)
      .text(padWithZero(dayInMonth(i, year)))
  }
}
