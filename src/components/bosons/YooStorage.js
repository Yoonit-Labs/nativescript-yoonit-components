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

import YooCipher from './YooCipher'

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
  encrypt ({ key = '', value = '', cryptoKey = null }) {
    if (!cryptoKey || !key || !value) {
      return null
    }

    try {
      let _value

      if (typeof _value !== 'string') {
        _value = JSON.stringify(value)
      } else {
        _value = value
      }

      const cryptoValue = YooCipher
        .encrypt({
          value: _value,
          cryptoKey
        })

      setString(key, cryptoValue)

      return Promise.resolve(cryptoValue)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  decrypt ({ key = '', cryptoKey = null }) {
    if (!cryptoKey || !key) {
      return null
    }

    try {
      const value = getString(key)

      if (!value) {
        return null
      }

      const {
        status: decryptStatus,
        data: decryptValue
      } = YooCipher
        .decrypt({
          value,
          cryptoKey
        })

      if (decryptStatus && decryptValue) {
        try {
          return Promise.resolve(JSON.parse(decryptValue))
        } catch (_) {
          return Promise.resolve(decryptValue)
        }
      }
    } catch (e) {
      return Promise.reject(e)
    }
  },
  save (key, value) {
    if (!key || !value) {
      return null
    }

    try {
      let _value

      if (typeof value !== 'string') {
        _value = JSON.stringify(value)
      } else {
        _value = value
      }

      setString(key, _value)

      return Promise.resolve(_value)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  read (key) {
    if (!key) {
      return null
    }

    try {
      const value = getString(key)

      try {
        return Promise.resolve(JSON.parse(value))
      } catch (_) {
        return Promise.resolve(value)
      }
    } catch (e) {
      return Promise.reject(e)
    }
  },
  remove (key) {
    if (!key) {
      return null
    }

    try {
      return Promise.resolve(remove(key))
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
