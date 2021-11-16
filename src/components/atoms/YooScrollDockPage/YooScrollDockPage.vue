<template lang="pug">
Page.page(
  v-on="takeAttributes"
  width="100%"
  height="100%"
)
  ScrollView
    DockLayout.page__slot(
      stretchLastChild="false"
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

export default {
  name: 'YooScrollDockPage',
  atomic: {
    type: 'atom'
  },
  computed: {
    takeAttributes () {
      return this.$attrs
    }
  }
}
</script>

<style scoped lang="sass" src="./YooScrollDockPage.sass"/>
