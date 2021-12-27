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

import yooComponents from './components'
import {
  YooComponentName,
  YooIsEnabled,
  YooPreventBack,
  YooDimensions,
  YooCipher,
  YooPromise,
  YooHTTP,
  YooGQLRequester,
  YooLoading,
  YooLoadingPlugin,
  YooDialog,
  YooDialogPlugin,
  YooFaResolver,
  YooPascal,
  YooSplitWords,
  YooSplit,
  YooJoin
} from './components/bosons'

const $yoo = {
  install: Vue => {
    Vue.mixin(YooComponentName)
    Vue.mixin(YooIsEnabled)
    Vue.mixin(YooPreventBack)
    Vue.use(YooDimensions)
    Vue.use(YooLoadingPlugin)
    Vue.use(YooDialogPlugin)
    // Auto-register lib components
    Object
      .entries(yooComponents)
      .forEach(([name, code]) =>
        Vue.component(name, code)
      )
  }
}

export default $yoo

export {
  YooCipher,
  YooPromise,
  YooHTTP,
  YooGQLRequester,
  YooLoading,
  YooDialog,
  YooFaResolver,
  YooPascal,
  YooSplitWords,
  YooSplit,
  YooJoin
}
