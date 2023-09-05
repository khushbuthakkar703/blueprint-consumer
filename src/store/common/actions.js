import 'firebase/auth'
import 'firebase/storage'
import request from '@api'
import firebase from 'firebase/app'
import timezones from '@utils/timezones'
import { getFireBaseUserId } from '@utils/jwt'
import { constants } from '@utils/common'

export function setLoading({ commit }, value) {
  commit('setLoading', value)
}

export function setToastMessage({ commit }, message) {
  commit('setToastMessage', message)
}

export function setAPIResponseType({ commit }, type) {
  commit('setAPIResponseType', type)
}

export function isAPIResponseFailed({ commit }, type) {
  commit('isAPIResponseFailed', type)
}

export function updateBlooprintFilterTerm({ commit }, type) {
  commit('setBlooprintFilterTerm', type)
}
export function updateBlooprintSortOption({ commit }, type) {
  commit('setBlooprintSortOption', type)
}
export function updateBlooprintCategoryFilterTerm({ commit }, type) {
  commit('setBlooprintCategoryFilterTerm', type)
}
export function isRequestFromMobile({ commit }, type) {
  commit('setIsMobileApp', type)
}
export function updateBackNavigationScreen({ commit }, type) {
  commit('setNavigateBackScreen', type)
}
export function fileUploadToFirebase({ commit, dispatch }, params) {
  dispatch('setLoading', true)
  let fileUrl = ''
  try {
    let url = `${getFireBaseUserId()}/${params.from}/${new Date().getTime() +
      params.file.name}`
    const ref = firebase.storage().ref(url)
    const storageRef = ref.put(params.file)
    storageRef.on(
      'state_changed',
      snapshot => {
        let progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
      },
      error => {
        console.log(error.message)
        dispatch('setLoading', false)
        dispatch('setToastMessage', {
          type: 'negative',
          message: error.message
        })
      },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then(downloadURL => {
          fileUrl = downloadURL
          let fileResponse = {
            url: downloadURL,
            type: params['type']
          }
          if (params['index'] != null && params['index'] != undefined) {
            fileResponse['index'] = params['index']
          }
          commit('updateFileUrl', fileResponse)
          //dispatch('setLoading', false)
        })
      }
    )
    return fileUrl
  } catch (error) {
    console.log(error)
    dispatch('setLoading', false)
    dispatch('setToastMessage', {
      type: 'negative',
      message: error.message
    })
  }
}

// ********************* API to Get User Profile Info Based on ID *************************
export async function fetchLoggedInUserDetails({ commit, dispatch, getters }) {
  let profileInfo = {}
  if (getters.userProfile?.id) {
    profileInfo = getters.userProfile
  } else {
    await request
      .get(`/profiles/${getFireBaseUserId()}`)
      .then(data => {
        let profileData = data['data']
        if (profileData) {
          let result = {
            ...profileData['attributes'],
            id: profileData['id']
          }
          commit('setUserId', profileData['id'])
          commit('updateLoggedInUserData', result)
          commit('setUserProfile', result)
          profileInfo = result
        }
      })
      .catch(error => {
        commit('setUserProfile', {})
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
    return profileInfo
  }
  return profileInfo
}

// ********************* API to Get TimeZone names *************************
export async function getTimezoneNames() {
  return timezones
}

// ********************* API to Get TimeZone names *************************
export function redirectTo404Page({}, error) {
  if (error && error.response) {
    let statusCode = error.response.data.status
    if (statusCode == 404) {
      this.$router.replace({ name: constants.PAGE_404 })
    }
  }
}
