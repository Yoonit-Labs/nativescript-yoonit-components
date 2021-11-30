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
  YooPromise,
  YooRecursiveSearch
} from './index'

const YooGQLRequester = async ({
  url = '',
  query = '',
  headers = {}
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
      statusCode: http
    },
    error
  ] = await YooPromise(
    YooHTTP({
      url,
      headers,
      payload: queryByOS
    })
  )

  if (error !== undefined) {
    throw error
  }

  const data = JSON.parse(content)

  const fakeStatus = YooRecursiveSearch({
    input: data,
    key: 'status'
  })

  if (fakeStatus < 200 ||
      fakeStatus > 299) {
    const fakeMessage = YooRecursiveSearch({
      input: data,
      key: 'message'
    })

    throw new Error(fakeMessage)
  }

  return {
    ...data,
    http
  }
}

export default YooGQLRequester
