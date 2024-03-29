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
  Application,
  Utils
} from '@nativescript/core'

const YooSplitWords = text =>
  text
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)

const YooCaseFirst = (word, caseFn) => {
  if (!word) {
    return ''
  }

  return `${word[0][caseFn]()}${word.slice(1)}`
}

const YooCase = (word, caseFn) =>
  word[caseFn]()

const YooUpperFirst = word =>
  YooCaseFirst(word, 'toUpperCase')

const YooLowerFirst = word =>
  YooCaseFirst(word, 'toLowerCase')

const YooJoin = (text, join = ' ') => {
  if (Array.isArray(text)) {
    return text.join(join)
  }

  return text
}

const YooSplit = (text, split = ' ') => {
  if (!Array.isArray(text)) {
    return text.split(split)
  }

  return text
}

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

const YooHideKeyboard = () => {
  if (Application.ios) {
    Application.ios.nativeApp.sendActionToFromForEvent('resignFirstResponder', null, null, null)
  } else {
    Utils.ad.dismissSoftInput()
  }
}

const YooRecursiveSearch = ({
  input = {},
  key = ''
}) => {
  let value

  Object
    .keys(input)
    .some((_key) => {
      if (_key === key) {
        value = input[_key]
        return true
      }

      if (input[_key] &&
          typeof input[_key] === 'object') {
        value = YooRecursiveSearch({ input: input[_key], key })

        return value !== undefined
      }
    })

  return value
}

export {
  YooSplitWords,
  YooLower,
  YooUpper,
  YooUpperFirst,
  YooLowerFirst,
  YooPascal,
  YooCamel,
  YooFaResolver,
  YooRecursiveSearch,
  YooSplit,
  YooJoin,
  YooHideKeyboard
}
