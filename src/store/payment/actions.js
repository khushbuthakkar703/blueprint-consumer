import request from '@api'

export async function updateCustomerCreditCard({ commit }, token) {
  try {
    commit('setPaymentError', '')
    commit('setLoading', true)
    let body = {
      data: {
        type: 'card',
        attributes: {
          creditCardToken: token
        }
      }
    }
    const { data } = await request.put('subscriptions/credit-card', body)
    commit('setCardInfo', {
      brand: data.attributes.brand,
      last4: data.attributes.last4,
      expMonth: data.attributes.expMonth,
      expYear: data.attributes.expYear,
      name: data.attributes.name
    })
    commit('setToastMessage', {
      type: 'positive',
      message: 'Card has been updated successfully.'
    })
  } catch (e) {
    if (e.response === undefined) {
      commit(
        'setPaymentError',
        "Uh... Error 500! Something went wrong at our end. Don't worry, its not you - it's us. Sorry about that., please try again later"
      )
    } else {
      commit('setPaymentError', e.response.data.detail)
    }
    // showError('Oops!, There was some problem in updating your credit card')
    commit('setToastMessage', {
      type: 'negative',
      message: 'Oops!, There was some problem in updating your credit card'
    })
  } finally {
    commit('setLoading', false)
  }
}

export async function getCardDetails({ commit, dispatch }) {
  let cardInfo = {}
  try {
    let body = {}
    const { data } = await request.get('/subscriptions/credit-card', body)
    cardInfo = data
    commit('setCardInfo', {
      brand: data.attributes.brand,
      last4: data.attributes.last4,
      expMonth: data.attributes.expMonth,
      expYear: data.attributes.expYear,
      name: data.attributes.name
    })
  } catch (error) {
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
  } finally {
  }
  return cardInfo
}

export async function buyBlooprint({ commit, dispatch }, params) {
  dispatch('setLoading', true)
  commit('setPaymentError', '')
  try {
    const { data } = await request.post('/charge', params)
    if (data['attributes']['blooprintID']) {
      return data
    }
  } catch (error) {
    if (error.response === undefined) {
      commit(
        'setPaymentError',
        "Uh... Error 500! Something went wrong at our end. Don't worry, its not you - it's us. Sorry about that., please try again later"
      )
    } else {
      commit('setPaymentError', error.response.data.detail)
      dispatch('setToastMessage', {
        type: 'negative',
        caption: error.response.data.detail,
        message: 'Oops! Payment Failed',
        timeout: 6000,
        classes: 'payment-fail-toast'
      })
    }
  } finally {
    commit('setLoading', false)
  }
}
