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
  encrypt: (text, key = null) => {
    if (!key) {
      return
    }

    if (text.constructor !== String) {
      text = JSON.stringify(text)
    }

    const textBytes = aesjs.utils.utf8.toBytes(text)

    // eslint-disable-next-line
    const aesCtr = new aesjs.ModeOfOperation.ctr(key)
    const encryptedBytes = aesCtr.encrypt(textBytes)

    return aesjs.utils.hex.fromBytes(encryptedBytes)
  },
  decrypt: (text, key = null) => {
    if (!key) {
      return
    }

    try {
      const encryptedBytes = aesjs.utils.hex.toBytes(text)

      // eslint-disable-next-line
      const aesCtr = new aesjs.ModeOfOperation.ctr(key)
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
