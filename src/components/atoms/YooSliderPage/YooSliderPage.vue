<template lang="pug">
Page(
  :actionBarHidden="actionBarHidden",
  @loaded="onPageLoaded"
)
  Drawer(
    ref="drawer",
    :gestureEnabled="gestureEnabled",
    :leftSwipeDistance="leftSwipeDistance",
    @open="onDrawerChange",
    @close="onDrawerChange"
  )
    StackLayout(
      ~leftDrawer,
      :width="drawerSize"
    )
      slot(name="left")

    StackLayout(
      ~mainContent
    )
      slot(name="main")
</template>

<script>
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
import { install as installUiDrawer } from '@nativescript-community/ui-drawer'
import DrawerPlugin from '@nativescript-community/ui-drawer/vue'
import * as LOCAL_ENUMS from './YooSliderPage.enum'
import { GLOBAL_ENUMS } from '../../quarks'

installUiDrawer()

Vue.use(DrawerPlugin)

export default {
  name: 'YooSliderPage',
  atomic: {
    type: 'atom'
  },
  props: {
    [LOCAL_ENUMS.ACTION_BAR_HIDDEN]: {
      type: Boolean,
      default: true
    },
    [LOCAL_ENUMS.GESTURE_ENABLED]: {
      type: Boolean,
      default: true
    },
    [LOCAL_ENUMS.LEFT_SWIPE_DISTANCE]: {
      type: Number,
      default: LOCAL_ENUMS.OPTIONS[LOCAL_ENUMS.LEFT_SWIPE_DISTANCE].default
    },
    [GLOBAL_ENUMS.SIZE]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.SIZE].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.SIZE].validator.includes(value)
    }
  },
  computed: {
    drawerSize () {
      return {
        xs: '15%',
        sm: '30%',
        md: '45%',
        lg: '60%',
        xl: '75%',
        hg: '100%'
      }[this[GLOBAL_ENUMS.SIZE]]
    }
  },
  methods: {
    onPageLoaded () {
      const {
        toggle,
        open,
        close
      } = this.$refs.drawer

      this.$emit('loaded', {
        drawer: {
          open,
          close,
          toggle
        }
      })
    },
    onDrawerChange ({ eventName, side, duration }) {
      this.$emit('change', {
        eventName,
        side,
        duration
      })
    }
  }
}
</script>
