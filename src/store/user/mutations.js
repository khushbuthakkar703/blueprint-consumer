export function setLoggedIn(state, value) {
  state.loggedIn = value
}
export function setUserProfile(state, value) {
  state.userProfile = value.picture ? value : { picture: '', ...value }
}
export function setUserId(state, value) {
  state.userId = value
}
export function setIsUserDetailsUpdated(state, value) {
  state.isLoggedInUserDetailsUpdated = value
}

export function setErrorInGettingPopularAuthors(state, value) {
  state.errorInGettingPopularAuthors = value
}
export function setErrorInGettingAuthorsList(state, value) {
  state.errorInGettingAuthorsList = value
}
export function setErrorInAccountActivation(state, value) {
  state.errorInAccountActivation = value
}
export function setMessageAuthorDetails(state, value) {
  state.messageAuthorDetails = value
}
// update only profile picture
export function setProfilePicture(state, value) {
  state.userProfile.picture = value ? value : ''
}

export const setUnreadMessagesCount = (state, value) => {
  state.unreadMessagesCount = value
}
