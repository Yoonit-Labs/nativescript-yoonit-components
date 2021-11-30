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

import { LoadingIndicator } from '@nstudio/nativescript-loading-indicator'

const loadingIndicator = new LoadingIndicator()

const YooLoading = {
  _visible: false,
  _timeout: null,

  show (options) {
    if (this._visible) {
      return
    }

    this._visible = true

    this._timeout = setTimeout(
      () => this.hide(),
      5000
    )

    return loadingIndicator
      .show({
        userInteractionEnabled: false,
        dimBackground: true,
        hideBezel: true,
        color: '#FFF',
        margin: 24,
        mode: 0,
        ...options
      })
  },

  delay (delay = 0) {
    if (delay > 0) {
      return new Promise(resolve => {
        return setTimeout(
          () => {
            this.hide()
            resolve()
          },
          delay
        )
      })
    }
  },

  hide () {
    this._visible = false
    clearTimeout(this._timeout)
    return loadingIndicator.hide()
  }
}

export default {
  install: Vue => {
    Vue.prototype.$yoo = {
      ...Vue.prototype.$yoo,
      loading: YooLoading
    }
  }
}

export {
  YooLoading
}
