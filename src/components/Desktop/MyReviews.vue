<template>
  <div class="full-width full-height main-container">
    <label class="my-review-heading">
      <img src="../../assets/review-blue.svg" class="lt-md review-icon" />
      My Reviews</label
    >
    <!-- ******************** skeleton ******************** -->
    <div v-if="isLoading">
      <div
        v-for="i in 2"
        :key="i"
        style="border-bottom: 1px solid #B9BCC6 !important; padding-top: 40px !important"
        :style="i === 1 ? 'padding-top:30px !important' : ''"
      >
        <div class="">
          <q-skeleton type="text" width="300px" height="30px"></q-skeleton>
        </div>
        <div class="flex">
          <q-skeleton type="QAvatar" size="20px" class="q-mr-sm"></q-skeleton>
          <q-skeleton type="text" width="100px" class="q-mr-sm"></q-skeleton>
          <q-skeleton type="text" width="100px"></q-skeleton>
        </div>
        <div class="q-mt-md">
          <q-skeleton type="text" width="50%" height="40px"></q-skeleton>
          <q-skeleton type="text" width="100%"></q-skeleton>
          <q-skeleton type="text" width="100%"></q-skeleton>
          <q-skeleton type="text" width="100%"></q-skeleton>
        </div>
        <div style="margin: 16px 0px 0px">
          <q-skeleton type="text" width="100px" height="30px"></q-skeleton>
        </div>
        <div style="margin-bottom: 16px">
          <q-skeleton type="text" width="70px" height="50px"></q-skeleton>
        </div>
      </div>
    </div>
    <div v-if="reviewList.length > 0" class="row review-container" style="">
      <div
        v-for="(review, index) in reviewList"
        :key="review.id"
        class="col-12 relative-position"
        style="border-bottom: 1px solid #B9BCC6 !important; padding-top: 40px !important"
        :style="index === 0 ? 'padding-top: 0px !important' : ''"
      >
        <q-btn-dropdown
          dropdown-icon="more_vert"
          flat
          no-icon-animation
          dense
          auto-close
          unelevated
          padding="none"
          fab-mini
          :ripple="false"
          :menu-offset="[-11, 15]"
          class="btn-drop-down text-black"
          content-style="border-radius:8px; box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05);"
        >
          <q-list class="list">
            <q-item
              clickable
              style="min-height:auto"
              @click="onClickEdit(review)"
            >
              <div class="row items-center" style="margin:2px 0px">
                <q-icon
                  name="img:edit-icon.svg"
                  style="margin-right: 13.26px"
                  size="16px"
                />
                <div class="label-text text-regalBlue">Edit</div>
              </div>
            </q-item>

            <q-item
              clickable
              style="min-height:auto"
              @click="onClickDelete(review)"
            >
              <div class="row items-center" style="margin:2px 0px">
                <q-icon
                  name="img:delete-icon.svg"
                  style="margin-right: 14px;"
                  size="16px"
                />
                <div class="label-text text-regalBlue">Delete</div>
              </div>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <label
          class="blooprint-title q-mb-xs cursor-pointer"
          @click="
            $router.push(`my-blooprints/${review['attributes']['blooprintID']}`)
          "
        >
          {{ review['attributes']['blooprintName'] }}
        </label>
        <div class="flex no-wrap">
          <q-avatar size="24px" class="q-mr-sm">
            <img
              :src="
                review['attributes']['authorPicture']
                  ? review['attributes']['authorPicture']
                  : defaultPicture
              "
            />
          </q-avatar>
          <label
            @click="$router.push(`/author/${review['attributes']['authorID']}`)"
            class="author-name cursor-pointer"
            >{{ review['attributes']['authorName'] }}</label
          >
        </div>
        <label class="review-title">{{
          review['attributes']['blooprintReviewTitle']
        }}</label>
        <label class="blooprint-review">
          {{ review['attributes']['blooprintReviewDescription'] }}
        </label>
        <label class="date">
          {{ getDateDiff(review['attributes']['createdDate']) }}
          <q-tooltip anchor="bottom start" self="bottom start">
            <div class="word-break-break-word">
              {{ getReviewDate(review['attributes']['createdDate']) }}
            </div>
          </q-tooltip>
        </label>
        <div class="flex" style="margin: 16px 0px !important">
          <q-rating
            :value="5"
            max="1"
            size="20px"
            class="text-selectiveYellow review-icon"
            style="margin-right: 10px !important"
            icon-selected="img:FullStar.svg"
            icon-half="img:HalfStar.svg"
            icon="img:NoStar.svg"
            readonly
          />
          <label class="rating q-mt-xs">
            {{ review['attributes']['blooprintRating'].toFixed(1) }}
            <q-space style="width:2px" />
            <span
              class="text-manateeGrey f-w-600"
              style="font-size: 12px;line-height: 20px;padding-top:2px"
            >
              /
            </span>
            <q-space style="width:2px" />
            <span
              class="text-manateeGrey f-w-600"
              style="font-size: 12px;line-height: 20px;padding-top:2px"
              >5
            </span>
          </label>
        </div>
      </div>

      <div class="flex flex-center full-width">
        <div
          class="text-body1  text-center text-manatee"
          style="margin-top: 40px"
          v-if="reviewList.length == totalReviewCount && reviewList.length != 0"
        >
          <span class="">No more reviews</span>
        </div>
        <q-btn
          v-if="reviewList.length < totalReviewCount && !showSpinner"
          color="primary"
          class="text-body1 see-more-btn"
          no-caps
          label="See more"
          @click="loadMoreRecords"
        />
        <q-spinner-ios
          v-if="showSpinner"
          class="items-center"
          color="primary"
          size="50px"
          style="margin-top: 40px !important"
        />
      </div>
    </div>
    <!-- edit popup start -->
    <div>
      <q-dialog
        persistent
        v-model="showEditPopup"
        :maximized="maximizePopup"
        @hide="clearFormData"
      >
        <q-card
          class="edit-popup text-center"
          style="max-width:658px; width:658px"
        >
          <div align="right" class="close-icon">
            <q-btn
              icon="close"
              flat
              round
              dense
              style="color: #152141"
              v-close-popup
            />
          </div>
          <div class="scroll-area">
            <div class="title text-regalBlue">
              Edit Review
            </div>
            <div class="blooprint-name text-regalBlue ellipsis-2-lines">
              {{ blooprintName }}
            </div>
            <div class="rating-text text-regalBlue">
              blooprint rating
            </div>
            <div
              class="text-center q-mt-sm rating-icons q-ml-sm flex items-center justify-center"
            >
              <q-rating
                v-model="reviewData.blooprintRating"
                color="regalBlue"
                class="edit-review-icons"
                icon-selected="img:FullStar.svg"
                icon-half="img:HalfStar.svg"
                icon="img:StarBorder.svg"
                no-dimming
              />
            </div>
            <div class="q-mt-lg row justify-center">
              <q-form
                style="width:432px"
                class="q-px-sm text-left"
                ref="reviewForm"
                @submit="validateReviewForm"
              >
                <label class="f-w-600 text-body1 text-regalBlue">
                  Review title
                </label>
                <q-input
                  borderless
                  v-model.trim="reviewData.blooprintReviewTitle"
                  placeholder="Title your review"
                  ref="reviewTitle"
                  class="border-input-field q-mt-xs q-mb-md q-pb-none text-regalBlue review-input-padding"
                  maxlength="100"
                  style="height: 44px;"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Review title is required'
                  ]"
                />
                <label class="f-w-600 text-body1 text-regalBlue">
                  Tell us what you thought of the blooprint
                </label>
                <q-input
                  borderless
                  v-model.trim="reviewData.blooprintReviewDescription"
                  placeholder="Write a review"
                  ref="reviewDesc"
                  counter
                  type="textarea"
                  class="border-input-field q-mt-xs q-mb-lg q-pb-none text-regalBlue review-input-padding"
                  maxlength="500"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Review is required'
                  ]"
                />
                <div class="row reverse-wrap action-buttons">
                  <q-btn
                    unelevated
                    color="white"
                    :label="'Cancel'"
                    v-close-popup
                    size="md"
                    no-caps
                    class="f-w-600 text-body1 flat cancel-btn  q-mr-sm"
                  />
                  <q-btn
                    unelevated
                    color="primary"
                    :label="'Update Review'"
                    type="submit"
                    size="md"
                    no-caps
                    no-wrap
                    class="f-w-600 text-body1 flat submit-btn text-white q-ml-sm"
                  />
                </div>
              </q-form>
            </div>
          </div>
        </q-card>
      </q-dialog>
    </div>
    <!-- edit popup end -->
    <!-- delete popup start -->
    <div>
      <q-dialog persistent v-model="showDeletePopup">
        <q-card class="delete-popup text-left">
          <div align="right">
            <q-btn
              icon="close"
              flat
              round
              dense
              style="color: #152141"
              v-close-popup
            />
          </div>
          <div class="title text-regalBlue">
            Delete Review
          </div>
          <div class="q-mt-xl text-regalBlue confirmation-text">
            We love to hear your feedback, are you sure you want to delete your
            review?.
          </div>
          <div class="row reverse-wrap action-buttons">
            <q-btn
              unelevated
              color="white"
              :label="'Cancel'"
              v-close-popup
              size="md"
              no-caps
              class="f-w-600 text-body1 flat cancel-btn q-mr-sm"
            />
            <q-btn
              @click="deleteReview()"
              unelevated
              style="background:#F04438"
              :label="'Yes, Delete Review'"
              type="submit"
              size="md"
              no-caps
              no-wrap
              class="f-w-600 text-body1 flat update-btn text-white q-ml-sm"
            />
          </div>
        </q-card>
      </q-dialog>
    </div>
    <!-- delete popup end -->
    <div
      v-if="reviewList.length === 0 && !isLoading"
      class="flex flex-center full-width q-py-xl q-px-md"
      style=""
    >
      <NoDataMessageDisplay
        style="margin: auto !important; color: black !important"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NoDataMessageDisplay from './NoDataMessageDisplay.vue'
