<template>
  <q-page class="q-ma-sm-lg q-ma-xs-md">
    <div class="text-nightRider q-px-sm text-h5 text-weight-medium">
      Wishlist
      <q-separator width="90px" color="primary" size="2px" />
    </div>

    <BlooprintSkeletonCardWeb requestFrom="wishlist" v-if="loading" />
    <div
      class="text-subtitle1 text-center absolute-center"
      v-else-if="errorInGettingWishlist.length && !loading"
    >
      {{ errorInGettingWishlist }}
    </div>
    <div v-if="!loading">
      <div
        v-if="wishListData.length == 0 && errorInGettingWishlist.length === 0"
      >
        <NoDataMessageDisplay />
      </div>
      <q-infinite-scroll
        :offset="250"
        @load="loadMoreRecords"
        ref="infiniteScroll"
      >
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
        <transition-group class="row" name="list" tag="p">
          <div
            class="col-md-6 col-sm-12 col-xs-12 q-my-md q-px-sm"
            v-for="list in wishListData"
            :key="list.id"
          >
            <DesktopBlooprintListCard
              class="list-item"
              requestFrom="wishlist"
              :key="list.id"
              :thumbnailImage="list['attributes']['thumbnail']"
              :authorName="list['attributes']['authorName']"
              :price="list['attributes']['price']"
              :currency="list['attributes']['currency']"
              :blooprintName="list['attributes']['name']"
              :blooprintDescription="list['attributes']['description']"
              :blooprint="list"
              :rating="list['attributes']['rating']"
              :active="list['attributes']['wishlist']"
              @remove-from-wishlist="onRemoveFromWishlist"
              @wishlist-click="onWishlistClick"
            />
          </div>
        </transition-group>

        <div
          class="no-more-results-msg border-bottom-secondary text-body1 text-h5 text-center text-manatee"
          v-if="noMoreResults && wishListData.length != 0"
        >
          <span class="bg-whiteSmoke q-px-sm">No more results</span>
        </div>
      </q-infinite-scroll>
    </div>
  </q-page>
</template>
<script>
import DesktopBlooprintListCard from 'components/DesktopBlooprintListCard.vue'
import BlooprintSkeletonCardWeb from 'components/BlooprintSkeletonCardWeb.vue'
import NoDataMessageDisplay from 'components/Desktop/NoDataMessageDisplay.vue'

import { mapActions, mapGetters } from 'vuex'

const WISHLIST_SHOW_LIMIT = 10

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      loading: true,
      wishListData: [],
      noMoreResults: false,
      blooprintSelected: {}
    }
  },
  components: {
    DesktopBlooprintListCard,
    BlooprintSkeletonCardWeb,
    NoDataMessageDisplay
  },
  mounted() {
    this.getWishlistContent()
  },
  computed: {
    ...mapGetters(['errorInGettingWishlist'])
  },
  methods: {
    ...mapActions(['retrieveBlooprintsInWishlist', 'addToWishList']),
    async getWishlistContent() {
      let params = {
        limit: WISHLIST_SHOW_LIMIT,
        offset: 0
      }
      this.loading = true
      let data = await this.retrieveBlooprintsInWishlist(params)
      this.wishListData = data
      this.loading = false
    },
    // ************ On Scroll Pagination Load Blooprint Records *****************************
    async loadMoreRecords(index, done) {
      let wishListLengthBeforeLoad = this.wishListData.length

      let params = {
        limit: WISHLIST_SHOW_LIMIT,
        offset: index * WISHLIST_SHOW_LIMIT
      }
      let data = await this.retrieveBlooprintsInWishlist(params)
      if (data.length > 0) {
        this.wishListData = this.wishListData.concat(data)
      }
      let wishListLengthAfterLoad = this.wishListData.length

      if (wishListLengthBeforeLoad == wishListLengthAfterLoad) {
        if (wishListLengthBeforeLoad > 0) {
          this.noMoreResults = true
        }
        this.$refs.infiniteScroll.stop()
      }
      done()
    },
    // **************** Removing the item from list when it is removed from wishlist **************************
    onRemoveFromWishlist(event) {
      let index = this.wishListData.findIndex(
        item => item['id'] === event['id']
      )
      this.wishListData.splice(index, 1)
    },
    // ***************** Triggers when Wishlist icon is clicked ********************************
    onWishlistClick(event) {
      this.blooprintSelected = {
        id: event['blooprint']['id'],
        wishlist: event['display']
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
