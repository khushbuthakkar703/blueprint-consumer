<template>
  <div>
    <div v-if="!isUserLoggedIn">
      <div
        class="row items-center gt-sm"
        style="height: 48px; width: 48px"
        @click="loginRedirect"
      >
        <img
          class="border-radius-50 image-active cursor-pointer"
          src="~assets/account.svg"
          width="100%"
          height="100%"
          style="border: 2px solid #b99c9c33; padding: 13px 0;"
        />
      </div>
    </div>
    <div v-if="isUserLoggedIn" class="user-profile-menu-items">
      <q-btn-dropdown
        :label="userName != '' ? userName : null"
        flat
        no-caps
        unelevated
        :ripple="false"
        content-class="user-dropdown-content menu-box-shadow border-radius-lg menu-style text-primary"
        class="user-dropdown b-dropdown text-lh-24 gt-sm tab-font ellipsis word-break-break-word text-regalBlue text-capitalize f-w-600 text-lh-24 text-fs-16"
        text-color=""
        :menu-offset="isDesktop ? menuOffset : Array(0, 13)"
        menu-anchor="bottom right"
        menu-self="top right"
        size="16px"
        dropdown-icon="expand_more"
        :icon="
          hasProfilePicture(loggedInUserDetails) && loggedInUserDetails.picture
            ? `img:${loggedInUserDetails.picture}`
            : `img:${defaultPicture}`
        "
      >
        <q-card>
          <q-card-section
            class="f-w-500 explore-menu-items"
            style="width: 230px; padding: 22px;"
          >
            <div>
              <div class="q-pa-sm">
                <router-link
                  class="hover-effect f-w-600 text-body1 text-regalBlue remove-underline"
                  :to="{ name: 'desktop-my-blooprints' }"
                >
                  My blooprints
                </router-link>
              </div>
              <div class="q-pa-sm">
                <router-link
                  class="hover-effect f-w-600 text-body1 text-regalBlue remove-underline"
                  :to="{ name: 'settings' }"
                >
                  Settings
                </router-link>
              </div>

              <q-separator
                inset
                class="bg-solitude q-ma-sm"
                style="height: 2px;"
              />
              <div class="q-pa-sm">
                <div
                  class="hover-effect f-w-600 text-body1 text-regalBlue remove-underline cursor-pointer"
                  @click="logout"
                >
                  Sign out
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-btn-dropdown>
      <q-btn-dropdown
        flat
        no-caps
        unelevated
        :ripple="false"
        content-class="user-dropdown-content menu-box-shadow border-radius-lg menu-style text-primary"
        class="user-dropdown b-dropdown text-lh-24 lt-md tab-font ellipsis word-break-break-word text-regalBlue text-capitalize f-w-600 text-lh-24 text-fs-16"
        text-color=""
        :menu-offset="isDesktop ? menuOffset : Array(0, 10)"
        menu-anchor="bottom right"
        menu-self="top right"
        size="16px"
        dropdown-icon="expand_more"
        :icon="
          hasProfilePicture(loggedInUserDetails) && loggedInUserDetails.picture
            ? `img:${loggedInUserDetails.picture}`
            : `img:${defaultPicture}`
        "
      >
        <q-card>
          <q-card-section
            class="f-w-500 explore-menu-items"
            style="width: 230px; padding: 22px;"
          >
            <div>
              <div class="q-pa-sm explore-menu">
                <router-link
                  class="hover-effect f-w-600 text-body1 text-regalBlue remove-underline"
                  :to="{ name: 'explore-screen' }"
                  >Explore</router-link
                >
              </div>
              <div class="q-pa-sm">
                <router-link
                  class="hover-effect f-w-600 text-body1 text-regalBlue remove-underline"
                  :to="{ name: 'desktop-my-blooprints' }"
                  >My blooprints</router-link
                >
              </div>
              <div class="q-pa-sm">
                <router-link
                  class="hover-effect f-w-600 text-body1 text-regalBlue remove-underline"
                  :to="{ name: 'settings' }"
                  >Settings</router-link
                >
              </div>

              <q-separator
                inset
                class="bg-solitude q-ma-sm"
                style="height: 2px;"
              />
              <div class="q-pa-sm">
                <div
                  class="hover-effect f-w-600 text-body1 text-regalBlue remove-underline cursor-pointer"
                  @click="logout"
                >
                  Sign out
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-btn-dropdown>
    </div>
  </div>
