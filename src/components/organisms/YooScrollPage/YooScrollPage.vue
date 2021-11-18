<template lang="pug">
Page.yoonit-scroll-page(
  v-bind="takeAttributes.page"
  v-on="takeListeners"
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
      :class="takeSlotClasses"
      :flexGrow="1"
    )
    //  slot
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
import * as LOCAL_ENUMS from './YooScrollPage.enum'
import { YooHeader } from '../../molecules'
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
      return Object
        .entries(this.$attrs)
        .reduce((acc, [key, value]) => {
          if (key.includes('header')) {
            key = key
              .replace('header', '')
              .toLowerCase()

            return {
              ...acc,
              header: {
                ...acc.header,
                [key]: value
              }
            }
          }

          return {
            ...acc,
            page: {
              ...acc.page,
              [key]: value
            }
          }
        }, {
          page: {},
          header: {}
        })
    },
    takeListeners () {
      return this.$listeners
    },
    takeSlotClasses () {
      const BLOCK = this.$yooComponentName

      return `${BLOCK}__slot--${this[GLOBAL_ENUMS.SIZE]}`
    }
  },
  methods: {
    doHeaderSlotName (name) {
      name = `${name[0].toUpperCase()}${name.slice(1)}`
      return `header${name}`
    }
  }
}
</script>

<style scoped lang="sass" src="./YooScrollPage.sass"/>
