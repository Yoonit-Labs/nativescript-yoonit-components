<template lang="pug">
Page
  ActionBar
    Label(text="Home")

  GridLayout
    Label.info
      Span.fas(text.decode="&#xf5d2;")
      Span(:text="$t('helloWorld')")
</template>

<script>
export default {}
</script>

<style scoped lang="sass">
.info
  font-size: 20
  horizontal-align: center
  vertical-align: center
</style>
