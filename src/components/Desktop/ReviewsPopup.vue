<template>
  <q-card
    style="max-width: 1500px; width: 658px"
    class="reviews-popup bg-white relative-position"
  >
    <q-icon
      name="clear"
      class="text-regalBlue cursor-pointer cross-icon"
      size="30px"
      style=""
      v-close-popup
    />
    <div class="row">
      <div class="col-12 heading">Reviews</div>
      <div class="col-12" style="padding: 0px 30px !important" v-if="loading">
        <div v-for="i in 3" class="full-width review-container" :key="i">
          <div class="row items-center">
            <q-skeleton type="QAvatar" size="24px" />
            <q-skeleton class="q-ml-sm" height="12px" width="120px" />
          </div>
          <div class="review-title text-regalBlue">
            <q-skeleton height="12px" width="120px" />
          </div>
          <div class="text-regalBlue q-mt-md review-description">
            <q-skeleton height="12px" class="q-mt-xs" width="170px" />
            <q-skeleton height="12px" class="q-mt-xs" width="170px" />
          </div>
          <div class="q-mt-md text-comet reviewer-name">
            <q-skeleton height="12px" width="120px" />
          </div>
          <div class="q-mt-md">
            <q-skeleton height="20px" width="70px" />
          </div>
        </div>
      </div>
      <div
        ref="scrollTargetRef"
        class="relative-position col-12  scroll-container"
      >
        <q-infinite-scroll
          @load="loadMoreRecords"
          :offset="700"
          ref="infiniteScroll"
          :scroll-target="$refs.scrollTargetRef"
        >
          <!-- <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template> -->
          <div
            class="review-container"
            v-for="(review, i) in reviewList"
            :key="i"
          >
            <div class="row items-center">
              <q-avatar size="24px">
                <img
                  :src="
                    review.attributes.customerPicture
                      ? review.attributes.customerPicture
                      : 'UserImage.svg'
                  "
                />
              </q-avatar>
              <div
                class="
                  q-ml-sm
                  text-comet
                  reviewer-name
                  word-break-break-word
                "
                style="max-width: 180px"
              >
                {{ review.attributes.customerName }}
              </div>
            </div>
            <div class="review-title text-regalBlue word-break-break-word">
              {{ review.attributes.blooprintReviewTitle }}
            </div>
            <div
              class="text-regalBlue review-description word-break-break-word"
            >
              {{ review.attributes.blooprintReviewDescription }}
            </div>
            <div
              class="q-mt-md text-comet reviewer-name cursor-pointer"
              style="max-width: fit-content !important"
            >
              {{ getDays(review.attributes.createdDate) }}
              <q-tooltip anchor="bottom start" self="bottom start">
                <div class="word-break-break-word">
                  {{ getReviewDate(review['attributes']['createdDate']) }}
                </div>
              </q-tooltip>
            </div>
            <div class="q-mt-md">
              <q-badge
                outline
                align="middle"
                class="text-solitude"
                style="
                  border-radius: 8px;
                  padding: 8px 12px 8px 8px;
                  border: 2px solid #e8e9ec;
                "
              >
                <q-rating
                  :value="5"
                  max="1"
                  icon-selected="img:FullStar.svg"
                  icon-half="img:HalfStar.svg"
                  icon="img:NoStar.svg"
                  readonly
                />
                <span
                  class="f-w-600 text-regalBlue q-ml-sm gt-sm"
                  style="line-height: 20px; font-size: 15px"
                >
                  {{ review.attributes.blooprintRating.toFixed(1) }}
                </span>
                <span
                  class="f-w-600 text-regalBlue lt-md"
                  style="line-height: 20px; font-size: 15px; margin-left: 10px"
                >
                  {{ review.attributes.blooprintRating.toFixed(1) }}
                </span>
                <q-space style="width: 2px" />
                <span
                  class="text-body2 text-manateeGrey f-w-600"
                  style="line-height: 20px"
                >
                  /
                </span>
                <q-space style="width: 2px" />
                <span
                  class="text-manateeGrey f-w-600"
                  style="font-size: 12px; line-height: 20px; padding-top: 2px"
                  >5
                </span>
              </q-badge>
            </div>
          </div>
        </q-infinite-scroll>
        <div
          class="text-body1 q-my-md text-center text-manatee"
          v-if="
            !(reviewList.length < totalReviewCount) && reviewList.length != 0
          "
        >
          <span class="q-mb-lg q-pb-xs-md">No more reviews</span>
        </div>
      </div>
    </div>
  </q-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import {
  getDateFormat,
  formatDateToRespectiveTimeZone,
  formatReviewDateToRespectiveTimeZone
} from '../../utils/common'
import moment from 'moment-timezone'
const REVIEW_SHOW_LIMIT = 10
export default {
  data() {
    return {
      noMoreResults: false,
      reviewList: [],
      loading: true,
      blooprintReviewsList: [],
      totalReviewCount: 0
    }
  },
  computed: {
    ...mapGetters(['userProfile'])
  },
  mounted() {
    this.getReviewList()
  },
  methods: {
    ...mapActions(['fetchReviewsList']),
    getReviewDate(val) {
      if (this.userProfile['timeZone'] && this.userProfile['timeZone'] != '') {
        let reviewDate = formatDateToRespectiveTimeZone(
          val,
          this.userProfile['timeZone']
        )
        return reviewDate
      } else {
        return getDateFormat(val)
      }
    },
    getDays(value) {
      if (this.userProfile['timeZone'] && this.userProfile['timeZone'] != '') {
        let date = new Date(
          moment(
            formatReviewDateToRespectiveTimeZone(
              value,
              this.userProfile['timeZone']
            ),
            'MM-DD-YYYY HH:mm'
          ).format('YYYY-MM-DD HH:mm')
        )
        let currentDate = new Date(
          moment(
            formatReviewDateToRespectiveTimeZone(
              new Date(),
              this.userProfile['timeZone']
            ),
            'MM-DD-YYYY HH:mm'
          ).format('YYYY-MM-DD HH:mm')
        )
        let diff = currentDate - date
        var diffDays = parseInt(diff / (1000 * 60 * 60 * 24), 10)
        let diffMonths = 0
        let diffYears = 0
        let diffMinutes = parseInt(diff / (1000 * 60))
        let diffHours = 0
        if (diffDays > 30 && diffDays < 365) {
          diffMonths = Math.floor(diffDays / 30)
          return diffMonths > 1
            ? `${diffMonths} months ago`
            : `${diffMonths} month ago`
        } else if (diffDays >= 365) {
          diffYears = Math.floor(diffDays / 365)
          return diffYears > 1
            ? `${diffYears} years ago`
            : `${diffYears} year ago`
        } else if (diffDays >= 1) {
          return diffDays > 1 ? `${diffDays} days ago` : `${diffDays} day ago`
        } else if (diffMinutes > 59) {
          diffHours = Math.floor(diffMinutes / 60)
          return diffHours > 1
            ? `${diffHours} hours ago`
            : `${diffHours} hour ago`
        } else if (diffMinutes > 1) {
          return `${diffMinutes} minutes ago`
        } else {
          return diffMinutes > 0 ? `${diffMinutes} minute ago` : 'just now'
        }
      } else {
        return getDateFormat(value)
      }
    },
    // ************* Method to fetch the Reviews List ***************************
    async getReviewList() {
      let params = {
        limit: REVIEW_SHOW_LIMIT,
        offset: 0,
        blooprintID: this.$router.history.current.params.blooprintId
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
<style lang="scss" scoped>
.reviews-popup {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  overflow: hidden;
  .heading {
    margin-top: 60px;
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 32px;
    line-height: 36px;
    margin-left: 30px;
    margin-right: 30px;
  }
  .review-container {
    border: 1px solid #e8e9ec;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    padding: 24px;
    margin-left: 30px;
    margin-right: 23px;
    margin-bottom: 20px;
  }
  .reviewer-name {
    font-weight: 500;
    font-size: 14px;
    font-style: normal;
    line-height: 20px;
  }
  .review-title {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    margin-top: 16px;
  }
  .review-description {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin-top: 8px;
  }
  .cross-icon {
    position: absolute;
    top: 37.5px;
    right: 37.5px;
    @media only screen and (max-width: $breakpoint-xs) {
      top: 25px;
      right: 25px;
    }
  }
}
.scroll-container {
  overflow: auto;
  max-height: 70vh;
  width: 100%;
  padding-bottom: 20px !important;
  @media only screen and (max-width: 600px) {
    max-height: 85vh;
  }
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: $secondary;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  margin-bottom: 30px;
}
::v-deep {
  .q-rating__icon {
    width: 25px;
    height: 23.77px;
  }
  .q-rating__icon + .q-rating__icon {
    margin-left: 9px;
  }
}
</style>
