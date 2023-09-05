import request from '@api'

// ********************* API to Fetch WishList content *************************
export async function retrieveBlooprintsInWishlist(
  { dispatch, commit },
  params
) {
  let wishlistData = []
  commit('setErrorInGettingWishlist', '')
  try {
    let result = await request.get(`/wishlists`, params)
    wishlistData = result['data']
  } catch (error) {
    dispatch('redirectTo404Page', error)
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    } else {
      commit(
        'setErrorInGettingWishlist',
        "Uh... Error 500! Something went wrong at our end. Don't worry, its not you - it's us. Sorry about that."
      )
    }
    wishlistData = []
  }
  return wishlistData
}
// ********************* API to Add Blooprint to WishList *************************
export async function addToWishList({ dispatch }, params) {
  let isSuccess = false
  await request
    .post(`/wishlists`, params)
    .then(result => {
      isSuccess = true
      // dispatch('setToastMessage', {
      //   type: 'positive',
      //   message: 'Added to wishlist'
      // })
    })
    .catch(error => {
      console.log(error.response)
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      } else {
        dispatch('setToastMessage', {
          type: 'negative',
          message: 'Oops, Error in adding  in your wishlist, Please try later'
        })

        isSuccess = false
      }
    })
    .finally(() => {})
  return isSuccess
}

// ********************* API to Add Blooprint to WishList *************************
export async function removeFromWishList({ dispatch }, params) {
  let isSuccess = false
  await request
    .delete(
      `/wishlists/customers/${params['customerID']}/blooprints/${params['blooprintID']}`
    )
    .then(result => {
      if (result['status'] == 204) {
        isSuccess = true
        // dispatch('setToastMessage', {
        //   type: 'positive',
        //   message: 'Removed from wishlist'
        // })
      }
    })
    .catch(error => {
      console.log(error.response)
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      } else {
        dispatch('setToastMessage', {
          type: 'negative',
          message:
            'Oops, Error in removing blooprint from the wishlist, Please try later'
        })
      }
      isSuccess = false
    })
    .finally(() => {})
  return isSuccess
}
