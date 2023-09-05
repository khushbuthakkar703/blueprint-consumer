<template>
  <q-page>
    <Header
      title="Profile"
      textMenu="true"
      titleClass="text-h6"
      :right-button-title="rightButtonTitle"
      :r-target="editProfileUrl"
      :back-target="backTargetUrl"
      showBackIcon="true"
    />
    <div class="flex column main q-px-md">
      <div class="flex row full-width q-py-md">
        <div class="q-mr-md">
          <q-skeleton size="100px" v-if="profile.loading" type="QAvatar" />
          <q-avatar
            v-if="
              (profile.picture == null || profile.picture == '') &&
                !profile.loading
            "
            size="100px"
            font-size="80px"
            color="secondary"
            text-color="white"
            icon="person"
          />
          <q-avatar
            size="100px"
            v-if="
              profile.picture != null &&
                profile.picture != '' &&
                !profile.loading
            "
          >
            <img :src="profile.picture" />
          </q-avatar>
        </div>
        <div class="column q-pt-md text-primary text-body1 wrap-anywhere">
          <div class="q-mx-md">
            <q-skeleton width="50px" height="30px" v-if="profile.loading" />
            <div v-else class="text-h6 text-weight-bold text-nightRider">
              {{ profile.followers }}
            </div>
            <div class="text-caption text-dimGrey">Followers</div>
          </div>
        </div>
        <div class="column q-pt-md text-primary text-body1 wrap-anywhere">
          <div class="q-ml-sm">
            <q-skeleton width="50px" height="30px" v-if="profile.loading" />
            <div v-else class="text-h6 text-weight-bold text-nightRider">
              {{ profile.following }}
            </div>
            <div class="text-caption text-dimGrey">Following</div>
          </div>
        </div>
      </div>
      <div class="flex row full-width q-mt-md">
        <div class="column">
          <q-skeleton
            width="150px"
            class="q-mb-xs"
            v-if="profile.loading"
            height="20px"
          />
          <div
            v-else
            class=" text-weight-bold text-nightRider word-break-break-word q-mb-xs"
          >
            {{ profile.firstName }} {{ profile.lastName }}
          </div>
          <q-skeleton
            width="200px"
            class="q-mb-xs"
            v-if="profile.loading"
            height="20px"
          />
          <div v-else class=" text-dimGrey q-mb-xs">
            {{ profile.email }}
          </div>
          <q-skeleton
            width="150px"
            class="q-mb-md"
            v-if="profile.loading"
            height="20px"
          />
          <div v-else-if="profile.location" class="text-dimGrey  q-mb-xs">
            {{ profile.location }}
          </div>
          <q-skeleton
            width="150px"
            class="q-mb-md"
            v-if="profile.loading"
            height="20px"
          />
          <div v-else-if="profile.timeZone" class="text-dimGrey  q-mb-xs">
            {{ profile.timeZone }}
          </div>
        </div>
        <div class="col text-right q-mb-sm" v-if="!isLoggedInUser">
          <q-skeleton
            class="q-ml-lg"
            width="70px"
            height="30px"
            v-if="profile.loading"
          />
          <q-btn
            v-else
            borderless
            no-caps
            class="btn-border text-bold"
            :class="
              profile.currentUserFollowing
                ? 'text-primary bg-white'
                : 'text-white bg-primary'
            "
            :label="profile.currentUserFollowing ? 'Following' : 'Follow'"
            @click="onFollowClick"
          />
        </div>
      </div>

      <q-skeleton
        class="q-pa-md q-mb-md full-width"
        width="290px"
        v-if="profile.loading"
        height="150px"
      />
      <div
        v-else-if="profile.description"
        class="text-dimGrey text-left text-body2 text-justify q-mb-lg"
      >
        {{ profile.description }}
      </div>
      <q-skeleton
        class="q-pa-md q-mb-md full-width"
        width="290px"
        v-if="profile.loading"
        height="150px"
      />
      <div
        v-if="
          profile.yourself != '' && profile.yourself != null && !profile.loading
        "
        class="row items-center word-break-break-word q-video full-width q-mb-md text-dimGrey text-body2"
      >
        {{ profile.yourself }}
      </div>
      <q-video
        class="q-mb-md full-width"
        :ratio="16 / 9"
        v-if="profile.video != '' && profile.video != null && !profile.loading"
        :src="profile.video"
      />
      <q-skeleton
        class="full-width q-mb-md"
        height="40px"
        v-if="isLoggedInUser && isMyBlooprintsLoading"
      />
      <div
        v-if="isLoggedInUser && !isMyBlooprintsLoading"
        class="row border-secondary bg-white full-width q-mb-lg q-pa-sm wrap-anywhere"
      >
        <div
          @click="$router.push({ name: 'my-blooprints' })"
          class="col-11 text-body1 q-py-xs justify-between text-grey"
        >
          Blooprints
        </div>
        <div class="col-1 text-h6 text-nightRider float-right">
          {{ profile.blooprintCount }}
        </div>
      </div>
      <div class="row full-width text-primary q-mb-md">
        <div
          @click="navigateToReviews"
          class="review-div bg-white text-left q-pl-md q-py-md col-3 wrap-anywhere"
        >
          <q-skeleton
            class="q-pa-xs q-my-md row"
            width="50px"
            height="30px"
            v-if="profile.loading"
          />
          <div v-else class="review-div text-h6 text-charcoal">
            {{ profile.totalReviews }}
          </div>
          <div class="text-caption text-grey">Reviews</div>
        </div>
        <div
          class="auth-rating-div bg-white text-center q-py-md col-4 wrap-anywhere"
          v-if="showAuthorRating"
        >
          <q-skeleton
            class="q-pa-xs q-mx-lg q-my-md row"
            width="70px"
            height="30px"
            v-if="profile.loading"
          />
          <RatingIcon
            v-else
            ratingClass="q-mb-xs"
            color="primary"
            :ratingValue="profile.authorRatingModel"
            iconSize="16px"
            :isReadOnly="isRatingReadOnly"
            :ratingFrom="authorRatingText"
          />
          <div class="text-caption q-mt-sm text-grey">Author Ratings</div>
        </div>
        <div
          class="bp-rating-div bg-white text-center q-py-md q-pr-md q-pl-sm col-5 wrap-anywhere"
          v-if="showBlooprintRating"
        >
          <q-skeleton
            class="q-pa-xs q-my-md q-mx-lg row"
            width="70px"
            height="30px"
            v-if="profile.loading"
          />
          <RatingIcon
            v-else
            ratingClass="q-mb-xs"
            color="primary"
            :ratingValue="profile.blooprintRatingModel"
            iconSize="16px"
            :ratingFrom="blooprintRatingText"
            :isReadOnly="isRatingReadOnly"
          />
          <div class="text-caption q-mt-sm text-grey">Blooprint Ratings</div>
        </div>
      </div>
      <div class="row full-width" v-if="isLoggedInUser">
        <div class="q-mt-xl">
          <q-avatar
            rounded
            class="bg-froly"
            text-color="white"
            icon="delete"
            @click="onDeleteUser()"
            style="height:1.1em"
          ></q-avatar>
        </div>
        <div class="col q-ml-md q-mt-xl">
          <q-btn
            color="primary"
            size="lg"
            label="Logout"
            class="full-width q-mb-md rounded-borders"
            no-caps
            @click="onSignOut()"
          />
        </div>
      </div>
    </div>
    <ConfirmationPopup
      v-if="confirmationPopup"
      popupMsg="Are you sure you want to logout?"
      @on-confirm-popup-close="onConfirmationPopupClose"
    />
  </q-page>
