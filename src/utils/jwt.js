import jwt_decode from 'jwt-decode'

// *************** Method to Fetch FireBase User Id From JWT Token ******************************
export function getFireBaseUserId() {
  let token = localStorage.getItem('access_token')
  if (token) {
    let decoded = jwt_decode(token)
    return decoded['user_id']
  } else {
    return ''
  }
}
// *************** Method to Fetch LoggedIn User Email From JWT Token ******************************
export function getLoggedInUserEmail() {
  let token = localStorage.getItem('access_token')
  if (token) {
    let decoded = jwt_decode(token)
    return decoded['email']
  } else {
    return ''
  }
}

// *************** Method to Fetch LoggedIn UserName From JWT Token ******************************
export function getLoggedInUserName() {
  let token = localStorage.getItem('access_token')
  if (token) {
    let decoded = jwt_decode(token)
    return decoded['name']
  } else {
    return ''
  }
}
