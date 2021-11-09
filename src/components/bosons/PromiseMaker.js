/*
 *  Improve Promise and Async/Await methods and error handling
 *  @method PromiseMaker
 *  @param  {Promise} recieve a promise to add response and catch
 *  @return {Array} [response, error]
 */
const PromiseMaker = promise => {
  if (!promise) {
    return
  }

  try {
    return promise
      .then(
        data =>
          (
            [data, undefined]
          )
      )
      .catch(
        error =>
          Promise.resolve(
            [undefined, error]
          )
      )
  } catch (error) {
    return Promise.resolve(
      [undefined, error]
    )
  }
}

export default PromiseMaker
