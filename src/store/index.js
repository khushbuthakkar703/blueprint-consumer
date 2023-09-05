import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import common from './common'
import blooprint from './blooprint'
import review_rating from './review_rating'
import wishlist from './wishlist'
import payment from './payment'
import schedule from './schedule'
import notifications from './notifications'
import purchase from './purchase'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
const Store = new Vuex.Store({
  modules: {
    user,
    common,
    blooprint,
    review_rating,
    wishlist,
    payment,
    schedule,
    notifications,
    purchase
  }
})

export { Store }

export default function(/* { ssrContext } */) {
  // enable strict mode (adds overhead!)
  // for dev mode only
  // strict: process.env.DEV
  return Store
}
