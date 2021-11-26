<template lang="pug">
Page.yoonit-scroll-page(
  v-bind="takeAttributes.root"
  v-on="takeListeners.root"
  width="100%"
  height="100%"
)
  FlexboxLayout.yoonit-scroll-page__container(
    flexDirection="column"
    justifyContent="flex-start"
    width="100%"
    height="100%"
  )
    YooHeader.container__header(
      v-if="takeHeaderVisibility"
      v-bind="takeAttributes.header"
      v-on="takeListeners.header"
    )
      slot(
        :slot="YOO_HEADER_ENUMS.SLOT_LEFT"
        :name="doHeaderSlotName(YOO_HEADER_ENUMS.SLOT_LEFT)"
      )

      slot(
        :slot="YOO_HEADER_ENUMS.SLOT_CENTER"
        :name="doHeaderSlotName(YOO_HEADER_ENUMS.SLOT_CENTER)"
      )

      slot(
        :slot="YOO_HEADER_ENUMS.SLOT_RIGHT"
        :name="doHeaderSlotName(YOO_HEADER_ENUMS.SLOT_RIGHT)"
      )

    ScrollView.container__slot(
      v-bind="takeAttributes.view"
      :flexGrow="1"
    )
      StackLayout.slot__content(
        :class="takeSlotClasses"
      )
        slot(
          :name="LOCAL_ENUMS.SLOT_CONTENT"
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

import {
  YooUpperFirst,
  YooSplitComponentObject
} from '../../bosons'
import { GLOBAL_ENUMS } from '../../quarks'
import { YooHeader } from '../../molecules'
import * as LOCAL_ENUMS from './YooScrollPage.enum'
import * as YOO_HEADER_ENUMS from '../../molecules/YooHeader/YooHeader.enum'

export default {
  name: 'YooScrollPage',
  atomic: {
    type: 'organism'
  },
  props: {
    [LOCAL_ENUMS.HEADER]: {
      type: Boolean,
      default: false
    },
    [GLOBAL_ENUMS.SIZE]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.SIZE].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.SIZE].validator.includes(value)
    }
  },
  data: () => ({
    LOCAL_ENUMS,
    YOO_HEADER_ENUMS
  }),
  components: {
    YooHeader
  },
  computed: {
    takeHeaderVisibility () {
      return this[LOCAL_ENUMS.HEADER]
    },
    takeAttributes () {
      return YooSplitComponentObject(
        this.$attrs,
        [
          'header',
          'view'
        ]
      )
    },
    takeListeners () {
      return YooSplitComponentObject(
        this.$listeners,
        ['header']
      )
    },
    takeSlotClasses () {
      const BLOCK = 'slot'

      return `${BLOCK}__content--${this[GLOBAL_ENUMS.SIZE]}`
    }
  },
  methods: {
    doHeaderSlotName (name) {
      return `header${YooUpperFirst(name)}`
    }
  }
}
</script>

<style scoped lang="sass" src="./YooScrollPage.sass"/>
