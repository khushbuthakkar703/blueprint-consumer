import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'
import { Loading } from 'quasar'

const firebaseConfig = {
  apiKey: process.env.BLOOPRINTED_ENV_API_KEY,
  authDomain: process.env.BLOOPRINTED_ENV_AUTH_DOMAIN,
  projectId: process.env.BLOOPRINTED_ENV_PROJECT_ID,
  storageBucket: process.env.BLOOPRINTED_ENV_STORAGE_BUCKET,
  messagingSenderId: process.env.BLOOPRINTED_ENV_MESSAGING_SENDER_ID,
  appId: process.env.BLOOPRINTED_ENV_APP_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

export const googleAuth = () => {
  return new firebase.auth.GoogleAuthProvider()
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const firestore = firebaseApp.firestore()
const realTimeDb = firebaseApp.database()
const storage = firebaseApp.storage()
const timestamp = firebase.firestore.Timestamp
const FieldValue = firebase.firestore.FieldValue

export default async ({ store, Vue }) => {
  Loading.show()
  let disconnectUser = null
  // attaching authStateChanged observer for user state change
  await new Promise(resolve => {
    firebaseAuth.onAuthStateChanged(async user => {
      if (user) {
        // User is signed in
        disconnectUser = await Vue.prototype.$makeUserOnline(user.uid)
      } else {
        // User is signed out
        if (disconnectUser) {
          disconnectUser()
        }
      }
      resolve(true)
    })
  })
  Loading.hide()
}

export {
  firebaseApp,
  firebaseAuth,
  firestore,
  realTimeDb,
  storage,
  timestamp,
  FieldValue
}
