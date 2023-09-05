<template>
  <q-card
    flat
    class="col-md-4 q-pa-md col-sm-6 col-xs-12 q-mb-md bg-whiteSmoke"
  >
    <q-img
      :ratio="3 / 2"
      style="border-bottom: none !important"
      :src="thumbnailImage ? thumbnailImage : '~assets/NoImage.png'"
      class="q-mt-sm full-width cursor-pointer border-secondary"
      cover
      @click="showBlooprintDetails(blooprint)"
    >
      <template v-slot:error>
        <q-img contain src="~assets/NoImage.png" class="full-width" />
      </template>
    </q-img>
    <q-card-section
      class=" bg-white border-secondary "
      :class="
        blooprintSelected['id'] == blooprint['attributes']['uuid'] &&
        blooprintSelected['wishlist']
          ? 'q-pa-md on-highlight'
          : null
      "
    >
      <div
        class="text-nightRider cursor-pointer ellipsis"
        @click="showAuthorProfile(blooprint)"
      >
        {{ authorName ? (authorName.trim() != '' ? authorName : '--') : '--' }}
      </div>
      <div
        class="text-h6 text-nightRider cursor-pointer ellipsis-2-lines"
        @click="showBlooprintDetails(blooprint)"
        style="min-height:6.5vh"
      >
        {{
          blooprintName
            ? blooprintName.trim() != ''
              ? blooprintName
              : '--'
            : '--'
        }}
      </div>
      <div class="row">
        <div class="col q-mt-sm text-left text-body1 text-bold text-smalt">
          {{ currency + '' + price }}
        </div>
        <div class="col q-mt-sm text-right">
          {{ rating.toFixed(1) }}
          <RatingIcon
            class="q-mb-xs"
            ratingClass="q-mb-xs"
            color="smalt"
            :ratingValue="rating"
            iconSize="16px"
            :isReadOnly="true"
            isListView="list"
          />
        </div>
      </div>
      <div class="row">
        <q-btn
          color="primary"
          size="16px"
          label="Buy Now"
          class="col full-width q-mt-md flat"
          no-caps
          type="submit"
          @click="onBuyNowClick(blooprint)"
        />
        <WishlistIcon
          class="col-2 q-mt-md q-ml-md"
          :active="active"
          :blooprint="blooprint"
          @remove-from-wishlist="onRemoveFromWishlist"
          @wishlist-click="onWishlistClick"
        />
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import RatingIcon from './RatingIcon.vue'
import WishlistIcon from './WishlistIcon.vue'

export default {
  data() {
    return {
      blooprintSelected: {}
    }
  },
  components: {
    RatingIcon,
    WishlistIcon
  },
  props: [
    'requestFrom',
    'thumbnailImage',
    'authorName',
    'price',
    'currency',
    'blooprintName',
    'rating',
    'blooprint',
    'active'
  ],
  methods: {
    // ********** Emits the data back to parent when Remove from wishlist is clicked **************************
    onRemoveFromWishlist(event) {
      this.blooprintSelected = {
        id: event['id'],
        wishlist: event['display']
      }
    },
    // ********** Emits the data back to parent when WIshlist is clicked **************************
    onWishlistClick(event) {
      this.blooprintSelected = {
        id: event['blooprint']['id'],
        wishlist: event['display']
      }
    },
    // ************** Navigate to Blooprint Details Screen ***********************
    showBlooprintDetails(blooprint) {
      this.$router.push({
        name: 'blooprint landing page',
        params: {
          blooprintId: blooprint['id']
        }
      })
    },
    // ************** Navigate to Author Screen ***********************
    showAuthorProfile(blooprint) {
      this.$router.push({
        name: 'author-view',
        params: {
          profileId: blooprint['attributes']['authorID']
        }
      })
    },
    // ************** Navigate to Checkout Screen ***********************
    onBuyNowClick(blooprint) {
      this.$router.push({
        name: 'blooprint-checkout',
        params: {
          blooprintId: blooprint['id']
        }
      })
    }
  }
}
</script>
