/*
 * @Author: huhaibiao
 * @Date: 2024-12-02 15:29:41
 * @description:
 */
/**唯一id生成 */
export const uuid = (a) =>
  a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid)

export const setDraggable = (dom, exclude = ['todo-list-item', 'item-content']) => {
  let offsetX,
    offsetY,
    isDragging = false

  // 鼠标按下事件
  const downFn = (e) => {
    if (typeof e.target.className !== 'string') return
    const flat = exclude.some((item) => e.target.className?.includes(item))
    if (flat) return
    dom.style.position = 'relative'
    isDragging = true
    // 计算鼠标点击位置与元素左上角的偏移
    offsetX = e.clientX - parseFloat(dom.style.left || 0)
    offsetY = e.clientY - parseFloat(dom.style.top || 0)
  }
  dom.addEventListener('mousedown', downFn)

  // 鼠标移动事件
  const move = (e) => {
    if (typeof e.target.className !== 'string') return
    const flat = exclude.some((item) => e.target.className.includes(item))
    if (flat) return
    if (isDragging) {
      // 更新元素的位置
      dom.style.left = `${e.clientX - offsetX}px`
      dom.style.top = `${e.clientY - offsetY}px`
    }
  }
  dom.addEventListener('mousemove', move)

  // 鼠标松开事件
  const upFn = () => {
    isDragging = false
  }
  dom.addEventListener('mouseup', upFn)

  return () => {
    dom.removeEventListener('mousedown', downFn)
    dom.removeEventListener('mousemove', move)
    dom.removeEventListener('mouseup', upFn)
  }
}
