export default {
  computed: {
    $yooComponentName () {
      return this.$options.name
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(name => name.toLowerCase())
        .join('-')
        .replace('yoo', 'yoonit')
    }
  }
}
