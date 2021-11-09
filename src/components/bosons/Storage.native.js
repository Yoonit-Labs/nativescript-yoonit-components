import $store from '@/vuex'

import {
  CriptoModule
} from '~/components/bosons'

import {
  ApplicationSettings
} from '@nativescript/core'

const {
  getString,
  setString,
  clear,
  remove
} = ApplicationSettings

export default {
  set (key, _value) {
    try {
      let value

      if (typeof _value !== 'string') {
        value = JSON.stringify(_value)
      } else {
        value = _value
      }

      const criptographedText = CriptoModule
        .criptograph(
          value,
          $store.getters['main/$criptographKey']
        )

      setString(key, criptographedText)

      return Promise.resolve(_value)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  setWithoutCriptography (key, _value) {
    try {
      let value

      if (typeof _value !== 'string') {
        value = JSON.stringify(_value)
      } else {
        value = _value
      }

      setString(key, value)

      return Promise.resolve(_value)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  get (key) {
    try {
      const value = getString(key)
      const decriptographedText = CriptoModule
        .decriptograph(
          value,
          $store.getters['main/$criptographKey']
        )

      if (!decriptographedText.status) {
        return Promise
          .resolve(
            JSON.parse(value)
          )
      }

      return Promise
        .resolve(
          JSON.parse(decriptographedText.data)
        )
    } catch (e) {
      return Promise.reject(e)
    }
  },
  getSync (key) {
    try {
      const value = getString(key)
      const decriptographedText = CriptoModule
        .decriptograph(
          value,
          $store.getters['main/$criptographKey']
        )

      if (!decriptographedText.status) {
        return JSON.parse(value)
      }

      return JSON.parse(decriptographedText.data)
    } catch (e) {
      const value = getString(key)

      if (!value) {
        return value
      }

      const decriptographedText = CriptoModule
        .decriptograph(
          value,
          $store.getters['main/$criptographKey']
        )

      if (!decriptographedText.status) {
        return value
      }
      return decriptographedText.data
    }
  },
  remove (key) {
    try {
      return Promise
        .resolve(
          remove(
            key
          )
        )
    } catch (e) {
      return Promise.reject(e)
    }
  },
  clear () {
    try {
      return Promise.resolve(clear())
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
