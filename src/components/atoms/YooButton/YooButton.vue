<template lang="pug">
Button.yoonit-button(
  :class="takeButtonClasses"
  v-on="takeButtonListeners"
  v-bind="takeButtonAttributes"
)
  FormattedString.yoonit-button__content
    Span.yoonit-button__icon(
      v-show="takeIconContent"
      :text="takeIconContent"
      :class="takeIconClasses"
      textAlignment="center"
    )

    Span.yoonit-button__text(
      v-show="takeTextContent"
      :text="takeTextContent"
      textAlignment="center"
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
import { YooFaResolver } from '../../bosons'

export default {
  name: 'YooButton',
  atomic: {
    type: 'atom'
  },
  props: {
    [GLOBAL_ENUMS.SIZE]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.SIZE].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.SIZE].validator.includes(value)
    },
    [GLOBAL_ENUMS.FORMAT]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.FORMAT].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.FORMAT].validator.includes(value)
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
    },
    [GLOBAL_ENUMS.ICON]: {
      type: String,
      default: ''
    },
    [GLOBAL_ENUMS.ICON_POSITION]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.ICON_POSITION].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.ICON_POSITION].validator.includes(value)
    },
    [GLOBAL_ENUMS.ICON_SIZE]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.ICON_SIZE].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.ICON_SIZE].validator.includes(value)
    },
    [GLOBAL_ENUMS.ICON_FAMILY]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.ICON_FAMILY].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.ICON_FAMILY].validator.includes(value)
    },
    [GLOBAL_ENUMS.ANIMATION]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.ANIMATION].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.ANIMATION].validator.includes(value)
    }
  },
  computed: {
    takeButtonListeners () {
      return this.$listeners
    },
    takeButtonAttributes () {
      return this.$attrs
    },
    takeIconPosition () {
      return this[GLOBAL_ENUMS.ICON_POSITION]
    },
    /**
     * @description Creates the component class with modifiers
     */
    takeButtonClasses () {
      const BLOCK = this.$yooComponentName

      return [
        `${BLOCK}--${this[GLOBAL_ENUMS.SIZE]}`,
        `${BLOCK}--${this[GLOBAL_ENUMS.FORMAT]}`,
        `${BLOCK}--${this[GLOBAL_ENUMS.VARIATION]}`,
        `${BLOCK}--fill-${this[GLOBAL_ENUMS.FILL]}`,
        `${BLOCK}--animation-${this[GLOBAL_ENUMS.ANIMATION]}`
      ]
    },
    /**
     * @description Returns text
     */
    takeTextContent () {
      return this.$attrs.text
    },
    /**
     * @description Returns the icon class
     */
    takeIconContent () {
      return YooFaResolver(this[GLOBAL_ENUMS.ICON])
    },
    /**
     * @description Creates the icon class with modifiers
     */
    takeIconClasses () {
      const BLOCK = this.$yooComponentName
      const ELEMENT = `${BLOCK}__icon`

      return [
        `${ELEMENT}--${this[GLOBAL_ENUMS.ICON_SIZE]}`,
        `${ELEMENT}--${this[GLOBAL_ENUMS.ICON_FAMILY]}`
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang="sass" src="./YooButton.sass"/>
