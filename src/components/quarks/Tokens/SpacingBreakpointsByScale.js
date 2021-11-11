module.exports = (
  scale = 1,
  amount = 8,
  breakpoints = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']
) => {
  return [...new Array(breakpoints.length)]
    .reduce(
      (acc, breakpoint, indx, _arr) => {
        const spacing = (indx + 1) * (amount * scale)

        return {
          ...acc,
          [breakpoints[indx]]: String(spacing)
        }
      },
      {}
    )
}
