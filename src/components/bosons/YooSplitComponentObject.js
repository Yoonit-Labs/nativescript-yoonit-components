import {
  YooSplitWords,
  YooLower,
  YooCamel
} from './YooUtils'

const YooSplitComponentObject = (
  object = {},
  components = []
) => {
  return Object
    .entries(object)
    .reduce((acc, [key, value]) => {
      const attribute = YooLower(YooSplitWords(key))
      let component = ''

      if (attribute.length > 1) {
        component = attribute.shift()

        if (components.includes(component)) {
          key = YooCamel(attribute).join('')

          return {
            ...acc,
            [component]: {
              ...acc[component],
              [key]: value
            }
          }
        }
      }

      return {
        ...acc,
        root: {
          ...acc.root,
          [key]: value
        }
      }
    }, {})
}

export default YooSplitComponentObject
