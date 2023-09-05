import axios from 'axios'
import qs from 'qs'
import { Cookies, uid } from 'quasar'

// env variables used
// MAC_API_BASE_URL
// MAC_COOKIE_DOMAIN
// MAC_PRODUCT_ID
// MAC_PRODUCT_NAME

// mac productID - product id registered with mac
// will be changed according to the product using mac script
const macProductID = ''
const macProductName = ''

// create axios instance for sending requests
const apiURL = process.env.MAC_API_BASE_URL || ''
const baseURL = apiURL.endsWith('/') ? `${apiURL}v1/` : `${apiURL}/v1/`
const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
})

// cookie related initialization
const cookieDomain = location.hostname.replace('www.', '.')
const cookieOptions = {
  path: '/',
  domain: process.env.MAC_COOKIE_DOMAIN || cookieDomain
}
// cookie map - url param mapping to cookie name
const cookieMap = {
  affid: 'mac_affid',
  utm_campaign: 'mac_utm_campaign',
  utm_source: 'mac_utm_source',
  utm_medium: 'mac_utm_medium',
  // visitorID key - not present in url params
  visitorID: 'mac_vid'
}

// global mac object - to be added to Vue
const mac = {
  // track events function - custom event
  track: function(eventName, params) {
    try {
      // throw error if no api url defined
      if (!apiURL || apiURL.trim() == '') {
        const error = new Error('No api URL defined to send data to.')
        // setting error name
        error.name = 'Missing api URL'
        throw error
      }
      // throw an error if eventName not present or blank
      if (!eventName || !(typeof eventName === 'string') || !eventName.trim()) {
        const error = new Error('Event Name should be a non empty string.')
        // setting error name
        error.name = 'Invalid Event Name'
        throw error
      }
      // throw an error if params present and not an object
      if (params && !(typeof params === 'object')) {
        const error = new Error('Params should be an object.')
        // setting error name
        error.name = 'Invalid Params'
        throw error
      }

      // get cookie values and other realated values
      // actual page url
      const url = location.href
      // browser userAgent
      const browserAgent = navigator.userAgent
      // Referrer
      const referrer = document.referrer
      // mac product id
      const productID = process.env.MAC_PRODUCT_ID || macProductID
      // slug / product name
      const slug = process.env.MAC_PRODUCT_NAME || macProductName
      // affiliate id cookie
      const affID = Cookies.get(cookieMap.affid)?.toString()
      // utm_campaign cookie
      const utm_campaign = Cookies.get(cookieMap.utm_campaign)?.toString()
      // utm_source cookie
      const utm_source = Cookies.get(cookieMap.utm_source)?.toString()
      // utm_medium cookie
      const utm_medium = Cookies.get(cookieMap.utm_medium)?.toString()
      // event name
      const name = eventName
      // timestamp
      const timestamp = new Date(Date.now()).toISOString()
      // visitor id
      const visitorID = setupVisitorCookie()

      // build and send event data to backend
      const eventBody = {
        data: {
          type: 'events',
          attributes: {
            url,
            browserAgent,
            referrer,
            productID,
            slug,
            affID,
            utm_campaign,
            utm_source,
            utm_medium,
            name,
            timestamp,
            visitorID,
            params
          }
        }
      }
      api.post('mactracks', eventBody).catch(error => {
        console.log({ error })
      })
    } catch (error) {
      console.error({ error })
    }
  },
  // login event
  login: function(params) {
    this.track('login', params)
  },
  // logout event
  logout: function(params) {
    this.track('logout', params)
  },
  // signup event
  signup: function(params) {
    this.track('signup', params)
  },
  // page visit event
  pageVisit: function(params) {
    this.track('pageVisit', params)
  },
  // lead event
  lead: function(params) {
    this.track('lead', params)
  },
  // add to cart event
  addToCart: function(params) {
    this.track('addToCart', params)
  },
  // purchase event
  purchase: function(params) {
    this.track('purchase', params)
  },
  // upgrade plan event
  upgrade: function(params) {
    this.track('upgrade', params)
  },
  // cancel plan event
  cancel: function(params) {
    this.track('cancel', params)
  }
}

// setup visitor cookie
function setupVisitorCookie() {
  // create new visitor id and add to cookies if not present
  const visitorCookieName = cookieMap.visitorID
  if (!Cookies.has(visitorCookieName) || !Cookies.get(visitorCookieName)) {
    //set/ reset visitorID cookie
    Cookies.remove(visitorCookieName, cookieOptions)
    Cookies.set(visitorCookieName, uid(), cookieOptions)
  }
  return Cookies.get(visitorCookieName)?.toString()
}

// init function - set/ reset all related cookies from url
function init() {
  // get query params from url
  const searchParams = new URLSearchParams(location.search)
  // loop through searchParams and set/ reset cookies
  searchParams.forEach((cookieValue, cookieParam) => {
    const cookieName = cookieMap[cookieParam]
    if (cookieName) {
      // remove cookie if already exists
      Cookies.remove(cookieName, cookieOptions)
      // set cookie
      Cookies.set(cookieName, cookieValue, cookieOptions)
    }
  })
  setupVisitorCookie()
  // TODO: ambiguity - this will remove other url params that might be of use to the app internally
  // strip out url params and redirect to the same url
  // if (searchParams && searchParams.toString()) {
  //   location = location.pathname;
  // }
}

export default ({ Vue }) => {
  // call init function to setup cookies
  init()
  // call track function with initialPageVisit event
  mac.track('initialPageVisit')
  // add mac global to Vue prototype
  Vue.prototype.mac = mac
}

export { mac }
