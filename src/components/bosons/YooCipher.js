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

import * as aesjs from 'aes-js'

// key definitions
// new Uint8Array([])
// https://www.npmjs.com/package/aes-js

const YooCipher = {
  encrypt: ({ value = '', cryptoKey = null }) => {
    if (!value || !cryptoKey) {
      return null
    }

    if (value.constructor !== String) {
      value = JSON.stringify(value)
    }

    const textBytes = aesjs.utils.utf8.toBytes(value)

    // eslint-disable-next-line
    const aesCtr = new aesjs.ModeOfOperation.ctr(cryptoKey)
    const encryptedBytes = aesCtr.encrypt(textBytes)

    return aesjs.utils.hex.fromBytes(encryptedBytes)
  },
  decrypt: ({ value = '', cryptoKey = null }) => {
    if (!value || !cryptoKey) {
      return {
        status: false,
        data: null
      }
    }

    try {
      const encryptedBytes = aesjs.utils.hex.toBytes(value)

      // eslint-disable-next-line
      const aesCtr = new aesjs.ModeOfOperation.ctr(cryptoKey)
      const decryptedBytes = aesCtr.decrypt(encryptedBytes)

      return {
        status: true,
        data: aesjs.utils.utf8.fromBytes(decryptedBytes)
      }
    } catch (err) {
      return {
        status: false,
        error: err,
        data: null
      }
    }
  }
}

export default YooCipher
