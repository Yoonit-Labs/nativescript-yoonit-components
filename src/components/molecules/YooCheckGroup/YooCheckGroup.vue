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
    :size="$props[GLOBAL_ENUMS.SIZE]"
    :fill="$props[GLOBAL_ENUMS.FILL]"
    :isEnabled="$yooIsEnabled"
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
    [GLOBAL_ENUMS.VARIATION]: {
      type: String,
      default: GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.VARIATION].default,
      validator: value =>
        GLOBAL_ENUMS.OPTIONS[GLOBAL_ENUMS.VARIATION].validator.includes(value)
    }
  },
  data: () => ({
    GLOBAL_ENUMS,
    child: {}
  }),
  components: {
    YooCheck
  },
  computed: {
    takeRootClasses () {
      const BLOCK = this.$yooComponentName
      const ELEMENT = 'container'

      return [
        `${BLOCK}__${ELEMENT}--${this[GLOBAL_ENUMS.VARIATION]}`,
        `${BLOCK}__${ELEMENT}--${this[GLOBAL_ENUMS.SIZE]}`,
        {
          true: `${BLOCK}__${ELEMENT}--fill-${this[GLOBAL_ENUMS.FILL]}`,
          false: `${BLOCK}__${ELEMENT}--fill-disable`
        }[this.$yooIsEnabled]
      ]
    },
    takeText () {
      return this[GLOBAL_ENUMS.TEXT]
    }
  },
  methods: {
    onRootLoaded () {
      this.$children = this.doChangeComponents(this.$children)
    },
    doChangeComponents (components) {
      return Object
        .values(components)
        .map(component => {
          const {
            id
          } = component.$options.propsData
          const instance = component._self

          instance.$on(
            GLOBAL_ENUMS.EVENT_OUTPUT,
            $event =>
              this.onSlotOutput({
                $event,
                id
              })
          )

          return component
        })
    },
    onSlotOutput ({ $event, id }) {
      if ($event.value) {
        this.child[id] = $event.value
      } else {
        delete this.child[id]
      }

      const value = Object.keys(this.child)

      this.$emit(
        GLOBAL_ENUMS.EVENT_OUTPUT,
        {
          id: this[GLOBAL_ENUMS.ID],
          isValid: Boolean(value.length),
          required: this[GLOBAL_ENUMS.REQUIRED],
          value
        }
      )
    }
  }
}
</script>

<style scoped lang="sass" src="./YooCheckGroup.sass"></style>
