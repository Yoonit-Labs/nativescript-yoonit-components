<template lang="pug">
  Button.yoo-button(
    :class="takeModifier"
    v-on="takeListeners"
    v-bind="takeAttributes"
  )
    FormattedString.yoo-button__content(
      v-if="takeIconPosition === 'left'"
    )
      Span.yoo-button__icon(
        v-show="takeIconDraw"
        :class="takeIconModifier"
        :text="takeIconDraw"
      )

      Span.yoo-button__space(
        :text="(takeTextContent && takeIconDraw) ? '__' : ''"
      )

      Span.yoo-button__text(
        v-show="takeTextContent"
        :text="takeTextContent"
      )

    FormattedString.yoo-button__content(
      v-else-if="takeIconPosition === 'right'"
    )
      Span.yoo-button__text(
        v-show="takeTextContent"
        :text="takeTextContent"
      )

      Span.yoo-button__space(
        :text="(takeTextContent && takeIconDraw) ? '__' : ''"
      )

      Span.yoo-button__icon(
        v-show="takeIconDraw"
        :class="takeIconModifier"
        :text="takeIconDraw"
      )
</template>

<script>
import * as LOCAL_ENUMS from './YooButton.enum'
import { GLOBAL_ENUMS } from '../../quarks'

export default {
  name: 'YooButton',
  props: {
    [LOCAL_ENUMS.VARIATION]: {
      type: String,
      default: LOCAL_ENUMS.OPTIONS[LOCAL_ENUMS.VARIATION].default,
      validator: value =>
        LOCAL_ENUMS.OPTIONS[LOCAL_ENUMS.VARIATION].validator.includes(value)
    },
    [LOCAL_ENUMS.FORMAT]: {
      type: String,
      default: LOCAL_ENUMS.OPTIONS[LOCAL_ENUMS.FORMAT].default,
      validator: value =>
        LOCAL_ENUMS.OPTIONS[LOCAL_ENUMS.FORMAT].validator.includes(value)
    },
    [GLOBAL_ENUMS.SIZE]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.SIZE].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.SIZE].validator.includes(value)
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
    [GLOBAL_ENUMS.ANIMATION]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.ANIMATION].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.ANIMATION].validator.includes(value)
    }
  },
  computed: {
    takeListeners () {
      return this.$listeners
    },
    takeAttributes () {
      return this.$attrs
    },
    takeIconPosition () {
      return this[GLOBAL_ENUMS.ICON_POSITION]
    },
    /**
     * @description Creates the component class with modifiers
     */
    takeModifier () {
      const block = this.$yooComponentName
      const classList = []

      if (this[LOCAL_ENUMS.VARIATION] && (this[LOCAL_ENUMS.VARIATION] !== LOCAL_ENUMS.OPTIONS[LOCAL_ENUMS.VARIATION].default)) {
        classList
          .push(
            `${block}--${this[LOCAL_ENUMS.VARIATION]}`
          )
      }

      if (this[LOCAL_ENUMS.FORMAT] && (this[LOCAL_ENUMS.FORMAT] !== LOCAL_ENUMS.OPTIONS[LOCAL_ENUMS.FORMAT].default)) {
        classList
          .push(
            `${block}--${this[LOCAL_ENUMS.FORMAT]}`
          )
      }

      if (this[GLOBAL_ENUMS.SIZE] && (this[GLOBAL_ENUMS.SIZE] !== GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.SIZE].default)) {
        classList
          .push(
            `${block}--${this[GLOBAL_ENUMS.SIZE]}`
          )
      }

      if (this[GLOBAL_ENUMS.FILL]) {
        classList
          .push(
            `${block}--fill-${this[GLOBAL_ENUMS.FILL]}`
          )
      }

      if (this[GLOBAL_ENUMS.ANIMATION] && (this[GLOBAL_ENUMS.ANIMATION] !== GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.ANIMATION].default)) {
        classList
          .push(
            `${block}--animation-${this[GLOBAL_ENUMS.ANIMATION]}`
          )
      }

      return classList
    },
    /**
     * @description Returns text
     */
    takeTextContent () {
      return this.$attrs.text
        ? this.$attrs.text
        : this[GLOBAL_ENUMS.ICON]
    },
    /**
     * @description Returns the icon class
     */
    takeIconDraw () {
      return this[GLOBAL_ENUMS.ICON]
    },
    /**
     * @description Creates the icon class with modifiers
     */
    takeIconModifier () {
      const block = this.$yooComponentName
      const element = `${block}__icon`
      const classList = []

      // set icon type
      classList
        .push(
          this[GLOBAL_ENUMS.ICON]
        )

      if (this[GLOBAL_ENUMS.ICON_SIZE] && (this[GLOBAL_ENUMS.ICON_SIZE] !== GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.ICON_SIZE].default)) {
        classList
          .push(
            `${element}--${this[GLOBAL_ENUMS.ICON_SIZE]}`
          )
      }

      return classList
    }
  },
  methods: {}
}
</script>

<style lang="sass">
//@import "tailwindcss/base"
//@import "tailwindcss/components"
//@import "tailwindcss/utilities"
</style>
