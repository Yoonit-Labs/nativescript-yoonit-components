import {
  Screen
} from '@nativescript/core'

const dimensions = nativeView => {
  if (!nativeView) {
    return
  }

  const {
    width,
    height
  } = nativeView.getActualSize()
  const {
    widthDIPs,
    heightDIPs
  } = Screen.mainScreen

  const viewSize = {
    width: Number(width.toFixed(2)),
    height: Number(height.toFixed(2)),
    center: {
      x: Number(width.toFixed(2)) / 2,
      y: Number(height.toFixed(2)) / 2
    }
  }

  const screenSize = {
    width: Number(widthDIPs.toFixed(2)),
    height: Number(heightDIPs.toFixed(2)),
    center: {
      x: Number(widthDIPs.toFixed(2)) / 2,
      y: Number(heightDIPs.toFixed(2)) / 2
    }
  }

  return {
    viewSize,
    screenSize
  }
}

export default {
  install: Vue => {
    Vue.prototype.$yoo = {
      ...Vue.prototype.$yoo,
      dimensions
    }
  }
}
