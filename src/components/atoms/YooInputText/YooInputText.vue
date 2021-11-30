<template lang="pug">
FlexboxLayout.yoonit-input-text(
  :class="takeRootClasses"
  flexDirection="column"
  backgroundColor="transparent"
  borderColor="transparent"
  borderSize="0"
)
  Label.yoonit-input-text__placeholder(
    :text="takePlaceholder"
    @tap="onLabelTap"
  )

  TextField.yoonit-input-text__field(
    ref="textField"
    v-bind="takeFieldAttrs"
    v-on="takeFieldListeners"
    :text="takeFieldValue"
    :class="[takeRootClasses, takeFormatClass]"
    height="auto"
    @textChange="onFieldTextChange"
  )

  Label.yoonit-input-text__feedback(
    v-show="takeFeedbackVisible"
    :class="takeFeedbackType"
    :text="takeFeedbackMessage"
    @tap="onLabelTap"
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
import * as LOCAL_ENUMS from './YooInputText.enum'
import { GLOBAL_ENUMS } from '../../quarks'

export default {
  name: 'YooInputText',
  inheritAttrs: false,
  props: {
    [GLOBAL_ENUMS.ID]: {
      type: String,
      required: false,
      default: ''
    },
    [GLOBAL_ENUMS.INPUT]: {
      type: String,
      required: false,
      default: ''
    },
    [LOCAL_ENUMS.PLACEHOLDER]: {
      type: String,
      required: false,
      default: ''
    },
    [GLOBAL_ENUMS.REQUIRED]: {
      type: Boolean,
      required: false,
      default: false
    },
    [LOCAL_ENUMS.VALIDATION]: {
      type: [Function, RegExp],
      required: false,
      default: null
    },
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
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.FILL].validator[4],
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.FILL].validator.includes(value)
    }
  },
  data: () => ({
    [GLOBAL_ENUMS.FEEDBACK]: {
      type: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.FEEDBACK].default,
      visible: false,
      message: ''
    }
  }),
  computed: {
    takeRootClasses () {
      const BLOCK = this.$yooComponentName

      return [
        `${BLOCK}--${this[GLOBAL_ENUMS.SIZE]}`,
        `${BLOCK}--${this[GLOBAL_ENUMS.VARIATION]}`,
        {
          true: `${BLOCK}--fill-${this[GLOBAL_ENUMS.FILL]}`,
          false: `${BLOCK}--fill-disable`
        }[this.$yooIsEnabled]
      ]
    },
    takeFormatClass () {
      const BLOCK = this.$yooComponentName
      const classList = []

      classList
        .push(
          `${BLOCK}--${this[GLOBAL_ENUMS.FORMAT]}`
        )

      return classList
    },
    takePlaceholder () {
      return this[LOCAL_ENUMS.PLACEHOLDER]
    },
    takeFieldValue () {
      return this[GLOBAL_ENUMS.INPUT]
    },
    takeFieldAttrs () {
      return this.$attrs
    },
    takeFieldListeners () {
      return this.$listeners
    },
    takeFeedbackType () {
      const BLOCK = this.$yooComponentName
      const element = `${BLOCK}__${GLOBAL_ENUMS.FEEDBACK}`
      const [
        error,
        success
      ] = GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.FEEDBACK].validator

      return [
        {
          [error]: `${element}--${error}`,
          [success]: `${element}--${success}`
        }[this[GLOBAL_ENUMS.FEEDBACK].type]
      ]
    },
    takeFeedbackMessage () {
      return this[GLOBAL_ENUMS.FEEDBACK].message
    },
    takeFeedbackVisible () {
      return this[GLOBAL_ENUMS.FEEDBACK].visible
    }
  },
  methods: {
    doValidateField (value) {
      const defaultError = value => this.$emit(
        GLOBAL_ENUMS.EVENT_OUTPUT,
        {
          id: this[GLOBAL_ENUMS.ID],
          isValid: false,
          value: value || null
        }
      )

      if (!this[LOCAL_ENUMS.VALIDATION]) {
        return defaultError(value)
      }

      switch (this[LOCAL_ENUMS.VALIDATION].constructor) {
      case RegExp: {
        if (!value.match(this[LOCAL_ENUMS.VALIDATION])) {
          return defaultError()
        }

        return this.$emit(
          GLOBAL_ENUMS.EVENT_OUTPUT,
          {
            id: this[GLOBAL_ENUMS.ID],
            isValid: true,
            value
          }
        )
      }
      case Function: {
        const {
          status,
          message
        } = this[LOCAL_ENUMS.VALIDATION](value)

        if (!status) {
          this.feedbackMessage = message
        }

        return
      }

      default:
        return defaultError()
      }
    },
    onFieldTextChange ($event) {
      return this.doValidateField($event.value.trim())
    },
    onLabelTap () {
      return this.$refs.textField.nativeView.focus()
    }
  },
  watch: {
    [GLOBAL_ENUMS.INPUT] (newValue, oldValue) {
      if (newValue === oldValue) {
        return
      }

      return this.doValidateField(newValue.trim())
    }
  }
}
</script>

<style scoped lang="sass" src="./YooInputText.sass"/>
