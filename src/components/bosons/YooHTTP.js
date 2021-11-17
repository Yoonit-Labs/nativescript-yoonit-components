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
  headers = {
    'Content-Type': 'application/json'
  },
  method = 'POST'
}) => {
  if (!url || url.constructor !== String) {
    return
  }

  const request = {
    url,
    method,
    content: JSON.stringify(payload),
    headers,
    timeout: 10000
  }

  if (method === 'GET') {
    delete request.content
  }

  return YooPromise(
    Http
      .request(
        request
      )
  )
}

export default YooHTTP
