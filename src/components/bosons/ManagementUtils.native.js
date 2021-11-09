import Vue from 'nativescript-vue'
import {
  animate,
  bounceOut
} from 'popmotion'

const makeTween = ({
  from = 0,
  to = 1,
  duration = 300,
  object,
  key,
  callback
}) => {
  return animate({
    from,
    to,
    duration,
    ease: bounceOut,
    onUpdate: (newValue) => {
      if (callback &&
          typeof callback === 'function') {
        callback(newValue)
      }

      if (object &&
          key) {
        Vue
          .set(
            object,
            key,
            newValue
          )
      }
    }
  })
}

export default {
  makeTween
}
