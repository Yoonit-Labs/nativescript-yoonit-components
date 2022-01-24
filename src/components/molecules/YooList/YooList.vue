<template lang="pug">
ListView.yoonit-list__container(
  :ref="LOCAL_ENUMS.LIST_REF"
  v-on="takeListListeners"
  v-bind="takeListAttributes"
  for="item in $props[GLOBAL_ENUMS.INPUT]"
  separatorColor="transparent"
  @itemTap="onListItemTap"
  @layoutChanged="onRootChanged"
)
  slot
    v-template
      FlexboxLayout.container__content(
        :class="takeContentClasses"
        flexDirection="row"
        justifyContent="space-between"
      )
        Label.content__label(
          :text="item.label"
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

import { GLOBAL_ENUMS } from '../../quarks'
import * as LOCAL_ENUMS from './YooList.enum'

export default {
  name: 'YooList',
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
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.VARIATION].validator[1],
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.VARIATION].validator.includes(value)
    },
    [GLOBAL_ENUMS.FILL]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.FILL].validator[3],
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.FILL].validator.includes(value)
    },
    [GLOBAL_ENUMS.INPUT]: {
      type: Array,
      default: []
    }
  },
  data: () => ({
    LOCAL_ENUMS,
    GLOBAL_ENUMS
  }),
  computed: {
    takeListListeners () {
      return this.$listeners
    },
    takeListAttributes () {
      return this.$attrs
    },
    takeContentClasses () {
      const BLOCK = 'container__content'

      return [
        `${BLOCK}--${this[GLOBAL_ENUMS.SIZE]}`,
        `${BLOCK}--${this[GLOBAL_ENUMS.VARIATION]}`,
        `${BLOCK}--fill-${this[GLOBAL_ENUMS.FILL]}`
      ]
    }
  },
  methods: {
    onListItemTap ($event) {
      return this.$emit(
        GLOBAL_ENUMS.EVENT_OUTPUT,
        $event
      )
    },
    onRootChanged () {
      const {
        viewSize: {
          position: {
            onScreen: {
              y
            }
          }
        },
        frameSize: {
          height: frameHeight
        },
        statusBar: {
          height: statusBarHeight
        }
      } = this.$yoo.dimensions(this.$refs[LOCAL_ENUMS.LIST_REF].nativeView)

      setTimeout(() => {
        this.$refs[LOCAL_ENUMS.LIST_REF].nativeView.height = frameHeight - y + statusBarHeight
        this.$refs[LOCAL_ENUMS.LIST_REF].nativeView.requestLayout()
      }, 1)
    }
  }
}
</script>

<style scoped lang="sass" src="./YooList.sass" />
