<template lang="pug">
Page(
  :actionBarHidden="actionBarHidden",
  @loaded="onPageLoaded"
)
  Drawer(
    ref="drawer",
    :gestureEnabled="gestureEnabled",
    :leftSwipeDistance="leftSwipeDistance",
    @open="onDrawerChangeState",
    @close="onDrawerChangeState"
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

import {
  YooPropsBase
} from '@quarks'

export default {
  name: 'YooSliderPage',
  atomic: {
    type: 'atom'
  },
  props: {
    actionBarHidden: {
      type: Boolean,
      default: true
    },
    gestureEnabled: {
      type: Boolean,
      default: true
    },
    leftSwipeDistance: {
      type: Number,
      default: 50
    },
    size: {
      type: String,
      default: 'xl',
      validator: value =>
        YooPropsBase.size.options.includes(value)
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
      }[this.size]
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
    onDrawerChangeState ({ eventName, side, duration }) {
      this.$emit('change', {
        eventName,
        side,
        duration
      })
    }
  }
}
</script>

<style scoped lang="sass">
</style>