</template>

<script>
import Header from 'components/Header.vue'
import { mapActions, mapGetters } from 'vuex'
import RatingIcon from '../components/RatingIcon.vue'
import { constants } from 'src/utils/common'
import ConfirmationPopup from '../components/ConfirmationPopup.vue'

export default {
  name: 'SignUp',
  data() {
    return {
      isRatingReadOnly: true,
      confirmationPopup: false,
      profile: {
        firstName: '',
        lastName: '',
        email: '',
        description: '',
        followers: 0,
        following: 0,
        blooprintCount: 0,
        totalReviews: 0,
        blooprintRatingModel: 0,
        authorRatingModel: 0,
        loading: true,
        picture: '',
        video: ''
      },
      authorRatingText: constants.AUTHOR_RATING,
      blooprintRatingText: constants.USER_BLOOPRINT_RATING,
      showAuthorRating: false,
      showBlooprintRating: false,
      isMyBlooprintsLoading: true,
      editProfileUrl: `/profiles/${this.$router.history.current.params.profileId}/edit`,
      backTargetUrl: '/blooprint/feature',
      rightButtonTitle:
        this.$store.getters.userId ==
        this.$router.history.current.params.profileId
          ? 'Edit'
          : '',
      isLoggedInUser:
        this.$store.getters.userId ==
        this.$router.history.current.params.profileId
    }
  },
  components: {
    Header,
    RatingIcon,
    ConfirmationPopup
  },
  watch: {
    $route: 'checkUserType',
    errorInGettingUserDetails() {
      let error = !!this.errorInGettingUserDetails.length
      this.isAPIResponseFailed(error)
    }
  },
  computed: {
    ...mapGetters(['navigateBackScreen', 'errorInGettingUserDetails'])
  },
  mounted() {
    this.checkUserType()
    if (this.navigateBackScreen) {
      this.backTargetUrl = this.navigateBackScreen
    } else {
      this.backTargetUrl = `/blooprint/feature`
    }
  },
  updated() {
    this.editProfileUrl = `/profiles/${this.$router.history.current.params.profileId}/edit`
    this.rightButtonTitle =
      this.$store.getters.userId ==
      this.$router.history.current.params.profileId
        ? 'Edit'
        : ''
    this.isLoggedInUser =
      this.$store.getters.userId ==
      this.$router.history.current.params.profileId
  },
  methods: {
    ...mapActions([
      'fetchProfileInfo',
      'userLogout',
      'getAuthorRating',
      'followAuthor',
      'unFollowAuthor',
      'fetchMyBlooprintsList',
      'isAPIResponseFailed'
    ]),
    // ************ Check whether it is logged in user or other user and perform Route navigations *****************
    async checkUserType() {
      if (!this.$router.history.current.params.profileId) {
        if (this.$store.getters.userId) {
          this.$router.push(`/profiles/${this.$store.getters.userId}/view`)
          this.getReviewRatingCount()
        } else {
          let userData = await this.fetchProfileInfo()
          if (userData['email']) {
            this.$router.push(`/profiles/${this.$store.getters.userId}/view`)
            this.getReviewRatingCount()
          }
        }
      } else {
        this.getUserProfileData()
      }
      this.getMyBlooprintsCount()
    },
    // ************** Method to Fetch The User Profile Info **************************
    async getUserProfileData() {
      let data = {
        showLoader: false
      }
      let userData = await this.fetchProfileInfo(data)
      this.profile.loading = false
      if (userData['email'] || userData['email'].trim() == '') {
        this.profile = {
          ...this.profile,
          ...userData
        }
        this.getReviewRatingCount()
      }
    },
    // ************ Trigger When Logout Button is clicked ********************
    onSignOut() {
      this.confirmationPopup = true
    },
    // ************ Open Conf. Popup when Delete button is clicked ********************
    onDeleteUser() {
      this.$router.push('/profiles/delete-account')
    },

    // ************* Triggeres Follow API when a Follow Button is Clicked ***************************
    async onFollowClick() {
      if (this.profile['currentUserFollowing']) {
        // ************ API to Un-Follow ********************
        let followResponse = await this.unFollowAuthor()
        if (followResponse) {
          this.profile.currentUserFollowing = !followResponse
          this.checkUserType()
        }
      } else {
        // ************ API to Follow ********************
        let followResponse = await this.followAuthor()
        if (followResponse) {
          this.profile.currentUserFollowing = followResponse
          this.checkUserType()
        }
      }
    },
    // ************** Method to Fetch The Review and Rating Count **************************
    async getReviewRatingCount() {
      let authorId = this.$router.history.current.params.profileId
      let ratingResponse = await this.getAuthorRating({
        from: 'mobile',
        authorId: authorId ? authorId : this.$store.getters.userId
      })
      this.showBlooprintRating = !ratingResponse['isError']
      this.showAuthorRating = !ratingResponse['isError']
      if (!ratingResponse['isError']) {
        this.profile.blooprintRatingModel =
          ratingResponse['data']['blooprintRating']
        this.profile.authorRatingModel = ratingResponse['data']['authorRating']
        this.profile.totalReviews = ratingResponse['data']['totalReviews']
      }
    },
    // ***************** Navigate to Review Screen ******************
    navigateToReviews() {
      this.$router.push(
        `/profiles/${this.$router.history.current.params.profileId}/reviews`
      )
    },
    // **************** Triggers when the Confirmation Popup is closed ****************************
    onConfirmationPopupClose(event) {
      if (event['confirmStatus'] == 'yes') {
        this.userLogout({ requestFrom: 'mobile' }).then(() => {
          this.mac.logout({
            email: this.profile.email,
            username:
              this.profile.firstName +
              (this.profile.lastName === undefined
                ? ''
                : ' ' + this.profile.lastName)
          })
        })
      }
      this.confirmationPopup = false
    },
    // *************** API to fetch the My Blooprint Count of the Author ******************************
    async getMyBlooprintsCount() {
      this.isMyBlooprintsLoading = true
      let params = {
        limit: 0,
        offset: 0
      }
      let data = await this.fetchMyBlooprintsList(params)
      if (data['meta']) {
        this.profile.blooprintCount = data['meta']['count']
      }
      this.isMyBlooprintsLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  min-height: 600px !important;
}
.btn-border {
  border: 2px solid $primary;
  border-radius: 5px;
}
@media only screen and (max-width: $xs-mobile) {
  .review-div {
    width: 46%;
  }
  .auth-rating-div {
    width: 46%;
    margin-left: 8%;
  }
  .bp-rating-div {
    width: 46%;
    margin-top: 15px;
    padding-right: 0px;
  }
  .follower-div {
    width: 46%;
    margin-right: 0px;
  }
  .following-div {
    width: 46%;
    margin-left: 8%;
  }
  .user-skeleton {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
