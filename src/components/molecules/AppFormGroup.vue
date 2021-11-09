<template native lang="pug">
StackLayout(
  :class="['skl-input', ...modifiers]"
  margin-bottom="16"
)
  Label(
    :class="['skl-input__label']",
    :text="label"
    @tap="doFocus"
  )
  TextField(
    :class="['skl-input__field']",
    :text="value",
    @textChange="handleInput",
    @returnPress="validate",
    @focus="doChooseValidateMethod",
    @blur="doChooseValidateMethod",
    v-on="listeners",
    v-bind="$attrs",
    ref="textField"
  )
  Label(
    :class="['skl-input__feedback']",
    :text="invalidMessage",
    v-show="!isValid"
  )
</template>

<script>
export default {
  name: 'AppFormGroup',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    requiredRule: {
      type: Function
    },
    validateOnDataInput: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      isValid: true,
      invalidMessage: ''
    }
  },
  created () {},
  computed: {
    listeners () {
      const {
        input,
        ...others
      } = this.$listeners
      // protect custom input
      return { ...others }
    },
    modifiers () {
      // const block = 'skl-btn'
      const classList = []

      if (!this.isValid) {
        classList.push('status--error')
      }

      return classList
    }
  },
  methods: {
    handleInput (event) {
      this.$emit('input', event.value.trim())
    },
    validate (e) {
      if (e.eventName === 'focus' || e.eventName === 'reset') {
        this.isValid = true
        return
      }
      if (this.required) {
        this.value === ''
          ? this.isValid = false
          : this.isValid = true

        this.invalidMessage = `O campo ${this.label} é obrigatório.`
      }

      if (this.value && this.requiredRule) {
        const {
          result,
          message
        } = this
          .requiredRule(this.value)

        this.isValid = result
        this.invalidMessage = message
      }
      this.$emit('update:isValid', this.isValid)
    },
    doChooseValidateMethod (e) {
      if (this.validateOnDataInput) {
        return
      }
      this.validate(e)
    },
    doFocus (e) {
      this.$refs.textField.nativeView.focus()
    }
  },
  watch: {
    value (newValue, oldValue) {
      if (this.validateOnDataInput) {
        const e = {
          eventName: 'mounted'
        }
        this.validate(e)
      }
    },
    name (newValue, oldValue) {
      if (this.name && newValue !== oldValue) {
        const e = {
          eventName: 'reset'
        }
        this.validate(e)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import "StylesCore/native/StylesCore"

.skl-input
  margin: 8 0 16

.skl-input__label
  font-family: "Montserrat", "Montserrat-Regular"
  font-weight: 400
  margin-top: 0
  color: map-get($key, neutral600)

  .status--error &
    color: map-get($key, dangerBase)

.skl-input__field
  font-family: "Montserrat", "Montserrat-Regular"
  font-weight: 400
  color: $black
  border-bottom-width: 1
  border-color: map-get($key, neutral400)
  margin-bottom: 0
  padding: 8 0 2 0
  height: 48

  &:focus
    border-bottom-width: 1
    border-color: map-get($key, primaryBase)

  .status--error &
    border-color: map-get($key, dangerBase)

.skl-input__feedback
  margin-top: 4
  margin-bottom: 0
  font-size: 13
  font-family: "Montserrat", "Montserrat-Regular"
  font-weight: 400
  color: map-get($key, neutral600)

  .status--error &
    color: map-get($key, dangerBase)
</style>
