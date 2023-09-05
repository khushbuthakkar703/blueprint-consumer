<template>
  <q-page style="overflow-x: hidden; width: 100%" class="my-profile-page">
    <div class="author-page">
      <div class="row">
        <div class="left-container">
          <q-card class="profile-card row">
            <div class="profile-pic-container col-sm-6 col-md-12 col-xs-12">
              <q-img
                v-if="profile.picture !== null && profile.picture !== ''"
                class="userImage bg-white"
                :src="profile.picture"
              ></q-img>

              <q-img
                v-else
                class="userImage bg-white"
                src="~assets/UserImage.svg"
              ></q-img>
            </div>
            <div
              class="menu-card col-sm-6 col-md-12 col-xs-12 max-height bg-white"
            >
              <div class="row justify-between">
                <div class="name col ellipsis" v-if="profile.firstName !== ''">
                  {{ profile.firstName }} {{ profile.lastName }}
                  <q-tooltip
                    anchor="bottom left"
                    self="bottom left"
                    :offset="[-10, 10]"
                  >
                    <div class="word-break-break-word">
                      {{ profile.firstName }} {{ profile.lastName }}
                    </div>
                  </q-tooltip>
                  <div class="location-style text-fs-14-lh-20">
                    {{ profile.location }}
                  </div>
                </div>
                <div v-else class="name">
                  <div>
                    <q-skeleton
                      type="text"
                      width="150px"
                      class="name col"
                      style="border-radius: 0px"
                    />
                    <q-skeleton
                      type="text"
                      width="75px"
                      class="location-style"
                      style="border-radius: 0px"
                    />
                  </div>
                </div>

                <div
                  class="text-right action-btns"
                  v-if="isUserLoggedIn && showFollowButton"
                >
                  <q-btn
                    v-if="!profile.currentUserFollowing"
                    no-caps
                    no-wrap
                    label="Follow"
                    class="
                      text-white
                      bg-primary
                      follow-btn
                      text-fs-16 text-lh-24
                      f-w-600
                    "
                    @click="onFollow"
                  >
                    <img src="~assets/user-plus.svg" class="follow-icon" />
                  </q-btn>
                  <q-btn
                    v-else
                    no-caps
                    no-wrap
                    flat
                    label="Following"
                    @click="onFollow"
                    class="
                      text-primary
                      bg-white
                      f-w-600
                      text-fs-16 text-lh-24
                      bg-white
                      btn-border
                      following-btn
                    "
                  >
                    <q-icon name="task_alt" class="follow-icon" />
                  </q-btn>
                </div>
              </div>
              <div class="followers-container">
                <div
                  class="
                    followers
                    bg-solitudeBlue
                    text-fs-16 text-lh-24 text-regalBlue
                    f-w-400
                  "
                >
                  <span class="f-w-600" style="margin-right: 8px !important">
                    {{ profile.followers }}
                  </span>
                  Followers
                </div>
                <div
                  class="
                    followers
                    bg-solitudeBlue
                    text-fs-16 text-lh-24 text-regalBlue f-w-400
                  "
                >
                  <span class="f-w-600" style="margin-right: 8px !important">
                    {{ profile.following }}
                  </span>
                  Following
                </div>
              </div>
              <div
                class="flex"
                v-if="'socialMediaLinks' in profile"
                :class="{
                  socials:
                    profile.socialMediaLinks.twitter ||
                    profile.socialMediaLinks.instagram ||
                    profile.socialMediaLinks.facebook ||
                    profile.socialMediaLinks.linkedIn
                }"
              >
                <a
                  v-if="profile.socialMediaLinks.twitter"
                  class="flex cursor-pointer menu-options full-width"
                  style="margin-bottom: 8px"
                  :href="profile.socialMediaLinks.twitter"
                  target="_blank"
                >
                  <img src="~/assets/TwitterColor.svg" class="menu-icon" />
                  <label class="menu-option-text">Twitter</label>
                  <q-space class="gt-sm" />
                  <img
                    src="~/assets/chevron-right blue.svg"
                    id="right"
                    class="q-mr-xs gt-sm"
                  />
                </a>
                <a
                  v-if="profile.socialMediaLinks.instagram"
                  class="flex cursor-pointer menu-options full-width"
                  style="margin-bottom: 8px"
                  :href="profile.socialMediaLinks.instagram"
                  target="_blank"
                >
                  <img src="~/assets/InstagramBlack.svg" class="menu-icon" />
                  <label class="menu-option-text">Instagram</label>
                  <q-space class="gt-sm" />
                  <img
                    src="~/assets/chevron-right blue.svg"
                    id="right"
                    class="q-mr-xs gt-sm"
                  />
                </a>
                <a
                  v-if="profile.socialMediaLinks.facebook"
                  class="flex cursor-pointer menu-options full-width"
                  id="fb"
                  :href="profile.socialMediaLinks.facebook"
                  target="_blank"
                >
                  <img src="~/assets/FacebookColor.svg" class="menu-icon" />
                  <label class="menu-option-text">Facebook</label>
                  <q-space class="gt-sm" />
                  <img
                    src="~/assets/chevron-right blue.svg"
                    id="right"
                    class="q-mr-xs gt-sm"
                  />
                </a>
                <a
                  v-if="profile.socialMediaLinks.linkedIn"
                  class="flex cursor-pointer menu-options full-width"
                  id="lin"
                  :href="profile.socialMediaLinks.linkedIn"
                  target="_blank"
                >
                  <img src="~assets/LinkedinColor.svg" class="menu-icon" />
                  <label class="menu-option-text">LinkedIn</label>
                  <q-space class="gt-sm" />
                  <img
                    src="~/assets/chevron-right blue.svg"
                    id="right"
                    class="q-mr-xs gt-sm"
                  />
                </a>
              </div>
            </div>
          </q-card>
        </div>
        <div class="col-md col-sm-12 col-xs-12 right-container full-width">
          <BlooprintExpertSection />
          <AuthorAboutMe
            :profile="profile"
            :class="
              reviewsList.length === 0 && authorBlooprints.length === 0
                ? 'no-review'
                : null
            "
          />
          <AuthorBlooprint
            :class="reviewsList.length === 0 ? 'no-reviews' : null"
            :profile="profile"
            :authorBlooprints="authorBlooprints"
            :blooprintsLoading="blooprintsLoading"
          />
          <AuthorReviews
            :reviewsList="reviewsList"
            :reviewsLoading="reviewsLoading"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import AuthorBlooprint from 'src/components/Desktop/AuthorBlooprint'
