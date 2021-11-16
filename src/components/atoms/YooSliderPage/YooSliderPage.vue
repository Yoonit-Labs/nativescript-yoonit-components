<template lang="pug">
Page(
  v-on="takeAttributes"
  @loaded="onPageLoaded"
)
  Drawer(
    ref="drawer"
    :gestureEnabled="takeGestureEnabled"
    :leftSwipeDistance="takeLeftSwipeDistance"
    @open="onDrawerChange"
    @close="onDrawerChange"
  )
    StackLayout(
      ~leftDrawer
      :width="takeDrawerSize"
    )
      slot(:name="LOCAL_ENUMS.SLOT_LEFT")

    StackLayout(
      ~mainContent
    )
      slot(:name="LOCAL_ENUMS.SLOT_MAIN")
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
  data: () => ({
    LOCAL_ENUMS
  }),
  computed: {
    takeAttributes () {
      return this.$attrs
    },
    takeGestureEnabled () {
      return this[LOCAL_ENUMS.GESTURE_ENABLED]
    },
    takeLeftSwipeDistance () {
      return this[LOCAL_ENUMS.LEFT_SWIPE_DISTANCE]
    },
    takeDrawerSize () {
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
      } = this.$refs[LOCAL_ENUMS.DRAWER_REF]

      this.$emit(GLOBAL_ENUMS.EVENT_LOADED, {
        [LOCAL_ENUMS.DRAWER_REF]: {
          open,
          close,
          toggle
        }
      })
    },
    onDrawerChange ({ eventName, side, duration }) {
      this.$emit(GLOBAL_ENUMS.EVENT_CHANGE, {
        eventName,
        side,
        duration
      })
    }
  }
}
</script>
