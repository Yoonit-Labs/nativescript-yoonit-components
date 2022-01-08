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

import {
  Http
} from '@nativescript/core'

import {
  YooPromise
} from './index'

const YooHTTP = async ({
  url = '',
  payload = '',
  headers = {},
  method = 'POST'
}) => {
  if (!url || url.constructor !== String) {
    return
  }

  const request = {
    url,
    method,
    content: payload,
    headers,
    timeout: 10000
  }

  if (method === 'GET') {
    delete request.content
  }

  const [
    {
      content,
      statusCode: http
    },
    error
  ] = await YooPromise(
    Http
      .request(
        request
      ),
    'http'
  )

  if (error !== undefined) {
    console.log('[YOO_HTTP] Error', error)
    throw error
  }

  return {
    ...JSON.parse(content),
    http
  }
}

export default YooHTTP
