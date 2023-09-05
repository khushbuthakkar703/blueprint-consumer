<template>
  <q-page>
    <Header title="Wish List" titleClass="text-h6" showBackIcon="false" />
    <q-separator color="secondary" />
    <div class="flex flex-center column q-mt-lg q-mb-xl q-px-md">
      <q-list class="full-width lastWishlistItem">
        <div v-if="loading">
          <q-item
            class="column full-width border-secondary box-shadow q-mb-md rounded-borders"
            v-for="i in 4"
            :key="i"
          >
            <BlooprintSkeletonCardMobile />
          </q-item>
        </div>
        <div v-if="!loading">
          <div v-if="wishListData.length == 0">
            <NoDataMessageDisplay />
          </div>
          <q-infinite-scroll
            @load="loadMoreRecords"
            :offset="250"
            ref="infiniteScroll"
          >
            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
            <transition-group name="list" tag="p">
              <q-item
                class="column itemCard full-width border-secondary q-mb-md bg-white img-border list-item"
                v-for="list in wishListData"
                :key="list['id']"
                :class="
                  blooprintSelected['id'] == list['id'] &&
                  blooprintSelected['wishlist']
                    ? 'on-highlight'
                    : null
                "
              >
                <BlooprintDataCard
                  :thumbnailImage="list['attributes']['thumbnail']"
                  :authorName="list['attributes']['authorName']"
                  :price="list['attributes']['price']"
                  :currency="list['attributes']['currency']"
                  :blooprintName="list['attributes']['name']"
                  :blooprintDescription="list['attributes']['description']"
                  :blooprint="list"
                  :active="list['attributes']['wishlist']"
                  @remove-from-wishlist="onRemoveFromWishlist"
                  @wishlist-click="onWishlistClick"
                />
              </q-item>
            </transition-group>
            <div
              class="no-more-results-msg border-bottom-secondary text-body1 text-h5 text-center text-manatee"
              v-if="noMoreResults && wishListData.length != 0"
            >
              <span class="bg-whiteSmoke q-px-sm">No more results</span>
            </div>
          </q-infinite-scroll>
        </div>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import Header from 'components/Header.vue'
import BlooprintSkeletonCardMobile from 'components/BlooprintSkeletonCardMobile.vue'
import NoDataMessageDisplay from 'components/Desktop/NoDataMessageDisplay.vue'
import BlooprintDataCard from 'components/BlooprintDataCard'
import { mapActions, mapGetters } from 'vuex'

const WISHLIST_SHOW_LIMIT = 10

export default {
  name: 'Wishlist',
  data() {
    return {
      loading: true,
      wishListData: [],
      noMoreResults: false,
      blooprintSelected: {}
    }
  },
  components: {
    Header,
    BlooprintSkeletonCardMobile,
    NoDataMessageDisplay,
    BlooprintDataCard
  },
  mounted() {
    this.getWishlistContent()
    this.updateBackNavigationScreen('/mobile/blooprints/wishlist')
  },
  computed: {
    ...mapGetters(['errorInGettingWishlist'])
  },
  methods: {
    ...mapActions([
      'retrieveBlooprintsInWishlist',
      'addToWishList',
      'updateBackNavigationScreen',
      'isAPIResponseFailed'
    ]),
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
  },
  watch: {
    errorInGettingWishlist() {
      let error = !!this.errorInGettingWishlist.length
      this.isAPIResponseFailed(error)
    }
  }
}
</script>
<style lang="scss" scoped>
.img-border {
  border-radius: 8px;
}
.lastWishlistItem:last-child {
  margin-bottom: 30px;
}
.itemCard {
  box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
    0 3px 1px -2px rgb(0 0 0 / 12%);
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  // min-height: 0;
  // transition: all 1s;
  // overflow: hidden; /* Hide the element content, while height = 0 */
  // height: 0;
  // padding: 0;
  // border: 0;
}
</style>
