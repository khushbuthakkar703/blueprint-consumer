import request from '@api'
import { constants } from 'src/utils/common'

// ********************* API create Blooprint*************************
export async function createBlooprint({ commit, dispatch }, blooprintData) {
  commit('setLoading', true)
  try {
    let body = {
      data: {
        type: 'blooprint',
        attributes: blooprintData
      }
    }
    await request.post('/blooprints', body)
    this.$router.push({ name: constants.PAGE_PROFILE })
  } catch (error) {
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
  } finally {
    commit('setLoading', false)
  }
}
// ********************* API to Get Blooprint List *************************
export async function retrieveBlooprintList({ commit, dispatch }, params) {
  let blooprintData = {
    totalCount: 0,
    blooprintList: []
  }
  commit('setErrorInGettingBlooprintList', '')
  await request
    .get(`/blooprints`, params)
    .then(result => {
      blooprintData['blooprintList'] = result['data']['data']
      blooprintData['totalCount'] = result['data']['meta']['count']
      commit('setFeatureBlooprintsList', result['data']['data'])
    })
    .catch(error => {
      dispatch('redirectTo404Page', error)
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      } else {
        commit(
          'setErrorInGettingBlooprintList',
          "Uh... Error 500! Something went wrong at our end. Don't worry, its not you - it's us. Sorry about that."
        )
      }
      commit('setFeatureBlooprintsList', [])
    })
    .finally(() => {})
  return blooprintData
}

// ********************* API to get the Blooprint Details By Id *************************
export async function getBlooprintDetailsById({ dispatch, commit }) {
  let blooprintId = this.$router.history.current.params.blooprintId
  let blooprintData = {}
  commit('setErrorInGettingBlooprintById', '')
  await request
    .get(`/blooprints/${blooprintId}`, { version: 1 })
    .then(result => {
      result['data']['attributes']['promoVideo'] = result['data']['attributes'][
        'promoVideo'
      ]
        ? result['data']['attributes']['promoVideo']
        : ''
      result['data']['attributes']['rating'] = result['data']['attributes'][
        'rating'
      ]
        ? result['data']['attributes']['rating']
        : 0
      blooprintData = result['data']
    })
    .catch(error => {
      dispatch('redirectTo404Page', error)
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      } else {
        commit(
          'setErrorInGettingBlooprintById',
          "Uh... Error 500! Something went wrong at our end. Don't worry, its not you - it's us. Sorry about that."
        )
      }
    })
    .finally(() => {})
  return blooprintData
}

// ********************* API to get author's blooprint list *************************
export async function retrieveAuthorBlooprintList(
  { dispatch, getters },
  params
) {
  dispatch('setLoading', true)
  let authorID = getters.userId
  try {
    const { data } = await request.get(
      `/blooprints/authors/${authorID}`,
      params
    )
    return data
  } catch (error) {
    dispatch('redirectTo404Page', error)
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
  } finally {
    dispatch('setLoading', false)
  }
}

// ********************* API to Delete Blooprint By Id *************************
export async function deleteBlooprint({ dispatch }, blooprintId) {
  let isDeleteSuccess = false
  dispatch('setLoading', true)
  try {
    let { status } = await request.delete(
      `/blooprints/${blooprintId}?version=1`
    )
    dispatch('setLoading', false)
    if (status && status == 204) {
      dispatch('setToastMessage', {
        type: 'positive',
        caption: 'Blooprint Deleted'
      })
      isDeleteSuccess = true
      return isDeleteSuccess
    }
  } catch (error) {
    dispatch('setLoading', false)
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
  } finally {
    dispatch('setLoading', false)
  }
}
// ********************* API to Publish Blooprint By Id *************************
export async function publishBlooprint({ dispatch }, blooprintId) {
  let isSuccess = false
  dispatch('setLoading', true)
  try {
    let body = {
      data: {}
    }
    const { data } = await request.post(
      `/blooprints/${blooprintId}/publish`,
      body
    )
    if (data['attributes']['Status']) {
      isSuccess = true
    }
    return isSuccess
  } catch (error) {
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
  } finally {
    dispatch('setLoading', false)
  }
}

// ********************* API to un-publish Blooprint By Id *************************
export async function unPublishBlooprint({ dispatch }, blooprintId) {
  let isSuccess = false
  dispatch('setLoading', true)
  try {
    let body = {
      data: {}
    }
    const { data } = await request.post(
      `/blooprints/${blooprintId}/unpublish`,
      body
    )
    if (data['attributes']['Status']) {
      isSuccess = true
    }
    return isSuccess
  } catch (error) {
    if (error.response) {
      dispatch('setLoading', false)
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
  } finally {
    dispatch('setLoading', false)
  }
}

// *************** API to Retrieve the Popular Blooprints List *********************************
export async function fetchPopularBlooprintsList({ dispatch, commit }) {
  let popularBlooprintList = []
  // dispatch('setLoading', true)
  commit('setErrorInGettingPopularBlooprints', '')
  await request
    .get(`/blooprints/popular`)
    .then(result => {
      popularBlooprintList = result['data']
    })
    .catch(error => {
      dispatch('redirectTo404Page', error)
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      } else {
        commit(
          'setErrorInGettingPopularBlooprints',
          "Uh... Error 500! Something went wrong at our end. Don't worry, its not you - it's us. Sorry about that."
        )
      }
    })
    .finally(() => {
      // dispatch('setLoading', false)
    })
  return popularBlooprintList
}

