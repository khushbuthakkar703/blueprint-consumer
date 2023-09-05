<template>
  <div>
    <q-img
      class="q-my-sm full-width cursor-pointer img-border"
      :ratio="3 / 2"
      :src="thumbnailImage"
      @click="showBlooprintDetails(blooprint)"
    />
    <q-card-section class="q-px-xs q-pt-xs q-pb-xs">
      <div class="row no-wrap items-center text-manatee text-body2">
        <div
          class="col ellipsis text-nightRider q-mt-xs text-bold author-name-cost-font"
          @click="showAuthorProfile(blooprint)"
        >
          {{
            authorName ? (authorName.trim() != '' ? authorName : '--') : '--'
          }}
        </div>
        <div
          class="col-auto text-charcoal text-bold author-name-cost-font row no-wrap items-center"
        >
          {{ currency }}{{ price }}
        </div>
      </div>
      <div class="row no-wrap q-mt-xs items-center blooprint-font">
        <div
          class="col ellipsis text-dimGrey"
          @click="showBlooprintDetails(blooprint)"
        >
          {{
            blooprintName
              ? blooprintName.trim() != ''
                ? blooprintName
                : '--'
              : '--'
          }}
        </div>
      </div>
      <div class="row no-wrap items-center blooprint-font">
        <div
          class="col text-dimGrey ellipsis"
          @click="showBlooprintDetails(blooprint)"
        >
          {{ blooprintDescription }}
        </div>
        <div class="col-auto text-primary text-body2 row no-wrap items-center">
          <WishlistIcon
            :active="blooprint['attributes']['wishlist']"
            :blooprint="blooprint"
            @remove-from-wishlist="onRemoveFromWishlist"
            @wishlist-click="onWishlistClick"
          />
        </div>
      </div>
    </q-card-section>
  </div>
</template>
<script>
import WishlistIcon from './WishlistIcon'
import { mapActions } from 'vuex'

export default {
  name: 'BlooprintDataCard',
  data() {
    return {}
  },
  props: [
    'thumbnailImage',
    'authorName',
    'price',
    'blooprintName',
    'blooprintDescription',
    'blooprint',
    'currency'
  ],
  components: {
    WishlistIcon
  },
  methods: {
    ...mapActions(['addToWishList']),

    showBlooprintDetails(blooprint) {
      this.$router.push({
        name: 'mobile-blooprint-landing-page',
        params: {
          blooprintId: blooprint['id']
        }
      })
    },
    showAuthorProfile(blooprint) {
      this.$router.push({
        name: 'profile',
        params: {
          profileId: blooprint['attributes']['authorID']
        }
      })
    },
    // ********** Emits the data back to parent when Remove from wishlist is clicked **************************
    onRemoveFromWishlist(event) {
      this.$emit('remove-from-wishlist', event)
    },
    // ********** Emits the data back to parent when WIshlist is clicked **************************
    onWishlistClick(event) {
      this.$emit('wishlist-click', event)
    }
  }
}
</script>
<style lang="scss">
.img-border {
  border-radius: 8px;
}
.author-name-cost-font {
  font-size: 15pt;
}
.blooprint-font {
  font-size: 11pt;
}
</style>
