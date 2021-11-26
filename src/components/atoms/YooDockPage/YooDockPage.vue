<template lang="pug">
Page.yoonit-dock-page(
  v-bind="takeAttributes"
  v-on="takeListeners"
  width="100%"
  height="100%"
)
  DockLayout.yoonit-dock-page__slot(
    stretchLastChild="false"
    :class="takeSlotClasses"
  )
    slot
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

import { GLOBAL_ENUMS } from '../../quarks'

export default {
  name: 'YooDockPage',
  atomic: {
    type: 'atom'
  },
  props: {
    [GLOBAL_ENUMS.SIZE]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.SIZE].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.SIZE].validator.includes(value)
    }
  },
  computed: {
    takeAttributes () {
      return this.$attrs
    },
    takeListeners () {
      return this.$listeners
    },
    takeSlotClasses () {
      const BLOCK = this.$yooComponentName

      return `${BLOCK}__slot--${this[GLOBAL_ENUMS.SIZE]}`
    }
  }
}
</script>

<style scoped lang="sass" src="./YooDockPage.sass"/>
