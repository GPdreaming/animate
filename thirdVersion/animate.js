var container = document.querySelector('.container')
var run = document.querySelector('.run')

run.onclick = function () {
  animate(
    container,
    {
      marginLeft: 600,
      width: 300,
      height: 200,
      opacity: 1,
      scrollTop: 100
    },
    10,
    function () { alert('成功完成运动函数') }
  )
}

function animate (element, elementList, speed, callback) {
  // 1.第一步遍历传进的集合里面有哪些需要运动的函数
  for (let item in elementList) {
    if (item === 'opacity') {
      var current = parseInt(getComputedStyle(element)[item] * 100 )
      var target = elementList[item] * 100
    } else if (item.indexOf('scroll') !== -1) {
      var current = element[item]
      var target = elementList[item]
    } else {
      var current = parseInt(getComputedStyle(element)[item])
      var target = elementList[item]
    }
    elementList[item] = {
      'current': current,
      'target': target
    }
  }

  console.log(JSON.stringify(elementList));

  clearInterval(elementList.timer)
  // 如果是执行了定时器，没有被清除的话，定时器是不会停止的
  element.timer = setInterval(() => {
    for (let item in elementList) {
      // 遍历每一项，获取到每个属性值的current、target
      var current = elementList[item].current
      var target = elementList[item].target

      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
      // 控制运动的条件：current无限接近于target
      elementList[item].current += speed

      // 运动的临界值判断(当前运动量 >= 目标运动量)
      if (Math.abs(current) >= Math.abs(target)) {
        // 到达终点
        elementList[item].current = target

        // 删除完成运动的item
        delete elementList[item]

        // 有一项运动终止，无需要执行其他运动
        for (let item in elementList) {
          return false
        }

        clearInterval(element.timer)
        typeof callback === 'function' ? callback() : ''
      } else {
        if (item === 'opacity') {
          element.style[item] = elementList[item].current / 100
        } else if (item.indexOf(scroll) !== -1) {
          element[item] = elementList[item].current
        } else {
          element.style[item] = elementList[item].current + 'px'
        }
      }
    }
  }, 20)
}