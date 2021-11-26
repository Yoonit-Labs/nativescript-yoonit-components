<template lang="pug">
GridLayout.yoonit-header(
  :class="takeRootClasses"
  rows="*"
  columns="1*, 4*, 1*"
)
  FlexboxLayout(
    row="0"
    col="0"
    flexDirection="row"
    justifyContent="center"
  )
    slot(
      :name="LOCAL_ENUMS.SLOT_LEFT"
      @tap="onSlotTap(LOCAL_ENUMS.SLOT_LEFT)"
    )

  FlexboxLayout(
    row="0"
    col="1"
    flexDirection="row"
    justifyContent="center"
  )
    slot(
      :name="LOCAL_ENUMS.SLOT_CENTER"
      @tap="onSlotTap(LOCAL_ENUMS.SLOT_CENTER)"
    )

  FlexboxLayout(
    row="0"
    col="2"
    flexDirection="row"
    alignItems="center"
    justifyContent="center"
  )
    slot(
      :name="LOCAL_ENUMS.SLOT_RIGHT"
      @tap="onSlotTap(LOCAL_ENUMS.SLOT_RIGHT)"
    )
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

import { YooUpperFirst } from '../../bosons'
import { GLOBAL_ENUMS } from '../../quarks'
import * as LOCAL_ENUMS from './YooHeader.enum'

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
  },
  methods: {
    onSlotTap (area) {
      return this.$emit(`header${YooUpperFirst(area)}`)
    }
  }
}
</script>

<style scoped lang="sass" src="./YooHeader.sass"/>
