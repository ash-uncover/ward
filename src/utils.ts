export const SHORT_ID_SIZE = 5

export const shortId = (...ids: string[]) => {
  if (ids.length) {
    return ids.map(id => id.substring(SHORT_ID_SIZE)).join('-')
  }
  return ''
}