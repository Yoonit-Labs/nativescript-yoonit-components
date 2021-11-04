<template lang="pug">
YooSliderPage(
  :actionBarHidden="actionBarHidden",
  @loaded="onSliderLoad",
  @change="onSliderChange"
)
  GridLayout(
    slot="left",
    rows="auto, *"
    backgroundColor="white"
  )

  GridLayout(
    slot="main"
    columns="*"
    rows="*, *"
    backgroundColor="white"
  )
    Button(
      row="0"
      col="0"
      text="Open Slider"
      width="250"
      height="100"
      horizontalAlignment="center"
      @tap="doToggleSlider"
    )

    GridLayout(
      row="1"
      col="0"
      columns="*"
      rows="*, *"
    )
      Label.icon(
        row="0"
        col="0"
        width="100%"
        textAlignment="center"
      )
        Span.fas(text.decode="&#xf5d2;")

      Label(
        row="1"
        col="0"
        horizontalAlignment="center"
      )
        Span(:text="$t('helloWorld')")
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

import {
  YooSliderPage
} from '@atoms'

export default {
  name: 'Home',
  atomic: {
    type: 'template'
  },
  props: {
    actionBarHidden: {
      type: Boolean,
      default: true
    }
  },
  components: {
    YooSliderPage
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    onSliderLoad ({ drawer }) {
      this.drawer = drawer
    },
    onSliderChange ({ eventName }) {},
    doToggleSlider () {
      this.drawer.toggle()
    }
  }
}
</script>

<style scoped lang="sass">
.icon
  font-size: 100
</style>