</template>
<script>
import { constants, isLogin } from '../../utils/common'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  data() {
    return {
      isUserLoggedIn: isLogin(),
      loggedInUserDetails: {},
      userName: '',
      tabSelected: 'dashboard',
      menuOffset: Array(0, 13),
      menuItemList: [
        { label: 'My Plan', name: 'my plan', routeTo: { name: 'my plan' } }
      ],
      defaultPicture: require('src/assets/NoProfileImage.svg')
    }
  },

  mounted() {
    if (isLogin()) {
      this.fetchLoggedInUserDetails()
    }
    this.isUserLoggedIn = isLogin()
    if (this.userProfile['email']) {
      this.getUserName(this.userProfile)
    }
  },

  computed: {
    ...mapGetters(['userProfile']),
    isDesktop() {
      return window.innerWidth > 1023
    }
  },

  watch: {
    $route: 'getUserData',
    userProfile(data) {
      this.isUserLoggedIn = isLogin()
      this.loggedInUserDetails = data
      this.getUserName(data)
      let menuContent = [
        { label: 'My Plan', name: 'my plan', routeTo: { name: 'my plan' } }
      ]
      if (this.loggedInUserDetails.admin) {
        this.menuItemList = menuContent
      }
    }
  },

  methods: {
    ...mapActions(['userLogout', 'fetchLoggedInUserDetails']),
    getUserData() {
      if (isLogin()) {
        this.menuItemList = [
          { label: 'My Plan', name: 'my plan', routeTo: { name: 'my plan' } }
        ]
        // this.fetchLoggedInUserDetails()
      }
    },
    logout() {
      this.userLogout({ requestFrom: 'desktop' }).then(() => {
        this.$emit('onLogout')
      })
    },
    // *************** Triggers when Blooprinted Logo Is Clicked ****************************
    onLogoClick() {
      if (isLogin()) {
        this.$router.push({ name: 'dashboard' }, () => {})
      } else {
        window.location.href = process.env.BLOOPRINTED_ENV_MAIN_URL
      }
    },

    // ************ Redirect to login page ******************************
    loginRedirect() {
      this.$router.push({ name: constants.PAGE_LOGIN }, () => {})
    },

    // ************ Method to check the user has Profile picture or not *********************
    hasProfilePicture(userData) {
      if (userData['picture']) {
        return userData['picture'] != '' && userData['picture'] != null
      } else if (this.userProfile['picture']) {
        this.loggedInUserDetails = this.userProfile
        return (
          this.userProfile['picture'] != '' &&
          this.userProfile['picture'] != null
        )
      } else {
        return false
      }
    },
    getUserName(data) {
      this.userName = (data['firstName']
        ? data['firstName']
        : '' + ' ' + (data['lastName'] ? data['lastName'] : '')
      ).trim()

      if (this.userName.length > 20 && data['lastName'].length > 0) {
        this.userName = data['firstName'].trim()
      }

      if (this.userName == '') {
        this.userName = data['email'] ? data['email'] : ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.image-active {
  transition: border 0.5s;
  &:hover {
    border: 2px solid $primary !important;
  }
}
.user-dropdown[aria-expanded='true'] {
  color: $primary;
}
.explore-menu-items .hover-effect {
  transition: color 0.3s;
  &:hover {
    color: $primary;
  }
}
::v-deep {
  .user-dropdown {
    &.rotate-180 {
      transform: rotate(0deg);
    }
    .q-btn__wrapper {
      padding: 0;
    }
    .material-icons {
      font-size: 24px !important;
      @media only screen and (max-width: $breakpoint-xs-max) {
        font-size: 20px !important;
      }
    }
  }
  .user-profile-menu-items {
    .q-btn .q-icon,
    .q-btn .q-spinner {
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }
    .on-left {
      margin-right: 8px;
    }
    .q-btn-dropdown--simple * + .q-btn-dropdown__arrow {
      margin-left: 0px;
    }
    .user-dropdown .material-icons {
      width: 24px;
      font-size: 24px !important;
    }
    .block {
      color: #152141;
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.user-dropdown-content .q-card {
  border: 2px solid $solitude;
  border-radius: 20px;
}

@media only screen and (min-width: 701px) {
  .explore-menu {
    display: none;
  }
}
</style>
<style lang="scss">
.q-menu.menu-style {
  min-width: 0px !important;
}
</style>
