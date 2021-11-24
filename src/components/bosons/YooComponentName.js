import {
  YooSplitWords,
  YooLower
} from './YooUtils'

export default {
  computed: {
    $yooComponentName () {
      if (!this.$options.name) {
        return
      }

      return YooLower(
        YooSplitWords(
          this.$options.name
        )
      )
        .join('-')
        .replace('yoo', 'yoonit')
    }
  }
}
