<template lang="pug">
StackLayout.yoonit-count-down__container(
  @loaded="onRootLoaded"
  @unloaded="onRootUnloaded"
)
  Label.container__text(
    :text="takeActualTime"
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

import * as LOCAL_ENUMS from './YooCountDown.enum'

export default {
  name: 'YooCountDown',
  atomic: {
    type: 'atom'
  },
  props: {
    [LOCAL_ENUMS.DURATION]: {
      type: Number,
      default: () => LOCAL_ENUMS.OPTIONS[LOCAL_ENUMS.DURATION].default
    },
    [LOCAL_ENUMS.MODE]: {
      type: String,
      default: LOCAL_ENUMS.OPTIONS[LOCAL_ENUMS.MODE].default,
      validator: value =>
        LOCAL_ENUMS.OPTIONS[LOCAL_ENUMS.MODE].validator.includes(value)
    },
    [LOCAL_ENUMS.STATUS]: {
      type: String,
      default: LOCAL_ENUMS.OPTIONS[LOCAL_ENUMS.STATUS].default,
      validator: value =>
        LOCAL_ENUMS.OPTIONS[LOCAL_ENUMS.STATUS].validator.includes(value)
    }
  },
  data: () => ({
    intervalID: {},
    actualTime: 0
  }),
  computed: {
    takeActualTime () {
      return this.doFormatTimer(this.actualTime)
    }
  },
  beforeDestroy () {
    this.onRootUnloaded()
  },
  methods: {
    onRootLoaded () {
      this.actualTime = this[LOCAL_ENUMS.DURATION]
      this.doTimer(this[LOCAL_ENUMS.STATUS])
    },
    onRootUnloaded () {
      return this.doTimer(LOCAL_ENUMS.STATUSES[1])
    },
    doTimer (status) {
      switch (status) {
      case LOCAL_ENUMS.STATUSES[0]: {
        this.intervalID = this.doCount()
        break
      }

      case LOCAL_ENUMS.STATUSES[1]: {
        clearInterval(this.intervalID)
        this.actualTime = this[LOCAL_ENUMS.DURATION]
        break
      }

      case LOCAL_ENUMS.STATUSES[2]: {
        clearInterval(this.intervalID)
      }
      }
    },
    doCount () {
      return setInterval(() => {
        if (this.actualTime - 1 >= 0) {
          return --this.actualTime
        }

        switch (this[LOCAL_ENUMS.MODE]) {
        case LOCAL_ENUMS.MODES[0]: {
          this.doTimer(LOCAL_ENUMS.STATUSES[1])
          this.doEmitEvents()

          break
        }

        case LOCAL_ENUMS.MODES[1]: {
          this.doTimer(LOCAL_ENUMS.STATUSES[1])
          this.doTimer(LOCAL_ENUMS.STATUSES[0])
          this.doEmitEvents()

          break
        }
        }
      }, 1000)
    },
    doEmitEvents () {
      return this.$emit(LOCAL_ENUMS.EVENT_END)
    },
    doFormatTimer (duration) {
      let timer = duration
      let minutes = parseInt(String(timer / 60), 10)
      let seconds = parseInt(String(timer % 60), 10)

      minutes = minutes < 10 ? `0${minutes}` : minutes
      seconds = seconds < 10 ? `0${seconds}` : seconds

      if (--timer < 0) {
        timer = duration
      }
      const status = `${minutes}:${seconds}`

      this.$emit(LOCAL_ENUMS.EVENT_STATUS, status)

      return status
    }
  },
  watch: {
    [LOCAL_ENUMS.DURATION] (change) {
      this.actualTime = change
    },
    [LOCAL_ENUMS.STATUS] (change) {
      return this.doTimer(change)
    }
  }
}
</script>

<style scoped lang="sass" src="./YooCountDown.sass"/>
