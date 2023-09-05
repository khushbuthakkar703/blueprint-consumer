<template>
  <q-card bordered class="card-style" style="border-radius: 20px">
    <q-card-section v-if="blooprintDetails.attributes">
      <div class="row items-center">
        <div v-if="blooprintDetails.attributes.categories.length">
          <div style="height: 32px; margin: 7px 30px 7px 0px;">
            <div
              class="category-name ellipsis text-body1 f-w-400 text-regalBlue"
            >
              {{ blooprintDetails.attributes.categories[0] }}
            </div>
          </div>
        </div>
        <div class="row no-wrap">
          <q-avatar size="2.5rem">
            <img
              contain
              v-if="
                authorDetails.picture != '' && authorDetails.picture != null
              "
              :src="authorDetails.picture"
            />
            <img v-else src="~assets/UserImage.svg" />
          </q-avatar>
          <div
            @click="navigateToAuthorScreen()"
            class="row items-center text-capitalize text-comet text-fs-14-lh-20 f-w-500 word-break-break-word ellipsis
                cursor-pointer author-name"
          >
            {{ blooprintDetails.attributes.authorName }}
            <q-tooltip anchor="bottom middle" self="top middle">
              <div class="word-break-break-word">
                {{ blooprintDetails.attributes.authorName }}
              </div>
            </q-tooltip>
          </div>
        </div>
      </div>
      <div class="f-w-600 blooprint-name text-regalBlue word-break-break-word">
        <span class="ellipsis-3-lines gt-sm">
          {{ blooprintDetails.attributes.name }}
        </span>
        <span class="ellipsis-2-lines lt-md">
          {{ blooprintDetails.attributes.name }}
        </span>
        <q-tooltip anchor="bottom middle" self="top middle">
          <div class="word-break-break-word">
            {{ blooprintDetails.attributes.name }}
          </div>
        </q-tooltip>
      </div>
      <div class="row" v-if="isRatingLoading || isReviewCountLoading">
        <q-skeleton type="QBtn" width="86px" />
        <q-skeleton type="QBtn" class="q-ml-md-xl q-ml-sm-lg q-ml-xs-md" />
      </div>
      <div class="row items-center" v-if="rating > 0">
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
            size="20px"
            class="text-selectiveYellow"
            icon-selected="img:FullStar.svg"
            icon-half="img:HalfStar.svg"
            icon="img:NoStar.svg"
            readonly
          />
          <span
            class="f-w-600 text-regalBlue q-ml-sm"
            style="line-height: 20px; font-size: 15px"
          >
            {{ rating.toFixed(1) }}
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
        <div
          class="text-primary cursor-pointer q-ml-md reviews-link"
          @click="onReviewsClick"
        >
          Reviews {{ ' (' + totalReviewCount + ')' }}
        </div>
      </div>
      <q-separator class="separator-style" />
      <div v-if="isMileStoneLoading">
        <q-skeleton type="QBadge" width="40%" />
        <q-skeleton type="text" class="q-my-sm" />
        <div class="row items-center justify-between no-wrap">
          <div class="col text-left">
            <q-skeleton type="QBadge" width="60%" />
          </div>
          <div class="row col justify-end">
            <q-skeleton type="QBadge" width="20%" />
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="!blooprintDetails.attributes.scheduled">
          <q-btn
            color="primary"
            label="Select a start date"
            class="full-width button-style f-w-600 text-white text-body1"
            no-caps
            @click="onStartDateClick"
          >
            <div class="text-white relative-position">
              <q-avatar class="calendar-icon-style q-ml-sm" size="24px">
                <img src="~assets/calendar.svg" />
              </q-avatar>
            </div>
          </q-btn>
        </div>
        <div
          v-if="
            blooprintDetails.attributes.scheduled &&
              blooprintMileStoneList.length > 0
          "
        >
          <div
            v-if="getCompletedMilestoneCount() != blooprintMileStoneList.length"
            class="f-w-500 text-body1 text-regalBlue"
          >
            Your progress
          </div>
          <div v-else class="f-w-500 text-body1 text-regalBlue">
            <q-icon
              size="1.5rem"
              name="task_alt"
              style="color: #039855;margin-right: 10px"
            />
            Complete. Great work!
          </div>
          <q-linear-progress
            track-color="solitudeBlue"
            size="10px"
            :value="fetchProgressValue()"
            class="progress-style"
            :class="
              getCompletedMilestoneCount() != blooprintMileStoneList.length
                ? 'text-primary'
                : 'text-shamrockGreen'
            "
          />
          <div class="row text-fs-14-lh-20 text-regalBlue f-w-500">
            <div class="col text-left">
              {{ getCompletedMilestoneCount() }} /
              {{ blooprintMileStoneList.length }}
              {{
                blooprintMileStoneList.length > 1 ? 'milestones' : 'milestone'
              }}
            </div>
            <div class="col text-right">
              {{
                (
                  (getCompletedMilestoneCount() /
                    blooprintMileStoneList.length) *
                  100
                ).toFixed(0)
              }}%
            </div>
          </div>
        </div>
        <div
          v-if="
            blooprintDetails.attributes.scheduled && !showLeaveReviewButton()
          "
        >
          <q-btn
            v-if="!isLoggedInUserReviewLoading"
            label="Reschedule blooprint"
            unelevated
            class="full-width leave-review-style bg-white text-primary f-w-600 text-body1"
            no-caps
            @click="onRescheduleClick()"
          />
        </div>
      </div>
      <div
        v-if="
          showLeaveReviewButton() &&
            !isReviewSubmitted &&
            blooprintMileStoneList.length != 0
        "
      >
        <q-btn
          v-if="!isLoggedInUserReviewLoading"
          label="Leave a Review"
          unelevated
          class="full-width gt-sm leave-review-style bg-white text-primary f-w-600 text-body1"
          no-caps
          @click="onLeaveReviewClick('desktop')"
        />
        <q-btn
          v-if="!isLoggedInUserReviewLoading"
          label="Leave a Review"
          unelevated
          class="full-width lt-md leave-review-style bg-white text-primary f-w-600 text-body1"
          no-caps
          @click="onLeaveReviewClick('mobile')"
        />
      </div>
      <q-separator class="separator-style" />
      <div class="row">
        <div class="row share-icon-margin cursor-pointer" @click="onShareClick">
          <q-avatar square class="q-mr-sm" size="sm">
            <img src="~assets/share-icon.svg" />
          </q-avatar>
          <div class="icon-text q-pt-xs f-w-600 text-regalBlue">
            Share
          </div>
        </div>
        <div
          class="row cursor-pointer"
          style="height: 24px;"
          @click="onAddToCalendarClick()"
          :class="
            blooprintDetails.attributes.scheduled
              ? 'cursor-pointer'
              : 'cursor-not-allowed'
          "
        >
          <q-avatar square class="q-mr-sm" size="sm">
            <img src="~assets/calendar-icon.svg" />
          </q-avatar>
          <div
            class="icon-text q-pt-xs f-w-600"
            :class="
              blooprintDetails.attributes.scheduled
                ? 'text-regalBlue'
                : 'text-manateeGrey'
            "
          >
            Add to calendar
          </div>
        </div>
      </div>
    </q-card-section>
    <!-- ******************** Schedule Blooprint Popup *********************************** -->
    <q-dialog persistent v-model="openSchedulePopup" :maximized="isMobile">
      <ScheduleBlooprintPopup
        requestFrom="desktop"
        :blooprintSelected="blooprintDetails"
        @schedule-popup-close="onSchedulePopupClose"
      />
    </q-dialog>
    <!-- ******************** Review Blooprint Popup *********************************** -->
    <q-dialog :maximized="isMobile" persistent v-model="showReviewsPopup">
      <ReviewsPopup />
    </q-dialog>
    <ShareBlooprintPopup
      v-if="showSharePopup"
      :shareURL="shareURL"
      @on-share-popup-close="onSharePopupClose"
    />
  </q-card>
