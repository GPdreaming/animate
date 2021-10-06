var container = document.querySelector('.container')
var run = document.querySelector('.run')

run.onclick = function () {
  animate(
    container,
    {
      marginLeft: 600,
      width: 300,
      height: 200,
      opacity: 0.1,
      scrollTop: 100
    },
    function () { alert('成功完成运动函数') }
  )
}

function animate (element, elementList, callback) {
  for (let item in elementList) {
    if (item === 'opacity') {
      var current = parseInt(getComputedStyle(element)[item] * 100)
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

  clearInterval(element.timer)
  element.timer = setInterval(function () {
    for (let item in elementList) {
      var current = elementList[item].current
      var target = elementList[item].target

      var speed = (target - current) / 10
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)

      elementList[item].current += speed

      if (Math.abs(target - current) <= Math.abs(speed)) {
        elementList[item].current = target

        delete elementList[item]

        for (let attr in elementList) {
          return false
        }
        clearInterval(element.timer)

        typeof callback === 'function' ? callback() : ''
      } else {
        if (item === 'opacity') {
          element.style[item] = elementList[item].current / 100
        } else if (item.indexOf('scroll') !== -1) {
          element[item] = elementList[item].current
        } else {
          element.style[item] = elementList[item].current + 'px'
        }
      }
    }
  }, 20)
}