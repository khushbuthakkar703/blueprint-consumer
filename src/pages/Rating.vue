<template>
  <q-card
    :class="requestFrom == 'desktop' ? 'rating-dialog-card' : 'full-height'"
  >
    <q-card-section class="bg-whiteSmoke full-height">
      <div class="row" v-if="requestFrom == 'desktop'">
        <div class="text-h6 text-dimGrey q-ml-md">Rate and Write Review</div>
        <q-space />
        <q-btn
          icon="close"
          class="text-dimGrey"
          flat
          round
          dense
          @click="closeRatingScreen"
        />
      </div>
      <div class="row q-mb-xl" v-else>
        <q-icon
          class="text-primary"
          size="sm"
          @click="closeRatingScreen"
          name="close"
        ></q-icon>
        <div class="text-nightRider q-pl-lg text-body1 text-weight-medium">
          Rate and Write a Review
        </div>
      </div>
      <q-separator
        color="grey-4"
        class="q-my-sm full-width no-padding"
        v-if="requestFrom == 'desktop'"
      />

      <div
        class="row"
        :class="requestFrom == 'desktop' ? 'q-mt-xl flex flex-center' : null"
      >
        <div class="col-md-6 col-sm-12 col-xs-12 q-pl-md-xl q-pl-sm-md">
          <div class="text-nightRider text-body1 text-bold">
            Creator
          </div>
          <div
            class="q-mt-md"
            :class="requestFrom == 'desktop' ? null : 'flex justify-center'"
          >
            <q-skeleton width="250px" height="30px" v-if="showSkeleton" />
            <RatingIcon
              v-else
              :ratingValue="authorRating"
              iconSize="3.5em"
              color="primary"
              :isReadOnly="isRatingReadOnly"
              @rating-change="onRatingChange"
              ratingFrom="authorRating"
            />
          </div>

          <div class="q-mt-md">
            <label class="text-grey">Write a review</label>
            <q-skeleton type="QToolbar" height="100px" v-if="showSkeleton" />
            <q-input
              v-else
              borderless
              v-model.trim="authorReview"
              type="textarea"
              rows="3"
              maxlength="1000"
              counter
              input-class="text-charcoal"
              class="border-secondary bg-white rounded-borders q-mt-sm q-mb-lg q-px-md q-pb-none"
            />
          </div>
        </div>
        <div class="col-md-6 col-sm-12 col-xs-12 q-px-md-xl q-pl-sm-md">
          <div class="text-nightRider text-body1 text-bold">
            Blooprint
          </div>
          <div
            class="q-mt-md"
            :class="requestFrom == 'desktop' ? null : 'flex justify-center'"
          >
            <q-skeleton width="250px" height="30px" v-if="showSkeleton" />
            <RatingIcon
              v-else
              :ratingValue="blooprintRating"
              iconSize="3.5em"
              color="primary"
              :isReadOnly="isRatingReadOnly"
              @rating-change="onRatingChange"
              ratingFrom="blooprintRating"
            />
          </div>

          <div class="q-mt-md">
            <label class="text-grey">Write a review</label>
            <q-skeleton type="QToolbar" height="100px" v-if="showSkeleton" />
            <q-input
              v-else
              borderless
              v-model.trim="blooprintReview"
              rows="3"
              maxlength="1000"
              counter
              type="textarea"
              input-class="text-charcoal"
              class="border-secondary bg-white rounded-borders q-mt-sm q-mb-lg q-px-md q-pb-none"
            />
          </div>
        </div>
      </div>

      <div class="q-mt-lg q-mb-md text-center">
        <q-btn
          color="primary"
          size="lg"
          :label="ratingType == 'edit' || isDesktopEdit ? 'Update' : 'Submit'"
          class="q-mb-md rounded-borders"
          :class="requestFrom == 'desktop' ? 'submit-btn' : 'full-width'"
          no-caps
          :disable="isButtonDisabled"
          type="submit"
          @click="submitReview"
        />
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import { mapActions } from 'vuex'
import RatingIcon from '../components/RatingIcon.vue'

