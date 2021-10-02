
// 传递参数
/*
*   - 元素本身[element]: object类型
*   - 元素属性[attribute]: string类型
*   - 元素运动的目的地（终点位置）[destination]：number类型
*   - 元素运动的速度[speed]：number类型
*   - 第一个版本的封装
*/
function animate (element, attribute, destination, speed) {
  // element.style[attribute]获取元素的位置：比如marginTop,一定要注意，这里其实获取到的元素是100px,带px单位，要使用parseInt转换类型
  var move = parseInt(element.style[attribute]) || 0
  var timer = setInterval(function () {
    element.style[attribute] = (move += 10) + 'px'
    if (move >= destination) {
      clearInterval(timer)
    }
  }, speed)
}