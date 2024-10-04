import dayjs from 'dayjs'

export const getFormatDate = (date: string) => {
  return dayjs(date).format('DD.MM.YYYY')
}

export const getFullFormatDate = (dateString: string) => {
  return dayjs(dateString).format('dd DD.MM.YY HH:mm')
}

// Код без "СЕГОДНЯ"
// export const getDaysWord = (count: number) => {
//   if (count % 10 === 1 && count % 100 !== 11) {
//     return 'день'
//   } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 12 || count % 100 > 14)) {
//     return 'дня'
//   } else {
//     return 'дней'
//   }
// }

// export const getDaysUntilToday = (date: string) => {
//   const targetDate = dayjs(date)
//   const today = dayjs()
//   const daysDifference = targetDate.diff(today, 'day')
//   if (daysDifference < 10 && daysDifference >= 0) {
//     return `${daysDifference} ${getDaysWord(daysDifference)}`
//   }
//   return null
// }

export const getDaysUntilToday = (date: string) => {
  const targetDate = dayjs(date)
  const today = dayjs()
  const daysDifference = targetDate.diff(today, 'day')

  if (daysDifference === 0) {
    return 'сегодня'
  } else if (daysDifference < 10 && daysDifference >= 0) {
    return `${daysDifference} ${getDaysWord(daysDifference)}`
  }
  return null
}

export const getDaysWord = (count: number) => {
  if (count === 0) {
    return 'сегодня'
  } else if (count % 10 === 1 && count % 100 !== 11) {
    return 'день'
  } else if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 12 || count % 100 > 14)
  ) {
    return 'дня'
  } else {
    return 'дней'
  }
}
