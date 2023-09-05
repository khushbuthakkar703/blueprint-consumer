<template>
  <div class="row border-secondary no-border-radius">
    <div class="col-md-5 col-sm-5 col-xs-12" style="height: 260px">
      <img
        class="full-width cursor-pointer full-height"
        :src="thumbnailImage"
        @click="showBlooprintDetails(blooprint)"
      />
    </div>
    <div
      class="col-md-7 col-sm-7 col-xs-12 bg-white q-pa-lg-md q-pa-md-md q-pa-sm-sm q-pa-xs-md"
      style="position: relative"
      :class="
        requestFrom == 'wishlist' &&
        blooprintSelected['id'] == blooprint['id'] &&
        blooprintSelected['wishlist']
          ? 'q-pa-md on-highlight'
          : null
      "
    >
      <div class="flex justify-between">
        <div
          class="text-nightRider text-bold text-subtitle1 ellipsis cursor-pointer"
          @click="showAuthorProfile(blooprint)"
        >
          {{
            authorName ? (authorName.trim() != '' ? authorName : '--') : '--'
          }}
        </div>
        <RatingIcon
          ratingClass="q-mb-md-xs"
          :ratingValue="blooprint['attributes']['rating']"
          iconSize="20px"
          color="primary"
          :isReadOnly="true"
          isListView="list"
        />
      </div>
      <div
        @click="showBlooprintDetails(blooprint)"
        class="text-dimGrey text-capitalize text-subtitle1 ellipsis-2-lines cursor-pointer"
      >
        {{
          blooprintName
            ? blooprintName.trim() != ''
              ? blooprintName
              : '--'
            : '--'
        }}
      </div>
      <div
        @click="showBlooprintDetails(blooprint)"
        class="text-dimGrey text-subtitle2 text-weight-regular display-four-lines cursor-pointer q-mt-sm q-mb-md-lg q-mb-sm-sm q-mb-xs-md"
      >
        {{ blooprintDescription }}
      </div>
      <div
        class="flex column justify-end"
        v-if="requestFrom == 'wishlist'"
        style="position: absolute;bottom:5%"
      >
        <WishlistIcon
          :active="active"
          :blooprint="blooprint"
          @remove-from-wishlist="onRemoveFromWishlist"
          @wishlist-click="onWishlistClick"
        />
      </div>
      <div class="flex column justify-end btn-tab-position" v-else>
        <div class="">
          <q-btn
            text-color="white"
            flat
            class="col bg-lime q-mr-sm btn-font-size"
            label="Schedule Blooprint"
            @click="onScheduleBlooprintClick(blooprint)"
            no-caps
          />
          <q-btn
            text-color="white"
            flat
            class="col bg-smalt q-ml-sm btn-font-size"
            label="Rate the Blooprint"
            @click="onRateBlooprintClick(blooprint)"
            no-caps
          />
        </div>
      </div>
    </div>
    <!-- ******************** Warning Popup on Rating Deleted Blooprint *********************************** -->
    <q-dialog v-model="ratingDeletedBlooprintPopup">
      <Warning
        :message="
          'Unable to Rate and Write review for this blooprint, the Author might have deleted this blooprint'
        "
        :heading="'Unable to Rate and Review'"
      />
    </q-dialog>
    <!-- ******************** Rating and Review Popup *********************************** -->
    <q-dialog no-esc-dismiss no-backdrop-dismiss v-model="openRatingPopup">
      <Rating
        requestFrom="desktop"
        :blooprintSelected="blooprintSelected"
        @rating-close="onRatingPopupClose"
      />
    </q-dialog>
    <!-- ******************** Schedule Blooprint Popup *********************************** -->
    <q-dialog no-esc-dismiss no-backdrop-dismiss v-model="openSchedulePopup">
      <ScheduleBlooprintPopup
        requestFrom="desktop"
        :blooprintSelected="blooprintSelected"
        @schedule-popup-close="onSchedulePopupClose"
      />
    </q-dialog>
  </div>
</template>
<script>
import RatingIcon from './RatingIcon.vue'
import WishlistIcon from './WishlistIcon.vue'
import Rating from '../pages/Rating.vue'
import Warning from 'components/Warning.vue'
import ScheduleBlooprintPopup from 'components/ScheduleBlooprintPopup.vue'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      blooprintSelected: {},
      openRatingPopup: false,
      authorRating: 0,
      blooprintRating: 0,
      authorReview: '',
      blooprintReview: '',
      openSchedulePopup: false,
      ratingDeletedBlooprintPopup: false
    }
  },
  components: {
    RatingIcon,
    WishlistIcon,
    Rating,
    Warning,
    ScheduleBlooprintPopup
  },
  props: [
    'thumbnailImage',
    'authorName',
    'price',
    'blooprintName',
    'blooprintDescription',
    'blooprint',
    'rating',
    'currency',
    'active',
    'requestFrom'
  ],
  methods: {
    ...mapActions(['getBlooprintRating']),
    // ********** Emits the data back to parent when Remove from wishlist is clicked **************************
    onRemoveFromWishlist(event) {
      this.$emit('remove-from-wishlist', event)
    },
    // ********** Emits the data back to parent when WIshlist is clicked **************************
    onWishlistClick(event) {
      this.blooprintSelected = {
        id: event['blooprint']['id'],
        wishlist: event['display']
      }
      this.$emit('wishlist-click', event)
    },
    // ******************* Open the Rating Popup when Rate Button is clicked *********************************8
    onRateBlooprintClick(blooprint) {
      let status = blooprint.attributes.status
      if (status === 'delete' || status === 'unpublish') {
        this.ratingDeletedBlooprintPopup = true
        return
      }
      this.blooprintSelected = blooprint
      this.openRatingPopup = true
    },
    // ******* Triggers when the popup is closed ******************************
    async onRatingPopupClose(event) {
      if (event) {
        let data = await this.getBlooprintRating({
          blooprintId: this.blooprintSelected['id']
        })
        this.blooprintSelected['attributes']['rating'] = data['value']
      } else {
        this.blooprintSelected = {}
      }
      this.openRatingPopup = false
    },
    // *********** Navigate to Author Profile **********************************
    showAuthorProfile(blooprint) {
      this.$router.push({
        name: 'author-view',
        params: {
          profileId: blooprint['attributes']['authorID']
        }
      })
    },
    // *********** Navigate to Blooprint Details Screen **********************************
    showBlooprintDetails(blooprint) {
      this.$router.push({
        name: 'blooprint landing page',
        params: {
          blooprintId: blooprint['id']
        }
      })
    },
    // *********** On Schedule Blooprint Click **********************************
    onScheduleBlooprintClick(blooprint) {
      this.blooprintSelected = blooprint
      this.openSchedulePopup = true
    },
    // ******* Triggers when the popup is closed ******************************
    onSchedulePopupClose(event) {
      this.blooprintSelected = {}
      this.openSchedulePopup = false
    }
  }
}
</script>
<style lang="scss" scoped>
.btn-tab-position {
  position: absolute;
  bottom: 5%;
}
.btn-font-size {
  font-size: 12.5px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 9.5px;
  }
}
@media only screen and (max-width: $breakpoint-xs-max) {
  .btn-tab-position {
    position: relative;
    bottom: 0%;
  }
}
.display-four-lines {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
