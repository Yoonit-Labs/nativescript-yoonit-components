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
    success,
    error
  ] = await YooPromise(
    YooHTTP({
      url,
      headers,
      payload: queryByOS
    }),
    'gql-service'
  )

  if (error !== undefined) {
    console.log('[YOO_GQL][ERROR_EXCEPTION]:\n', error, '\n[QUERY]:', query)

    throw error
  }

  const fakeStatus = YooRecursiveSearch({
    input: success,
    key: 'status'
  })

  if (fakeStatus < 200 ||
      fakeStatus > 299) {
    const fakeMessage = YooRecursiveSearch({
      input: success,
      key: 'message'
    })

    console.log('[YOO_GQL][ERROR_FAKE_STATUS]:\n', fakeStatus, fakeMessage, '\n[QUERY]:', query)

    if (fakeMessage.constructor !== String) {
      throw new Error()
    }

    throw new Error(fakeMessage)
  }

  const fakeSuccess = YooRecursiveSearch({
    input: success,
    key: 'errors'
  })

  if (fakeSuccess) {
    console.log('[YOO_GQL][ERROR_FAKE_SUCCESS]:\n', fakeSuccess, '\n[QUERY]:', query)

    if (fakeSuccess.constructor !== String) {
      throw new Error()
    }

    throw new Error(fakeSuccess)
  }

  const {
    data
  } = success

  // console.log('[YOO_GQL][SUCCESS]', data)
  return data
}

export default YooGQLRequester
