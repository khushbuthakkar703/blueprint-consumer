import request from '@api'

// ********************* API to Add Blooprint to WishList *************************
export async function fetchReviewsList({ dispatch }, params) {
  let reviewList = []
  await request
    .get(`/reviews`, params)
    .then(result => {
      reviewList = result['data']
    })
    .catch(error => {
      dispatch('redirectTo404Page', error)
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      }
    })
    .finally(() => {})
  return reviewList
}

// ********************* API to Save the Review/Rating *************************
export async function saveReviewAndRating({ dispatch }, params) {
  let isReviewSaved = false
  dispatch('setLoading', true)

  await request
    .post(`/reviews`, params)
    .then(result => {
      isReviewSaved = true
      dispatch('setToastMessage', {
        type: 'positive',
        message: 'Review Submitted Successfully'
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
  return isReviewSaved
}

// ********************* API to Get Blooprint Rating *************************
export async function getBlooprintRating({ dispatch }, params) {
  let ratingValue = { isError: false, value: 0 }
  let blooprintId = this.$router.history.current.params.blooprintId
  if (!blooprintId) {
    blooprintId = params['blooprintId']
  }
  dispatch('setLoading', true)
  try {
    let result = await request.get(`/reviews/blooprints/${blooprintId}/rating`)
    ratingValue['value'] = result['data']['attributes']['blooprintRating']
    dispatch('setLoading', false)
  } catch (error) {
    dispatch('redirectTo404Page', error)
    ratingValue['isError'] = true
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
    dispatch('setLoading', false)
  }
  return ratingValue
}

// ********************* API to Get Author Rating *************************
export async function getAuthorRating({ dispatch, getters }, requestFrom) {
  let ratingValue = { isError: false }
  let authorId
  if (requestFrom['from'] == 'mobile') {
    authorId = requestFrom['authorId']
      ? requestFrom['authorId']
      : this.$router.history.current.params.profileId
  } else if (requestFrom['from'] == 'desktop') {
    authorId = requestFrom['isLoggedInUser']
      ? getters.userId
      : this.$router.history.current.params.profileId
  }
  await request
    .get(`/reviews/authors/${authorId}/rating`)
    .then(result => {
      ratingValue['data'] = result['data']['attributes']
    })
    .catch(error => {
      ratingValue['isError'] = true
      dispatch('redirectTo404Page', error)
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      }
    })
  return ratingValue
}

// ********************* API to Get Review Details By Id *************************
export async function getReviewById({ dispatch }, reviewId) {
  let reviewDetails = {}
  dispatch('setLoading', true)
  await request
    .get(`/reviews/${reviewId}`)
    .then(result => {
      reviewDetails = result['data']
    })
    .catch(error => {
      dispatch('redirectTo404Page', error)
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
  return reviewDetails
}

// ********************* API to Delete Review *************************
export async function deleteReviewById({ dispatch }, reviewId) {
  dispatch('setLoading', true)
  await request
    .delete(`/reviews/${reviewId}`)
    .then(result => {
      dispatch('setToastMessage', {
        type: 'positive',
        message: 'Review has been successfully deleted'
      })
    })
    .catch(error => {
      dispatch('redirectTo404Page', error)
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
}

// ********************* API to Update the Review/Rating *************************
export async function updateReviewAndRating({ dispatch }, params) {
  let isReviewSaved = false
  dispatch('setLoading', true)
  let reviewId = params['reviewId']
  delete params['reviewId']

  await request
    .put(`/reviews/${reviewId}`, params)
    .then(result => {
      isReviewSaved = true
      dispatch('setToastMessage', {
        type: 'positive',
        message: 'Review Updated Successfully'
      })
    })
    .catch(error => {
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
  return isReviewSaved
}
