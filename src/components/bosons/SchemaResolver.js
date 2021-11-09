import {
  PromiseMaker,
  SimpleHttpService
} from '~/components/bosons'

// TEMPORARY, IT WILL BE REMOVED WHEN BACKEND IMPLEMENTS THE CORRECT PARSER

const SchemaResolver = async function () {
  const [
    response
  ] = await PromiseMaker(
    SimpleHttpService
      .run({ url: 'https://s3.amazonaws.com/open.keyapp.ai/questions.json', method: 'GET' })
  )

  const { rawQuestions } = response.content.toJSON()

  function doHydrateJson (schema) {
    return schema.pages.map(page => {
      if (page.type === 'fields') {
        page.questions.map(({ question }) => { doHydrateQuestion(question) })
        return page
      } else {
        return page
      }
    })
  }

  function doHydrateQuestion (question) {
    question.text = rawQuestions[question.id].text
    question.type = rawQuestions[question.id].type
    question.answers.map(
      answer => doHydrateAnswer(answer, question)
    )
    return question
  }

  function doHydrateAnswer (answer, question) {
    const answerHolder = rawQuestions[question.id].answers[answer.id]
    answer.text = answerHolder.text
    answer.override = answerHolder.override ? answerHolder.override : false
    answer.weight = answer.weight !== undefined
      ? answer.weight
      : answerHolder.weight
    return answer
  }

  return {
    hydrateSchema: doHydrateJson
  }
}

export default SchemaResolver
