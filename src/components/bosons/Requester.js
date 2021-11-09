import store from '@/vuex'

import {
  PromiseMaker,
  LogDNA
} from '~/components/bosons'

import {
  GQLService
} from '~/components/quarks'

const run = async ({
  url = '',
  query = ''
}) => {
  if (!url ||
      url.constructor !== String ||
      !query ||
      query.constructor !== String) {
    return
  }

  store.dispatch('main/setDefaultLoading')

  const [
    response,
    error
  ] = await PromiseMaker(
    GQLService({
      url,
      query
    })
  )

  setTimeout(() => {
    store.dispatch('main/setHideLoading')
  }, 300)

  if (error) {
    LogDNA.ingest({
      message: 'Error running requester',
      level: 'ERROR',
      where: 'Requester.run()'
    })
    return error
  }
  return response
}

export default {
  run
}
