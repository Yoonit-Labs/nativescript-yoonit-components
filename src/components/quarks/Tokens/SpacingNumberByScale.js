module.exports = (scale = 8, size = 100) => {
  return [...new Array(size)]
    .reduce(
      (acc, _number, indx, _arr) => {
        const spacing = indx * scale

        return {
          ...acc,
          [spacing]: String(spacing)
        }
      },
      {}
    )
}
