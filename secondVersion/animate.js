var container = document.querySelector('.container')
var run = document.querySelector('.run')

run.onclick = function () {
  animate(
    container, 
    { marginLeft: 750, width: 200 }, 
    10, 
    function () { alert('运动函数完成') }
  )
}

/**
 * 1.获取元素
 * 2.明确元素属性的运动
 *  - top、left、right、bottom -> px
 *  - marginTop、marginLeft、marginRight、marginBottom -> px
 *  - width、height -> px
 *  - opacity -> 0到1
 * 
 * 参数
 *  1.element[object]：元素
 *  2.elementList[object]：元素集合
 *    - {
 *        key名：value值是对应元素要运动到的终点
 *        left: 100,
 *        opacity: 1
 *        width: 400
 *      }
 *  3.speed[number]：元素的速度
 *  4.callback[function]：元素运动完成后可以执行的回调函数
 * 
 * 明确两个点：
 * 元素当前属性值：current
 * 元素运动的目标值：target
 * getComputedStyle(传递DOM元素) -> 返回值：css的属性 {}
 */

function animate (element, elementList, speed, callback) {

  // var current = parseInt(getComputedStyle(element).marginLeft) // 获取元素的当前位置
  // var target = elementList.marginLeft

  // 1.第一步是获取当前元素属性的所有值
  for (let item in elementList) {
    if (item === 'opacity') { // 区分的原因：opacity是没有带px
      var current = parseInt(getComputedStyle(container)[item] * 100)
      console.log(current);
      var target = elementList[item] * 100
    } else { // 属性是带了px单位
      var current  = parseInt(getComputedStyle(container)[item])
      var target = elementList[item]
    }
    elementList[item] = {
      'current': current,
      'target': target
    }
  }

  // 2.获取目标元素的所有属性值
  var timer = setInterval(() => {
    console.log(elementList);
    for (let item in elementList) {
      var current = elementList[item].current
      var target = elementList[item].target
      // 这个元素运动的临界值

      // 这个临界值的判断是有问题的 
      if (current <= target) {
        elementList[item].current += speed
        if (item === 'opacity') {
          element.style[item] = elementList[item].current / 100
        } else {
          element.style[item] = elementList[item].current + 'px'
        }
      } else {
        clearInterval(timer)
        callback()
      }
    }
  }, 20)



}