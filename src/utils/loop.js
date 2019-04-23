/**
 * loop执行循环
 * @function
 */
export default callback => {
  const rAF = cb => (
    window.requestAnimationFrame(cb) ||
    window.webkitRequestAnimationFrame(cb) ||
    window.setTimeout(cb, 1000 / 60)
  )

  const loop = () => {
    callback()
    rAF(loop)
  }
  loop()
}
