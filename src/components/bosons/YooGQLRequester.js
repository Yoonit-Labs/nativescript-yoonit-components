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
  query = ''
}) => {
  console.log('[YOOGQLREQUESTER]')
  if (!url ||
      url.constructor !== String ||
      !query ||
      query.constructor !== String) {
    return
  }

  const queryByOS = isAndroid
    ? JSON.stringify({ query })
    : { query }

  const [
    success,
    error
  ] = YooPromise(
    YooHTTP({
      url,
      payload: queryByOS
    })
  )

  if (error) {
    return error
  }

  return success
}

export default YooGQLRequester
