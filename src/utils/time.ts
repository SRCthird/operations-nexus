
export const seconds = (seconds: number) => {
  return seconds*1000
}

export const minutes = (minutes: number) => {
  return seconds(minutes*60)
}

export const hours = (hours: number) => {
  return minutes(hours*60)
}
