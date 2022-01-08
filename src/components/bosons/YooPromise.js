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

/*
 *  Improve Promise and Async/Await methods and error handling
 *  @method YooPromise
 *  @param  {Promise} receive a promise to add response and catch
 *  @return {Array} [response, error]
 */
const YooPromise = (promise = null, id = '') => {
  const log = (label, ...args) => {
    if (id) {
      return console.log(`[YOO_PROMISE|ID: '${id}'] ${label}`, ...args)
    }
  }

  if (!promise) {
    log('Nota promise')
    return
  }

  log('Running')

  try {
    return promise
      .then(
        data => {
          if (data === undefined) {
            throw new Error()
          }

          return [
            data,
            undefined
          ]
        }
      )
      .catch(
        error => {
          log('Error-Try:', error)

          return [
            undefined,
            error
          ]
        }
      )
  } catch (error) {
    log('Error-Catch:', error)

    return [
      undefined,
      error
    ]
  }
}

export default YooPromise
