import * as aesjs from 'aes-js'

const masterKey = new Uint8Array([7, 52, 11, 12, 5, 1, 58, 13, 145, 58, 15, 8, 21, 87, 42, 145, 74, 53, 25, 85, 63, 11, 12, 13, 14, 15, 16, 31, 19, 20, 63, 47])

const CriptoModule = {
  criptograph: (text, key = masterKey) => {
    if (text.constructor !== String) {
      text = JSON.stringify(text)
    }

    const textBytes = aesjs.utils.utf8.toBytes(text)

    // eslint-disable-next-line
    const aesCtr = new aesjs.ModeOfOperation.ctr(key)
    const encryptedBytes = aesCtr.encrypt(textBytes)

    return aesjs.utils.hex.fromBytes(encryptedBytes)
  },
  decriptograph: (text, key = masterKey) => {
    try {
      const encryptedBytes = aesjs.utils.hex.toBytes(text)

      // The counter mode of operation maintains internal state, so to decrypt a new instance must be instantiated.
      // eslint-disable-next-line
      const aesCtr = new aesjs.ModeOfOperation.ctr(key)
      const decryptedBytes = aesCtr.decrypt(encryptedBytes)

      // // Convert our bytes back into text
      return {
        status: true,
        data: aesjs.utils.utf8.fromBytes(decryptedBytes)
      }
    } catch (e) {
      return {
        status: false
      }
    }
  }
}

export default CriptoModule
