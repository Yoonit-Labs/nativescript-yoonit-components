import { knownFolders } from 'file-system'
import * as Https from '@nativescript-community/https'
import store from '@/vuex'
import {
  PromiseMaker,
  LogDNA
} from '~/components/bosons'

const NO_INTERNET_CODE = 0

const dir = knownFolders.currentApp().getFolder('assets')
const fileByEnv = {
  'DEVELOPMENT': 'dev2.keyapp.ai.cer',
  'PRODUCTION': 'prd.keyapp.ai.cer'
}
const hostByEnv = {
  'DEVELOPMENT': 'api.dev2.keyapp.ai',
  'PRODUCTION': 'api.prd.keyapp.ai'
}
const commonNameByEnv = {
  'DEVELOPMENT': '*.dev2.keyapp.ai',
  'PRODUCTION': '*.prd.keyapp.ai'
}

export const InitSSLPinning = () => {
  const env = store.getters['main/$environment']
  const hostPath = hostByEnv[env]
  const commonName = commonNameByEnv[env]
  const fileName = fileByEnv[env]
  const certificate = dir.getFile(fileName).path

  Https.enableSSLPinning({ host: hostPath, commonName: commonName, certificate, validatesDomainName: true })
}

const http = async ({
  url = '',
  headers = {
    'Content-Type': 'application/json'
  },
  method = 'GET',
  content = ''
}) => {
  if (!url ||
      url.constructor !== String ||
      !method ||
      method.constructor !== String) {
    return
  }

  // Populate headers with current Client Configuration
  headers['Client-Name'] = store.getters['main/$clientName']
  headers['Client-Version'] = store.getters['main/$clientVersion']

  const [
    response,
    error
  ] = await PromiseMaker(
    Https.request({
      useLegacy: true,
      url,
      headers,
      method,
      content
    })
  )

  const env = store.getters['main/$environment']

  if (env === 'DEVELOPMENT') {
    console.log('===============')
    console.log('RESPONSE => ', response)
    console.log('ERROR => ', error)
    console.log('===============')
  }

  if (error) {
    if (store.getters['main/$networkStatus'] !== NO_INTERNET_CODE) {
      LogDNA.ingest({
        message: 'Could not invoke httpModule right now. Try Again.',
        level: 'ERROR',
        where: 'http()'
      })
    }
    return error
  }
  const backendResponse = response.content.toJSON()
  await verifyTokenIsValid(backendResponse)
  await verifyClientIsValid(backendResponse)
  return backendResponse
}

const verifyClientIsValid = async (response) => {
  const INVALID_CLIENT_ERROR = 'OUTDATED'

  if (!response || typeof response.data !== 'object') return

  const graphQLEntity = Object.keys(response.data)[0] || ''

  if (!graphQLEntity) return

  if (response.data[graphQLEntity].error === INVALID_CLIENT_ERROR) {
    await store.dispatch('main/setClientStatus', false)
    return store.dispatch('users/setLogout')
  }
}

const verifyTokenIsValid = (response) => {
  const INVALID_TOKEN_MESSAGE = 'Invalid Token'
  if (!response || typeof response.data !== 'object') return

  const graphQLEntity = Object.keys(response.data)[0] || ''

  if (!graphQLEntity) return

  if (response.data[graphQLEntity].message === INVALID_TOKEN_MESSAGE) {
    return store.dispatch('users/setLogout')
  }
}

export default http
