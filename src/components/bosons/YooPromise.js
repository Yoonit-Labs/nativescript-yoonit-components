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
const YooPromise = promise => {
  console.log('[YOOPROMISE]')
  if (!promise) {
    return
  }

  try {
    return promise
      .then(
        data =>
          (
            [
              data,
              undefined
            ]
          )
      )
      .catch(
        error =>
          Promise
            .resolve(
              [
                undefined,
                error
              ]
            )
      )
  } catch (error) {
    return Promise
      .resolve(
        [
          undefined,
          error
        ]
      )
  }
}

export default YooPromise
