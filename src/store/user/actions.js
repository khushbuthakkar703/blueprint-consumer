import request from '@api'
import { mac } from 'src/boot/mac'
import { setToken, clearStorage, removeToken } from '@utils/auth'
import { firebaseAuth, googleAuth } from 'src/boot/firebase'
import { constants, isMobileApp } from 'src/utils/common'
import { getFireBaseUserId } from '@utils/jwt'
import { cfaSignIn, mapUserToUserInfo } from 'capacitor-firebase-auth'
import { cfaSignOut } from 'capacitor-firebase-auth'

export async function accountActivation({ commit }, accountInfo) {
  commit('setLoading', true)
  try {
    const { data } = await request.post(
      'profiles/mail/account/activation',
      accountInfo
    )

    commit('setAPIResponseType', {
      type: 'success',
      message: 'Account activated successfully.'
    })
    // setToken(idToken)
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

export async function userAccountActivation({ commit, dispatch }, token) {
  commit('setLoading', true)
  commit('setErrorInAccountActivation', '')
  try {
    const { data } = await request.post(`/profiles/activation?secure=${token}`)
    const tokenInfo = data.attributes.message
    setToken(tokenInfo)
  } catch (error) {
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
      commit('setErrorInAccountActivation', error.response.data.title)
    } else {
      commit(
        'setErrorInAccountActivation',
        "Uh... Error 500! Something went wrong at our end. Don't worry, its not you - it's us. Sorry about that., please try again later"
      )
    }
  } finally {
    commit('setLoading', false)
  }
}

export async function resetPasswordVerification({ commit }, passwordInfo) {
  commit('setLoading', true)
  try {
    const { data } = await request.post(
      `profiles/${passwordInfo['data']['attributes']['code']}/verification`,
      passwordInfo
    )

    commit('setAPIResponseType', {
      type: 'success',
      message: 'Reset Password verified successfully.'
    })
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
    commit('setLoading', false)
  }
}

export async function createUserAccount(
  { commit, dispatch, getters },
  registerData
) {
  commit('setLoading', true)
  var isUserAccountCreatedSuccessfully = true
  await firebaseAuth
    .createUserWithEmailAndPassword(registerData.email, registerData.password)
    .then(user => {
      firebaseAuth.currentUser
        .getIdToken(false)
        .then(async token => {
          setToken(token) // set token into cookie.
          let body = {
            data: {
              type: 'profiles',
              attributes: {
                email: user.user.email,
                firebaseUID: user.user.uid
              }
            }
          }
          // if (registerData.requestFrom == 'desktopSignup') {
          body['data']['attributes']['firstName'] = registerData.firstName
          body['data']['attributes']['lastName'] = registerData.lastName
          body['data']['attributes'][
            'timeZone'
          ] = Intl.DateTimeFormat().resolvedOptions().timeZone

          // }
          try {
            const data = await request.post('/profiles', body)
            // default notification setup start
            dispatch('saveUserNotificationIno', {
              data: {
                type: 'profiles',
                attributes: {
                  blooprintAlert: true,
                  emailNotification: true,
                  mobileNotification: false,
                  mobileNumber: '',
                  monthlyOffers: true,
                  weeklyUpdate: true
                }
              }
            })
            // default notification setup end
            commit('setLoggedIn', true)
            if (registerData.requestFrom != 'paymentSignupScreen') {
              if (isMobileApp()) {
                this.$router.replace(
                  { name: constants.PAGE_FEATURE_BLOOPRINT },
                  () => {}
                )
              } else {
                this.$router.replace(
                  {
                    name: constants.PAGE_DESKTOP_HOME_SCREEN
                  },
                  () => {}
                )
              }
            }
            /* MAC integration */
            try {
              const user = data.data.attributes
              mac.lead({
                email: user.email,
                username:
                  user.firstName +
                  (user.lastName === undefined ? '' : ' ' + user.lastName)
              })
            } catch (error) {
              console.log(error)
            }
            /*End of MAC integration*/
          } catch (error) {
            isUserAccountCreatedSuccessfully = false
            if (error.response) {
              dispatch('setToastMessage', {
                type: 'negative',
                caption: 'Status ' + error.response.data.status,
                message: error.response.data.title
              })
            }
          }
        })
        .catch(error => {
          isUserAccountCreatedSuccessfully = false
          dispatch('setToastMessage', {
            type: 'negative',
            message: error.message
          })
        })
    })
    .catch(error => {
      isUserAccountCreatedSuccessfully = false
      dispatch('setToastMessage', {
        type: 'negative',
        message: error.message
      })
    })
    .finally(() => {
      commit('setLoading', false)
    })
  return isUserAccountCreatedSuccessfully
}

export async function userLogin({ commit, dispatch, getters }, loginData) {
  commit('setLoading', true)
  if (loginData) {
    firebaseAuth
      .signInWithEmailAndPassword(loginData.email, loginData.password)
      .then(res => {
        let userId = res['user']['uid']
        // this.$makeUserOnline(userId)
        firebaseAuth.currentUser.getIdToken().then(async access_token => {
          setToken(access_token) // set token into cookie.

          try {
            const data = await request.get(`/profiles/${userId}`)
            const user = data.data.attributes
            if (loginData.requestFrom === 'buy-blooprint') {
              dispatch('getBlooprintDetailsById', loginData.blooprintId).then(
                data => {
                  if (data['attributes']['purchased'] === true) {
                    this.$router.push({
                      name: 'purchased-blooprint-landing-page',
                      params: {
                        blooprintId: loginData.blooprintId
                      }
                    })
                  } else {
                    this.$router.push({
                      name: 'blooprint-checkout',
                      params: {
                        blooprintId: loginData.blooprintId
                      }
                    })
                  }
                }
              )
            } else {
              if (isMobileApp()) {
                this.$router.replace(
                  { name: constants.PAGE_FEATURE_BLOOPRINT },
                  () => {}
                )
              } else {
                this.$router.replace(
                  {
                    name: constants.PAGE_DESKTOP_HOME_SCREEN
                  },
                  () => {}
                )
              }
            }

            /* MAC integration */
            try {
              mac.login({
                email: user.email,
                username:
                  user.firstName +
                  (user.lastName === undefined ? '' : ' ' + user.lastName)
              })
            } catch (error) {
              console.log(error)
            }
            /*End of MAC integration*/
          } catch (error) {
            console.log(error)
          }
        })
      })
      .catch(error => {
        dispatch('setToastMessage', {
          type: 'negative',
          message: error.message
        })
      })
      .finally(() => {
        commit('setLoading', false)
      })
  }
}

export async function updateLoginCredentials(
  { commit, dispatch, getters },
  loginData
) {
  commit('setLoading', true)
  var passwordSuccess = true
  if (loginData) {
    await firebaseAuth
      .signInWithEmailAndPassword(loginData.email, loginData.password)
      .then(res => {
        let userId = res['user']['uid']
        firebaseAuth.currentUser.getIdToken().then(async access_token => {
          try {
            firebaseAuth.currentUser
              .updatePassword(loginData.newPassword)
              .then(() => {
                dispatch('setToastMessage', {
                  type: 'positive',
                  message: 'Password has been updated successfully!!'
                })
              })
              .catch(error => {
                dispatch('setToastMessage', {
                  type: 'positive',
                  message: error.message
                })
                passwordSuccess = false
              })
          } catch (error) {
            console.log(error)
            passwordSuccess = false
          }
        })
      })
      .catch(error => {
        dispatch('setToastMessage', {
          type: 'negative',
          message: error.message
        })
        passwordSuccess = false
      })
      .finally(() => {
        commit('setLoading', false)
      })
  }
  return passwordSuccess
}

export async function sendResetEmail({ dispatch }, params) {
  try {
    dispatch('setLoading', true)
    let body = {
      data: {
        type: 'profiles',
        attributes: {
          email: params.recoveryEmail
        }
      }
    }
    await request.post(`profiles/reset-password`, body)
    return true
  } catch (error) {
    if (error.code == 'auth/user-not-found') {
      return true
    } else {
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      }
    }
  } finally {
    dispatch('setLoading', false)
  }
}

