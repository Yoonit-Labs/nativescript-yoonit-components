<template lang="pug">
FlexboxLayout.yoonit-header(
  :class="takeRootClasses"
  flexDirection="row"
  justifyContent="space-between"
)
  slot(:name="LOCAL_ENUMS.SLOT_LEFT")
    Label(text="LEFT")

  slot(:name="LOCAL_ENUMS.SLOT_CENTER")
    Label(text="CENTER")

  slot(:name="LOCAL_ENUMS.SLOT_RIGHT")
    Label(text="RIGHT")
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
import * as LOCAL_ENUMS from './YooHeader.enum'
import { GLOBAL_ENUMS } from '../../quarks'

export default {
  name: 'YooHeader',
  atomic: {
    type: 'molecule'
  },
  props: {
    [GLOBAL_ENUMS.SIZE]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.SIZE].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.SIZE].validator.includes(value)
    },
    [GLOBAL_ENUMS.VARIATION]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.VARIATION].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.VARIATION].validator.includes(value)
    },
    [GLOBAL_ENUMS.FILL]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.FILL].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.FILL].validator.includes(value)
    }
  },
  data: () => ({
    LOCAL_ENUMS
  }),
  computed: {
    takeRootClasses () {
      const BLOCK = this.$yooComponentName

      return [
        `${BLOCK}--${this[GLOBAL_ENUMS.SIZE]}`,
        `${BLOCK}--${this[GLOBAL_ENUMS.VARIATION]}`,
        `${BLOCK}--fill-${this[GLOBAL_ENUMS.FILL]}`
      ]
    }
  }
}
</script>

<style scoped lang="sass" src="./YooHeader.sass"/>
