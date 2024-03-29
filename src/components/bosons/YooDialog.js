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
  alert: options =>
    Dialogs
      .alert({
        okButtonText: 'OK',
        cancelable: true,
        ...options
      }),

  confirm: options =>
    Dialogs
      .confirm({
        okButtonText: 'YES',
        cancelButtonText: 'NO',
        neutralButtonText: 'CANCEL',
        cancelable: true,
        ...options
      })
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
