<template>
  <q-page>
    <div
      v-if="blooprintName"
      class="q-ma-md-xl q-ma-sm-lg q-mx-xs-md q-my-xs-xl text-h5 text-nightRider text-weight-medium word-break-break-word"
    >
      {{ blooprintName }}'s reviews
    </div>
    <div class="q-ma-md-xl q-ma-sm-lg q-mx-xs-md q-my-xs-xl" v-else>
      <q-skeleton class="col text-right" width="80%" />
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
      >
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
        <div
          class="q-mx-md-xl q-my-md-lg q-ma-sm-lg q-ma-xs-md "
          v-for="review in reviewList"
          :key="review.id"
        >
          <div class="row">
            <div class="text-grey">
              {{ getFormattedDate(review.attributes.createdDate) }}
            </div>
          </div>
          <!-- ************* Blooprint Review and Rating ******************************* -->
          <div class="row q-mt-sm" v-if="review.attributes.blooprintRating">
            <div
              class="col text-nightRider text-weight-bold text-body1 word-break-break-word"
            >
              {{ review.attributes.customerName }}
            </div>
            <div class="col text-right">
              <RatingIcon
                ratingClass="q-mb-xs"
                color="primary"
                :ratingValue="review.attributes.blooprintRating"
                iconSize="16px"
                :isReadOnly="isRatingReadOnly"
                isListView="list"
              />
            </div>
          </div>
          <div
            class="q-mt-sm text-dimGrey word-break-break-word"
            v-if="review.attributes.blooprintReview"
          >
            {{ review.attributes.blooprintReview }}
          </div>
          <q-separator class="full-width q-mt-md" color="secondary" />
        </div>
        <div
          class="no-more-results border-bottom-secondary text-body1 text-h5 text-center text-manatee"
          v-if="noMoreResults && reviewList.length != 0"
        >
          <span class="bg-whiteSmoke q-px-sm">No more results</span>
        </div>
      </q-infinite-scroll>
    </div>
  </q-page>
</template>
<script>
import NoDataMessageDisplay from 'components/Desktop/NoDataMessageDisplay.vue'
import { mapActions, mapGetters } from 'vuex'
import RatingIcon from 'components/RatingIcon.vue'
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
      loading: true,
      isRatingReadOnly: true,
      reviewList: [],
      isLoggedInUser: false,
      noMoreResults: false,
      requestFrom: '',
      blooprintName: '',
      backNavigateUrl: '',
      showHeader: false,
      loggedInUserId: '',
      totalReviewCount: 0
    }
  },
  components: {
    NoDataMessageDisplay,
    RatingIcon
  },
  mounted() {
    this.getReviewList()
  },
  computed: {
    ...mapGetters(['loggedInUserData'])
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
    async getReviewList() {
      let blooprintId = this.$router.history.current.params.blooprintId
      let blooprintDetails = await this.getBlooprintDetailsById()
      this.blooprintName = blooprintDetails['attributes']['name']
      var params = {
        limit: REVIEW_SHOW_LIMIT,
        offset: 0,
        blooprintID: blooprintId
      }
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

    // ************ On Scroll Pagination Load More Reviews *****************************
    async loadMoreRecords(index, done) {
      let reviewsLengthBeforeLoad = this.reviewList.length
      let params = {
        limit: REVIEW_SHOW_LIMIT,
        offset: index * REVIEW_SHOW_LIMIT,
        blooprintID: this.$router.history.current.params.blooprintId
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
<style lang="scss">
.no-more-results {
  width: 70%;
  margin: 25px auto;
  text-align: center;
  line-height: 0em;
}
</style>
