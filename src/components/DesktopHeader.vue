<template>
  <div>
    <q-header bordered elevated class="bg-primary">
      <q-toolbar class="q-my-sm">
        <div class="q-mx-md-lg">
          <q-btn
            class="lt-md q-mr-md"
            flat
            @click="displayDrawerMenu = !displayDrawerMenu"
            round
            dense
            icon="menu"
          />
          <q-img
            @click="onLogoClick"
            class="cursor-pointer"
            style="width: 200px"
            src="~assets/AppName.svg"
          />
        </div>
        <div class="q-ml-md gt-sm">
          <q-tabs
            narrow-indicator
            v-model="tabSelected"
            align="left"
            class="tab-font text-whiteSmoke ellipsis"
            no-caps
          >
            <q-route-tab
              v-for="item in tabsList"
              :key="item.name"
              :name="item.name"
              :to="item.routeTo"
              exact
              @click="onTabChange(item)"
            >
              <div class="text-body1 text-weight-medium q-mt-xs">
                {{ item.label }}
              </div>
            </q-route-tab>
          </q-tabs>
        </div>
        <div class="col flex items-center justify-end">
          <div class="row q-mx-xl gt-sm" v-if="!isUserLoggedIn">
            <q-btn
              unelevated
              label="SignIn"
              type="submit"
              @click="onSigninClick"
              class="col q-mr-md flat border-columbia text-white q-px-xl "
            />
            <q-btn
              unelevated
              label="Signup"
              type="submit"
              @click="onSignupClick"
              class="col flat border-columbia text-white q-px-xl"
            />
          </div>
          <div class="row items-center gt-sm" v-else>
            <q-form
              v-if="displaySearchField"
              @submit="searchForBlooprint"
              :class="userName == '' ? 'col-8' : 'col-6'"
            >
              <q-input
                borderless
                class="border-secondary q-mr-md"
                v-model.trim="searchTerm"
                label="Search"
                color="white"
                label-color="white"
                input-class="text-white"
                style="height: 40px;border-radius:3px"
              >
                <template v-slot:prepend>
                  <q-icon class="q-pl-sm" color="white" name="search" />
                </template>
                <template v-slot:append>
                  <q-icon
                    v-show="searchTerm != ''"
                    name="close"
                    @click="clearSearchResults"
                    color="white"
                    class="cursor-pointer q-pr-xs"
                  />
                  <q-icon
                    v-show="searchTerm == ''"
                    class="q-pr-xs"
                    size="22px"
                    color="white"
                  />
                </template>
              </q-input>
            </q-form>

            <q-avatar v-if="hasProfilePicture(loggedInUserDetails)" size="50px">
              <img :src="loggedInUserDetails.picture" />
            </q-avatar>
            <q-avatar v-else size="50px">
              <img src="~assets/UserProfile.svg" />
            </q-avatar>
            <div
              v-if="userName != '' && userName !== 'undefined'"
              class="q-pl-md text-body1 ellipsis"
              style="max-width:10vw"
              :class="displaySearchField ? 'col' : 'col'"
            >
              {{ userName }}
            </div>
            <q-btn
              flat
              color="dodgerBlue"
              icon="expand_more"
              :class="displaySearchField ? 'col-1' : 'col-2'"
            >
              <q-menu
                :content-style="{
                  backgroundColor: '#eee',
                  color: 'dodgerBlue'
                }"
              >
                <q-list style="min-width: 200px">
                  <q-separator />
                  <q-item clickable v-close-popup @click="onProfileClick">
                    <q-item-section>My Profile</q-item-section>
                    <q-item-section avatar>
                      <q-icon color="primary" name="account_circle" />
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-close-popup @click="onSignoutClick">
                    <q-item-section>Signout </q-item-section>
                    <q-item-section avatar>
                      <q-icon color="primary" name="logout" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <!-- ***************** Drawer Menu for Mobile Responsive *************************** -->
    <HeaderDrawer
      v-if="displayDrawerMenu"
      :isUserLoggedIn="isUserLoggedIn"
      :userName="userName"
      :tabsList="tabsList"
      :menuItemList="menuItemList"
      :loggedInUserDetails="loggedInUserDetails"
      @on-menu-item-select="onMenuItemClick"
      @on-drawer-close="displayDrawerMenu = false"
    />
    <!-- ***************** Logout Popup *************************** -->
    <ConfirmationPopup
      v-if="confirmationPopup"
      :popupMsg="confirmPopupMsg"
      @on-confirm-popup-close="onConfirmationPopupClose"
    />
  </div>
</template>
<script>
import { constants, isLogin } from '../utils/common'
import { mapActions, mapGetters } from 'vuex'
import ConfirmationPopup from './ConfirmationPopup.vue'
import HeaderDrawer from './HeaderDrawer.vue'

