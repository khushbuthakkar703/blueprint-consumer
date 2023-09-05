<template>
  <q-header class="bg-white" style="position: static">
    <q-toolbar :class="isUserLoggedIn ? 'login-toolbar' : 'logout-toolbar'">
      <div class="logo-icon-wrapper">
        <q-img
          @click="onLogoClick"
          class="cursor-pointer"
          src="~assets/blooprinted-logo.svg"
          contain
        />
      </div>
      <div
        class="col flex items-center header-menu q-pr-sm justify-end"
        v-if="$q.screen.gt.sm"
      >
        <div class="text-regalBlue f-w-600 text-body1">
          <template>
            <div class="q-px-md bg-transparent">
              <q-btn-dropdown
                label="Explore"
                v-model="showExplore"
                flat
                no-caps
                unelevated
                :ripple="false"
                content-class="border-radius-lg"
                class="explore-dropdown text-lh-24 f-w-600"
                text-color="regalBlue"
                :menu-offset="menuOffset"
                :menu-anchor="
                  isUserLoggedIn && $q.screen.width <= 1300
                    ? 'bottom middle'
                    : 'bottom left'
                "
                :menu-self="
                  isUserLoggedIn && $q.screen.width <= 1300
                    ? 'top middle'
                    : 'top left'
                "
                size="16px"
                dropdown-icon="expand_more"
              >
                <div
                  class="
                    explore-menu-items
                    q-pa-lg
                    border-radius-lg
                    f-w-500
                    text-body1
                  "
                  style="width: 590px"
                >
                  <div class="row no-wrap">
                    <div class="column">
                      <div class="row">
                        <div
                          v-for="menu in exploreMenuList"
                          :key="menu.value"
                          class="q-mb-md col-6 text-regalBlue remove-underline"
                          @click="onCategorySelect(menu)"
                        >
                          <span
                            class="category-item cursor-pointer"
                            :class="
                              categoryFilterTerm.category == menu.label
                                ? 'text-primary'
                                : null
                            "
                          >
                            {{ menu.label }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <q-separator
                    inset
                    style="margin: 0; background: rgba(0, 0, 0, 0.2)"
                  />
                  <div class="q-mt-lg">
                    <!-- <router-link
                      class="text-primary f-w-600 text-body1 remove-underline"
                      :to="{
                        name: 'explore-screen',
                        query: { category: 'all' }
                      }"
                      >Explore all categories</router-link
                    > -->
                    <label
                      class="
                        text-primary
                        f-w-600
                        text-body1
                        remove-underline
                        cursor-pointer
                      "
                      @click="onCategorySelect({})"
                      >Explore all categories</label
                    >
                  </div>
                </div>
              </q-btn-dropdown>
            </div>
          </template>
        </div>
        <div
          v-if="isUserLoggedIn"
          class="text-regalBlue f-w-600 text-body1 cursor-pointer"
          style="margin-right: 40px"
          @click="gotToMyBlooprints"
        >
          My blooprints
        </div>
        <q-input
          borderless
          class="q-mr-sm search-field text-body1 text-comet f-w-400"
          v-model.trim="searchTerm"
          placeholder="Search blooprints"
          @keydown.enter.prevent="searchTermSubmit"
        >
          <template v-slot:prepend>
            <img
              style="width: 20px; height: 20px"
              class="search-margin"
              src="~assets/SearchIcon.svg"
            />
          </template>
          <template
            v-slot:append
            v-if="searchTerm !== '' && searchTerm !== null"
          >
            <q-icon
              size="24px"
              color="primary"
              name="close"
              class="text-regalBlue cursor-pointer"
              @click="clearSearchBar()"
            />
          </template>
        </q-input>
        <!-- for screen size < 1300 -->
        <div class="search-blooprints flex items-center">
          <template>
            <div>
              <q-btn
                class="search-btn"
                flat
                round
                dense
                size="lg"
                color="primary"
              >
                <q-img
                  src="~assets/SearchIcon.svg"
                  @click="dialog = true"
                  style="width: 24px; height: 24px"
                />
              </q-btn>

              <q-dialog
                v-model="dialog"
                persistent
                :maximized="maximizedToggle"
                transition-show="jump-down"
                transition-hide="jump-up"
              >
                <q-card class="bg-white text-white">
                  <q-input
                    borderless
                    color="purple-12 text-fs-16"
                    class="q-py-xs mobile-searchBlooprint text-lh-24"
                    v-model.trim="searchTerm"
                    placeholder="Search blooprints"
                    @keydown.enter.prevent="searchTermSubmit"
                    style="margin-right: 23px; margin-left: 19px"
                  >
                    <template v-slot:prepend>
                      <div>
                        <q-img
                          src="~assets/SearchIcon.svg"
                          style="width: 24px; height: 24px"
                        />
                      </div>
                    </template>
                    <template v-slot:append>
                      <q-btn
                        flat
                        v-close-popup
                        round
                        dense
                        size="lg"
                        color="primary"
                        class="cursor-pointer"
                        icon="close"
                      />
                    </template>
                  </q-input>

                  <q-separator
                    inset
                    class="bg-solitudeBlue q-ma-none"
                    style="height: 2px"
                  />
                  <div
                    v-if="recentSearchesOfUser.length && isUserLoggedIn"
                    class="text-regalBlue"
                    style="margin:20px 15px 0px 15px"
                  >
                    <div class="text-fs-16 f-w-600 text-lh-24">
                      Recent searches
                    </div>
                    <q-separator
                      inset
                      class="bg-solitudeBlue q-ma-none"
                      style="height: 2px; margin-top: 8px"
                    />
                    <div
                      v-for="(query, i) in recentSearchesOfUser"
                      :key="i"
                      class="f-w-500 text-fs-16 text-lh-24 row items-center justify-between"
                      style="margin-top: 16px"
                    >
                      <div class="col-md-11 col-sm-11 col-xs-10 ellipsis">
                        <span
                          class="cursor-pointer"
                          @click="
                            () => {
                              searchTerm = query.text
                              searchTermSubmit()
                            }
                          "
                        >
                          {{ query.text }}</span
                        >
                      </div>
                      <q-icon
                        @click="removeSearchTerm(query.id)"
                        name="close"
                        color="grey-6"
                        class="float-right cursor-pointer"
                      />
                    </div>
                  </div>
                  <div
                    v-else-if="recentSearches.length && !isUserLoggedIn"
                    class="text-regalBlue"
                    style="margin:20px 15px 0px 15px"
                  >
                    <div class="text-fs-16 f-w-600 text-lh-24">
                      Recent searches
                    </div>
                    <q-separator
                      inset
                      class="bg-solitudeBlue q-ma-none"
                      style="height: 2px; margin-top: 8px"
                    />
                    <div
                      v-for="(query, i) in recentSearches"
                      :key="i"
                      class="f-w-500 text-fs-16 text-lh-24 row items-center justify-between"
                      style="margin-top: 16px"
                    >
                      <div class="col-md-11 col-sm-11 col-xs-10 ellipsis">
                        <span
                          class="cursor-pointer"
                          @click="
                            () => {
                              searchTerm = query
                              searchTermSubmit()
                            }
                          "
                        >
                          {{ query }}</span
                        >
                      </div>
                      <q-icon
                        @click="removeSearchTerm(i)"
                        name="close"
                        color="grey-6"
                        class="float-right cursor-pointer"
                      />
                    </div>
                  </div>
                  <div
                    v-else
                    class="
                      text-regalBlue text-center
                      absolute-center
                      full-width
                    "
                  >
                    <q-card-section>
                      <div class="text-h6 f-w-600 text-lh-28">
                        Find your next blooprint
                      </div>
                    </q-card-section>

                    <q-card-section class="q-pt-none f-w-500 text-fs-16">
                      Search for a category of expertise, area of interest or
                      Creator.
                    </q-card-section>
                  </div>
                </q-card>
              </q-dialog>
            </div>
          </template>
        </div>
        <q-space v-if="!isUserLoggedIn" />
        <!-- for screen size < 1300 end -->
        <a
          :href="studioUrl"
          target="_blank"
          v-if="!isUserLoggedIn"
          class="creator-link"
        >
          <q-btn
            no-caps
            unelevated
            color="primary"
            padding="12.5px 20px"
            class="text-fs-16 f-w-600 text-lh-24 creator-button q-mr-md"
            icon-right="mdi-chevron-right"
            label="Become a Creator"
            style="border-radius: 5px;"
          />
        </a>
      </div>
      <div
        class="hamburger-icon-display col flex justify-end"
        v-if="$q.screen.lt.md"
      >
        <!-- tablet view changes -->
        <div class="flex items-center tablet-options gt-xs">
          <div class="text-regalBlue f-w-600 text-body1 explore-section">
            <template>
              <div class="q-pr-md bg-transparent">
                <q-btn-dropdown
                  label="Explore"
                  v-model="showExplore"
                  flat
                  no-caps
                  unelevated
                  :ripple="false"
                  content-class="border-radius-lg"
                  class="explore-dropdown text-lh-24 f-w-600"
                  text-color="regalBlue"
                  :menu-offset="Array(0, 12)"
                  menu-anchor="bottom middle"
                  menu-self="top middle"
                  size="16px"
                  dropdown-icon="expand_more"
                >
                  <div
                    class="
                      explore-menu-items
                      q-pa-lg
                      border-radius-lg
                      f-w-500
                      text-body1
                    "
                    style="width: 590px"
                  >
                    <div class="row no-wrap">
                      <div class="column">
                        <div class="row">
                          <div
                            v-for="menu in exploreMenuList"
                            :key="menu.value"
                            class="
                              q-mb-md
                              col-6
                              text-regalBlue
                              remove-underline
                            "
                            @click="onCategorySelect(menu)"
                          >
                            <span
                              class="category-item cursor-pointer"
                              :class="
                                categoryFilterTerm.category == menu.label
                                  ? 'text-primary'
                                  : null
                              "
                            >
                              {{ menu.label }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <q-separator
                      inset
                      style="margin: 0; background: rgba(0, 0, 0, 0.2)"
                    />
                    <div class="q-mt-lg">
                      <!-- <router-link
                        class="text-primary f-w-600 text-body1 remove-underline"
                        :to="{
                          name: 'explore-screen',
                          query: { category: 'all' }
                        }"
                        >Explore all categories</router-link
                      > -->
                      <label
                        class="
                          text-primary
                          f-w-600
                          text-body1
                          remove-underline
                          cursor-pointer
                        "
                        @click="onCategorySelect({})"
                        >Explore all categories</label
                      >
                    </div>
                  </div>
                </q-btn-dropdown>
              </div>
            </template>
          </div>
          <div
            v-if="isUserLoggedIn"
            class="text-regalBlue f-w-600 text-body1 cursor-pointer"
            style="margin-right: 40px"
            @click="gotToMyBlooprints"
          >
            My blooprints
          </div>
        </div>
        <!-- tablet view changes end -->
        <div class="search-blooprints flex items-center">
          <template>
            <div>
              <q-btn
                class="search-btn"
                flat
                round
                dense
                size="lg"
                color="primary"
              >
                <q-img
                  src="~assets/SearchIcon.svg"
                  @click="dialog = true"
                  style="width: 24px; height: 24px"
                />
              </q-btn>

              <q-dialog
                v-model="dialog"
                persistent
                :maximized="maximizedToggle"
                transition-show="jump-down"
                transition-hide="jump-up"
              >
                <q-card class="bg-white text-white">
                  <q-input
                    borderless
                    color="purple-12 text-fs-16"
                    class="q-py-xs mobile-searchBlooprint text-lh-24"
                    v-model.trim="searchTerm"
                    placeholder="Search blooprints"
                    @keydown.enter.prevent="searchTermSubmit"
                    style="margin-right: 23px; margin-left: 19px"
                  >
                    <template v-slot:prepend>
                      <div>
                        <q-img
                          src="~assets/SearchIcon.svg"
                          style="width: 24px; height: 24px"
                        />
                      </div>
                    </template>
                    <template v-slot:append>
                      <q-btn
                        flat
                        v-close-popup
                        round
                        dense
                        size="lg"
                        color="primary"
                        class="cursor-pointer"
                        icon="close"
                      />
                    </template>
                  </q-input>

                  <q-separator
                    inset
                    class="bg-solitudeBlue q-ma-none"
                    style="height: 2px"
                  />
                  <div
                    v-if="recentSearchesOfUser.length && isUserLoggedIn"
                    class="text-regalBlue"
                    style="margin:20px 15px 0px 15px"
                  >
                    <div class="text-fs-16 f-w-600 text-lh-24">
                      Recent searches
                    </div>
                    <q-separator
                      inset
                      class="bg-solitudeBlue q-ma-none"
                      style="height: 2px; margin-top: 8px"
                    />
                    <div
                      v-for="(query, i) in recentSearchesOfUser"
                      :key="i"
                      class="f-w-500 text-fs-16 text-lh-24 row items-center justify-between"
                      style="margin-top: 16px"
                    >
                      <div class="col-md-11 col-sm-11 col-xs-10 ellipsis">
                        <span
                          class="cursor-pointer"
                          @click="
                            () => {
                              searchTerm = query.text
                              searchTermSubmit()
                            }
                          "
                        >
                          {{ query.text }}</span
                        >
                      </div>
                      <q-icon
                        @click="removeSearchTerm(query.id)"
                        name="close"
                        color="grey-6"
                        class="float-right cursor-pointer"
                      />
                    </div>
                  </div>
                  <div
                    v-else-if="recentSearches.length && !isUserLoggedIn"
                    class="text-regalBlue"
                    style="margin:20px 15px 0px 15px"
                  >
                    <div class="text-fs-16 f-w-600 text-lh-24">
                      Recent searches
                    </div>
                    <q-separator
                      inset
                      class="bg-solitudeBlue q-ma-none"
                      style="height: 2px; margin-top: 8px"
                    />
                    <div
                      v-for="(query, i) in recentSearches"
                      :key="i"
                      class="f-w-500 text-fs-16 text-lh-24 row items-center justify-between"
                      style="margin-top: 16px"
                    >
                      <div class="col-md-11 col-sm-11 col-xs-10 ellipsis">
                        <span
                          class="cursor-pointer"
                          @click="
                            () => {
                              searchTerm = query
                              searchTermSubmit()
                            }
                          "
                        >
                          {{ query }}</span
                        >
                      </div>
                      <q-icon
                        @click="removeSearchTerm(i)"
                        name="close"
                        color="grey-6"
                        class="float-right cursor-pointer"
                      />
                    </div>
                  </div>
                  <div
                    v-else
                    class="
                      text-regalBlue text-center
                      absolute-center
                      full-width
                    "
                  >
                    <q-card-section>
                      <div class="text-h6 f-w-600 text-lh-28">
                        Find your next blooprint
                      </div>
                    </q-card-section>

                    <q-card-section class="q-pt-none f-w-500 text-fs-16">
                      Search for a category of expertise, area of interest or
                      Creator.
                    </q-card-section>
                  </div>
                </q-card>
              </q-dialog>
            </div>
          </template>
        </div>
        <div
          class="lt-md hamburgerMenu flex items-center"
          v-if="!isUserLoggedIn"
        >
          <q-btn
            class="search-btn"
            style="margin-left: 20px; height: 32px"
            flat
            @click="displayDrawerMenu = !displayDrawerMenu"
            round
            dense
            size="lg"
            color="primary"
            icon="menu"
          />

          <q-drawer
            v-model="displayDrawerMenu"
            :width="1023"
            :breakpoint="1023"
            overlay
            bordered
            class="menu-drawer"
          >
            <div class="row drawer-margin justify-between items-center">
              <div class="logo-icon-wrapper col-6">
                <q-img
                  @click="onLogoClick"
                  class="cursor-pointer"
                  src="~assets/blooprinted-logo.svg"
                />
              </div>
              <div class="close-drawer col-sm-1 col-xs-2 text-right">
                <q-btn
                  flat
                  @click="displayDrawerMenu = !displayDrawerMenu"
                  round
                  dense
                  size="lg"
                  color="primary"
                  class="cursor-pointer"
                  icon="close"
                />
              </div>
            </div>
            <q-separator
              inset
              class="bg-solitudeBlue q-ma-none"
              style="height: 2px"
            />
            <div class="text-left">
              <q-list>
                <div
                  class="
                    menu-list-padding
                    text-regalBlue
                    responsive-subheading
                    f-w-600
                  "
                >
                  <q-list>
                    <q-expansion-item
                      label="Explore"
                      class="
                        explore-dropdown explore-mobile-dropdown
                        text-lh-28
                      "
                    >
                      <q-card>
                        <q-card-section
                          class="q-px-none q-pt-none f-w-500 explore-menu-items"
                        >
                          <div class="row no-wrap justify-end text-fs-16">
                            <div class="column">
                              <div class="row">
                                <div
                                  v-for="menu in exploreMenuList"
                                  :key="menu.value"
                                  class="
                                    col-6
                                    q-mb-md
                                    text-regalBlue
                                    remove-underline
                                    text-lh-24
                                  "
                                  @click="onCategorySelect(menu)"
                                >
                                  <span
                                    class="category-item cursor-pointer"
                                    :class="
                                      categoryFilterTerm.category == menu.label
                                        ? 'text-primary'
                                        : null
                                    "
                                  >
                                    {{ menu.label }}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="q-mt-sm">
                            <label
                              class="
                                text-primary
                                f-w-600
                                text-body1
                                remove-underline
                              "
                              @click="onCategorySelect({})"
                              >View all categories</label
                            >
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                    <div
                      v-for="menu in isUserLoggedIn
                        ? menuListAfterLogin
                        : menuListBeforeLogin"
                      :key="menu.label"
                    >
                      <q-separator
                        inset
                        class="bg-solitudeBlue q-ma-none"
                        style="height: 2px"
                      />
                      <q-item class="cursor-pointer">
                        <q-item-section>
                          <div
                            exact
                            class="remove-underline text-regalBlue"
                            @click="onMenuSelect(menu)"
                            :label="menu.label"
                          >
                            {{ menu.label }}
                          </div>
                        </q-item-section>
                      </q-item>
                    </div>
                  </q-list>
                </div>
              </q-list>
            </div>
          </q-drawer>
        </div>

        <div v-else class="row items-center" @click="loginRedirect">
          <q-btn
            flat
            :ripple="false"
            @click="openChatMessage"
            v-if="isUserLoggedIn"
            padding="4px"
            style="margin: 0 12px 0 12px;"
          >
            <q-img
              style="width: 24px; height: 24px"
              class="cursor-pointer"
              src="~assets/Message.svg"
            >
            </q-img>
            <q-badge
              v-if="unreadMessagesCount > 0"
              floating
              rounded
              style="background-color: #D92D20"
            >
              {{ unreadMessagesCount }}
            </q-badge>
          </q-btn>
          <UserMenu @onLogout="handleLogout" />
        </div>
      </div>

      <div class="gt-sm row items-center" @click="loginRedirect">
        <q-btn
          flat
          :ripple="false"
          @click="openChatMessage"
          v-if="isUserLoggedIn"
          padding="4px"
          style="margin: 0 12px 0 12px;"
        >
          <q-img
            style="width: 24px; height: 24px"
            class="cursor-pointer"
            src="~assets/Message.svg"
          >
          </q-img>
          <q-badge
            v-if="unreadMessagesCount > 0"
            floating
            rounded
            style="background-color: #D92D20"
          >
            {{ unreadMessagesCount }}
          </q-badge>
        </q-btn>
        <UserMenu @onLogout="handleLogout" />
      </div>
    </q-toolbar>
  </q-header>