import BlooprintExpertSection from 'src/components/Desktop/BlooprintExpertSection'
import AuthorAboutMe from 'src/components/Desktop/AuthorAboutMe'
import AuthorReviews from 'src/components/Desktop/AuthorReviews'
import { isLogin } from 'src/utils/common'
import { mapActions, mapGetters } from 'vuex'
import { firebaseAuth } from 'src/boot/firebase'
export default {
  name: 'MyProfile',
  components: {
    AuthorBlooprint,
    BlooprintExpertSection,
    AuthorAboutMe,
    AuthorReviews
  },
  meta() {
    return {
      title: this.profile?.firstName
        ? this.profile?.firstName +
          ' ' +
          this.profile?.lastName +
          ' - blooprinted'
        : 'Creator profile - blooprinted'
    }
  },
  data() {
    return {
      profile: this.getProfileObj(),
      authorBlooprints: [],
      isLoggedInUser: true,
      reviewsList: [],
      isUserLoggedIn: false,
      blooprintsLoading: false,
      reviewsLoading: false
    }
  },
  computed: {
    ...mapGetters(['userProfile']),

    showFollowButton() {
      if (!this.profile.firebaseUID) {
        return false
      }

      return this.profile.firebaseUID !== firebaseAuth.currentUser.uid
    }
  },
  watch: {
    $route: 'checkUserType'
  },
  created() {
    this.isUserLoggedIn = isLogin()
    this.checkUserType()
  },
  methods: {
    ...mapActions([
      'fetchProfileInfo',
      'unFollowAuthor',
      'followAuthor',
      'retrieveBlooprintList',
      'fetchReviewsList'
    ]),
    async checkUserType() {
      this.getAuthorDetails()
      this.blooprintsLoading = true
      let data = await this.retrieveBlooprintList({
        authorID: this.$router.history.current.params.profileId
      })
      this.authorBlooprints = data.blooprintList.filter(blooprint => {
        return blooprint.attributes.status === 'active'
      })
      this.blooprintsLoading = false
      this.getReviewList()
    },
    async getAuthorDetails() {
      let data = {
        showLoader: false
      }
      let authorData = await this.fetchProfileInfo(data)
      if (authorData['email'] || authorData['email'].trim() == '') {
        this.profileFollowersCount(authorData)
        this.profile = {
          ...this.getProfileObj(),
          ...authorData
        }
        this.profile.loading = false
      }
    },
    async onFollow() {
      if (this.profile['currentUserFollowing']) {
        // ************ API to Un-Follow ********************
        let followResponse = await this.unFollowAuthor({
          authorID: this.profile['id']
        })
        if (followResponse) {
          this.profile.currentUserFollowing = !followResponse
          this.profile.followers = this.profile.followers - 1
        }
      } else {
        // ************ API to Follow ********************
        let followResponse = await this.followAuthor({
          authorID: this.profile['id']
        })
        if (followResponse) {
          this.profile.currentUserFollowing = followResponse
          this.profile.followers = this.profile.followers + 1
        }
      }
    },
    async getReviewList(authorId) {
      let params = {
        authorID: this.$router.history.current.params.profileId,
        limit: 4
      }
      this.reviewsLoading = true
      let list = await this.fetchReviewsList(params)

      if (list && list['data']) {
        this.reviewsList = list['data']
      }
      if (list && list['meta']) {
        this.totalReviewCount = list['meta']['count']
      }
      this.reviewsLoading = false
    },

    getProfileObj() {
      return {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        description: '',
        companyName: '',
        jobRole: '',
        followers: 0,
        following: 0,
        blooprintCount: 0,
        loading: true,
        picture: null,
        video: null,
        yourself: ''
      }
    },
    profileFollowersCount(authorData) {
      if (authorData.followers >= 1000000) {
        authorData.followers = Math.round(authorData.followers) / 1000000 + 'M'
      }
      if (authorData.followers >= 1000) {
        authorData.followers = Math.round(authorData.followers) / 1000 + 'K'
      }
      if (authorData.following >= 1000000) {
        authorData.following = Math.round(authorData.following) / 1000000 + 'M'
      }
      if (authorData.following >= 1000) {
        authorData.following = Math.round(authorData.following) / 1000 + 'K'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-profile-page {
  background-color: #e8edf2;

  @media only screen and (max-width: 1023px) and (min-width: 600px) {
    background-color: #ffffff;
  }
}
.author-page {
  margin: 42px 52px;
  @media only screen and (max-width: 1023px) and (min-width: 600px) {
    margin-top: 2px !important;
  }
  @media only screen and (max-width: $breakpoint-sm) {
    margin: 0;
  }
  @media only screen and (max-width: 1023px) and (min-width: 600px) {
    padding-left: 16px;
    padding-right: 16px;
  }
}
.profile-pic-container {
  border-radius: 20px 20px 0px 0px;
  @media only screen and (max-width: 1023px) and (min-width: 769px) {
    border-radius: 0px !important;
  }
}
.left-container {
  @media only screen and (max-width: $breakpoint-sm-max) {
    min-width: 100% !important;
    margin-right: 0;
  }

  margin-right: 20px;

  max-width: 432px;
  width: 35%;
}
.profile-card {
  border-radius: 20px;
  box-shadow: 0px 10px 20px $shadow;
}
.right-container {
  @media only screen and (max-width: $breakpoint-sm) {
    width: 100%;
  }
}
.location-style {
  color: #667085;
  margin-top: 4px;
  font-weight: 500 !important;
}
.name {
  font-size: 24px;
  position: relative;
  line-height: 32px;
  color: #101828;

  margin-right: 20px !important;
  font-weight: 600;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-right: 0px;
  }
}
.flex-container {
  display: flex;
  justify-content: space-between;
}

.userImage {
  border-radius: 20px 20px 0px 0px !important;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @media only screen and (max-width: $breakpoint-sm-max) {
    border-radius: 0px !important;
  }

  @media only screen and (max-width: 1023px) and (min-width: 769px) {
    min-width: 375px;
    height: 292px;
    border-radius: 0px !important;
  }
}
.followers-container {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
}
.followers {
  padding: 10px 10px 10px 15px;
  height: 44px;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 5px;
  &:first-child {
    margin-right: 20px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    &:first-child {
      margin-right: 16px;
    }
  }
}

::v-deep {
  .follow-btn {
    border-radius: 10px;
    width: 138px;
    height: 40px;
  }
  .following-btn {
    border-radius: 10px;
    width: min-content;
    height: 40px;
  }
}
.btn-border {
  border: 2px solid $primary;
}
.follow-icon {
  width: 24px;
  height: 24px;
  margin-left: 13px;
  @media only screen and (max-width: 1110px) {
    margin-left: 5px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-left: 13px;
  }
  @media only screen and (max-width: 390px) {
    margin-left: 5px;
  }
}
.menu-card {
  align-items: flex-start;
  padding: 30px;
  @media only screen and (min-width: 600px) and (max-width: 1023px) {
    padding: 20px 15px !important;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 20px 15px;
    border-radius: 0px !important;
  }
}
.socials {
  margin-top: 24px;

  @media only screen and (min-width: 769px) and (max-width: 1023px) {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 16px;
  }

  @media only screen and (min-width: 400px) and (max-width: 599px) {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 16px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    display: block;
  }
}
.menu-options {
  padding: 12px 16px !important;
  width: 372px;
  height: 48px;
  background: #ffffff;
  border: 2px solid #e8edf2 !important;
  box-sizing: border-box;
  border-radius: 8px !important;
  margin-bottom: 8px !important;
  transition: box-shadow 0.2s linear;
  text-decoration: none;
  &:last-child {
    margin-bottom: 0px !important;
  }
  #right {
    left: 0;
    position: relative;
    transition: left 0.3s linear;
  }
  &:hover {
    border-color: $dodgerBlue !important;
    box-shadow: 0 0 5px $dodgerBlue;
    #right {
      left: 5px;
      transition: left 0.3s linear;
    }
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 100%;
    margin-bottom: 8px !important;
  }
}
#fb {
  @media only screen and (min-width: 769px) and (max-width: 1023px) {
    margin-bottom: 0px !important;
  }

  @media only screen and (min-width: 400px) and (max-width: 599px) {
    margin-bottom: 0px !important;
  }

  @media only screen and (max-width: 399px) {
    margin-bottom: 8px !important;
  }
}
#lin {
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-bottom: 0px !important;
  }
}
.menu-option-text {
  font-weight: 500 !important;
  font-size: 16px;
  line-height: 24px;
  display: block;
  color: $regalBlue;
  align-items: center;
}
.menu-icon {
  margin-left: 0px !important;
  margin-right: 10px !important;
  margin-top: 2px !important;
  margin-bottom: 2px !important;
  height: 20px !important;
  width: 20px !important;
}

.no-reviews {
  @media only screen and (max-width: 1023px) and (min-width: 600px) {
    margin-bottom: 36px !important;
    border-radius: 0px !important;
  }
}

.no-review {
  @media only screen and (max-width: 1023px) and (min-width: 600px) {
    margin-bottom: 66px !important;
    border-radius: 0px !important;
  }
}
.action-btns {
  @media only screen and (max-width: 1299px) and (min-width: 1024px) {
    margin-top: 12px;
    width: 100%;
    text-align: left;
  }
  @media only screen and (max-width: 799px) and (min-width: 600px) {
    margin-top: 12px;
    width: 100%;
    text-align: left;
  }
  @media only screen and (max-width: 374px) and (min-width: 280px) {
    margin-top: 12px;
    width: 100%;
    text-align: left;
  }
}
::v-deep {
  .q-btn__wrapper {
    min-height: unset;
  }
}
</style>
