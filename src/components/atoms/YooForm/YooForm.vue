<template lang="pug">
StackLayout(
  @loaded="onRootLoaded"
)
  slot
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

export default {
  name: 'YooForm',
  atomic: {
    type: 'atom'
  },
  data: () => ({
    slots: {}
  }),
  methods: {
    onRootLoaded () {
      this.slots = this.doExtractSlotIds(this.$slots.default)
      this.$slots.default = this.doChangeSlots(this.$slots.default)
    },
    doExtractSlotIds (components) {
      return Object
        .values(components)
        .reduce(
          (acc, { componentOptions }) => ({
            ...acc,
            [componentOptions.propsData.id]: ''
          }), {}
        )
    },
    doChangeSlots (components) {
      return Object
        .values(components)
        .map(component => {
          const {
            id,
            required
          } = component.componentOptions.propsData
          const instance = component.componentInstance

          instance.$attrs = {
            ...instance.$attrs,
            isEnabled: this.$attrs.isEnabled
          }

          component.componentOptions.propsData = {
            ...component.componentOptions.propsData,
            isEnabled: this.$attrs.isEnabled
          }

          instance.$on(
            GLOBAL_ENUMS.EVENT_OUTPUT,
            $event =>
              this.onSlotOutput({
                $event,
                id,
                required
              })
          )

          return component
        })
    },
    onSlotOutput ({ $event, id, required }) {
      this.slots[id] = {
        ...$event,
        required
      }

      this.$emit(GLOBAL_ENUMS.EVENT_OUTPUT, this.slots)

      const validated = this.doValidateForm(this.slots)

      if (!validated) {
        return this.$emit(
          GLOBAL_ENUMS.EVENT_VALIDATED,
          null
        )
      }

      return this.$emit(
        GLOBAL_ENUMS.EVENT_VALIDATED,
        this.doCleanFields(this.slots)
      )
    },
    doValidateForm (form) {
      return Object
        .values(form)
        .every(input =>
          input &&
          input.required &&
          (
            input.isValid ||
            input.value === true
          )
        )
    },
    doCleanFields (slots) {
      return Object
        .entries(slots)
        .reduce(
          (acc, [key, { value }]) => ({
            ...acc,
            [key]: value
          }), {}
        )
    }
  }
}
</script>
