export const getMax = (...dates: Date[]): Date => {
  return new Date(Math.max(...dates.map((date) => date.getTime())))
}
export const getMin = (...dates: Date[]): Date => {
  return new Date(Math.min(...dates.map((date) => date.getTime())))
}
