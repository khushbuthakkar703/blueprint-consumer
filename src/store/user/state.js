import { getToken } from '@utils/auth'
export default function() {
  return {
    loggedIn: !!getToken(),
    userProfile: {},
    userId: '',
    isLoggedInUserDetailsUpdated: false,
    errorInGettingPopularAuthors: '',
    errorInGettingAuthorsList: '',
    errorInAccountActivation: '',
    messageAuthorDetails: {},
    unreadMessagesCount: 0
  }
}
