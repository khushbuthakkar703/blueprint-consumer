import { constants, isLogin, isMobileApp, isMobile } from '../utils/common'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from, next) => {
      if (isLogin() && isMobileApp()) {
        next({ name: constants.PAGE_FEATURE_BLOOPRINT })
      } else if (isLogin() && !isMobileApp()) {
        next('/home')
      } else if (!isLogin()) {
        next('/home')
      } else {
        next()
      }
    },
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'auth',
        name: 'auth',
        component: () => import('pages/AuthSelection.vue')
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('pages/SignUp.vue')
      },
      {
        path: 'signin',
        name: 'signin',
        component: () => import('pages/SignIn.vue')
      },
      {
        path: 'mobile-verification',
        component: () => import('pages/MobileVerification.vue')
      },
      {
        path: 'email/:code/confirm',
        component: () => import('pages/AccountActivation.vue'),
        props: true
      },
      {
        path: 'password/reset/:code/confirm',
        component: () => import('pages/AccountActivation.vue'),
        props: true
      },
      {
        path: 'account-activation',
        name: 'account-activation',
        component: () => import('pages/UserAccountActivation.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/SingleFooterDisplayLayout.vue'),
    children: [
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/consumer/Signup.vue'),
        beforeEnter: (to, from, next) => {
          !isLogin()
            ? next()
            : next({ name: constants.PAGE_DESKTOP_HOME_SCREEN })
        },
        meta: { title: 'Signup - blooprinted' }
      },
      {
        path: 'signup/blooprints/:blooprintId',
        name: 'signup-for-blooprint',
        component: () => import('pages/consumer/BlooprintSignupScreen.vue'),
        beforeEnter: (to, from, next) => {
          !isLogin()
            ? next()
            : next({ name: constants.PAGE_DESKTOP_HOME_SCREEN })
        },
        meta: { title: 'Signup - blooprinted' }
      },
      {
        path: 'payment/blooprints/:blooprintId',
        name: 'blooprint-payment',
        component: () => import('pages/consumer/BlooprintSignupScreen.vue'),
        meta: { title: 'Checkout - blooprinted' }
      },
      {
        path: 'login/blooprints/:blooprintId',
        name: 'login-for-blooprint',
        component: () => import('pages/consumer/BlooprintSignupScreen.vue'),
        meta: { title: 'Login - blooprinted' }
      },
      {
        path: 'checkout/blooprints/:blooprintId',
        name: 'blooprint-checkout',
        component: () => import('pages/consumer/BlooprintSignupScreen.vue'),
        meta: { title: 'Checkout - blooprinted' }
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MediumFooterDisplayLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/consumer/DesktopLogin.vue'),
        beforeEnter: (to, from, next) => {
          !isLogin()
            ? next()
            : next({ name: constants.PAGE_DESKTOP_HOME_SCREEN })
        },
        meta: { title: 'Login - blooprinted' }
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('src/pages/consumer/ForgotPassword.vue'),
        beforeEnter: (to, from, next) => {
          !isLogin()
            ? next()
            : next({ name: constants.PAGE_DESKTOP_HOME_SCREEN })
        },
        meta: { title: 'Forgot password - blooprinted' }
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('pages/ResetPassword.vue'),
        meta: { title: 'Reset password - blooprinted' },
        beforeEnter: (to, from, next) => {
          if (!isLogin()) {
            if (to.query.secure) {
              if (from.name === 'login') {
                next({ name: 'login' })
              } else {
                next()
              }
            } else {
              next('/')
            }
          } else {
            next('/')
          }
        }
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/FullFooterDisplayLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/consumer/Home.vue'),
        beforeEnter: (to, from, next) => {
          next()
        }
      },
      {
        path: 'home',
        name: 'homePage',
        component: () => import('pages/consumer/Home.vue'),
        beforeEnter: (to, from, next) => {
          next({ name: 'home' })
        }
      },
      {
        path: 'explore',
        name: 'explore-screen',
        component: () => import('pages/consumer/ExploreLandingScreen.vue')
      },
      {
        path: 'all-category',
        name: 'all-category',
        component: () => import('src/pages/AllCategory.vue'),
        meta: { title: 'All categories - blooprinted' }
      },
      {
        path: 'my-blooprints',
        name: 'desktop-my-blooprints',
        component: () => import('pages/consumer/DesktopMyBlooprints.vue'),
        beforeEnter: (to, from, next) => {
          isLogin() ? next() : next({ name: constants.PAGE_LOGIN })
        },
        meta: { title: 'My blooprints - blooprinted' }
      },
      {
        path: 'my-blooprints/:blooprintId',
        name: 'purchased-blooprint-landing-page',
        component: () =>
          import('pages/consumer/PurchasedBlooprintLandingScreen.vue'),
        beforeEnter: (to, from, next) => {
          isLogin() ? next() : next({ name: constants.PAGE_LOGIN })
        }
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('pages/consumer/Settings.vue'),
        beforeEnter: (to, from, next) => {
          isLogin() ? next() : next({ name: constants.PAGE_LOGIN })
        },
        meta: { title: 'Settings - blooprinted' }
      },
      {
        path: 'author/:profileId',
        name: 'author-view',
        component: () => import('src/pages/consumer/MyProfile.vue')
      },
      {
        path: 'faqs',
        name: 'faqs',
        component: () => import('pages/consumer/FAQDisplayScreen.vue'),
        meta: { title: 'FAQs - blooprinted' }
      },
      {
        path: 'terms',
        name: 'terms-and-conditions',
        component: () => import('pages/consumer/Terms.vue'),
        meta: { title: 'Terms and conditions - blooprinted' }
      },
      {
        path: 'privacy',
        name: 'privacy-policy',
        component: () => import('pages/consumer/PrivacyPolicy.vue'),
        meta: { title: 'Privacy policy - blooprinted' }
      },
      {
        path: '/message',
        name: 'message',
        component: () => import('src/pages/consumer/Message.vue'),
        meta: { title: 'Message - blooprinted' },
        beforeEnter: (to, from, next) => {
          if (isLogin()) {
            next()
          } else {
            next('/')
          }
        }
      }
    ]
  },
  {
    path: '',
    component: () => import('layouts/DesktopUserLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/DesktopLandingScreen.vue'),
        beforeEnter: (to, from, next) => {
          next({ name: 'explore-screen' })
        }
      },
      {
        path: 'delete-account',
        name: 'delete-account',
        component: () => import('pages/DeleteAccountConfirmation.vue'),
        meta: { title: 'Delete Account' }
      },
      {
        path: 'blooprint-library',
        name: 'blooprint-library',
        component: () => import('pages/PopularBlooprints.vue'),
        meta: { title: 'Popular Blooprints' }
      },
      {
        path: 'creators',
        name: 'creators-list',
        component: () => import('pages/BlooprintedCreators.vue'),
        meta: { title: 'Popular Creators' }
      },
      {
        path: 'author/:profileId/reviews',
        name: 'author-review',
        component: () => import('pages/Reviews.vue')
      }
    ]
  },
  {
    path: '/blooprints',
    component: () => import('layouts/DesktopUserLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/DesktopLandingScreen.vue'),
        beforeEnter: (to, from, next) => {
          next({ name: 'explore-screen' })
        }
      },
      {
        path: ':blooprintId',
        name: 'blooprint landing page',
        component: () =>
          import('pages/consumer/BlooprintDetailsLandingScreen.vue')
      },
      {
        path: ':blooprintId/blooprint/reviews',
        name: 'blooprint reviews',
        component: () => import('pages/Reviews.vue')
      },
      {
        path: ':blooprintId/reviews',
        name: 'blooprint desktop reviews',
        component: () => import('pages/BlooprintReviews.vue'),
        meta: { title: 'Blooprint Reviews' }
      },
      {
        path: ':blooprintId/checkout',
        name: 'blooprint checkout',
        component: () => import('pages/CheckoutScreen.vue'),
        meta: { title: 'Checkout' },
        beforeEnter: (to, from, next) => {
          isLogin() ? next() : next({ name: constants.PAGE_LOGIN })
        }
      },
      {
        path: ':blooprintId/milestone/:milestoneId/task/:taskId',
        name: 'desktop-blooprint-task-landing-page',
        component: () => import('pages/DesktopTasksLandingPage.vue'),
        meta: { title: 'Tasks Landing Page' }
      },
      {
        path: 'schedule/:blooprintId',
        name: 'schedule blooprint',
        component: () => import('pages/ScheduleBlooprint.vue')
      }
    ]
  },

  // *************** Loads After Login Only *********************************
  // ****************** Blooprinted Routes ************************************
  {
    path: '/blooprint',
    component: () => import('layouts/MobileBlooprintLayout.vue'),
    beforeEnter: (to, from, next) => {
      //isLogin() ? isMobileApp()? next({ name: constants.PAGE_AUTH }): next({ name: constants.PAGE_LOGIN }): next()
      if (isMobileApp() && !isLogin()) {
        next({ name: constants.PAGE_AUTH })
      } else if (!isMobileApp() && !isLogin()) {
        next({ name: constants.PAGE_LOGIN })
      } else {
        next()
      }
    },
    props: true,
    children: [
      {
        path: '',
        component: () => import('pages/FeatureBlooprint.vue'),
        beforeEnter: (to, from, next) => {
          next({ name: 'feature-blooprint' })
        }
      },
      {
        path: 'feature',
        name: 'feature-blooprint',
        component: () => import('pages/FeatureBlooprint.vue')
      },
      {
        path: 'my-blooprints',
        name: 'my-blooprints',
        component: () => import('src/pages/MobileMyBlooprints.vue')
      }
    ]
  },
  // ****************** Profile Routes ************************************
  {
    path: '/profiles',
    component: () => import('layouts/MobileBlooprintLayout.vue'),
    beforeEnter: (to, from, next) => {
      if (isMobileApp() && !isLogin()) {
        next({ name: constants.PAGE_AUTH })
      } else if (!isMobileApp() && !isLogin()) {
        next({ name: constants.PAGE_LOGIN })
      } else {
        next()
      }
    },
    children: [
      {
        path: '',
        name: 'user-profile',
        component: () => import('pages/UserProfile.vue')
      },
      {
        path: ':profileId/view',
        name: 'profile',
        component: () => import('pages/UserProfile.vue')
      },
      {
        path: ':profileId/reviews',
        component: () => import('pages/Reviews.vue'),
        meta: { title: 'Author Reviews' }
      },
      {
        path: 'delete-account',
        component: () => import('pages/DeleteAccountConfirmationMobile.vue')
      }
    ]
  },

  {
    path: '/mobile/blooprints',
    component: () => import('layouts/MobileBlooprintLayout.vue'),
    beforeEnter: (to, from, next) => {
      if (isMobileApp() && !isLogin()) {
        next({ name: constants.PAGE_AUTH })
      } else if (!isMobileApp() && !isLogin()) {
        next({ name: constants.PAGE_LOGIN })
      } else {
        next()
      }
    },
    children: [
      {
        path: 'old-wishlist',
        name: 'mobile-wishlist',
        component: () => import('pages/Wishlist.vue')
      },
      {
        path: ':blooprintId',
        name: 'mobile-blooprint-landing-page',
        component: () => import('pages/BlooprintDetails.vue')
      },
      {
        path: ':blooprintId/rating',
        name: 'mobile-blooprint-rating',
        component: () => import('pages/Rating.vue')
      },
      {
        path: ':blooprintId/reviews',
        name: 'mobile-blooprint-reviews',
        component: () => import('pages/Reviews.vue')
      },
      {
        path: ':blooprintId/milestone/:milestoneId/task/:taskId',
        name: 'mobile-blooprint-task-page',
        component: () =>
          import('src/pages/MobileBlooprintTaskLandingScreen.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '*',
  //   name: 'error404',
  //   component: () => import('pages/Error404.vue'),
  //   meta: { title: 'Page not found' }
  // }
  {
    path: '*',
    name: 'error404',
    component: () => import('pages/consumer/Error404.vue'),
    meta: { title: 'Page not found - blooprinted' }
  }
]

export default routes
