<template>
  <q-dialog v-model="showReviewPopup" :maximized="isMobile" persistent>
    <q-card class="review-dialog-card">
      <div align="right" class="q-pr-lg">
        <q-btn
          icon="close"
          flat
          round
          dense
          @click="onPopupClose"
          style="color: #152141"
          v-close-popup
        />
      </div>
      <q-card-section class="scroll-area">
        <div class="text-center">
          <div style="color: #039855">
            <q-icon size="40px" name="task_alt" />
          </div>

          <div class="q-mt-20 f-w-600 text-fs-24-lh-32 text-regalBlue">
            Great work, <br class="lt-sm" />
            you’ve completed
          </div>
          <div
            class="
              q-mt-sm
              f-w-600
              text-fs-20-lh-28 text-regalBlue
              word-break-break-word
              ellipsis-2-lines
            "
          >
            {{ blooprintDetails.attributes.name }}
            <q-tooltip anchor="bottom middle" self="top middle">
              <div class="word-break-break-word">
                {{ blooprintDetails.attributes.name }}
              </div>
            </q-tooltip>
          </div>
          <div class="q-mt-20 f-w-600 text-body1 text-regalBlue">
            Rate the blooprint
          </div>
          <div
            class="text-center q-mt-sm rating-icons flex items-center q-ml-sm justify-center"
          >
            <q-rating
              v-model="reviewData.blooprintRating"
              icon-selected="img:FullStar.svg"
              icon-half="img:HalfStar.svg"
              icon="img:StarBorder.svg"
              no-dimming
            />
          </div>
        </div>

        <q-form
          class="
            q-mt-lg
            q-mx-md-xl
            q-mx-sm-lg
            q-mx-xs-sm
            q-px-md-xl
            q-px-sm-lg
            q-px-xs-sm
            review-form
          "
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
            class="
              border-input-field
              q-mt-xs q-mb-md q-pb-none
              text-regalBlue
              review-input-padding
            "
            maxlength="100"
            style="height: 44px"
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
            class="
              border-input-field
              q-mt-xs q-mb-lg q-pb-none
              text-regalBlue
              review-input-padding
            "
            maxlength="500"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Review is required']"
          />
          <q-btn
            unelevated
            color="primary"
            :label="
              existingReviewDetails && existingReviewDetails.id
                ? 'Update'
                : 'Submit'
            "
            type="submit"
            size="md"
            no-caps
            class="full-width f-w-600 text-body1 flat submit-btn text-white"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'CreateReviewPopup',
  props: ['blooprintDetails', 'requestFrom'],
  data() {
    return {
      showReviewPopup: true,
      reviewData: {
        blooprintRating: 0,
        blooprintReviewTitle: '',
        blooprintReviewDescription: ''
      },
      existingReviewDetails: {},
      isReviewSaved: false,
      isReviewEdit: false
    }
  },
  mounted() {
    this.getReviewDetails()
  },
  computed: {
    isMobile() {
      return window.innerWidth < 601
    }
  },
  methods: {
    ...mapActions([
      'saveReviewAndRating',
      'fetchReviewsList',
      'updateReviewAndRating',
      'setToastMessage'
    ]),
    onPopupClose() {
      this.showReviewPopup = false
      this.$emit('create-review-popup-close', {
        isReviewSaved: this.isReviewSaved,
        isReviewEdit: this.isReviewEdit
      })
    },
    validateReviewForm() {
      this.$refs.reviewDesc.validate()
      this.$refs.reviewTitle.validate()
      if (this.reviewData['blooprintRating'] > 0) {
        this.$refs.reviewForm.validate().then(res => {
          if (res) {
            if (this.existingReviewDetails && this.existingReviewDetails.id) {
              this.updateReviewRating()
            } else {
              this.saveReviewRating()
            }
          }
        })
      } else {
        this.setToastMessage({
          type: 'negative',
          message: 'Please provide the rating'
        })
      }
    },
    // *************** Triggers the Save API when when data is valid ****************************
    async saveReviewRating() {
      let params = {
        data: {
          type: 'reviews',
          attributes: {
            blooprintID: this.blooprintDetails['id'],
            ...this.reviewData
          }
        }
      }
      let isReviewSaved = await this.saveReviewAndRating(params)
      if (isReviewSaved) {
        this.isReviewSaved = true
        this.onPopupClose()
      }
    },
    // *************** Triggers the Update API when when data is valid ****************************
    async updateReviewRating() {
      let params = {
        data: {
          type: 'reviews',
          attributes: {
            blooprintID: this.blooprintDetails['id'],
            ...this.reviewData
          }
        },
        reviewId: this.existingReviewDetails['id']
      }
      let isReviewSaved = await this.updateReviewAndRating(params)
      this.isReviewEdit = true
      if (isReviewSaved) {
        this.isReviewSaved = true
        this.onPopupClose()
      }
    },
    // ****************** Method to get the Review List ***************************
    async getReviewDetails() {
      let params = {
        blooprintID: this.blooprintDetails['id'],
        authorID: this.blooprintDetails['attributes']['authorID'],
        customerID: this.$store.getters.userId
      }
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
  }
}
</script>
<style lang="scss" scoped>
.q-mt-20 {
  margin-top: 20px;
}
.review-dialog-card {
  border-radius: 20px;
  padding: 7px 0px 60px;
  box-shadow: 0px 10px 20px $shadow;
  max-width: 1500px;
  width: 658px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    max-width: 100%;
    width: 100%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    max-width: 100%;
    width: 100%;
  }
  .scroll-area {
    @media only screen and (min-width: 600px) {
      max-height: 80vh !important;
      overflow-y: auto !important;
    }
    &::-webkit-scrollbar-track {
      // margin: 10px !important;
    }
    @media only screen and (max-width: $breakpoint-md-max) {
      padding-bottom: 50px !important;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      padding-bottom: 0px !important;
    }
  }
  @media only screen and (min-width: 600px) {
    overflow-y: hidden !important;
  }
}
.q-card__section--vert {
  padding: 0px 20px;
}
.rating-icons {
  height: 30px;
}
::v-deep {
  .submit-btn {
    height: 44px;
    border-radius: 10px;
    .q-btn__wrapper {
      padding: 10px 30px !important;
    }
    .q-btn__content {
      font-size: 16px;
      line-height: 24px;
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
  .q-rating__icon {
    width: 25px;
    height: 23.77px;
  }
  .q-rating__icon--active {
    width: 28.5px;
    height: 28.5px;
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

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: $secondary;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  margin: 30px 0px;
}
</style>
