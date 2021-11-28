<template lang="pug">
GridLayout.yoonit-check__container(
  :class="takeRootClasses"
  :rows="takeGridDistribution.main.rows"
  :columns="takeGridDistribution.main.columns"
  @tap="onRootTap"
  @loaded="onRootLoaded"
)
  Label.container__icon(
    :row="takeGridDistribution.first.row"
    :col="takeGridDistribution.first.col"
    :class="takeIconClasses"
    :text="takeIconContent"
    textAlignment="center"
    verticalAlignment="center"
  )

  Label.container__text(
    :row="takeGridDistribution.second.row"
    :col="takeGridDistribution.second.col"
    :text="takeTextContent"
    :textAlignment="takeTextAlignment"
    verticalAlignment="center"
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
  name: 'YooCheck',
  atomic: {
    type: 'atom'
  },
  props: {
    [GLOBAL_ENUMS.ID]: {
      type: String,
      required: false,
      default: ''
    },
    [GLOBAL_ENUMS.INPUT]: {
      type: Boolean,
      required: false,
      default: false
    },
    [GLOBAL_ENUMS.TEXT]: {
      type: String,
      required: false,
      default: ''
    },
    [GLOBAL_ENUMS.REQUIRED]: {
      type: Boolean,
      required: false,
      default: false
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
    }
  },
  data: () => ({
    checked: false
  }),
  computed: {
    takeRootClasses () {
      const BLOCK = this.$yooComponentName
      const ELEMENT = 'container'

      return [
        `${BLOCK}__${ELEMENT}--${this[GLOBAL_ENUMS.SIZE]}`,
        {
          true: {
            true: `${BLOCK}__${ELEMENT}--fill-${this[GLOBAL_ENUMS.FILL]}`,
            false: `${BLOCK}__${ELEMENT}--fill-grey`
          },
          false: {
            true: `${BLOCK}__${ELEMENT}--fill-disable`,
            false: `${BLOCK}__${ELEMENT}--fill-disable`
          },
          undefined: ''
        }[this.$attrs.isEnabled][this.checked]
      ]
    },
    takeGridDistribution () {
      return {
        main: {
          rows: [
            {
              top: 'auto, *',
              right: '*',
              bottom: 'auto, *',
              left: '*'
            }[this[GLOBAL_ENUMS.ICON_POSITION]]
          ].join(''),
          columns: [
            {
              top: '*',
              right: 'auto, *',
              bottom: '*',
              left: 'auto, *'
            }[this[GLOBAL_ENUMS.ICON_POSITION]]
          ].join('')
        },
        first: {
          row: [
            {
              top: '0',
              right: '0',
              bottom: '1',
              left: '0'
            }[this[GLOBAL_ENUMS.ICON_POSITION]]
          ].join(''),
          col: [
            {
              top: '0',
              right: '1',
              bottom: '0',
              left: '0'
            }[this[GLOBAL_ENUMS.ICON_POSITION]]
          ].join('')
        },
        second: {
          row: [
            {
              top: '1',
              right: '0',
              bottom: '0',
              left: '0'
            }[this[GLOBAL_ENUMS.ICON_POSITION]]
          ].join(''),
          col: [
            {
              top: '0',
              right: '0',
              bottom: '0',
              left: '1'
            }[this[GLOBAL_ENUMS.ICON_POSITION]]
          ].join('')
        }
      }
    },
    takeTextAlignment () {
      return {
        top: 'center',
        right: 'left',
        bottom: 'center',
        left: 'left'
      }[this[GLOBAL_ENUMS.ICON_POSITION]]
    },
    takeIconClasses () {
      const BLOCK = 'container'
      const ELEMENT = 'icon'

      return [
        `${BLOCK}__${ELEMENT}--${this[GLOBAL_ENUMS.ICON_SIZE]}`,
        `${BLOCK}__${ELEMENT}--${this[GLOBAL_ENUMS.ICON_POSITION]}`,
        {
          true: `${BLOCK}__${ELEMENT}--solid`,
          false: `${BLOCK}__${ELEMENT}--regular`
        }[this.checked]
      ]
    },
    takeIconContent () {
      if (!this.checked) {
        return YooFaResolver('f0c8')
      }

      return YooFaResolver('f14a')
    },
    takeTextContent () {
      return this[GLOBAL_ENUMS.TEXT]
    }
  },
  methods: {
    onRootLoaded () {
      this.checked = this[GLOBAL_ENUMS.INPUT]
    },
    onRootTap () {
      if (!this.$attrs.isEnabled) {
        return
      }

      this.checked = !this.checked

      return this.$emit(
        GLOBAL_ENUMS.EVENT_OUTPUT,
        {
          id: this[GLOBAL_ENUMS.ID],
          value: this.checked
        }
      )
    }
  },
  watch: {
    [GLOBAL_ENUMS.INPUT] (newValue, oldValue) {
      if (!this.$attrs.isEnabled) {
        return
      }

      if (newValue === oldValue) {
        return
      }

      this.checked = newValue
    }
  }
}
</script>

<style scoped lang="sass" src="./YooCheck.sass" />