</template>
<script>
import { constants, isLogin, openStudioScreen } from '../../utils/common'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import UserMenu from '../../components/Desktop/UserMenu.vue'
import { firebaseAuth } from 'src/boot/firebase'

const menuList = []

export default {
  data() {
    return {
      menuListBeforeLogin: [
        {
          label: 'FAQs',
          route: 'faqs'
        },
        {
          label: 'Contact',
          route: 'login'
        },
        {
          label: 'Become a Creator',
          route: ''
        },
        {
          label: 'Login',
          route: 'login'
        }
      ],
      menuListAfterLogin: [
        {
          label: 'My blooprints',
          route: 'desktop-my-blooprints'
        },
        {
          label: 'FAQs',
          route: 'faqs'
        },
        {
          label: 'Contact',
          route: 'login'
        },
        {
          label: 'Become a Creator',
          route: ''
        },
        {
          label: 'Logout',
          route: ''
        }
      ],
      recentSearches: [],
      recentSearchesOfUser: [],
      menuOffset: Array(0, 14),
      searchTerm: this.getDefaultSearchText(),
      dialog: false,
      maximizedToggle: true,
      tabsList: [
        { label: 'Explore', name: 'explore', routeTo: { name: 'explore' } }
      ],
      displayDrawerMenu: false,
      exploreMenuList: [],
      isUserLoggedIn: false,
      showExplore: false
    }
  },
  components: { UserMenu },
  computed: {
    ...mapGetters([
      'blooprintFilterTerm',
      'blooprintSortOption',
      'categoryFilterTerm',
      'unreadMessagesCount'
    ]),
    now: function() {
      return Date.now()
    },
    studioUrl() {
      return process.env.BLOOPRINTED_ENV_STUDIO_URL
    }
  },
  watch: {
    blooprintFilterTerm(data) {
      this.searchTerm = data ? data.trim() : data
    }
  },
  created() {
    this.isUserLoggedIn = isLogin()
    if (firebaseAuth.currentUser?.uid) {
      this.unreadUnscubscribe = this.$getUnreadCount(
        this.setUnreadMessagesCount,
        firebaseAuth.currentUser.uid
      )
    }
  },
  destroyed() {
    // messages unread count unsubscribe
    if (this.unreadUnscubscribe) {
      this.unreadUnscubscribe()
    }
  },

  async mounted() {
    this.getAllCategories()
    this.getRecentSearches()
    if (isLogin()) {
      this.recentSearchesOfUser = await this.getRecentSearchesOfUser()
    }
  },
  updated() {
    this.isUserLoggedIn = isLogin()
  },
  watch: {
    $route() {
      this.isUserLoggedIn = isLogin()
      this.searchTerm = this.blooprintFilterTerm
      if (!('category' in this.$route.query)) {
        this.updateBlooprintCategoryFilterTerm({})
      }
      if (!('search' in this.$route.query)) {
        this.searchTerm = ''
      }
    }
  },
  methods: {
    ...mapActions([
      'updateBlooprintFilterTerm',
      'fetchAllCategoriesList',
      'updateBlooprintCategoryFilterTerm',
      'updateBlooprintSortOption',
      'userLogout',
      'addRecentSearch',
      'deleteRecentSearchById',
      'getRecentSearchesOfUser'
    ]),
    ...mapMutations(['setUnreadMessagesCount']),

    onMenuSelect(menu) {
      if (menu.label == 'Logout') {
        this.userLogout({ requestFrom: 'desktop' })
      } else if (menu.label == 'Become a Creator') {
        openStudioScreen()
      } else if (menu.label == 'Contact') {
        this.clickHubspotChat()
      } else {
        this.$router.push({ name: menu.route })
      }
      //   if (menu.label != 'Become a Creator') {
      this.displayDrawerMenu = false
      //   }
    },
    handleLogout() {
      if (this.$route.name == 'home') {
        this.$router.push('/', () => {})
      }
    },
    openChatMessage() {
      this.$router.push({ name: 'message' }, () => {})
    },
    getDefaultSearchText() {
      const urlParams = new URLSearchParams(window.location.search)
      this.updateBlooprintFilterTerm(urlParams.get('search'))
      return urlParams.get('search')
    },
    clickHubspotChat() {
      window.HubSpotConversations.widget.open()
    },
    async getAllCategories() {
      let params = { parent: true, sort: 'name' }
      let data = await this.fetchAllCategoriesList(params)
      this.exploreMenuList = data
    },
    gotToMyBlooprints() {
      this.$router.push({ name: 'desktop-my-blooprints' }, () => {})
    },
    loginRedirect() {
      if (!this.isUserLoggedIn) {
        this.$router.push({ name: constants.PAGE_LOGIN }, () => {})
      }
    },
    addSearchTermInLocalStorage(searchTerm) {
      if (searchTerm.length) {
        //checking if term exists or not
        if (!this.recentSearches.includes(searchTerm)) {
          this.recentSearches.unshift(searchTerm)
        } else {
          //if term exists then moving term to top
          this.recentSearches = this.recentSearches.filter(
            term => term !== searchTerm
          )
          this.recentSearches.unshift(searchTerm)
        }
        this.setRecentSearches()
      }
    },
    async addSearchTerm(term) {
      if (isLogin()) {
        if (term.length) {
          //checking if term exists or not
          let duplicateTerm = this.recentSearchesOfUser.find(item => {
            return item.text === term
          })
          if (duplicateTerm) {
            await this.deleteRecentSearchById(duplicateTerm.id)
            await this.addRecentSearch(term)
          } else {
            await this.addRecentSearch(term)
          }
          this.recentSearchesOfUser = await this.getRecentSearchesOfUser()
        }
      } else {
        this.addSearchTermInLocalStorage(term)
      }
    },
    async removeSearchTerm(index) {
      if (isLogin()) {
        await this.deleteRecentSearchById(index)
        this.recentSearchesOfUser = await this.getRecentSearchesOfUser()
      } else {
        this.recentSearches.splice(index, 1)
        this.setRecentSearches()
      }
    },

    //for getting recent searches from local storage
    getRecentSearches() {
      let recentSearches = JSON.parse(localStorage.getItem('recent-searches'))
      if (recentSearches) {
        this.recentSearches = recentSearches
      }
    },
    //for setting recent searches to local storage
    setRecentSearches() {
      localStorage.setItem(
        'recent-searches',
        JSON.stringify(this.recentSearches)
      )
    },
    searchTermSubmit() {
      this.dialog = false
      this.addSearchTerm(this.searchTerm)
      this.updateBlooprintFilterTerm(this.searchTerm)
      let currentRouteQuery = {}
      // if (this.categoryFilterTerm && this.categoryFilterTerm['category']) {
      //   currentRouteQuery['category'] = this.categoryFilterTerm['category']
      // }
      // if (this.categoryFilterTerm && this.categoryFilterTerm['subcategory']) {
      //   currentRouteQuery['subcategory'] = this.categoryFilterTerm[
      //     'subcategory'
      //   ]
      // }
      // if (this.blooprintSortOption) {
      //   currentRouteQuery['sortoption'] = this.blooprintSortOption
      // }

      // let queryRoute = this.$router.history.current.query
      // if (!currentRouteQuery['category']) {
      //   currentRouteQuery['category'] = queryRoute['category']
      //     ? queryRoute['category']
      //     : ''
      //   currentRouteQuery['subcategory'] = queryRoute['subcategory']
      //     ? queryRoute['subcategory']
      //     : ''
      // }
      // if (!currentRouteQuery['sortoption']) {
      //   currentRouteQuery['sortoption'] = queryRoute['sortoption']
      //     ? queryRoute['sortoption']
      //     : ''
      // }
      if (this.searchTerm != '' && this.searchTerm != null) {
        let query = {}
        if (currentRouteQuery['category']) {
          // query['category'] = currentRouteQuery['category']
        }
        if (currentRouteQuery['subcategory']) {
          // query['subcategory'] = currentRouteQuery['subcategory']
        }
        if (currentRouteQuery['sortoption']) {
          // query['sortoption'] = currentRouteQuery['sortoption']
        }
        query['search'] = this.searchTerm
        this.$router.push(
          {
            name: 'explore-screen',
            query: query
          },
          () => {}
        )
      } else {
        if (currentRouteQuery['category']) {
          let query = { category: currentRouteQuery['category'] }
          if (currentRouteQuery['subcategory']) {
            query['subcategory'] = currentRouteQuery['subcategory']
          }
          if (currentRouteQuery['sortoption']) {
            query['sortoption'] = currentRouteQuery['sortoption']
          }
          this.$router.push(
            {
              name: 'explore-screen',
              query: query
            },
            () => {}
          )
        } else {
          this.$router.push(
            {
              name: 'explore-screen'
            },
            () => {}
          )
        }
      }
    },
    // *************** Triggers when Blooprinted Logo Is Clicked ****************************
    onLogoClick() {
      this.updateBlooprintCategoryFilterTerm({})
      this.$router.push(
        { name: constants.PAGE_DESKTOP_LANDING_SCREEN },
        () => {}
      )
    },
    onCategorySelect(data) {
      this.updateBlooprintFilterTerm('')
      this.updateBlooprintSortOption('')
      this.updateBlooprintCategoryFilterTerm({
        category: data && data['label'] ? data['label'] : '',
        subcategory: ''
      })
      let query = {}
      if (data['label']) {
        query['category'] = data['label']
      } else {
        query['category'] = 'all'
      }
      if (query['category'] == 'all') {
        this.$router.push(
          {
            name: 'all-category',
            query: { category: 'all' }
          },
          () => {}
        )
      } else {
        this.$router.push(
          {
            name: 'explore-screen',
            query: query
          },
          () => {}
        )
      }
      this.displayDrawerMenu = false
      this.showExplore = false
      this.clearSearchBar()
    },
    clearSearchBar() {
      this.searchTerm = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.search-margin {
  margin: 15px 0px 15px 15px;
}
.drawer-margin {
  margin: 16px 48px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin: 16px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin: 11px 15px;
  }
}
.menu-list-padding {
  padding: 12px 15px;
  .q-item {
    padding: 16px 0px !important;
  }
}
.login-toolbar {
  padding: 21px 52px !important;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 15px 15px !important;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 15px 15px !important;
  }
}
.logout-toolbar {
  padding: 21px 52px !important;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 19px 15px !important;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 19px 15px !important;
  }
}
.logo-icon-wrapper {
  width: 184px;
  @media only screen and (max-width: $breakpoint-xs) {
    width: 138px;
  }
}
.my-blooprint-menu-link {
  @media only screen and (max-width: 1300px) {
    display: none;
  }
}
.header-navbar {
  @media only screen and (max-width: $breakpoint-sm) {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
::v-deep {
  .search-field {
    width: 350px;
    height: 48px;
    border-radius: 100px;
    border: 2px solid $solitudeBlue;
    transition: border 0.5s;
    &:focus,
    &:active,
    &:hover {
      border: 2px solid $primary !important;
      box-shadow: none;
    }
    // @media only screen and (max-width: 1125px) {
    //   width: 250px;
    // }
    @media only screen and (max-width: 1341px) {
      display: none;
    }
    .q-field__prepend {
      padding-right: 8px !important;
    }
    .q-field__append {
      padding: 15px 15px 15px 8px !important;
    }
  }
}

.category-item {
  &:hover {
    color: $primary;
  }
}
.explore-dropdown[aria-expanded='true'] {
  color: $primary;
}

.explore-menu-items a:hover {
  color: $primary;
}

.mobile-searchBlooprint {
  &:focus,
  &:active,
  &:hover {
    border: none !important;
    box-shadow: none;
  }
}

::v-deep {
  .menu-drawer .q-drawer {
    width: 100vw !important;
  }
  .explore-dropdown {
    .q-item {
      padding-left: 0;
    }
    &:active .q-focus-helper,
    &:focus .q-focus-helper,
    &:hover .q-focus-helper {
      background: transparent !important;
    }
    .material-icons {
      color: $primary;
      font-size: 24px !important;
    }
  }
  .explore-mobile-dropdown {
    .q-item {
      padding: 16px 10px 16px 0px;
      .q-item__label {
        line-height: 28px !important;
      }
    }
  }
  .search-btn {
    .q-btn__wrapper {
      min-width: 32px !important;
      min-height: 32px !important;
      width: 32px;
      height: 32px;
    }
  }
}
.tablet-options {
  @media only screen and (max-width: 600px) {
    display: none;
  }
}
.search-blooprints {
  display: none;
  @media only screen and (max-width: 1341px) {
    display: flex;
  }
}
.explore-section {
  @media only screen and (max-width: 700px) {
    display: none;
  }
}

.creator-link {
  text-decoration: none;

  &:visited,
  &:active,
  &:link {
    text-decoration: none;
  }

  .creator-button.q-btn {
    &:hover {
      ::v-deep {
        .q-icon {
          transform: translateX(10px);
        }
      }
    }

    ::v-deep {
      .q-icon {
        transition: transform 0.3s ease-out;
        margin-left: 8px;
        font-size: 24px;
      }
    }
  }
}
</style>
