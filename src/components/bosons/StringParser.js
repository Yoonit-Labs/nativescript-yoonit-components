export const generateNameInitials = (name, defaultReturnValue) => {
  const DEFAULT_RETURN_VALUE = defaultReturnValue || ''
  if (!name) {
    return DEFAULT_RETURN_VALUE
  }
  const splittedName = name.split(' ')
  if (!splittedName || !splittedName.length) {
    return DEFAULT_RETURN_VALUE
  }
  if (splittedName.length === 1) {
    const singleNameSplitted = splittedName[0].split('') || ['?', '?']
    return `${singleNameSplitted[0]}${singleNameSplitted[1] || ''}`
  }
  if (splittedName.length > 1) {
    const firstName = splittedName[0].split('')[0] || ''
    const lastName = splittedName[splittedName.length - 1].split('')[0] || ''
    return `${firstName}${lastName}`
  }
  return DEFAULT_RETURN_VALUE
}

export const formatCpf = (cpf) => {
  if (!cpf || typeof cpf !== 'string') {
    console.warn('Pass a valid value, not null')
    return 'ERROR'
  }
  const localCpf = cpf
  // eslint-disable-next-line
  return localCpf.replace(/^([0-9]{3})\.?([0-9]{3})\.?([0-9]{3})\-?([0-9]{2})$/g, '$1.$2.$3-$4')
}

// Only for Brazil phone numbers
export const formatPhone = (phone, location = 'br') => {
  if (!phone || !location || typeof phone !== 'string') {
    console.warn('Pass a valid phone and location')
    return phone
  }
  if (location === 'br') {
    return phone.replace(/([+])?([0-9]{2})([0-9]{2})([0-9]{1})?([0-9]{4})([0-9]{4})/g, '($3) $4$5-$6')
  }
}

export const formatByType = (value, type) => {
  return type === 'cpf'
    ? formatCpf(value)
    : formatPhone(value, 'br')
}

export const removeCountryCode = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return ''
  }
  return phone.replace(/([+])?([0-9]{2})([0-9]{2})([0-9]{1})?([0-9]{4})([0-9]{4})/g, '$3$4$5$6')
}

const parseToGql = args => {
  let newArgs = JSON.stringify(args)
  newArgs = newArgs.replace(/\"([A-z])\w+\"(\:| \:)/g, elm => { // eslint-disable-line
    elm = elm.replace(/\"/g, '') // eslint-disable-line
    return elm
  })
  return newArgs
}

export const buildMutationQueryString = (obj, mutation, responseFields, token) => {
  const fields = Object.keys(obj).reduce((acc, elm) => {
    if (obj[elm] === null || obj[elm] === undefined || obj[elm] === '') {
      return acc
    }
    if (Array.isArray(obj[elm]) || obj[elm].constructor === Object) {
      acc = acc + `${elm}: ${parseToGql(obj[elm])},`
      return acc
    }
    if (typeof obj[elm] === 'boolean' || typeof obj[elm] === 'number' || obj[elm] === 'POST' || obj[elm] === 'GET' || typeof obj[elm] === 'object') {
      acc = acc + `${elm}: ${obj[elm]},`
      return acc
    }
    acc = acc = acc + `${elm}: "${obj[elm]}",`
    return acc
  }, `token: "${token}",`)

  // Add error key to receive OUTDATED clientVersion error
  responseFields = responseFields + ' error'

  const query = `
    mutation {
      ${mutation}(
        ${fields}
      ) {
        ${responseFields}
      }
    }`
  return query
}

export const buildQueryString = (obj, query, responseFields, token) => {
  let appToken = ''
  if (token) {
    appToken = `token: "${token}",`
  }
  if (obj.constructor !== Object) {
    console.warn('First parameter is not a Object')
    return false
  }
  let fields = ''
  const keys = Object.keys(obj)
  if (!keys.length) {
    fields = `token: "${token}"`
  }
  fields = keys.reduce((acc, elm) => {
    if (obj[elm] === null || undefined) {
      return acc
    }
    if (typeof obj[elm] === 'boolean' || typeof obj[elm] === 'number') {
      acc = acc + `${elm}: ${obj[elm]},`
      return acc
    }
    acc = acc = acc + `${elm}: "${obj[elm]}",`
    return acc
  }, appToken)

  // Add error key to receive OUTDATED clientVersion error
  responseFields = responseFields + ' error'

  const queryString = `{
    ${query}(
      ${fields}
    ) {
      ${responseFields}
    }
  }`
  return queryString
}

export const parseDeepLink = (appURL) => {
  if (!appURL) return { status: false, getParams: '', getPage: '' }
  const pageFromURLIndex = 0
  const regexpForParams = /[A-z]{1,}=[A-z0-9]{1,}/gi
  const regexpForDomain = /[A-z]{1,}\/\?/g

  const path = appURL.toString() || ''
  const dataFromURL = path.match(regexpForParams)
  const paramObj = generateObjectFromDataURL(dataFromURL)

  const pageFromURL = regexpForDomain.exec(path)
  const page = pageFromURL[pageFromURLIndex].split('/?')[0] || ''

  return {
    status: true,
    get getParams () {
      return paramObj
    },
    get getPage () {
      return page
    }
  }
}

const generateObjectFromDataURL = (dataFromURL) => {
  if (!dataFromURL.length) return {}

  return dataFromURL.reduce((acc, elm) => {
    const key = 0
    const value = 1
    const splittedData = elm.split('=') || ''
    acc[splittedData[key]] = splittedData[value]
    return acc
  }, {})
}

export const formatQuizAnswer = (quiz, userAnswer, userData) => {
  const quizTitle = quiz.name
  const quizHash = quiz.quizHash
  const version = quiz.schema.version
  const parsedAnswers = quiz
    .schema
    .pages
    .filter(({ type }) => type === 'fields')
    .map(({ questions }) => questions)
    .reduce((acc, elm) => ([...acc, ...elm]), [])
    .map(({ question }) => {
      return {
        required: question.required,
        visible: question.visible,
        question: {
          id: question.id,
          type: question.type,
          answers: question.answers.map(answer => {
            if (question.id in userAnswer.answers && answer.id in userAnswer.answers[question.id]) {
              answer.value = userAnswer.answers[question.id][answer.id].status
            } else {
              answer.value = false
            }
            return answer
          })
        }
      }
    })

  return {
    user: userData,
    id: quizHash,
    title: quizTitle,
    version,
    openTime: '',
    endTime: '',
    duration: '',
    answers: parsedAnswers
  }
}

export const ordinalMonthToNominal = (ordinalMonth) => {
  const month = {
    '01': 'Jan',
    '02': 'Fev',
    '03': 'Mar',
    '04': 'Abr',
    '05': 'Mai',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Ago',
    '09': 'Set',
    '10': 'Out',
    '11': 'Nov',
    '12': 'Dez'
  }

  return month[ordinalMonth]
}
