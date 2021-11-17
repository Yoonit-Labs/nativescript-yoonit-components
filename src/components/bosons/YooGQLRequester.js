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
  isAndroid
} from '@nativescript/core'

import {
  YooHTTP,
  YooPromise
} from './index'

const YooGQLRequester = async ({
  url = '',
  query = '',
  headers = {},
}) => {
  if (!url ||
      url.constructor !== String ||
      !query ||
      query.constructor !== String) {
    return
  }

  headers = {
    'Content-Type': 'application/json',
    ...headers
  }

  const queryByOS = isAndroid
    ? JSON.stringify({ query })
    : { query }

  const [
    {
      content,
      statusCode: status
    },
    error
  ] = await YooPromise(
    YooHTTP({
      url,
      headers,
      payload: queryByOS
    })
  )

  if (error) {
    return error
  }

  return {
    content,
    status
  }
}

export default YooGQLRequester
