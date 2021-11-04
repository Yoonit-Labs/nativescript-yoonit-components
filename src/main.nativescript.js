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

import Vue from 'nativescript-vue'
import Navigator from 'nativescript-vue-navigator'
import { routes } from '@quarks'
import Main from '@/components/Main'
import { i18n } from '@bosons'
import { install as installUiDrawer } from '@nativescript-community/ui-drawer'
import DrawerPlugin from '@nativescript-community/ui-drawer/vue'

installUiDrawer()

Vue.use(DrawerPlugin)
Vue.use(Navigator, { routes })

Vue.config.silent = true

new Vue({
  i18n,
  render: h =>
    h(Main)
})
  .$start()
