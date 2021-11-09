import {
  isAndroid
} from '@nativescript/core'

import {
  PromiseMaker,
  HTTPService,
  LogDNA
} from '~/components/bosons'

const GQLService = async ({
  url = '',
  query = ''
}) => {
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
    response,
    error
  ] = await PromiseMaker(
    HTTPService({
      url,
      method: 'POST',
      content: queryByOS
    })
  )

  if (error) {
    LogDNA.ingest({
      message: 'Could not run this GQL query now. Try Again.',
      level: 'ERROR',
      where: 'http()'
    })

    return error
  }

  return response
}

export default GQLService
