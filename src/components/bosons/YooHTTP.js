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
    success,
    error
  ] = await YooPromise(
    Http
      .request(
        request
      )
  )

  if (error) {
    return error
  }

  return success
}

export default YooHTTP
