<template>
  <q-icon
    :name="active ? 'favorite' : 'favorite_border'"
    color="red"
    size="sm"
    class="bubbly-button cursor-pointer"
    @click="onWishListClick(blooprint)"
  />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'WishlistIcon',
  props: ['active', 'blooprint'],
  data() {
    return {}
  },
  methods: {
    ...mapActions(['addToWishList', 'removeFromWishList']),
    // **************** Triggers on WhishList Icon Select *****************************
    onWishListClick(blooprint) {
      blooprint['attributes']['wishlist'] = !blooprint['attributes']['wishlist']
      this.$emit('wishlist-click', { blooprint: blooprint, display: true })
      if (blooprint['attributes']['wishlist']) {
        this.saveToWishList(blooprint)
      } else {
        this.deleteFromWishList(blooprint)
      }
    },
    // *************** Add to WishList API **************************
    async saveToWishList(blooprint) {
      let params = {
        data: {
          type: 'wishlists',
          attributes: {
            customerID: this.$store.getters.userId,
            blooprintID: blooprint['id']
          }
        }
      }
      let isSuccess = await this.addToWishList(params)
      if (!isSuccess) {
        blooprint['attributes']['wishlist'] = !blooprint['attributes'][
          'wishlist'
        ]
      }
      this.$emit('wishlist-click', { blooprint: blooprint, display: false })
    },
    // *************** Remove from Wishlit API ****************************
    async deleteFromWishList(blooprint) {
      let params = {
        customerID: this.$store.getters.userId,
        blooprintID: blooprint['id']
      }
      let isSuccess = await this.removeFromWishList(params)
      if (!isSuccess) {
        blooprint['attributes']['wishlist'] = !blooprint['attributes'][
          'wishlist'
        ]
      } else {
        this.$emit('remove-from-wishlist', blooprint)
      }
      this.$emit('wishlist-click', { blooprint: blooprint, display: false })
    }
  }
}
</script>

<style lang="scss" scoped>
.bubbly-button {
  position: relative;
  transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;

  &:active {
    transform: scale(0.4);
  }

  &.animate {
    &:before {
      display: block;
      animation: topBubbles ease-in-out 0.75s forwards;
    }
    &:after {
      display: block;
      animation: bottomBubbles ease-in-out 0.75s forwards;
    }
  }
}
</style>