export default {
  data() {
    return {
      displayDrawerMenu: false,
      searchTerm: '',
      tabsList: [],
      isUserLoggedIn: false,
      confirmationPopup: false,
      loggedInUserDetails: {},
      menuItemList: [],
      confirmPopupMsg: 'Are you sure you want to logout?',
      userName: '',
      tabSelected: 'explore'
    }
  },
  components: {
    ConfirmationPopup,
    HeaderDrawer
  },
  props: ['displaySearchField'],
  computed: {
    ...mapGetters(['isLoggedInUserDetailsUpdated', 'blooprintFilterTerm'])
  },
  watch: {
    isLoggedInUserDetailsUpdated(data) {
      if (data) {
        this.fetchUserProfile()
      }
    },
    blooprintFilterTerm(data) {
      if (data == '' || data.trim() == '') {
        this.searchTerm = ''
      }
    }
  },
  mounted() {
    this.isUserLoggedIn = isLogin()
    this.fetchDataOnPageLoad()
  },
  methods: {
    ...mapActions([
      'fetchLoggedInUserDetails',
      'userLogout',
      'updateBlooprintFilterTerm'
    ]),
    fetchDataOnPageLoad() {
      let list = [
        {
          label: 'Explore',
          name: 'explore',
          routeTo: { name: 'explore-screen' }
        },
        {
          label: 'My blooprints',
          name: 'blooprint',
          routeTo: { name: 'desktop-my-blooprints' }
        },
        { label: 'Calendar', name: 'calendar', routeTo: { name: 'calendar' } },
        { label: 'Wishlist', name: 'wishlist', routeTo: { name: 'wishlist' } }
      ]
      if (this.isUserLoggedIn) {
        this.fetchUserProfile()
        this.tabsList = list
        let menuList = [{ label: 'Signout', value: 'signout' }]
        this.menuItemList = menuList
      } else {
        this.tabsList = []
        let menuList = [
          { label: 'Signin', value: 'signin' },
          { label: 'Signup', value: 'signup' }
        ]
        this.menuItemList = menuList
      }
    },
    // *********** Method to fetch Logged in user Details **************************
    async fetchUserProfile() {
      let userData = await this.fetchLoggedInUserDetails()
      this.loggedInUserDetails = userData
      this.userName = (
        userData['firstName'] +
        ' ' +
        (userData['lastName'] ? userData['lastName'] : '')
      ).trim()
    },
    // ************ Method to check the user has Profile picture or not *********************
    hasProfilePicture(userData) {
      if (userData['picture']) {
        return userData['picture'] != '' && userData['picture'] != null
      } else {
        return false
      }
    },
    // ****************** Triggers when a Menu Item is selected ***************************
    onMenuItemClick(item) {
      this.displayDrawerMenu = false
      switch (item['value']) {
        case 'signin':
          this.onSigninClick()
          break
        case 'signup':
          this.onSignupClick()
          break
        case 'signout':
          this.onSignoutClick()
          break
        default:
          break
      }
    },
    // ************ Triggers when SignIn Button is Clicked ******************************
    onSigninClick() {
      this.$router.push({ name: constants.PAGE_LOGIN }, () => {})
    },
    // ************ Triggers when SignUp Button is Clicked ******************************
    onSignupClick() {
      this.$router.push({ name: 'register' }, () => {})
    },
    // ************ Triggers when SignOut Button is Clicked ******************************
    onSignoutClick() {
      this.confirmationPopup = true
    },
    // *************** Triggers when Blooprinted Logo Is Clicked ****************************
    onLogoClick() {
      if (isLogin()) {
        this.onTabChange({})
        this.$router.push(
          { name: constants.PAGE_DESKTOP_HOME_SCREEN },
          () => {}
        )
      } else {
        this.$router.push({ name: constants.PAGE_LOGIN }, () => {})
      }
    },
    // **************** Triggers when the Confirmation Popup is closed ****************************
    onConfirmationPopupClose(event) {
      if (event['confirmStatus'] == 'yes') {
        this.userLogout({ requestFrom: 'desktop' }).then(() => {
          this.mac.logout({
            email: this.loggedInUserDetails.email,
            username:
              this.loggedInUserDetails.firstName +
              (this.loggedInUserDetails.lastName === undefined
                ? ''
                : ' ' + this.loggedInUserDetails.lastName)
          })
        })
        this.isUserLoggedIn = false
        this.fetchDataOnPageLoad()
      }
      this.confirmationPopup = false
    },
    onProfileClick() {
      this.onTabChange({})
      this.$router.push({ name: constants.PAGE_PROFILE })
    },
    searchForBlooprint() {
      let currentRoute = this.$router.history.current.fullPath
      if (
        !currentRoute.includes('blooprint-library') &&
        this.searchTerm != ''
      ) {
        this.$router.push({ name: 'blooprint-library' })
      }
      this.updateBlooprintFilterTerm(this.searchTerm)
    },
    clearSearchResults() {
      this.onTabChange({})
    },
    onTabChange(item) {
      this.searchTerm = ''
      this.updateBlooprintFilterTerm(this.searchTerm)
    }
  }
}
</script>
<style lang="scss" scoped></style>
