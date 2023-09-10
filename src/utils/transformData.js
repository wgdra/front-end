export function transformData(data, label) {
  return data?.map((item) => ({
    value: item.id,
    label: item[label],
  }))
}
