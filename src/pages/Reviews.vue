<template>
  <q-page>
    <Header
      v-if="showHeader"
      :back-target="backNavigateUrl"
      title="Reviews"
      titleClass="text-h6"
      showBackIcon="true"
    />
    <div
      v-else
      class="q-ma-md-xl q-ma-sm-lg q-mx-xs-md q-my-xs-lg text-h5 text-nightRider text-weight-medium"
    >
      Reviews
    </div>

    <div v-if="loading">
      <div class="q-ma-md-xl q-ma-sm-lg q-ma-xs-md" v-for="i in 10" :key="i">
        <q-skeleton width="150px" />
        <div class="row q-mt-sm">
          <q-skeleton class="col" />
          <div class="col"></div>
          <q-skeleton class="col text-right" />
        </div>
        <q-skeleton class="q-mt-sm" height="75px" />
        <div class="row q-mt-sm">
          <q-skeleton class="col" />
          <div class="col"></div>
          <q-skeleton class="col text-right" />
        </div>
        <q-skeleton class="q-mt-sm" height="75px" />
        <q-separator class="full-width q-mt-md" color="solitude" />
      </div>
    </div>
    <div v-else>
      <NoDataMessageDisplay v-if="reviewList.length == 0" />
      <q-infinite-scroll
        @load="loadMoreRecords"
        :offset="250"
        ref="infiniteScroll"
        class="q-mb-lg"
      >
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
        <div
          class="q-mx-md-xl q-my-md-lg q-ma-sm-lg q-ma-xs-md"
          v-for="review in reviewList"
          :key="review.id"
        >
          <div class="row">
            <div class="text-grey">
              {{ getFormattedDate(review.attributes.createdDate) }}
            </div>
            <div
              class="col text-right text-primary"
              v-if="
                isLoggedInUser && review.attributes.customerID == loggedInUserId
              "
            >
              <q-icon name="edit" @click="onEditReviewClick(review)" />
            </div>
          </div>
          <!-- ************* Author Review and Rating ******************************* -->
          <div class="row q-mt-sm">
            <div
              class="col text-nightRider text-weight-bold word-break-break-word text-body1"
            >
              {{ review.attributes.customerName }}
            </div>
            <div class="col text-right">
              <RatingIcon
                ratingClass="q-mb-xs"
                color="primary"
                :ratingValue="
                  requestFrom == 'blooprint'
                    ? review.attributes.blooprintRating
                    : review.attributes.authorRating
                "
                iconSize="16px"
                :isReadOnly="isRatingReadOnly"
                isListView="list"
              />
            </div>
          </div>
          <div class="q-mt-sm text-dimGrey word-break-break-word">
            {{
              requestFrom == 'blooprint'
                ? review.attributes.blooprintReview
                : review.attributes.authorReview
            }}
          </div>
          <q-separator class="full-width q-mt-md" color="secondary" />
        </div>
        <div
          class="no-more-results-msg border-bottom-secondary text-body1 text-h5 text-center text-manatee"
          v-if="noMoreResults && reviewList.length != 0"
        >
          <span class="bg-whiteSmoke q-px-sm">No more results</span>
        </div>
      </q-infinite-scroll>
    </div>
    <!-- ******************** Rating and Review Popup *********************************** -->
    <q-dialog
      maximized
      no-esc-dismiss
      no-backdrop-dismiss
      v-model="reviewPopup"
    >
      <Rating
        :reviewSelected="reviewSelected"
        @rating-close="onEditReviewClose"
        ratingType="edit"
        requestFrom="mobile"
      />
    </q-dialog>
  </q-page>
</template>
<script>
import Header from 'components/Header.vue'
import NoDataMessageDisplay from 'components/Desktop/NoDataMessageDisplay.vue'
import { mapActions, mapGetters } from 'vuex'
import RatingIcon from 'components/RatingIcon.vue'
import Rating from './Rating.vue'
import { getDateFormat, formatDateToRespectiveTimeZone } from '../utils/common'

