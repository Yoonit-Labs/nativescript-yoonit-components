import { Http as httpModule } from '@nativescript/core'
import {
  PromiseMaker,
  LogDNA
} from '~/components/bosons'

const run = async ({
  url = '',
  payload = '',
  headers = {
    'Content-Type': 'application/json'
  },
  method = 'POST'
}) => {
  if (!url || url.constructor !== String) {
    return
  }

  const formattedPayload = JSON.stringify(payload)

  const requestObject = {
    url,
    method,
    content: formattedPayload,
    headers,
    timeout: 10000
  }

  if (method === 'GET') {
    delete requestObject.content
  }

  const [
    response,
    error
  ] = await PromiseMaker(
    httpModule
      .request(
        requestObject
      )
  )
  if (error) {
    LogDNA.ingest({
      message: 'Error running requester',
      level: 'ERROR',
      where: 'Requester.run()'
    })
    return error
  }

  // if (method === 'GET') {
  //   return true
  // }

  return response
}

export default {
  run
}
