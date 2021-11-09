import {
  Device as device,
  Connectivity as connectivity,
  Http as httpModule
} from '@nativescript/core'
import store from '@/vuex'
import {
  PromiseMaker
} from '~/components/bosons'

const key = '71fb155776b72d51884d634cc7a193af'

const ingest = async ({
  message = '',
  level = 'LOG',
  where = '',
  payload = {}
}) => {
  if (!message ||
      message.constructor !== String) {
    return
  }

  let connection = ''
  const type = connectivity.getConnectionType()

  switch (type) {
  case connectivity.connectionType.none:
    connection = 'none'
    break
  case connectivity.connectionType.wifi:
    connection = 'WiFi'
    break
  case connectivity.connectionType.mobile:
    connection = 'Mobile'
    break
  case connectivity.connectionType.ethernet:
    connection = 'Ethernet'
    break
  case connectivity.connectionType.bluetooth:
    connection = 'Bluetooth'
    break
  }

  const [
    externalIp = ''
  ] = await PromiseMaker(
    httpModule.request({
      url: 'https://api.ipify.org?format=text',
      method: 'GET'
    })
  )

  const content = JSON.stringify({
    lines: [
      {
        timestamp: Date.now(),
        line: message,
        app: 'KeyApp',
        level,
        env: store.getters['main/$environment'].toLowerCase(),
        meta: {
          where,
          station: {
            model: device.model,
            deviceType: device.deviceType,
            os: device.os,
            osVersion: device.osVersion,
            sdkVersion: device.sdkVersion,
            appVersion: store.getters['main/$clientVersion'],
            language: device.language,
            manufacturer: device.manufacturer,
            uuid: device.uuid,
            connection,
            externalIp: externalIp.content.toString() || ''
          },
          payload
        }
      }
    ]
  })

  const [
    responseLDNA,
    errorLDNA
  ] = await PromiseMaker(
    httpModule.request({
      url: `https://logs.logdna.com/logs/ingest?hostname=KeyApp&ip=${externalIp.content.toString()}&now=${Date.now()}&apikey=${key}`,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      content
    })
  )

  if (errorLDNA) throw new Error('Could not send the log to LogDNA. Try Again.')

  return responseLDNA
}

export default {
  ingest
}
