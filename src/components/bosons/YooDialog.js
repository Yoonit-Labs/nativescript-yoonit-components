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

import { Dialogs } from '@nativescript/core'

const YooDialog = {
  alert: ({
    title = '',
    message = '',
    okButtonText = 'OK',
    cancelable = true
  }) => {
    return Dialogs
      .alert({
        title,
        message,
        okButtonText,
        cancelable
      })
  }
}

export default {
  install: Vue => {
    Vue.prototype.$yoo = {
      ...Vue.prototype.$yoo,
      dialog: YooDialog
    }
  }
}

export {
  YooDialog
}
