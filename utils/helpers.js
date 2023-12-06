// from multiline input to an array then to a string sperated by '‖'
export const joinLines = (str) => str.split(/\r?\n/).join('‖')

// from string separated by '‖' to an array to a multiline string
export const separateLines = (str) => str.split('‖').join('\n')

// string separated by '‖' to an array
export const splitLines = (str) => str.split('‖')

export const capitalize = (str) => {
  if (typeof str !== 'string') return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const fetchData = async (url) => {
  const response = await fetch(url)
  const data = await response.json()
  return data
}
