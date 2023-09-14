export const dateDefault = () => {
  // Create a Date object for the desired date "11/09/2023"
  const desiredDate = new Date('2023-09-11')

  console.log('aa', desiredDate.toISOString('de-DE').slice(0, 10));
  // Extract the day, month, and year from the desired date
  const day = desiredDate.getDate()
  const month = desiredDate.getMonth() + 1 // Month is zero-based, so we add 1
  const year = desiredDate.getFullYear()

  // Format the desired date as "DD/MM/YYYY"
  const formattedDate = `${day}/${month < 10 ? `0${month}` : month}/${year}`

  return formattedDate
}
