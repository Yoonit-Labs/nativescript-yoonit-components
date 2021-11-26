<template lang="pug">
  Label(
    :class="['skl-icon', takeIconStyle, ...modifier]"
    :text="takeIconName | fonticon"
  )
</template>

<script>
export default {
  name: 'AppIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    iconStyle: {
      type: String,
      default: 'solid',
      validator (value) {
        return [
          'solid',
          'regular'
        ].indexOf(value) !== -1
      }
    },
    size: {
      type: String,
      default: 'normal',
      validator (value) {
        return [
          'huge',
          'larger',
          'large',
          'normal',
          'small'
        ].indexOf(value) !== -1
      }
    },
    fill: {
      type: String,
      default: 'neutral',
      validator (value) {
        return [
          'primary',
          'danger',
          'neutral',
          'light',
          'dark'
        ].indexOf(value) !== -1
      }
    }
  },
  computed: {
    takeIconName () {
      return `fa-${this.icon}`
    },
    takeIconStyle () {
      return this.iconStyle === 'solid'
        ? 'fas' // fontawesome solid
        : 'far' // fontawesome regular
    },
    modifier () {
      const block = 'skl-icon'
      const classList = []

      if (this.size && (this.size !== 'normal')) {
        classList
          .push(
            `${block}--${this.size}`
          )
      }

      if (this.fill) {
        classList
          .push(
            `${block}--fill-${this.fill}`
          )
      }

      return classList
    }
  }
}
</script>
<style lang="sass" scoped>
@import "StylesCore/native/StylesCore"

$iconColor: map-get($key, neutral600)

.skl-icon
  color: $iconColor
  font-size: 18

  // SIZE
  &--small
    font-size: 16
  &--large
    font-size: 24
  &--larger
    font-size: 32
  &--huge
    font-size: 48

  // FILL COLORS
  &--fill-neutral
    $iconColor: map-get($key, neutral600)
    color: $iconColor
  &--fill-primary
    $iconColor: map-get($key, primaryBase)
    color: $iconColor
  &--fill-danger
    $iconColor: map-get($key, dangerBase)
    color: $iconColor
  &--fill-light
    $iconColor: $white
    color: $iconColor
  &--fill-dark
    $iconColor: $black
    color: $iconColor
</style>
