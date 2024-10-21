import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/ru'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(utc)
dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)
dayjs.locale('ru')

export const getFormatDate = (date: string, withHours?: boolean) => {
  return !withHours
    ? dayjs(date).format('DD.MM.YYYY')
    : dayjs(date).format('DD.MM.YYYY HH:mm')
}

export const getTimezoneDate = (date: string) => {
  const data = dayjs.utc(date)
  const dataArray = data.format('DD.MM.YYYY HH:mm').split(' ')
  return dataArray[1] === '00:00'
    ? { date: dataArray[0], time: null }
    : { date: dataArray[0], time: dataArray[1] }
}

export const getFormatDateWithDash = (date: string) => {
  return dayjs(date, 'DD-MM-YYYY').format('YYYY-MM-DD')
}

export const getHour = (date: string) => {
  return dayjs(date).hour()
}

export const getFullFormatDate = (dateString: string) => {
  return dayjs(dateString).format('dd DD.MM.YY HH:mm')
}

export const checkDateValidityByHours = (date: string) => {
  const dateString = dayjs(date).format('YYYY-MM-DD')
  const now = dayjs()
  return now.diff(dateString, 'hour')
}

export const checkDateValidityByDays = (date: string) => {
  const dateString = dayjs(date).format('YYYY-MM-DD')
  const now = dayjs()
  return now.diff(dateString, 'day')
}

export const checkDateValidity = (date: string) => {
  return dayjs(date).isValid()
}

export const getDaysUntilToday = (date: string) => {
  const targetDate = dayjs(date)
  const today = dayjs()
  const daysDifference = targetDate.diff(today, 'day')

  if (daysDifference === 0) {
    return { text: 'сегодня', difference: daysDifference }
  } else if (daysDifference < 10 && daysDifference > 0) {
    return {
      text: `${daysDifference} ${getDaysWord(daysDifference)}`,
      difference: daysDifference,
    }
  } else if (daysDifference < 0) {
    return {
      text: `${daysDifference} ${getDaysWord(daysDifference)}`,
      difference: daysDifference,
    }
  }
  return null
}

export const getHoursUntilDeadline = (startDate: string, endDate: string) => {
  const start = dayjs(startDate)
  const end = dayjs(endDate)
  const difference = start.diff(end, 'hours')

  return difference
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