import moment from 'moment'
import {
  getDateFormat,
  formatDateToRespectiveTimeZone,
  formatReviewDateToRespectiveTimeZone
} from '../../utils/common'
export default {
  name: 'MyReviews',
  components: { NoDataMessageDisplay },
  data() {
    return {
      reviewList: [],
      isLoading: true,
      totalReviewCount: 0,
      showSpinner: false,
      defaultPicture: require('../../assets/ProfileIcon.svg'),
      showEditPopup: false,
      showDeletePopup: false,
      reviewData: {
        blooprintRating: 0,
        blooprintReviewTitle: '',
        blooprintReviewDescription: ''
      },
      blooprintID: '',
      blooprintName: '',
      existingReviewDetails: {},
      reviewForDelete: ''
    }
  },
  computed: {
    ...mapGetters(['userProfile']),
    maximizePopup() {
      return window.innerWidth > 600 ? false : true
    }
  },
  methods: {
    ...mapActions([
      'fetchReviewsList',
      'updateReviewAndRating',
      'setToastMessage',
      'deleteReviewById',
      'fetchLoggedInUserDetails'
    ]),
    getReviewDate(val) {
      let reviewDate = formatDateToRespectiveTimeZone(
        val,
        this.userProfile['timeZone']
      )
      return reviewDate
    },
    getDateDiff(value) {
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
    },
    async loadMoreRecords() {
      this.showSpinner = true
      const param = {
        customerID: this.userProfile.id,
        offset: this.reviewList.length,
        limit: 10
      }
      const data = await this.fetchReviewsList(param)
      this.reviewList = this.reviewList.concat(data.data)
      this.totalReviewCount = data.meta.count
      this.showSpinner = false
    },
    async getReviewList(param) {
      const data = await this.fetchReviewsList(param)
      this.reviewList = data.data
      this.totalReviewCount = data.meta.count
    },
    onClickDelete(review) {
      this.showDeletePopup = true
      this.reviewForDelete = review.id
    },
    onClickEdit(review) {
      this.showEditPopup = true
      this.blooprintID = review.attributes.blooprintID
      this.blooprintName = review.attributes.blooprintName
      let params = {
        blooprintID: review.attributes.blooprintID,
        authorID: review.attributes.authorID,
        customerID: review.attributes.customerID
      }
      this.getReviewDetails(params)
    },
    clearFormData() {
      this.reviewData = {
        blooprintRating: 0,
        blooprintReviewTitle: '',
        blooprintReviewDescription: ''
      }
    },
    validateReviewForm() {
      this.$refs.reviewDesc.validate()
      this.$refs.reviewTitle.validate()
      if (this.reviewData['blooprintRating'] > 0) {
        this.$refs.reviewForm.validate().then(res => {
          if (res) {
            this.updateReviewRating()
          }
        })
      } else {
        this.setToastMessage({
          type: 'negative',
          message: 'Please provide the rating'
        })
      }
    },

    //**************Delete review ************/
    async deleteReview() {
      await this.deleteReviewById(this.reviewForDelete)
      this.getReviewList({ customerID: this.userProfile.id })
      this.showDeletePopup = false
    },
    // *************** Triggers the Update API when when data is valid ****************************
    async updateReviewRating() {
      let params = {
        data: {
          type: 'reviews',
          attributes: {
            blooprintID: this.blooprintID,
            ...this.reviewData
          }
        },
        reviewId: this.existingReviewDetails['id']
      }
      await this.updateReviewAndRating(params)
      this.getReviewList({ customerID: this.userProfile.id })
      this.showEditPopup = false
    },
    // ****************** Method to get the Review List ***************************
    async getReviewDetails(params) {
      let data = await this.fetchReviewsList(params)
      if (data && data['data'].length > 0) {
        this.existingReviewDetails = data['data'][0]
        this.reviewData['blooprintRating'] = this.existingReviewDetails[
          'attributes'
        ]['blooprintRating']

        this.reviewData['blooprintReviewTitle'] = this.existingReviewDetails[
          'attributes'
        ]['blooprintReviewTitle']
        this.reviewData[
          'blooprintReviewDescription'
        ] = this.existingReviewDetails['attributes'][
          'blooprintReviewDescription'
        ]
      }
    }
  },
  async mounted() {
    if (this.userProfile.id) {
      this.isLoading = true
      await this.getReviewList({ customerID: this.userProfile.id })
      this.isLoading = false
    } else {
      this.isLoading = true
      await this.fetchLoggedInUserDetails()
      await this.getReviewList({ customerID: this.userProfile.id })
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.my-review-heading {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: center;
  color: #152141;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 24px;
    padding-top: 30px !important;
    color: #000000 !important;
  }
}
.review-icon {
  width: 24px !important;
  height: 24px !important;
  margin-right: 10px !important;
  margin-left: 0px !important;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: $secondary;
  border-radius: 10px;
}
.blooprint-title {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: inline-block;
  align-items: center;
  color: #152141;
  word-break: break-word !important;
  max-width: 92% !important;

  @media only screen and (max-width: $breakpoint-xs-max) {
    max-width: 80% !important;
  }
}
.author-name {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: #5b647a;
  word-break: break-word !important;
}
.review-title {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  display: flex;
  align-items: center;
  color: #152141;
  margin: 24px 0px 8px !important;
  word-break: break-word !important;
}
.blooprint-review {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #152141;
  word-break: break-word !important;
}
.date {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500 !important;
  font-size: 14px !important;
  line-height: 20px !important;
  display: flex;
  align-items: center;
  color: #5b647a;
  margin-top: 16px !important;
  max-width: fit-content !important;
}
.rating-icons {
  height: 35px;
}
.rating {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: #5b647a;
}
.review-container {
  margin-top: 20px !important;

  @media only screen and (min-width: $breakpoint-sm-max) {
    max-height: 90vh !important;
    overflow-y: auto !important;
    margin-top: 30px !important;
    padding-right: 20px !important;
  }
}
.main-container {
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 0px 15px 40px !important;
    background: #ffffff !important;
  }
}
.see-more-btn {
  width: 220px;
  height: 50px;
  border-radius: 10px;
  font-weight: 600;
  margin-top: 40px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-weight: normal;
    margin-top: 20px;
    margin-bottom: 20px !important;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-weight: normal;
    margin-top: 20px;
  }
}
.btn-drop-down {
  position: absolute;
  right: 11px;
}
.list {
  width: 148px;
  .q-item {
    border-top: 1px solid #f2f4f7;
    .label-text {
      font-weight: normal;
      font-size: 14px;
      line-height: 20px !important;
    }
  }
}
.delete-popup {
  width: 545px;
  border-radius: 20px;
  padding: 26.41px 30px 30px 30px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  .title {
    font-weight: 600;
    font-size: 32px;
    line-height: 36px;
  }
  .confirmation-text {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
  .action-buttons {
    margin-top: 60px;
    justify-content: space-between;
    @media only screen and (max-width: 467px) {
      justify-content: center;
    }
  }
  .cancel-btn {
    @media only screen and (max-width: 467px) {
      margin-top: 16px;
      width: 100%;
      margin-right: 0px;
    }
  }
  .update-btn {
    @media only screen and (max-width: 467px) {
      width: 100%;
      margin: 0px;
    }
  }
  &::-webkit-scrollbar-track {
    margin: 30px 0px;
  }
}
.edit-popup {
  border-radius: 20px;
  padding: 20px 20px 60px 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  // scrollbar-width: thin !important;
  .title {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
  }
  .blooprint-name {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    margin-top: 8px;
  }
  .rating-text {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    margin-top: 20px;
  }
  .action-buttons {
    justify-content: space-between;
    @media only screen and (max-width: 467px) {
      justify-content: center;
    }
  }
  .cancel-btn {
    @media only screen and (max-width: 467px) {
      margin-top: 16px;
      width: 100%;
      margin-right: 0px;
    }
  }
  .submit-btn {
    @media only screen and (max-width: 467px) {
      width: 100%;
      margin: 0px;
    }
  }
  &::-webkit-scrollbar-track {
    margin: 30px 0px;
  }
  .scroll-area {
    @media only screen and (min-width: 1024px) {
      max-height: 75vh !important;
      overflow-y: auto !important;
    }
    @media only screen and (min-width: 601px) and (max-width: 1023px) {
      max-height: 80vh !important;
      overflow-y: auto !important;
    }
    @media only screen and (max-width: $breakpoint-md-max) {
      padding-bottom: 30px !important;
    }
    @media only screen and (max-width: $breakpoint-sm-max) {
      padding-bottom: 0px !important;
    }
    &::-webkit-scrollbar-track {
      margin-bottom: 20px;
    }
  }
  @media only screen and (min-width: 601px) {
    overflow-y: hidden !important;
    padding-right: 0px !important;
  }
  .close-icon {
    @media only screen and (min-width: 601px) {
      padding-right: 20px !important;
    }
  }
}

::v-deep {
  .submit-btn {
    height: 50px;
    width: 182px;
    border-radius: 10px;
    .q-btn__wrapper {
      padding: 13px 30px !important;
    }
    .q-btn__content {
      font-size: 16px;
      line-height: 24px;
    }
  }
  .update-btn {
    height: 50px;
    width: 210px;
    border-radius: 10px;
    .q-btn__wrapper {
      padding: 13px 30px !important;
    }
    .q-btn__content {
      font-size: 16px;
      line-height: 24px;
    }
  }
  .cancel-btn {
    height: 50px;
    width: 118px;
    border: 2px solid #d0d5dd;
    border-radius: 10px;
    .q-btn__wrapper {
      padding: 13px 30px !important;
    }
    .q-btn__content {
      font-size: 16px;
      line-height: 24px;
      color: #344054;
    }
  }
  .q-rating__icon + .q-rating__icon {
    margin-left: 4px;
  }
  .edit-review-icons {
    .q-rating__icon {
      width: 30px;
      height: 30px;
    }
    .q-rating__icon--active {
      width: 34px;
      height: 34px;
    }
    .q-rating__icon {
      margin-right: 7px;
      margin-left: 0px;
    }

    .q-rating__icon--active {
      margin-right: 4px;
      margin-left: 0px;
    }
  }
  .review-input-padding {
    padding: 0px 14px;
    .q-field__native {
      font-weight: 500 !important;
      font-size: 16px !important;
      line-height: 24px !important;
    }
    .q-field__messages {
      font-weight: 500 !important;
    }
  }
  .q-textarea .q-field__native {
    padding-top: 10px !important;
  }
}
</style>
