<template>
  <q-page
    class="setting-page-wrapper"
    :class="
      $q.screen.lt.md && getWindowHeight > 1450 ? 'setting-page-height' : null
    "
    :style="
      $q.platform.is.iphone || $q.platform.is.ipad
        ? 'min-height: fit-content !important;'
        : ''
    "
  >
    <div class="settings-page">
      <div class="settings">
        Settings
      </div>
      <div class="flex no-wrap settings-wrapper">
        <div class="left-container" style="">
          <q-card class="menu-card border-radius-lg flex column bg-white">
            <edit-profile-picture />
            <div
              style="margin: 16px 0px !important"
              v-if="userProfile.firstName && userProfile.email"
            >
              <label class="user-name text-capitalize">{{
                `${userProfile.firstName} ${
                  userProfile.lastName ? userProfile.lastName : ''
                }`
              }}</label>
              <label class="email">{{ userProfile.email }}</label>
            </div>
            <div v-else style="width: 100%;margin: 16px 0px">
              <q-skeleton type="text" height="40px" />
              <q-skeleton
                type="text"
                width="65%"
                height="25px"
                style="top: -10px"
              />
            </div>
            <div
              class="following full-width cursor-pointer"
              @click="followingListPopup = true"
            >
              <label class="following-text">
                <span
                  style="font-weight: 600 !important;margin-right: 8px"
                  v-if="userProfile.following > -1"
                  >{{ userProfile.following }}</span
                >
                <span v-else
                  ><q-skeleton
                    type="text"
                    height="30px"
                    width="10px"
                    style="margin-right: 8px"
                  />
                </span>
                Following
              </label>
            </div>
            <div
              style="margin-top: 16px !important;padding:0px !important"
              class="full-width"
            >
              <div
                class="flex cursor-pointer no-wrap"
                :class="
                  tab === 'myProfile'
                    ? 'selected-menu-option full-width'
                    : 'menu-options '
                "
              >
                <img
                  src="../../assets/profile-blue-icon.svg"
                  class="menu-icon"
                  v-if="tab === 'myProfile'"
                />
                <img
                  src="../../assets/profile-black-icon.svg"
                  class="menu-icon"
                  v-else
                />
                <label
                  class="menu-option-text cursor-pointer text-regalBlue full-width"
                >
                  <div
                    class="gt-sm q-py-sm"
                    @click="onClick('myProfile', false)"
                  >
                    My Profile
                  </div>
                  <div
                    class="lt-md q-py-sm full-width"
                    @click="onClick('myProfile', true)"
                  >
                    My Profile
                  </div>
                </label>
                <q-space />
                <img
                  src="../../assets/chevron-right blue.svg"
                  id="right"
                  class="q-mr-xs"
                />
              </div>

              <div
                class="flex cursor-pointer no-wrap"
                :class="
                  tab === 'notifications'
                    ? 'selected-menu-option full-width'
                    : 'menu-options '
                "
              >
                <img
                  src="../../assets/notifications-blue.svg"
                  class="menu-icon"
                  v-if="tab === 'notifications'"
                />
                <img
                  src="../../assets/notifications.svg"
                  class="menu-icon"
                  v-else
                />
                <label
                  class="menu-option-text cursor-pointer text-regalBlue full-width"
                >
                  <div
                    class="gt-sm q-py-sm"
                    @click="onClick('notifications', false)"
                  >
                    Notifications
                  </div>
                  <div
                    class="lt-md q-py-sm full-width"
                    @click="onClick('notifications', true)"
                  >
                    Notifications
                  </div>
                </label>

                <q-space />
                <img
                  src="../../assets/chevron-right blue.svg"
                  id="right"
                  class="q-mr-xs"
                />
              </div>

              <div
                class="flex cursor-pointer no-wrap"
                :class="
                  tab === 'wishlist'
                    ? 'selected-menu-option full-width'
                    : 'menu-options '
                "
              >
                <img
                  src="../../assets/wishlist-blue.svg"
                  class="menu-icon"
                  v-if="tab === 'wishlist'"
                />
                <img src="../../assets/wishlist.svg" class="menu-icon" v-else />
                <label
                  class="menu-option-text cursor-pointer text-regalBlue full-width"
                >
                  <div
                    class="gt-sm q-py-sm"
                    @click="onClick('wishlist', false)"
                  >
                    Wishlist
                  </div>
                  <div
                    class="lt-md q-py-sm full-width"
                    @click="onClick('wishlist', true)"
                  >
                    Wishlist
                  </div>
                </label>

                <q-space />
                <img
                  src="../../assets/chevron-right blue.svg"
                  id="right"
                  class="q-mr-xs"
                />
              </div>
              <div
                class="flex cursor-pointer no-wrap"
                :class="
                  tab === 'myReviews'
                    ? 'selected-menu-option full-width'
                    : 'menu-options '
                "
              >
                <img
                  src="../../assets/review-blue.svg"
                  class="menu-icon"
                  v-if="tab === 'myReviews'"
                />
                <img src="../../assets/review.svg" class="menu-icon" v-else />
                <label
                  class="menu-option-text cursor-pointer text-regalBlue full-width"
                >
                  <div
                    class="gt-sm q-py-sm"
                    @click="onClick('myReviews', false)"
                  >
                    My Reviews
                  </div>
                  <div
                    class="lt-md q-py-sm full-width"
                    @click="onClick('myReviews', true)"
                  >
                    My Reviews
                  </div>
                </label>
                <q-space />
                <img
                  src="../../assets/chevron-right blue.svg"
                  id="right"
                  class="q-mr-xs"
                />
              </div>
              <div
                class="flex cursor-pointer no-wrap"
                :class="
                  tab === 'billing'
                    ? 'selected-menu-option full-width'
                    : 'menu-options'
                "
              >
                <img
                  src="../../assets/billing-blue.svg"
                  class="menu-icon"
                  v-if="tab === 'billing'"
                />
                <img src="../../assets/billing.svg" class="menu-icon" v-else />
                <label
                  class="menu-option-text cursor-pointer text-regalBlue full-width"
                >
                  <div class="gt-sm q-py-sm" @click="onClick('billing', false)">
                    Billing
                  </div>
                  <div
                    class="lt-md q-py-sm full-width"
                    @click="onClick('billing', true)"
                  >
                    Billing
                  </div>
                </label>
                <q-space />
                <img
                  src="../../assets/chevron-right blue.svg"
                  id="right"
                  class="q-mr-xs"
                />
              </div>
              <div
                class="flex cursor-pointer no-wrap"
                :class="
                  tab === 'account'
                    ? 'selected-menu-option full-width'
                    : 'menu-options'
                "
              >
                <img
                  src="../../assets/accounts-blue.svg"
                  class="menu-icon"
                  v-if="tab === 'account'"
                />
                <img src="../../assets/accounts.svg" class="menu-icon" v-else />
                <label
                  class="menu-option-text cursor-pointer text-regalBlue full-width"
                >
                  <div class="gt-sm q-py-sm" @click="onClick('account', false)">
                    Account
                  </div>
                  <div
                    class="lt-md q-py-sm full-width"
                    @click="onClick('account', true)"
                  >
                    Account
                  </div>
                </label>
                <q-space />
                <img
                  src="../../assets/chevron-right blue.svg"
                  id="right"
                  class="q-mr-xs"
                />
              </div>
            </div>
          </q-card>
        </div>
        <div class="full-width right-container" v-if="$q.screen.gt.sm">
          <q-card
            class="right-card"
            style="margin-bottom:20px"
            v-if="tab === 'billing' && displayCardInformation"
          >
            <CardInformation
              @cardDetails="val => (displayCardInformation = val)"
            />
          </q-card>
          <q-card class="right-card" v-if="tab === 'myProfile'">
            <user-profile :profileData="userProfile" />
          </q-card>
          <q-card class="right-card" v-if="tab === 'account'">
            <Account />
          </q-card>
          <q-card class="right-card" v-if="tab === 'account'">
            <DeleteAccount />
          </q-card>
          <q-card class="right-card" v-if="tab === 'notifications'">
            <Notifications />
          </q-card>
          <q-card class="right-card" v-if="tab === 'wishlist'">
            <WishList />
          </q-card>
          <q-card class="right-card" v-if="tab === 'myReviews'">
            <MyReviews />
          </q-card>
          <q-card class="right-card" v-if="tab === 'billing'">
            <OrderHistory />
          </q-card>
        </div>
        <div v-if="$q.screen.lt.md">
          <q-dialog
            v-model="dialog"
            persistent
            :maximized="maximizedToggle"
            transition-show="slide-left"
            transition-hide="slide-right"
            :class="tab"
          >
            <q-card class="bg-white text-white">
              <SettingsContent :tab="tab" @closeDialog="closeDialog"
            /></q-card>
          </q-dialog>
        </div>
        <!-- ******************** Following List Popup *********************************** -->
        <q-dialog
          no-esc-dismiss
          no-backdrop-dismiss
          v-model="followingListPopup"
          :maximized="$q.screen.lt.sm ? true : false"
        >
          <FollowingListPopup @onDeleteReview="getReviews" />
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script>
import UserProfile from 'src/components/Desktop/UserProfile.vue'
import { mapActions, mapGetters } from 'vuex'
import SettingsContent from 'src/components/Desktop/SettingsContent.vue'
import Account from 'src/components/Desktop/Account.vue'
import DeleteAccount from 'src/components/Desktop/DeleteAccount.vue'
import EditProfilePicture from 'src/components/Desktop/EditProfilePicture.vue'
import WishList from 'src/components/Desktop/WishList.vue'
import MyReviews from 'src/components/Desktop/MyReviews.vue'
import Notifications from 'src/components/Desktop/Notifications.vue'
import OrderHistory from 'src/components/Desktop/OrderHistory.vue'
import CardInformation from 'src/components/Desktop/CardInformation.vue'
import FollowingListPopup from 'src/components/Desktop/FollowingListPopup.vue'

