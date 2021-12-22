<template lang="pug">
GridLayout.yoonit-button__container(
  :class="takeButtonClasses"
  :rows="takeGridDistribution.main.rows"
  :columns="takeGridDistribution.main.columns"
)
  Label.container__icon(
    v-if="Boolean(takeIconContent)"
    :row="takeGridDistribution.first.row"
    :col="takeGridDistribution.first.col"
    :text="takeIconContent"
    :class="[takeIconClasses, takeIconMargin]"
    :horizontalAlignment="takeTextAlignment"
    verticalAlignment="middle"
  )

  Label.container__text(
    v-if="Boolean(takeTextContent)"
    :row="takeGridDistribution.second.row"
    :col="takeGridDistribution.second.col"
    :text="takeTextContent"
    :class="takeTextMargin"
    :horizontalAlignment="takeTextAlignment"
    verticalAlignment="middle"
  )

  Button.container__button(
    v-on="takeButtonListeners"
    v-bind="takeButtonAttributes"
    row="0"
    rowSpan="2"
    col="0"
    colSpan="2"
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
    [GLOBAL_ENUMS.ALIGNMENT]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.ALIGNMENT].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.ALIGNMENT].validator.includes(value)
    },
    [GLOBAL_ENUMS.ICON]: {
      type: String,
      default: ''
    },
    [GLOBAL_ENUMS.ICON_SIZE]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.ICON_SIZE].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.ICON_SIZE].validator.includes(value)
    },
    [GLOBAL_ENUMS.ICON_POSITION]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.ICON_POSITION].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.ICON_POSITION].validator.includes(value)
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
    takeGridDistribution () {
      return {
        main: {
          rows: [
            {
              true: {
                top: 'auto, *',
                right: '*',
                bottom: '*, auto',
                left: '*'
              }[this[GLOBAL_ENUMS.ICON_POSITION]],
              false: '*'
            }[
              Boolean(this[GLOBAL_ENUMS.ICON]) &&
              Boolean(this.takeTextContent)
            ]
          ].join(''),
          columns: [
            {
              true: {
                top: '*',
                right: '*, auto',
                bottom: '*',
                left: 'auto, *'
              }[this[GLOBAL_ENUMS.ICON_POSITION]],
              false: '*'
            }[
              Boolean(this[GLOBAL_ENUMS.ICON]) &&
              Boolean(this.takeTextContent)
            ]
          ].join('')
        },
        first: {
          row: [
            {
              true: {
                top: '0',
                right: '0',
                bottom: '1',
                left: '0'
              }[this[GLOBAL_ENUMS.ICON_POSITION]],
              false: '0'
            }[
              Boolean(this[GLOBAL_ENUMS.ICON]) &&
              Boolean(this.takeTextContent)
            ]
          ].join(''),
          col: [
            {
              true: {
                top: '0',
                right: '1',
                bottom: '0',
                left: '0'
              }[this[GLOBAL_ENUMS.ICON_POSITION]],
              false: '0'
            }[
              Boolean(this[GLOBAL_ENUMS.ICON]) &&
              Boolean(this.takeTextContent)
            ]
          ].join('')
        },
        second: {
          row: [
            {
              true: {
                top: '1',
                right: '0',
                bottom: '0',
                left: '0'
              }[this[GLOBAL_ENUMS.ICON_POSITION]],
              false: '0'
            }[
              Boolean(this[GLOBAL_ENUMS.ICON]) &&
              Boolean(this.takeTextContent)
            ]
          ].join(''),
          col: [
            {
              true: {
                top: '0',
                right: '0',
                bottom: '0',
                left: '1'
              }[this[GLOBAL_ENUMS.ICON_POSITION]],
              false: '0'
            }[
              Boolean(this[GLOBAL_ENUMS.ICON]) &&
              Boolean(this.takeTextContent)
            ]
          ].join('')
        }
      }
    },
    takeButtonListeners () {
      return this.$listeners
    },
    takeButtonAttributes () {
      return {
        ...this.$attrs,
        text: ''
      }
    },
    takeTextAlignment () {
      return this[GLOBAL_ENUMS.ALIGNMENT]
    },
    /**
     * @description Creates the component class with modifiers
     */
    takeButtonClasses () {
      const BLOCK = this.$yooComponentName
      const ELEMENT = `${BLOCK}__container`

      return [
        `${ELEMENT}--${this[GLOBAL_ENUMS.SIZE]}`,
        `${ELEMENT}--${this[GLOBAL_ENUMS.FORMAT]}`,
        `${ELEMENT}--${this[GLOBAL_ENUMS.VARIATION]}`,
        `${ELEMENT}--fill-${this[GLOBAL_ENUMS.FILL]}`,
        `${ELEMENT}--animation-${this[GLOBAL_ENUMS.ANIMATION]}`
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
      if (!this[GLOBAL_ENUMS.ICON]) {
        return null
      }

      return YooFaResolver(this[GLOBAL_ENUMS.ICON])
    },
    /**
     * @description Creates the icon class with modifiers
     */
    takeIconClasses () {
      if (!this[GLOBAL_ENUMS.ICON]) {
        return []
      }

      const ELEMENT = 'container__icon'

      return [
        `${ELEMENT}--${this[GLOBAL_ENUMS.ICON_SIZE]}`,
        `${ELEMENT}--${this[GLOBAL_ENUMS.ICON_FAMILY]}`
      ]
    },
    takeIconMargin () {
      let classList = {
        true: {
          xxs: ['yoo-m-0'],
          xs: ['yoo-m-0'],
          sm: ['yoo-mx-4'],
          md: ['yoo-mx-8'],
          lg: ['yoo-mx-12'],
          xl: ['yoo-mx-16'],
          xxl: ['yoo-mx-20']
        }[this[GLOBAL_ENUMS.ICON_SIZE]],
        false: ''
      }[
        Boolean(this[GLOBAL_ENUMS.ICON]) &&
        Boolean(this.takeTextContent)
      ]

      classList = [
        ...classList,
        ...{
          top: ['yoo-mt-8', 'yoo-mb-4'],
          right: [],
          bottom: ['yoo-mb-8', 'yoo-mt-4'],
          left: []
        }[this[GLOBAL_ENUMS.ICON_POSITION]]
      ]

      return classList
    },
    takeTextMargin () {
      return {
        top: ['yoo-mb-8'],
        right: [],
        bottom: ['yoo-mt-8'],
        left: []
      }[this[GLOBAL_ENUMS.ICON_POSITION]]
    }
  }
}
</script>

<style scoped lang="sass" src="./YooButton.sass"/>
