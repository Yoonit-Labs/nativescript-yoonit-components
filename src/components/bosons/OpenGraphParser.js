import {
  PromiseMaker,
  SimpleHttpService
} from '~/components/bosons'

import cheerio from 'react-native-cheerio'

export const parseUrl = async (url) => {
  let [
    protocol,
    host
  ] = url.match(/(?<host>[A-z\d][A-z\d-]*(\.[A-z\d][A-z\d-]*)*)/g)
  var metaImage
  var metaIcon

  if (protocol === 'http') {
    return '[unsafeURL]'
  }

  if (!protocol.includes('https')) {
    host = protocol
    protocol = 'https'
    url = `${protocol}://` + url
  }
  const [
    metaData,
    metaError
  ] = await PromiseMaker(
    SimpleHttpService.run({
      url,
      method: 'GET',
      headers: {
        'User-Agent': 'request'
      }
      // headers: {
      //   'Host': host,
      //   'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1',
      //   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      //   'Accept-Language': 'en,en-US;q=0.5',
      //   'DNT': '1',
      //   'Connection': 'keep-alive',
      //   'Upgrade-Insecure-Requests': '1',
      //   'Cache-Control': 'max-age=0'
      // }
    })
  )

  if (metaError || !metaData.content) {
    return '[metaError]'
  }

  const source = metaData.content.toString().replace('/\\/g', ' ')

  const parserData = await doMetaContent({
    output: [
      'title',
      'image',
      'icon'
    ],
    from: [
      'og:title',
      'og:image',
      'og:url',
      'og:site_name',
      'twitter:title',
      'twitter:image:src',
      'twitter:site',
      'title',
      'fluid-icon',
      'icon',
      '.a-dynamic-image'
    ],
    source
  })

  if (parserData.image) {
    metaImage = parserData.image
  }

  metaIcon = parserData.icon || `${protocol}://${host}/favicon.ico`
  if (!metaIcon.includes('http')) {
    metaIcon = `${protocol}://${host}` + metaIcon
  }
  return { metaImage, metaIcon }
}
const doMetaContent = ({ output, from, source }) => {
  return from
    .reduce((acc, key) => {
      const outputTag = output
        .filter(elm =>
          key.includes(elm)
        )[0]

      if (!outputTag ||
          acc[outputTag]) {
        return acc
      }

      return {
        ...acc,
        [outputTag]: doConstructResult(key, source)
      }
    }, {})
}
const doConstructResult = (key, html) => {
  const metaProperty = `meta[property="${key}"]`
  const metaName = `meta[name="${key}"]`
  const linkRel = `link[rel="${key}"]`

  let result = doCheerioParse(metaProperty, html)

  if (!result) {
    result = doCheerioParse(metaName, html)
  }

  if (!result) {
    result = doCheerioParse(linkRel, html)
  }

  if (!result) {
    result = doCheerioParse(key, html)
  }

  return result || undefined
}
const doCheerioParse = (key, html) => {
  const $ = cheerio.load(html)
  let result = ''

  if (key.includes('.') ||
      key.includes('#') ||
      key.includes('=') ||
      key.includes('"') ||
      key.includes(']') ||
      key.includes('[')) {
    result = $(key).attr('content') ||
            $(key).attr('src') ||
            $(key).attr('property') ||
            $(key).attr('href') ||
            undefined
  } else if (!result &&
      !key.includes(':')) {
    result = $(key).text() ||
            undefined
  }

  return result
}
