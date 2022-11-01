import * as d3 from 'd3'

export const setupZoom = (svgImage: HTMLElement, svgContainer: HTMLElement) => {
  let zoom = d3.zoom().on('zoom', handleZoom)

  function handleZoom(e) {
    d3.select(svgImage).attr('transform', e.transform)
  }

  d3.select('svg').call(zoom)

  //   let viewBox = {
  //     x: 0,
  //     y: 0,
  //     w: svgImage.clientWidth,
  //     h: svgImage.clientHeight
  //   }
  //   svgImage.setAttribute(
  //     'viewBox',
  //     `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`
  //   )
  //   const svgSize = { w: svgImage.clientWidth, h: svgImage.clientHeight }
  //   let isPanning = false
  //   let startPoint = { x: 0, y: 0 }
  //   let endPoint = { x: 0, y: 0 }
  //   let scale = 1

  //   svgContainer.onmousewheel = function (e) {
  //     e.preventDefault()
  //     const w = viewBox.w
  //     const h = viewBox.h
  //     const mx = e.offsetX //mouse x
  //     const my = e.offsetY
  //     const dw = w * Math.sign(e.deltaY) * 0.05
  //     const dh = h * Math.sign(e.deltaY) * 0.05
  //     const dx = (dw * mx) / svgSize.w
  //     const dy = (dh * my) / svgSize.h
  //     viewBox = {
  //       x: viewBox.x + dx,
  //       y: viewBox.y + dy,
  //       w: viewBox.w - dw,
  //       h: viewBox.h - dh
  //     }
  //     scale = svgSize.w / viewBox.w
  //     zoomValue.innerText = `${Math.round(scale * 100) / 100}`
  //     svgImage.setAttribute(
  //       'viewBox',
  //       `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`
  //     )
  //   }

  //   svgContainer.onmousedown = function (e) {
  //     isPanning = true
  //     startPoint = { x: e.x, y: e.y }
  //   }

  //   svgContainer.onmousemove = function (e) {
  //     if (isPanning) {
  //       endPoint = { x: e.x, y: e.y }
  //       const dx = (startPoint.x - endPoint.x) / scale
  //       const dy = (startPoint.y - endPoint.y) / scale
  //       const movedViewBox = {
  //         x: viewBox.x + dx,
  //         y: viewBox.y + dy,
  //         w: viewBox.w,
  //         h: viewBox.h
  //       }
  //       svgImage.setAttribute(
  //         'viewBox',
  //         `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`
  //       )
  //     }
  //   }

  //   svgContainer.onmouseup = function (e) {
  //     if (isPanning) {
  //       endPoint = { x: e.x, y: e.y }
  //       const dx = (startPoint.x - endPoint.x) / scale
  //       const dy = (startPoint.y - endPoint.y) / scale
  //       viewBox = {
  //         x: viewBox.x + dx,
  //         y: viewBox.y + dy,
  //         w: viewBox.w,
  //         h: viewBox.h
  //       }
  //       svgImage.setAttribute(
  //         'viewBox',
  //         `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`
  //       )
  //       isPanning = false
  //     }
  //   }

  //   svgContainer.onmouseleave = function (e) {
  //     isPanning = false
  //   }
}
