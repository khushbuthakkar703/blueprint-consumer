import request from '@api'

// ********************* API to Fetch the Notification Data *************************
export async function fetchUserNotificationIno({ dispatch }) {
  let notificationInfo = {}
  await request
    .get(`/profiles/notifications`)
    .then(result => {
      notificationInfo = result['data']
    })
    .catch(error => {
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.detail
        })
      }
    })
    .finally(() => {})
  return notificationInfo
}
// ********************* API to Save the Notification Data *************************
export async function saveUserNotificationIno({ dispatch }, params) {
  let isNotificationSaved = false
  dispatch('setLoading', true)
  await request
    .post(`/profiles/notifications`, params)
    .then(result => {
      isNotificationSaved = true
      dispatch('setToastMessage', {
        type: 'positive',
        message: 'Notification Saved Successfully'
      })
    })
    .catch(error => {
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.detail
        })
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
  return isNotificationSaved
}
// ********************* API to Update the Notification Data *************************
export async function updateUserNotificationIno({ dispatch }, params) {
  let isNotificationUpdated = false
  dispatch('setLoading', true)
  let notifiationId = params['id']
  delete params['id']
  await request
    .put(`/profiles/notifications/${notifiationId}`, params)
    .then(result => {
      isNotificationUpdated = true
      dispatch('setToastMessage', {
        type: 'positive',
        message: 'Notification Updated Successfully'
      })
    })
    .catch(error => {
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.detail
        })
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
  return isNotificationUpdated
}
