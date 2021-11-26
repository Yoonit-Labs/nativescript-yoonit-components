<template lang="pug">
StackLayout(
  @loaded="doStackLoaded"
)
  slot
</template>

<script>
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
    doStackLoaded () {
      this.slots = this.doExtractSlotIds(this.$slots.default)
      this.$slots.default = this.doListenSlotChild(this.$slots.default)
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
    doListenSlotChild (components) {
      return Object
        .values(components)
        .map(component => {
          const {
            id,
            required
          } = component.componentOptions.propsData
          const instance = component.componentInstance

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