export default {
  data() {
    return {
      authorRating: 0,
      blooprintRating: 0,
      authorReview: '',
      blooprintReview: '',
      isRatingReadOnly: false,
      reviewDetails: {},
      showSkeleton: false,
      isReviewSavedOrUpdated: false,
      isDesktopEdit: false
    }
  },
  computed: {
    isButtonDisabled() {
      return (
        this.authorRating == 0 &&
        this.blooprintRating == 0 &&
        this.authorReview == '' &&
        this.blooprintReview == ''
      )
    }
  },
  components: {
    RatingIcon
  },
  mounted() {
    if (this.ratingType == 'edit') {
      this.fetchReviewDetails()
    } else if (this.requestFrom == 'desktop' || this.requestFrom == 'mobile') {
      this.getReviewDetails()
    }
  },
  props: ['ratingType', 'reviewSelected', 'requestFrom', 'blooprintSelected'],
  methods: {
    ...mapActions([
      'saveReviewAndRating',
      'setToastMessage',
      'getReviewById',
      'updateReviewAndRating',
      'fetchReviewsList'
    ]),
    isBlooprintReviewEmpty() {
      return this.blooprintReview != ''
    },
    isBlooprintRatingEmpty() {
      return this.blooprintRating == 0
    },
    isAuthorReviewEmpty() {
      return this.authorReview != ''
    },
    isAuthorRatingEmpty() {
      return this.authorRating == 0
    },
    async getReviewDetails() {
      let params = {
        blooprintID: this.blooprintSelected['id'],
        authorID: this.blooprintSelected['attributes']['authorId'],
        customerID: this.$store.getters.userId
      }
      this.showSkeleton = true
      let data = await this.fetchReviewsList(params)
      this.showSkeleton = false
      if (data && data['data'].length > 0) {
        this.isDesktopEdit = true
        this.reviewDetails = data['data'][0]
        this.authorReview = data['data'][0]['attributes']['authorReview']
          ? data['data'][0]['attributes']['authorReview']
          : ''
        this.authorRating = data['data'][0]['attributes']['authorRating']
          ? data['data'][0]['attributes']['authorRating']
          : 0
        this.blooprintReview = data['data'][0]['attributes']['blooprintReview']
          ? data['data'][0]['attributes']['blooprintReview']
          : ''
        this.blooprintRating = data['data'][0]['attributes']['blooprintRating']
          ? data['data'][0]['attributes']['blooprintRating']
          : 0
      }
    },
    // ************* Method to Save the Blooprint Rating and  Review *******************************
    async submitReview() {
      let isBlooprintOrAuthorRatingEmpty = false
      if (this.isBlooprintReviewEmpty() && this.isBlooprintRatingEmpty()) {
        this.setToastMessage({
          type: 'negative',
          message: 'Blooprint Rating is Required'
        })
        isBlooprintOrAuthorRatingEmpty = true
      }
      if (this.isAuthorReviewEmpty() && this.isAuthorRatingEmpty()) {
        this.setToastMessage({
          type: 'negative',
          message: 'Author Rating is Required'
        })
        isBlooprintOrAuthorRatingEmpty = true
      }
      if (!isBlooprintOrAuthorRatingEmpty) {
        if (this.ratingType == 'edit' || this.isDesktopEdit) {
          this.updateReviewRating()
        } else {
          this.saveReviewRating()
        }
      }
    },
    // *************** Triggers the Save API when when data is valid ****************************
    async saveReviewRating() {
      let params = {
        data: {
          type: 'reviews',
          attributes: {
            blooprintID: this.blooprintSelected['id'],
            blooprintReview: this.blooprintReview,
            blooprintRating: this.blooprintRating,
            authorReview: this.authorReview,
            authorRating: this.authorRating
          }
        }
      }
      let isReviewSaved = await this.saveReviewAndRating(params)
      this.isReviewSavedOrUpdated = true
      if (isReviewSaved) {
        this.closeRatingScreen()
      }
    },
    // *************** Triggers the Update API when when data is valid ****************************
    async updateReviewRating() {
      let params = {
        data: {
          type: 'reviews',
          attributes: {
            blooprintID: this.blooprintSelected['id'],
            blooprintReview: this.blooprintReview,
            blooprintRating: this.blooprintRating,
            authorReview: this.authorReview,
            authorRating: this.authorRating
          }
        },
        reviewId: this.reviewDetails['id']
      }
      let isReviewSaved = await this.updateReviewAndRating(params)
      this.isReviewSavedOrUpdated = true
      if (isReviewSaved) {
        this.closeRatingScreen()
      }
    },
    // ****************** Triggers when Cross Icon is clicked ***************************
    closeRatingScreen() {
      if (this.ratingType == 'edit') {
        this.$emit('rating-close', this.isReviewSavedOrUpdated)
      } else {
        this.$emit('rating-close', this.isReviewSavedOrUpdated)
      }
    },
    // ************ Triggers on Rating Value chnages *******************************
    onRatingChange(event) {
      if (event['from'] == 'blooprintRating') {
        this.blooprintRating = event['value']
      } else if (event['from'] == 'authorRating') {
        this.authorRating = event['value']
      }
    },
    // ****************** Method to get the Review List ***************************
    async fetchReviewDetails() {
      this.showSkeleton = true
      let data = await this.getReviewById(this.reviewSelected.id)
      this.showSkeleton = false
      if (data['attributes']) {
        this.reviewDetails = data
        this.authorReview = data['attributes']['authorReview']
          ? data['attributes']['authorReview']
          : ''
        this.authorRating = data['attributes']['authorRating']
          ? data['attributes']['authorRating']
          : 0
        this.blooprintReview = data['attributes']['blooprintReview']
          ? data['attributes']['blooprintReview']
          : ''
        this.blooprintRating = data['attributes']['blooprintRating']
          ? data['attributes']['blooprintRating']
          : 0
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.rating-dialog-card {
  width: 874px;
  max-width: 80vw;
}
.submit-btn {
  width: 195px;
}
</style>
