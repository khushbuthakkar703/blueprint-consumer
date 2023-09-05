import { getToken } from '@utils/auth'
import { Platform, date } from 'quasar'
import moment from 'moment-timezone'
export const emailPattern = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
export const userNamePattern = /^[a-zA-Z\$.-\s]*$/

export const file10MB = 10485760 // ***** Image Size 10 MB ***********
export const constants = {
  PAGE_FEATURE_BLOOPRINT: 'feature-blooprint',
  PAGE_AUTH: 'auth',
  PAGE_DESKTOP_HOME_SCREEN: 'explore-screen',
  PAGE_LOGIN: 'login',
  PAGE_PROFILE: 'my-profile',
  PAGE_CREATE_BLOOPRINT: 'create-blooprint',
  PAGE_USER_BLOOPRINT_LIST: 'blooprints-list',
  PAGE_DESKTOP_LANDING_SCREEN: 'home',
  PAGE_404: 'error404',
  AUTHOR_RATING: 'authorRating',
  BLOOPRINTRATING: 'blooprintRating',
  USER_BLOOPRINT_RATING: 'userBlooprintRating',
  STATUS: {
    ACTIVE: 'active',
    PROGRESS: 'progress',
    PUBLISH: 'publish',
    UNPUBLISH: 'unpublish'
  }
}
export const isLogin = () => {
  return !!getToken('access')
}

export function isMobileApp() {
  if (Platform.is.capacitor != undefined) {
    return Platform.is.capacitor
  }

  return false
}

export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

export function getDateFormat(value) {
  return date.formatDate(new Date(value), 'MM/DD/YYYY, HH:mm')
}

export function formatDateToRespectiveTimeZone(date, timezoneName) {
  return moment.tz(date, timezoneName).format('MM-DD-YYYY HH:mm')
}

export function formatDateChangeToRespectiveTimeZone(date, timezoneName) {
  return moment.tz(date, timezoneName).format('YYYY-MM-DD HH:mm')
}

export function formatReviewDateToRespectiveTimeZone(date, timezoneName) {
  return moment.tz(date, timezoneName).format('MM-DD-YYYY HH:mm')
}

export function convertDateToUTCFormat(date, timezoneName) {
  return moment
    .tz(date, 'YYYY-MM-DD HH:mm', timezoneName)
    .utc()
    .format()
}

export function openStudioScreen() {
  window.open(process.env.BLOOPRINTED_ENV_STUDIO_URL)
}

export async function getTimezones() {
  let timeZoneNames = []
  let timezones = await import('./timezones.json')
  // Applying the following format on timezones i.e "(GMT+05:30) India Standard Time (Asia/Kolkata)"
  Object.keys(timezones).forEach(function(key) {
    if (key === 'default') return
    let value = timezones[key]
    timeZoneNames.push(value + ' ' + '(' + key + ')')
  })
  return timeZoneNames
}

// ********************* Get TimeZone String by Timezone Name *************************
export async function getTimezoneString(timezone) {
  // Getting timezone with the following format i.e "(GMT+05:30) India Standard Time (Asia/Kolkata)"
  let timezones = await import('./timezones.json')
  return timezones[timezone] + ' ' + '(' + timezone + ')'
}

// ********************* Remove format from Timezone string  *************************
export function removeFormatFromTimezoneString(timezone) {
  return timezone.split(' (')[1].replace(')', '')
}

// ********************* New approach *********************
export function calcDiscountedPrice(
  timezone,
  endDate,
  price,
  discount,
  startDate
) {
  // let today = getDateFormat(new Date())
  let month = new Date().getMonth() + 1
  month = month < 10 ? '0' + month : month
  let day =
    new Date().getDate() > 10
      ? new Date().getDate()
      : '0' + new Date().getDate()
  let today =
    month +
    '/' +
    day +
    '/' +
    new Date().getFullYear() +
    ' ' +
    new Date().getHours() +
    ':' +
    new Date().getMinutes() +
    ':' +
    new Date().getSeconds()
  let discEndDate = ''
  let discStartDate = ''
  let isDiscountPresent = false
  if (timezone && timezone != '') {
    discEndDate = endDate
      ? date.formatDate(
          formatDateChangeToRespectiveTimeZone(endDate, timezone),
          'MM/DD/YYYY HH:mm:ss'
        )
      : ''
    discStartDate = startDate
      ? date.formatDate(
          formatDateChangeToRespectiveTimeZone(startDate, timezone),
          'MM/DD/YYYY HH:mm:ss'
        )
      : ''
  } else {
    discEndDate = endDate ? date.formatDate(endDate, 'MM/DD/YYYY HH:mm:ss') : ''
    discStartDate = startDate
      ? date.formatDate(startDate, 'MM/DD/YYYY HH:mm:ss')
      : ''
  }
  if (discEndDate && discStartDate) {
    if (
      Date.parse(discEndDate) >= Date.parse(today) &&
      Date.parse(discStartDate) <= Date.parse(today)
    ) {
      isDiscountPresent = true
    } else {
      isDiscountPresent = false
    }
  } else {
    if (discEndDate && discStartDate == '') {
      if (Date.parse(discEndDate) >= Date.parse(today)) {
        isDiscountPresent = true
      } else {
        isDiscountPresent = false
      }
    } else if (discStartDate && discEndDate == '') {
      if (Date.parse(discStartDate) <= Date.parse(today)) {
        isDiscountPresent = true
      } else {
        isDiscountPresent = false
      }
    } else {
      isDiscountPresent = true
    }
  }
  if (isDiscountPresent) {
    // return (price - price * (discount / 100)).toFixed(2)
    let discountPrice = price - price * (discount / 100)
    if (
      discountPrice.toString().split('.')[1] &&
      discountPrice.toString().split('.')[1].length > 1
    ) {
      return Number(
        discountPrice.toString().split('.')[0] +
          '.' +
          discountPrice
            .toString()
            .split('.')[1]
            .slice(0, 2)
      )
    } else {
      return discountPrice.toFixed(2)
    }
  } else {
    return 0
  }
}
