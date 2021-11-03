import Vue from 'nativescript-vue'
import Navigator from 'nativescript-vue-navigator'
import routes from '@quarks/routes'
import Main from '@/components/Main'
import i18n from '@bosons/i18n'
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