// *************** API to Retrieve the Popular Blooprints List *********************************
export async function fetchFeaturedBlooprintsList({ dispatch }) {
  let featuredBlooprintList = []
  // dispatch('setLoading', true)
  await request
    .get(`/blooprints/featured`)
    .then(result => {
      featuredBlooprintList = result['data']
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
      // dispatch('setLoading', false)
    })
  return featuredBlooprintList
}

// *************** API to Retrieve the MileStones List Based on Blooprint Id *********************************
export async function fetchAllMilestonesByBlooprintId({ dispatch }, params) {
  let blooprintId = this.$router.history.current.params.blooprintId
  if (!blooprintId) {
    blooprintId = params['blooprintId']
  }
  let mileStonesList = []
  dispatch('setLoading', true)
  await request
    .get(`/blooprints/${blooprintId}/milestones`)
    .then(result => {
      mileStonesList = result['data']
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
  return mileStonesList
}

// *************** API to Retrieve the MileStones Tasks List Based on Blooprint, Milestone and Task Id's *********************************
export async function fetchTasksDetails({ dispatch }, params) {
  let blooprintId = this.$router.history.current.params.blooprintId
  let milestoneId = this.$router.history.current.params.milestoneId
  let taskId = this.$router.history.current.params.taskId
  if (!milestoneId) {
    milestoneId = params['milestoneId']
  }
  if (!taskId) {
    taskId = params['taskId']
  }
  let taskDetails = []
  dispatch('setLoading', true)
  await request
    .get(`/blooprints/${blooprintId}/milestones/${milestoneId}/tasks/${taskId}`)
    .then(result => {
      taskDetails = result['data']
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
  return taskDetails
}

// *************** API to Retrieve My-Blooprints List *********************************
export async function fetchMyBlooprintsList({ dispatch, commit }, params) {
  let myBlooprintList = []
  commit('setErrorInGettingMyBlooprints', '')
  await request
    .get(`/my-blooprints`, params)
    .then(result => {
      myBlooprintList = result['data']
    })
    .catch(error => {
      dispatch('redirectTo404Page', error)
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      } else {
        commit(
          'setErrorInGettingMyBlooprints',
          "Uh... Error 500! Something went wrong at our end. Don't worry, its not you - it's us. Sorry about that."
        )
      }
    })
  return myBlooprintList
}

// *************** API to Retrieve All Categories List *********************************
export async function fetchAllCategoriesList(
  { dispatch, commit, getters },
  params
) {
  let categoryList = []
  //   if (getters.categoriesList.length > 0) {
  //     categoryList = getters.categoriesList
  //   }
  if (categoryList.length == 0) {
    await request
      .get('/categories', params)
      .then(result => {
        result['data'].map(item => {
          categoryList.push({
            label: item['attributes']['name'],
            value: item['id'],
            parent: item['attributes']['parent'],
            image: item['attributes']['image']
          })
        })
        commit('setCategoriesList', categoryList)
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
    return categoryList
  }
  return categoryList
}
// *************** API to Retrieve All Categories List *********************************
export async function fetchCategorySubCategoryList(
  { dispatch, commit, getters },
  params
) {
  let categoryList = []
  //   if (getters.categorySubCategoriesList.length > 0) {
  //     categoryList = getters.categorySubCategoriesList
  //   }
  if (categoryList.length == 0) {
    await request
      .get('/categories', params)
      .then(result => {
        result['data'].map(item => {
          if (!item['attributes']['parent']) {
            categoryList.push({
              label: item['attributes']['name'],
              value: item['id'],
              subCategory: [{ label: 'All', value: item['id'] }]
            })
          }
        })
        result['data'].map(item => {
          if (item['attributes']['parent']) {
            let index = categoryList.findIndex(
              category => category.value == item['attributes']['parent']
            )
            if (index != -1) {
              categoryList[index]['subCategory'].push({
                label: item['attributes']['name'],
                value: item['id']
              })
            }
          }
        })
        commit('setCategorySubCategoryList', categoryList)
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
    return categoryList
  }
  return categoryList
}
// *************** API to Retrieve the Top Categories List *********************************
export async function fetchTopCategoriesList({ dispatch, commit }) {
  let topCategoriesList = []
  dispatch('setLoading', true)
  await request
    .get(`/categories/favourites`)
    .then(result => {
      topCategoriesList = result['data']
    })
    .catch(error => {
      dispatch('redirectTo404Page', error)
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      } else {
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
  return topCategoriesList
}
