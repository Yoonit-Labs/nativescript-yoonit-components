<template lang="pug">
StackLayout.yoonit-check-group__container(
  :class="takeRootClasses"
  @loaded="onRootLoaded"
)
  Label.container__text(
    :text="takeText"
  )

  YooCheck.container__item(
    v-if="items"
    v-for="(item, index) in items"
    :key="index"
    :id="item[GLOBAL_ENUMS.ID]"
    :text="item[GLOBAL_ENUMS.TEXT]"
    :input="item[GLOBAL_ENUMS.TEXT]"
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

import { YooCheck } from '../../atoms'
import { GLOBAL_ENUMS } from '../../quarks'

export default {
  name: 'YooCheckGroup',
  atomic: {
    type: 'atom'
  },
  props: {
    [GLOBAL_ENUMS.ID]: {
      type: String,
      required: false,
      default: ''
    },
    [GLOBAL_ENUMS.ITEMS]: {
      type: Array,
      default: []
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
    [GLOBAL_ENUMS.FILL]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.FILL].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.FILL].validator.includes(value)
    },
    [GLOBAL_ENUMS.VARIATION]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.VARIATION].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.VARIATION].validator.includes(value)
    }
  },
  data: () => ({
    GLOBAL_ENUMS
  }),
  components: {
    YooCheck
  },
  computed: {
    takeRootClasses () {
      const BLOCK = this.$yooComponentName

      return [
        `${BLOCK}--${this[GLOBAL_ENUMS.VARIATION]}`,
        {
          true: `${BLOCK}--fill-${this[GLOBAL_ENUMS.FILL]}`,
          false: `${BLOCK}--fill-disable`
        }[this.$attrs.isEnabled]
      ]
    },
    takeText () {
      return this[GLOBAL_ENUMS.TEXT]
    }
  }
}
</script>

<style scoped lang="sass" src="./YooCheckGroup.sass"></style>
