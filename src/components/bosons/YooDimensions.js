/**
 * ██╗   ██╗ ██████╗  ██████╗ ███╗   ██╗██╗████████╗
 * ╚██╗ ██╔╝██╔═══██╗██╔═══██╗████╗  ██║██║╚══██╔══╝
 *  ╚████╔╝ ██║   ██║██║   ██║██╔██╗ ██║██║   ██║
 *   ╚██╔╝  ██║   ██║██║   ██║██║╚██╗██║██║   ██║
 *    ██║   ╚██████╔╝╚██████╔╝██║ ╚████║██║   ██║
 *    ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝   ╚═╝
 *
 * https://yoonit.dev - about@yoonit.dev
 *
 * NativeScript Yoonit Components
 * NativeScript VueJS Atomic Design System framework
 *
 * Luigui Delyer @ 2021
 */

import {
  Screen,
  Frame,
  Application,
  Utils
} from '@nativescript/core'

const dimensions = nativeView => {
  if (!nativeView ||
      !nativeView.getActualSize) {
    return
  }

  const parseNumber = value => {
    let result = Number(Number.parseFloat(value).toFixed(2))

    if (Number.isNaN(result) ||
        result === null ||
        result === undefined) {
      result = 0
    }

    return result
  }

  const {
    width: widthView,
    height: heightView
  } = nativeView.getActualSize()
  const {
    X: xInWindow,
    y: yInWindow
  } = nativeView.getLocationInWindow()
  const {
    X: xOnScreen,
    y: yOnScreen
  } = nativeView.getLocationOnScreen()

  const {
    width: widthFrame,
    height: heightFrame
  } = Frame.topmost().getActualSize()

  const {
    widthDIPs,
    heightDIPs,
    widthPixels,
    heightPixels
  } = Screen.mainScreen

  const viewSize = {
    width: parseNumber(widthView),
    height: parseNumber(heightView),
    center: {
      x: parseNumber(parseNumber(widthView) / 2),
      y: parseNumber(parseNumber(heightView) / 2)
    },
    position: {
      inWindow: {
        x: parseNumber(xInWindow),
        y: parseNumber(yInWindow)
      },
      onScreen: {
        x: parseNumber(xOnScreen),
        y: parseNumber(yOnScreen)
      }
    }
  }

  const frameSize = {
    width: parseNumber(widthFrame),
    height: parseNumber(heightFrame)
  }

  const screenSize = {
    dpi: {
      width: parseNumber(widthDIPs),
      height: parseNumber(heightDIPs),
      center: {
        x: parseNumber(parseNumber(widthDIPs) / 2),
        y: parseNumber(parseNumber(heightDIPs) / 2)
      }
    },
    pixels: {
      width: parseNumber(widthPixels),
      height: parseNumber(heightPixels),
      center: {
        x: parseNumber(parseNumber(widthPixels) / 2),
        y: parseNumber(parseNumber(heightPixels) / 2)
      }
    }
  }

  const result = {
    viewSize,
    screenSize,
    frameSize
  }

  if (Application.android) {
    const context = Application.android.context
    const resourceID = context.getResources().getIdentifier('status_bar_height', 'dimen', 'android')
    let height = context.getResources().getDimensionPixelSize(resourceID)
    const density = context.getResources().getDisplayMetrics().density
    height = height / density

    result['statusBar'] = {
      height
    }
  }

  return result
}

export default {
  install: Vue => {
    Vue.prototype.$yoo = {
      ...Vue.prototype.$yoo,
      dimensions
    }
  }
}
