export function convertDateFormat(inputDate) {
  const parts = inputDate.split('/')
  if (parts.length === 3) {
    const day = parts[0]
    const month = parts[1]
    const year = parts[2]
    return `${year}-${month}-${day}`
  } else {
    return null
  }
}