export async function resetPassword({ dispatch }, params) {
  try {
    dispatch('setLoading', true)
    let body = {
      data: {
        type: 'profiles',
        attributes: {
          password: params.password
        }
      }
    }
    let data = await request.post(
      `profiles/reset-password?secure=${params.code}`,
      body
    )
    if (data) {
      return true
    }
  } catch (error) {
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
    return false
  } finally {
    dispatch('setLoading', false)
  }
}
// ************* Method For Google Sign In  ********************************
export async function googleSignIn({ commit, dispatch, getters }, loginData) {
  var provider = googleAuth()
  dispatch('setLoading', true)
  firebaseAuth
    .signInWithPopup(provider)
    .then(async result => {
      let userId = result['user']['uid']
      dispatch('setLoading', false)
      const isNewUser = result['additionalUserInfo']['isNewUser']
      firebaseAuth.currentUser.getIdToken(false).then(async token => {
        setToken(token)
        if (isNewUser) {
          var user = result.user
          let body = {
            data: {
              type: 'profiles',
              attributes: {
                email: user.email,
                firebaseUID: user.uid,
                firstName: user.displayName.split(' ')[0],
                lastName: user.displayName.split(' ')[1]
                  ? user.displayName.split(' ')[1]
                  : '',
                phone: user.phoneNumber ? user.phoneNumber : '',
                picture: user.photoURL
              }
            }
          }
          body['data']['attributes']['timeZone'] = body['data']['attributes'][
            'timeZone'
          ] = Intl.DateTimeFormat().resolvedOptions().timeZone

          try {
            dispatch('setLoading', true)
            const { data } = await request.post('/profiles', body)
            commit('setLoggedIn', true)
            removeToken()

            /* MAC integration */
            try {
              const user = data.attributes
              mac.lead({
                email: user.email,
                username:
                  user.firstName +
                  (user.lastName === undefined ? '' : ' ' + user.lastName)
              })
            } catch (error) {
              console.log(error)
            }
            /*End of MAC integration*/
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
        } else {
          try {
            const data = await request.get(`/profiles/${userId}`)
            const user = data.data.attributes

            if (user.status !== 'pending') {
              // commit('setToastMessage', {
              //   type: 'positive',
              //   message: 'Login Successful!'
              // })
              if (loginData === undefined) {
                if (isMobileApp()) {
                  this.$router.replace(
                    { name: constants.PAGE_FEATURE_BLOOPRINT },
                    () => {}
                  )
                } else {
                  this.$router.replace(
                    {
                      name: constants.PAGE_DESKTOP_HOME_SCREEN
                    },
                    () => {}
                  )
                }
              }
              if (loginData.requestFrom === 'buy-blooprint') {
                dispatch('getBlooprintDetailsById', loginData.blooprintId).then(
                  data => {
                    if (data['attributes']['purchased'] === true) {
                      this.$router.push({
                        name: 'purchased-blooprint-landing-page',
                        params: {
                          blooprintId: loginData.blooprintId
                        }
                      })
                    } else {
                      this.$router.push({
                        name: 'blooprint-checkout',
                        params: {
                          blooprintId: loginData.blooprintId
                        }
                      })
                    }
                  }
                )
              }
              /* MAC integration */
              try {
                mac.login({
                  email: user.email,
                  username:
                    user.firstName +
                    (user.lastName === undefined ? '' : ' ' + user.lastName)
                })
              } catch (error) {
                console.log(error)
              }
              /*End of MAC integration*/
            } else {
              dispatch('setToastMessage', {
                type: 'negative',
                message: 'Please verify your account'
              })
              removeToken()
            }
          } catch (error) {
            console.log(error)
          }
        }
      })
    })
    .catch(error => {
      dispatch('setToastMessage', {
        type: 'negative',
        message: error.message
      })
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
}
// ************* Method For Mobile Google Sign Up  ********************************
export async function googleSignUpForMobile({ commit, dispatch }) {
  cfaSignIn('google.com')
    .pipe(mapUserToUserInfo())
    .subscribe(
      user => {
        firebaseAuth.currentUser.getIdToken(false).then(async token => {
          setToken(token)
          let body = {
            data: {
              type: 'profiles',
              attributes: {
                email: user.email,
                firebaseUID: user.uid,
                firstName: user.displayName.split(' ')[0],
                lastName: user.displayName.split(' ')[1]
                  ? user.displayName.split(' ')[1]
                  : '',
                phone: user.phoneNumber ? user.phoneNumber : '',
                picture: user.photoURL
              }
            }
          }
          body['data']['attributes']['timeZone'] = body['data']['attributes'][
            'timeZone'
          ] = Intl.DateTimeFormat().resolvedOptions().timeZone

          try {
            dispatch('setLoading', true)
            const { data } = await request.post('/profiles', body)
            commit('setLoggedIn', true)
            removeToken()

            /* MAC integration */
            try {
              const user = data.attributes
              mac.lead({
                email: user.email,
                username:
                  user.firstName +
                  (user.lastName === undefined ? '' : ' ' + user.lastName)
              })
            } catch (error) {
              console.log(error)
            }
            /*End of MAC integration*/
          } catch (error) {
            dispatch('setLoading', false)
            removeToken()
            if (error.response) {
              if (
                error.response.data.status == '409' ||
                error.response.data.title == 'Same Email address already exist'
              ) {
                dispatch('setToastMessage', {
                  type: 'negative',
                  message: 'Same Email address already exist'
                })
              }
            }
          } finally {
            dispatch('setLoading', false)
          }
        })
        dispatch('setLoading', false)
      },
      error => {
        removeToken()
        dispatch('setToastMessage', {
          type: 'negative',
          message: error.message
        })
      }
    )
}

// ************* Method For Mobile Google Sign In  ********************************
export async function googleSignInForMobile({ commit, dispatch }) {
  cfaSignIn('google.com')
    .pipe(mapUserToUserInfo())
    .subscribe(
      user => {
        let userId = user['uid']
        firebaseAuth.currentUser.getIdToken(false).then(async token => {
          setToken(token)
          try {
            dispatch('setLoading', true)
            const data = await request.get(`/profiles/${userId}`)
            const user = data.data.attributes
            if (user.status !== 'pending') {
              commit('setToastMessage', {
                type: 'positive',
                message: 'Login Successful!'
              })

              if (isMobileApp()) {
                this.$router.replace(
                  {
                    name: constants.PAGE_FEATURE_BLOOPRINT
                  },
                  () => {}
                )
              } else {
                this.$router.replace(
                  {
                    name: constants.PAGE_DESKTOP_HOME_SCREEN
                  },
                  () => {}
                )
              }

              /* MAC integration */
              try {
                mac.login({
                  email: user.email,
                  username:
                    user.firstName +
                    (user.lastName === undefined ? '' : ' ' + user.lastName)
                })
              } catch (error) {
                console.log(error)
              }
              /*End of MAC integration*/
            } else {
              dispatch('setToastMessage', {
                type: 'negative',
                message: 'Please verify your account'
              })
              removeToken()
            }
          } catch (error) {
            removeToken()
            dispatch('setLoading', false)
            if (error.response) {
              if (error.response.data.status == '404') {
                dispatch('setToastMessage', {
                  type: 'negative',
                  message: "User doesn't exist !!"
                })
              }
            }
          } finally {
            dispatch('setLoading', false)
          }
        })
        dispatch('setLoading', false)
      },
      error => {
        removeToken()
        dispatch('setToastMessage', {
          type: 'negative',
          message: error.message
        })
      }
    )
}

// ********************* API to Get User Profile Info Based on ID *************************
export async function fetchProfileInfo({ commit, dispatch, getters }, params) {
  let profileId = this.$router.history.current.params.profileId
  let profileInfo = {}

  if (params && params['authorId']) {
    profileId = params['authorId']
  }
  if (!profileId) {
    profileId = getFireBaseUserId()
  }
  commit('setErrorInGettingUserDetails', '')
  await request
    .get(`/profiles/${profileId}`)
    .then(data => {
      let profileData = data['data']
      if (profileData) {
        let result = {
          ...profileData['attributes'],
          id: profileData['id']
        }
        if (profileId == getFireBaseUserId()) {
          commit('setUserId', profileData['id'])
          commit('setUserProfile', result)
        }
        if (getters.userId == profileId) {
          commit('setUserProfile', result)
        }
        profileInfo = result
      }
    })
    .catch(error => {
      if (getters.userId == profileId) {
        commit('setUserProfile', {})
      }
      dispatch('redirectTo404Page', error)
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      } else {
        commit(
          'setErrorInGettingUserDetails',
          "Uh... Error 500! Something went wrong at our end. Don't worry, its not you - it's us. Sorry about that."
        )
      }
    })
    .finally(() => {})
  return profileInfo
}
// update profile data

export async function updateProfileData({ commit }, profileData) {
  let requestFrom = ''
  let profileId = profileData['id']
  delete profileData['id']
  if (profileData['requestFrom']) {
    requestFrom = profileData['requestFrom']
    delete profileData['requestFrom']
  }
  commit('setLoading', true)
  await request
    .patch(`/profiles/${profileId}`, {
      data: { type: 'profiles', attributes: profileData }
    })
    .then(({ data }) => {
      if (requestFrom != 'editProfilePicture') {
        commit('setUserProfile', { ...data.attributes, id: data.id })
      }
      if (requestFrom == 'editProfilePicture') {
        commit('setProfilePicture', data['attributes']['picture'])
      }
      commit('setLoading', false)
      commit('setToastMessage', {
        type: 'positive',
        message: 'Profile Data Updated Successfully'
      })
    })
    .catch(error => {
      commit('setLoading', false)
      if (error.response) {
        commit('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      }
    })
}

// ********************* API to Update User Profile Data *************************
export async function updateProfileInfo({ commit }, profileData) {
  let profileId = profileData['profileId']
  delete profileData['profileId']
  commit('setLoading', true)
  commit('setIsUserDetailsUpdated', false)
  let isProfileUpdated = false
  await request
    .patch(`/profiles/${profileId}`, profileData)
    .then(result => {
      commit('setToastMessage', {
        type: 'positive',
        message: 'Profile Data Updated Successfully'
      })
      commit('setIsUserDetailsUpdated', true)
      let data = {
        ...result['data']['attributes'],
        id: result['data']['id']
      }
      commit('updateLoggedInUserData', data)
      isProfileUpdated = true
    })
    .catch(error => {
      if (error.response) {
        commit('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      }
    })
    .finally(() => {
      commit('setLoading', false)
    })
  return isProfileUpdated
}
// ********************* API to Delete User Data *************************
export async function deleteUser({ dispatch, getters }) {
  dispatch('setLoading', true)
  let profileId = getters.userId
  let isRequestFromMobile = false
  let selectedRoute = this.$router.history.current.fullPath
  if (selectedRoute.includes('/profiles/delete-account')) {
    isRequestFromMobile = true
  } else if (selectedRoute.includes('user/delete-account')) {
    isRequestFromMobile = false
  }

  await request
    .delete(`/profiles/${profileId}`)
    .then(result => {
      dispatch('setToastMessage', {
        type: 'positive',
        message: 'User Profile Deleted Successfully'
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
      dispatch('userLogout', {
        requestFrom: isRequestFromMobile ? 'mobile' : 'desktop'
      })
      removeToken()
      if (isRequestFromMobile) {
        this.$router.replace({ name: constants.PAGE_AUTH }, () => {})
      } else {
        this.$router.replace(
          {
            name: constants.PAGE_DESKTOP_LANDING_SCREEN
          },
          () => {}
        )
      }
    })
}
// ********************* Method for User Logout *************************
export function userLogout({ dispatch, commit }, params) {
  dispatch('setLoading', true)
  firebaseAuth
    .signOut()
    .then(() => {
      removeToken()
      if (params['requestFrom'] == 'mobile') {
        this.$router.replace({ name: constants.PAGE_AUTH }, () => {})
      } else if (params['requestFrom'] == 'desktop') {
        this.$router.replace(
          { name: constants.PAGE_DESKTOP_LANDING_SCREEN },
          () => {}
        )
      }
    })
    .catch(error => {
      dispatch('setLoading', false)
      console.log(error)
    })
    .finally(() => {
      dispatch('setLoading', false)
      commit('setUserId', '')
      commit('setLoggedIn', false)
      commit('setUserProfile', {})
    })
  if (isMobileApp()) {
    cfaSignOut().subscribe()
  }
}
// ****************** API to Follow an Author ***************************************
export async function followAuthor({ dispatch, getters }, authorInfo) {
  let authorID = this.$router.history.current.params.profileId
  if (!authorID) {
    authorID = authorInfo['authorID']
  }
  let userID = getters.userId
  let isFollowSuccess = false
  try {
    dispatch('setLoading', true)
    let params = {
      data: {
        type: 'relationships',
        attributes: {
          following: authorID
        }
      }
    }
    let followResponse = await request.post(
      `profiles/${userID}/relationships/following`,
      params
    )
    if (followResponse['data']['attributes']['following']) {
      isFollowSuccess = true
      // dispatch('setToastMessage', {
      //   type: 'positive',
      //   message: 'Followed the Author'
      // })
    }
    return isFollowSuccess
  } catch (error) {
    dispatch('setLoading', false)
    dispatch('redirectTo404Page', error)
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.detail
      })
    }
  } finally {
    dispatch('setLoading', false)
  }
}
// ****************** API to Un-Follow an Author ***************************************
export async function unFollowAuthor({ dispatch, getters }, authorInfo) {
  let authorID = this.$router.history.current.params.profileId
  if (!authorID) {
    authorID = authorInfo['authorID']
  }
  let userID = getters.userId
  let isUnFollowSuccess = false
  try {
    dispatch('setLoading', true)
    let params = {
      data: {
        type: 'relationships',
        attributes: {
          unfollow: authorID
        }
      }
    }
    let unFollowResponse = await request.post(
      `profiles/${userID}/relationships/unfollow`,
      params
    )

    if (unFollowResponse['data']['attributes']['unfollow']) {
      isUnFollowSuccess = true
      // dispatch('setToastMessage', {
      //   type: 'positive',
      //   message: 'Un-followed the Author'
      // })
    }
    return isUnFollowSuccess
  } catch (error) {
    dispatch('setLoading', false)
    dispatch('redirectTo404Page', error)
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.detail
      })
    }
  } finally {
    dispatch('setLoading', false)
  }
}
// ************************* API to Fetch All Authors follow List ***********************************
export async function fetchFollowList({ dispatch, commit }, params) {
  let followList = []
  try {
    let { data } = await request.get(`profiles/relationships/following`)
    followList = data
  } catch (error) {
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.detail
      })
    }
  } finally {
    dispatch('setLoading', false)
  }
  return followList
}
// ************************* API to send an OTP ***********************************
export async function sendOTP({ dispatch }, phoneOtpData) {
  try {
    dispatch('setLoading', true)
    let params = {
      data: {
        type: 'profiles',
        attributes: {}
      }
    }
    if (phoneOtpData['type'] == 'number') {
      params['data']['attributes']['mobile'] = phoneOtpData['phone']
      params['data']['attributes']['mobileCountryCode'] =
        phoneOtpData['mobileCountryCode']
    } else if (phoneOtpData['type'] == 'otp') {
      params['data']['attributes']['otp'] = phoneOtpData['otp']
    }
    let otpStatus = await request.post(`profiles/mobile/confirmation`, params)
    return otpStatus
  } catch (error) {
    dispatch('setLoading', false)
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.detail
      })
    }
  } finally {
    dispatch('setLoading', false)
  }
}
// ************************* API to Fetch All Authors List ***********************************
export async function fetchAllAuthorsList({ dispatch, commit }, params) {
  try {
    let authorsData = await request.get(`profiles/authors`, params)
    if (authorsData['status'] == 200) {
      return authorsData['data']
    }
  } catch (error) {
    dispatch('redirectTo404Page', error)
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.detail
      })
    } else {
      commit(
        'setErrorInGettingAuthorsList',
        "Uh... Error 500! Something went wrong at our end. Don't worry, its not you - it's us. Sorry about that."
      )
    }
  } finally {
    dispatch('setLoading', false)
  }
}
// *************** API to Retrieve the Popular Authors List *********************************
export async function fetchPopularAuthorsList({ dispatch, commit }) {
  let popularAuthorsList = []
  dispatch('setLoading', true)
  commit('setErrorInGettingPopularAuthors', '')
  await request
    .get(`/profiles/authors/popular`)
    .then(result => {
      popularAuthorsList = result['data']
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
          'setErrorInGettingPopularAuthors',
          "Uh... Error 500! Something went wrong at our end. Don't worry, its not you - it's us. Sorry about that."
        )
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
  return popularAuthorsList
}

export async function addRecentSearch({ commit }, text) {
  commit('setLoading', true)
  try {
    let body = {
      data: {
        type: 'profiles',
        attributes: {
          keyword: text
        }
      }
    }
    const { data } = await request.post('profiles/search/history', body)
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

export async function deleteRecentSearchById({ commit }, id) {
  commit('setLoading', true)
  try {
    const { data } = await request.delete(`profiles/search/history/${id}`)
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

export async function getRecentSearchesOfUser({ commit }) {
  let filteredResults = []
  try {
    const { data } = await request.get('profiles/search/history')
    filteredResults = data.map(result => {
      return { id: result.id, text: result.attributes.keyword }
    })
  } catch (error) {
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
  }
  return filteredResults
}
export function storeAuthorDetails({ commit }, authorData) {
  commit('setMessageAuthorDetails', authorData)
}
export async function getProfileDetailsList({ commit }, profileInfo) {
  let profileList = {}
  try {
    const { data } = await request.post('profiles/lists', profileInfo)
    data.map(item => {
      profileList[item['attributes']['firebaseUID']] = {
        name:
          item['attributes']['firstName'] +
          ' ' +
          item['attributes']['lastName'],
        photoURL: item['attributes']['picture'],
        uid: item['attributes']['firebaseUID'],
        caption: item['attributes']['companyName'],
        chatDisabled: !item['attributes']['connectToCommunity']
      }
    })
    return profileList
  } catch (error) {
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
    return []
  }
}
