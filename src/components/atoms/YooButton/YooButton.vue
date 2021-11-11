<template lang="pug">
  Button.yoonit-button(
    :class="takeButtonClasses"
    v-on="takeButtonListeners"
    v-bind="takeButtonAttributes"
  )
    FormattedString.yoonit-button__content(
      v-if="takeIconPosition === 'left'"
    )
      Span.yoonit-button__icon(
        v-show="takeIconDraw"
        :class="takeIconClasses"
        :text="takeIconDraw"
      )

      Span.yoonit-button__space(
        :text="(takeTextContent && takeIconDraw) ? '__' : ''"
      )

      Span.yoonit-button__text(
        v-show="takeTextContent"
        :text="takeTextContent"
      )

    FormattedString.yoonit-button__content(
      v-else-if="takeIconPosition === 'right'"
    )
      Span.yoonit-button__text(
        v-show="takeTextContent"
        :text="takeTextContent"
      )

      Span.yoonit-button__space(
        :text="(takeTextContent && takeIconDraw) ? '__' : ''"
      )

      Span.yoonit-button__icon(
        v-show="takeIconDraw"
        :class="takeIconClasses"
        :text="takeIconDraw"
      )
</template>

<script>
import * as LOCAL_ENUMS from './YooButton.enum'
import { GLOBAL_ENUMS } from '../../quarks'

export default {
  name: 'YooButton',
  props: {
    [GLOBAL_ENUMS.SIZE]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.SIZE].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.SIZE].validator.includes(value)
    },
    [LOCAL_ENUMS.FORMAT]: {
      type: String,
      default: LOCAL_ENUMS.OPTIONS[LOCAL_ENUMS.FORMAT].default,
      validator: value =>
        LOCAL_ENUMS.OPTIONS[LOCAL_ENUMS.FORMAT].validator.includes(value)
    },
    [LOCAL_ENUMS.VARIATION]: {
      type: String,
      default: LOCAL_ENUMS.OPTIONS[LOCAL_ENUMS.VARIATION].default,
      validator: value =>
        LOCAL_ENUMS.OPTIONS[LOCAL_ENUMS.VARIATION].validator.includes(value)
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
      const classList = []

      classList
        .push(
          `${BLOCK}--${this[GLOBAL_ENUMS.SIZE]}`
        )

      classList
        .push(
          `${BLOCK}--${this[LOCAL_ENUMS.FORMAT]}`
        )

      classList
        .push(
          `${BLOCK}--${this[LOCAL_ENUMS.VARIATION]}`
        )

      classList
        .push(
          `${BLOCK}--fill-${this[GLOBAL_ENUMS.FILL]}`
        )

      classList
        .push(
          `${BLOCK}--animation-${this[GLOBAL_ENUMS.ANIMATION]}`
        )

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
    takeIconClasses () {
      const BLOCK = this.$yooComponentName
      const element = `${BLOCK}__icon`
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

<style lang="sass" src="./YooButton.sass" />