const REVIEW_SHOW_LIMIT = 10

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      reviewPopup: false,
      loading: true,
      isRatingReadOnly: true,
      reviewList: [],
      reviewSelected: {},
      isLoggedInUser: false,
      noMoreResults: false,
      requestFrom: '',
      blooprintDetails: {},
      backNavigateUrl: '',
      showHeader: false,
      loggedInUserId: '',
      totalReviewCount: 0
    }
  },
  components: {
    Header,
    NoDataMessageDisplay,
    RatingIcon,
    Rating
  },
  computed: {
    ...mapGetters(['loggedInUserData'])
  },
  mounted() {
    this.getBlooprintDetails()
    let currentRoute = this.$router.history.current.path
    if (currentRoute.includes('profiles')) {
      this.showHeader = true
      this.backNavigateUrl = `/profiles/${this.$router.history.current.params.profileId}/view`
    } else if (currentRoute.startsWith('/mobile/blooprints')) {
      this.showHeader = true
      this.backNavigateUrl = `/mobile/blooprints/${this.$router.history.current.params.blooprintId}`
    }
    if (this.$router.history.current.params.profileId) {
      this.isLoggedInUser =
        this.$store.getters.userId ==
        this.$router.history.current.params.profileId
    }
    this.loggedInUserId = this.$store.getters.userId
  },
  updated() {
    this.loggedInUserId = this.$store.getters.userId
  },
  methods: {
    ...mapActions(['fetchReviewsList', 'getBlooprintDetailsById']),
    getFormattedDate(value) {
      if (
        this.loggedInUserData['timeZone'] &&
        this.loggedInUserData['timeZone'] != ''
      ) {
        return getDateFormat(
          formatDateToRespectiveTimeZone(
            value,
            this.loggedInUserData['timeZone']
          )
        )
      } else {
        return getDateFormat(value)
      }
    },
    // ************* Method to fetch the Reviews List ***************************
    async getReviewList(params) {
      this.loading = true
      let list = await this.fetchReviewsList(params)
      this.loading = false
      if (list && list['data']) {
        this.reviewList = list['data']
      }
      if (list && list['meta']) {
        this.totalReviewCount = list['meta']['count']
      }
    },
    async getBlooprintDetails() {
      let blooprintId = this.$router.history.current.params.blooprintId
      let params = {}
      if (blooprintId) {
        this.requestFrom = 'blooprint'
        let blooprintDetails = await this.getBlooprintDetailsById()
        this.blooprintDetails = blooprintDetails
        if (blooprintDetails['id']) {
          params = {
            limit: REVIEW_SHOW_LIMIT,
            offset: 0,
            blooprintID: this.$router.history.current.params.blooprintId
          }
          this.getReviewList(params)
        }
      } else {
        this.requestFrom = 'userProfile'
        params = {
          limit: REVIEW_SHOW_LIMIT,
          offset: 0,
          authorID: this.$router.history.current.params.profileId
        }
        this.getReviewList(params)
      }
    },
    onEditReviewClick(review) {
      this.reviewPopup = true
      this.reviewSelected = review
    },
    onEditReviewClose(event) {
      this.reviewPopup = false
      this.reviewSelected = {}
      if (event) {
        this.reviewList = []
        this.getBlooprintDetails()
        this.noMoreResults = false
      }
    },
    // ************ On Scroll Pagination Load More Reviews *****************************
    async loadMoreRecords(index, done) {
      let reviewsLengthBeforeLoad = this.reviewList.length
      let params = {
        limit: REVIEW_SHOW_LIMIT,
        offset: index * REVIEW_SHOW_LIMIT
      }
      if (this.requestFrom == 'blooprint') {
        params['blooprintID'] = this.$router.history.current.params.blooprintId
      } else if (this.requestFrom == 'userProfile') {
        params['authorID'] = this.$router.history.current.params.profileId
      }

      if (this.reviewList.length >= REVIEW_SHOW_LIMIT) {
        let list = await this.fetchReviewsList(params)
        if (list && list['data']) {
          this.reviewList = this.reviewList.concat(list['data'])
        }
        if (list && list['meta']) {
          this.totalReviewCount = list['meta']['count']
        }
      }
      let reviewsListLengthAfterLoad = this.reviewList.length
      if (
        reviewsLengthBeforeLoad == reviewsListLengthAfterLoad ||
        reviewsListLengthAfterLoad - reviewsLengthBeforeLoad < REVIEW_SHOW_LIMIT
      ) {
        if (reviewsLengthBeforeLoad > 0) {
          this.noMoreResults = true
        }
        this.$refs.infiniteScroll.stop()
      }
      done()
    }
  }
}
</script>
<style lang="scss" scoped></style>
