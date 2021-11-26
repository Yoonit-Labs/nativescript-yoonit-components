import {GLOBAL_ENUMS} from "@quarks";

const YooSplitWords = text =>
  text
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)

const YooCaseFirst = (word, caseFn) =>
  `${word[0][caseFn]()}${word.slice(1)}`

const YooCase = (word, caseFn) =>
  word[caseFn]()

const YooUpperFirst = word =>
  YooCaseFirst(word, 'toUpperCase')

const YooLowerFirst = word =>
  YooCaseFirst(word, 'toLowerCase')

const YooPascal = text =>
  text
    .map(world =>
      YooUpperFirst(world)
    )

const YooCamel = text =>
  text
    .map((world, indx) => {
      if (!indx) return world

      return YooUpperFirst(world)
    })

const YooLower = text =>
  text
    .map(word =>
      YooCase(word, 'toLowerCase')
    )

const YooUpper = text =>
  text
    .map(word =>
      YooCase(word, 'toUpperCase')
    )

const YooFaResolver = code =>
  String.fromCharCode(parseInt(code, 16))

export {
  YooSplitWords,
  YooLower,
  YooUpper,
  YooUpperFirst,
  YooLowerFirst,
  YooPascal,
  YooCamel,
  YooFaResolver
}
