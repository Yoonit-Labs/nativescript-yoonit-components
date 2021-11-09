import {
  CriptoModule
} from '~/components/bosons'

const KeyURL = 'https://open.keyapp.ai/?d='
const KeyURI = 'keyapp://'

const MakeURL = payload => {
  if (!payload) {
    return
  }

  return `${KeyURL}${CriptoModule.criptograph(payload)}`
}

export {
  KeyURL,
  KeyURI,
  MakeURL
}