</template>
<script>
import ScheduleBlooprintPopup from '../ScheduleBlooprintPopup.vue'
import ReviewsPopup from './ReviewsPopup.vue'
import ShareBlooprintPopup from './ShareBlooprintPopup.vue'

import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  props: [
    'authorDetails',
    'blooprintDetails',
    'totalReviewCount',
    'rating',
    'blooprintMileStoneList',
    'showReviewCreatePopup',
    'isReviewSubmitted',
    'isMileStoneLoading',
    'isRatingLoading',
    'isReviewCountLoading',
    'isLoggedInUserReviewLoading'
  ],
  data() {
    return {
      openSchedulePopup: false,
      showReviewsPopup: false,
      showSharePopup: false,
      shareURL: `${window.location.origin}/blooprints/${this.$route.params.blooprintId}`,
      isReschedulePopup: false
    }
  },
  components: {
    ScheduleBlooprintPopup,
    ReviewsPopup,
    ShareBlooprintPopup
  },
  computed: {
    isMobile() {
      return window.innerWidth < 601
    }
  },
  mounted() {
    this.$root.$on('BlooprintProgressinfoCard', () => {
      this.onStartDateClick()
    })
  },
  methods: {
    ...mapActions(['fetchCalendarIcsFile']),
    // ************** Navigate to Authors's Screen ***********************
    navigateToAuthorScreen() {
      this.$router.push({
        name: 'author-view',
        params: {
          profileId: this.authorDetails.id
        }
      })
    },
    // ************** Navigate to Blooprint reviews Screen ***********************
    onReviewsClick() {
      this.showReviewsPopup = this.totalReviewCount > 0
    },
    onStartDateClick() {
      this.openSchedulePopup = true
    },
    onRescheduleClick() {
      this.openSchedulePopup = true
      this.isReschedulePopup = true
    },
    onSchedulePopupClose(event) {
      if (event['isScheduled']) {
        this.blooprintDetails.attributes.scheduled = true
        if (this.isReschedulePopup) {
          this.$emit('is-popup-rescheduled', true)
        }
      }
      this.openSchedulePopup = false
      this.isReschedulePopup = false
    },
    onLeaveReviewClick(from) {
      this.$emit('create-review-popup-open', { requestFrom: from })
    },

    async onAddToCalendarClick() {
      if (this.blooprintDetails.attributes.scheduled) {
        let fileName = this.blooprintDetails.attributes.name
          .split(' ')
          .join('-')
        let data = await this.fetchCalendarIcsFile({
          blooprintId: this.$route.params['blooprintId']
        })
        axios({
          url: `${data['attributes']['message']}`,
          method: 'GET',
          responseType: 'arraybuffer'
        }).then(response => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], { type: 'text/calendar' })
          )
          var fileLink = document.createElement('a')

          fileLink.href = fileURL
          fileLink.setAttribute('download', `${fileName}--schedule.ics`)
          document.body.appendChild(fileLink)

          fileLink.click()
        })
      }
    },
    getCompletedMilestoneCount() {
      let count = 0
      if (this.blooprintMileStoneList) {
        this.blooprintMileStoneList.map(item => {
          if (item['isCompleted']) {
            count++
          }
        })
      }
      return count
    },
    onShareClick() {
      this.shareURL = `${window.location.origin}/blooprints/${this.$route.params.blooprintId}`
      this.showSharePopup = true
    },
    onSharePopupClose() {
      this.showSharePopup = false
    },
    fetchProgressValue() {
      if (this.blooprintMileStoneList.length > 0) {
        return (
          this.getCompletedMilestoneCount() / this.blooprintMileStoneList.length
        )
      } else {
        return 0
      }
    },
    showLeaveReviewButton() {
      if (
        this.blooprintMileStoneList &&
        this.blooprintMileStoneList.length > 0
      ) {
        return (
          this.getCompletedMilestoneCount() ==
          this.blooprintMileStoneList.length
        )
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.card-style {
  border-radius: 20px;
  box-shadow: 0px 10px 20px $shadow;
  @media only screen and (min-width: $breakpoint-md-min) {
    max-width: 432px;
  }
  .q-card__section--vert {
    padding: 30px !important;
    @media only screen and (max-width: $breakpoint-sm-max) {
      padding: 20px !important;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      padding: 20px !important;
    }
  }
}

.blooprint-name {
  font-size: 32px;
  line-height: 36px;
  margin: 20px 0px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 24px;
    line-height: 28px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 24px;
    line-height: 28px;
  }
}
.reviews-link {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  &:hover {
    text-decoration: underline;
  }
}
.separator-style {
  margin: 20px 0px;
  border: 2px solid #e8edf2;
}
.q-separator--horizontal {
  height: 0px !important;
}
::v-deep {
  .progress-style {
    margin: 10px 0px;
    border-radius: 100px;
    opacity: 1 !important;
    .q-linear-progress__track {
      opacity: 1 !important;
      transform: none !important;
    }
  }
}

.icon-text {
  font-size: 15px;
  line-height: 22px;
}
.share-icon-margin {
  margin-right: 40px;
  // width: 77px;
  height: 24px;
  @media only screen and (max-width: 359px) {
    margin-bottom: 15px;
  }
}
.category-name {
  padding: 4px 16px;
  background: #ccedff;
  border-radius: 7px;
  max-width: 370px;
  @media only screen and (max-width: 452px) {
    max-width: 70vw;
  }
}
.author-name {
  width: 140px;
  display: block;
  margin-left: 10px;
  margin-top: 10px;
  @media only screen and (max-width: 410px) {
    width: 100px;
  }
  @media only screen and (max-width: 380px) {
    width: 90px;
  }
  @media only screen and (max-width: 360px) {
    width: 87px;
  }
}
::v-deep {
  .button-style {
    border-radius: 10px;
    .q-btn__wrapper {
      padding: 10px 20px 10px 30px !important;
    }
  }
  .leave-review-style {
    border: 2px solid $primary;
    margin-top: 20px;
    border-radius: 10px;
    .q-btn__wrapper {
      padding: 10px 30px !important;
    }
  }
}
.calendar-icon-style {
  border-radius: initial !important;
}

::v-deep {
  .q-rating__icon + .q-rating__icon {
    margin-left: 4px;
  }
}
</style>
