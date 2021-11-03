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
    StackLayout(row="0")
      StackLayout(backgroundColor="#eeeeee" padding="25")
        GridLayout(columns="80, *" height="100")
          StackLayout(col="0" class="avatar")
            Label(text="JS")

        StackLayout
          Label(text="John Smith" fontWeight="bold")
          Label(text="john.smith@example.com")

      StackLayout
        Button(text="My Profile" @tap="doToggleSlider")
        Button(text="Settings" @tap="doToggleSlider")
        Button(text="Rate Us" @tap="doToggleSlider")
        Button(text="Support" @tap="doToggleSlider")
        Button(text="Contact" @tap="doToggleSlider")

  StackLayout(
    slot="main"
    backgroundColor="white"
  )
    Button(@tap="doToggleSlider" text="Open Drawer" width="250" marginTop="25")

    GridLayout
      Label.info
        Span.fas(text.decode="&#xf5d2;")
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
    onSliderChange ({ eventName }) {
      console.log(eventName)
    },
    doToggleSlider () {
      this.drawer.toggle()
    }
  }
}
</script>

<style scoped lang="sass">
</style>