export default {
  name: 'Settings',
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  components: {
    EditProfilePicture,
    FollowingListPopup,
    SettingsContent,
    CardInformation,
    DeleteAccount,
    Notifications,
    UserProfile,
    OrderHistory,
    MyReviews,
    WishList,
    Account
  },
  data() {
    return {
      dialog: false,
      followingListPopup: false,
      maximizedToggle: true,
      tab: 'myProfile',
      displayCardInformation: true,
      tabNameList: [
        'myProfile',
        'notifications',
        'account',
        'wishlist',
        'myReviews',
        'billing'
      ]
    }
  },
  methods: {
    ...mapActions(['fetchProfileInfo']),
    onClick(tabName, dialog) {
      this.dialog = dialog
      this.tab = tabName
      history.pushState({}, null, this.$route.path + '?tab=' + tabName)
    },
    closeDialog(close) {
      this.dialog = close
    },
    getReviews() {
      this.fetchProfileInfo()
    }
  },
  computed: {
    ...mapGetters(['userProfile']),
    getWindowHeight() {
      return window.innerHeight
    }
  },
  async created() {
    if (this.$route.query.tab) {
      const val = this.$route.query.tab
      const index = this.tabNameList.indexOf(val)
      this.tab = index > -1 ? val : 'myProfile'
    }
    await this.fetchProfileInfo()
  },
  watch: {
    //  for displaying card skeleton
    tab() {
      this.displayCardInformation = true
    },
    $route(val) {
      if (typeof val.query.tab != 'undefined') {
        this.tab = val.query.tab
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-page {
  padding: 22px 52px 165px 52px;
  @media screen and (max-width: $breakpoint-sm) {
    padding: 0;
  }
}
.delete-account-text {
  color: #5b647a !important;
  @media screen and (min-width: $breakpoint-sm) {
    padding-top: 30px !important;
  }
  @media screen and (max-width: $breakpoint-sm) {
    background: white;
    padding: 16px 30px 44px 20px;
  }
}
.settings {
  padding: 20px 10px 20px 0px;
  font-family: Poppins;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
  flex: none;
  order: 0;
  flex-grow: 0;
  color: #000000;
  @media screen and (max-width: $breakpoint-sm) {
    font-size: 24px;
    padding: 20px 15px;
    background: $solitudeBlue;
  }
}
.settings-mobile {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: center;
  color: #000000;
}
.settings-wrapper {
  margin-top: 10px;
  @media only screen and (max-width: $breakpoint-sm) {
    margin-top: 0;
  }
}
.left-container {
  @media only screen and (max-width: $breakpoint-sm) {
    width: 100%;
    margin-right: 0;
  }
  margin-right: 20px;
  width: 40%;
}
.right-container {
  max-width: 72% !important;
  @media only screen and (max-width: $breakpoint-sm) {
    display: none;
    max-width: 60% !important;
  }
}

.menu-card {
  align-items: flex-start;
  padding: 30px 30px 22px 30px;
  box-shadow: 0px 10px 20px $shadow;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 20px;
    box-shadow: none;
    border-radius: 0;
  }
}

.right-card {
  margin-bottom: 20px;
  padding: 40px;
  background: #ffffff;
  box-shadow: 0px 10px 20px $shadow;
  border-radius: 20px;
}

.user-name {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: center;
  color: $regalBlue;
  word-break: break-word;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px !important;
    line-height: 24px !important;
  }
}

.email {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: $regalBlue;
  word-break: break-word;
}

.following {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 10px 10px 15px;
  background: #e8edf2;
  border-radius: 5px !important;
  max-height: 44px !important;
  margin: 0px 20px;
}

.following-text {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: $regalBlue;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 4px;
}

.menu-options {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px !important;
  height: 48px;
  background: #ffffff;
  border: 2px solid #e8edf2 !important;
  box-sizing: border-box;
  border-radius: 8px !important;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  margin: 8px 0px !important;
  transition: box-shadow 0.2s linear;
}
#right {
  left: 0;
  position: relative;
  transition: left 0.3s linear;
}
.menu-options {
  transition: box-shadow 0.2s;

  &:hover {
    border-color: $dodgerBlue !important;
    box-shadow: 0 0 5px $dodgerBlue;
    #right {
      left: 5px;
      transition: left 0.3s linear;
    }
  }
}
.menu-option-text {
  font-weight: 500 !important;
  font-size: 16px;
  line-height: 24px;
  display: block;
  align-items: center;
}

.selected-menu-option {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  height: 48px;
  order: 1 !important;
  background: #e8eefd;
  border: 2px solid #5c86f5 !important;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12), 0px 0px 0px 4px #e8eefd !important;
  border-radius: 8px !important;
  margin: 8px 0;
}
.delete-account {
  color: #5b647a !important;
  margin-top: 30px !important;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 36px !important;
    margin-bottom: 24px !important;
  }
}
.menu-icon {
  margin-left: 0px !important;
  margin-right: 10px !important;
  margin-top: 2px !important;
  margin-bottom: 2px !important;
  height: 20px !important;
  width: 20px !important;
}
.setting-page-wrapper {
  background-color: #e8edf2;
  @media only screen and (max-width: $breakpoint-sm-max) {
    min-height: fit-content !important;
    background-color: white;
  }
}
.setting-page-height {
  background-color: white;
  min-height: 65vh !important;
}
</style>
