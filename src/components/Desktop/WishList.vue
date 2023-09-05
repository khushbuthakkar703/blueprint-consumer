<template>
  <div class="wish-list">
    <label class="wishlist-heading">
      <img src="../../assets/wishlist-blue.svg" class="lt-md wishlist-icon" />
      Wish List</label
    >
    <div
      class="row wrap"
      v-if="isLoading"
      style="overflow-x: hidden !important"
    >
      <div
        v-for="i in 3"
        :key="i * 2"
        style=" margin: 20px 20px 0px 0px; width: 55vw !important"
        class="gt-md"
      >
        <BlooprintSkeletonCard :totalCards="3" class="skeleton" style="" />
      </div>
      <div
        v-for="i in 3"
        :key="i * 7"
        style=" margin: 20px 20px 0px 0px; width: 55vw !important"
        class="gt-xs lt-lg"
      >
        <BlooprintSkeletonCard :totalCards="2" class="skeleton" style="" />
      </div>
      <div
        v-for="i in 3"
        :key="i * 9"
        style=" margin: 20px 0px 0px 0px; width: 55vw !important"
        class="lt-sm"
      >
        <BlooprintSkeletonCard :totalCards="1" class="skeleton" style="" />
      </div>
    </div>
    <div
      v-if="
        wishList.length === 0 &&
          !isLoading &&
          totalWishListCount === fetchedDataCount
      "
      class="flex flex-center full-width q-pa-xl no-data"
      style=""
    >
      <NoDataMessageDisplay
        class="text-regalBlue"
        style="margin: auto !important"
      />
    </div>
    <div
      class="row full-width wishlist-container"
      v-if="wishList.length > 0 || fetchedDataCount < totalWishListCount"
      style=" "
    >
      <div
        v-for="list in wishList"
        :key="list['id']"
        :class="list.id === removedCard.id ? 'card-removed' : ''"
        class="blooprint-card "
        style=""
      >
        <BlooprintDataCard
          :category="list['attributes']['categories'][0]"
          :authorName="list['attributes']['authorName']"
          :thumbnail="list['attributes']['thumbnail']"
          :rating="list['attributes']['rating']"
          :name="list['attributes']['name']"
          :wishlist="list['attributes']['wishlist']"
          :currency="list['attributes']['currency']"
          :price="list['attributes']['price']"
          :blooprintData="list"
          @wishlist-click="onWishlistClick"
        />
      </div>
      <div class="flex flex-center full-width spinner-btn-group">
        <q-btn
          v-if="fetchedDataCount < totalWishListCount && !showSpinner"
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
          style="margin-top: 20px"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BlooprintSkeletonCard from './BlooprintSkeletonCard.vue'
import BlooprintDataCard from './BlooprintDataCard.vue'
import NoDataMessageDisplay from './NoDataMessageDisplay.vue'
const WISHLIST_SHOW_LIMIT = 12
export default {
  name: 'WishList',
  data() {
    return {
      wishList: [],
      isLoading: false,
      removedCard: {},
      totalWishListCount: 0,
      showSpinner: false,
      pageNo: 0,
      fetchedDataCount: 0
    }
  },
  components: {
    BlooprintSkeletonCard,
    BlooprintDataCard,
    NoDataMessageDisplay
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
      this.isLoading = true
      let data = await this.retrieveBlooprintsInWishlist(params)
      this.isLoading = false
      this.wishList = data.data
      this.fetchedDataCount = this.wishList.length
      this.totalWishListCount = parseInt(data.meta.count)
    },
    onWishlistClick(val) {
      this.removedCard = val.blooprint
      setTimeout(() => {
        this.totalWishListCount--
        this.fetchedDataCount--
        this.wishList = this.wishList.filter(el => {
          return el.id !== val.blooprint.id
        })
        this.removedCard = {}
        if (this.wishList.length < this.totalWishListCount) {
          this.retrieveBlooprintsInWishlist({
            offset: this.fetchedDataCount,
            limit: 1
          }).then(data => {
            this.wishList = this.wishList.concat(data.data)
            this.fetchedDataCount = this.wishList.length
            this.totalWishListCount = parseInt(data.meta.count)
          })
        }
      }, 500)
    },
    async loadMoreRecords() {
      this.pageNo++
      let params = {
        limit: WISHLIST_SHOW_LIMIT,
        // offset: this.pageNo * WISHLIST_SHOW_LIMIT
        offset: this.wishList.length
      }
      this.showSpinner = true
      let data = await this.retrieveBlooprintsInWishlist(params)
      this.showSpinner = false
      this.wishList = this.wishList.concat(data.data)
      this.fetchedDataCount = this.wishList.length
      this.totalWishListCount = parseInt(data.meta.count)
    }
  },
  created() {
    this.getWishlistContent()
  }
}
</script>

<style lang="scss" scoped>
.wish-list {
  background: #ffffff;
  // padding: 40px 40px 20px 40px  ;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 20px 15px;
  }
}
.wishlist-heading {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: center;
  color: #000000;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 0px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 24px;
    padding-top: 10px !important;
  }
}
.blooprint-card {
  min-width: 33.33% !important;
  max-width: 33.33% !important;
  padding: 20px 20px 20px 0px !important;
  @media only screen and (max-width: $breakpoint-md-max) {
    min-width: 50% !important;
    max-width: 50% !important;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    min-width: 50% !important;
    max-width: 50% !important;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 10px 0px !important;
    margin: auto !important;
    min-width: 100% !important;
    max-width: 100% !important;
    // padding-right: 20px 0px !important;
  }
}
.blooprint-card-margin {
  @media only screen and (min-width: $breakpoint-md-max) {
    padding-right: 20px !important;
  }
}
.wishlist-container {
  margin-top: 10px !important;

  transition: transform 0.3s ease-in-out !important;
  @media only screen and (min-width: $breakpoint-sm-max) {
    max-height: 110vh !important;
    overflow-y: auto !important;
    // min-width: 55vw !important;
    // max-width: 55vw !important;
  }
  @media only screen and (min-width: $breakpoint-md-max) {
    // min-width: 60vw !important;
    // max-width: 60vw !important;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 20px !important;
  }
}
.card-removed {
  opacity: 0 !important;
  transition: opacity 0.5s linear;
}
.skeleton {
  width: 140% !important;
  padding-left: 10px !important;
  @media only screen and (max-width: $breakpoint-md-max) {
    width: 190% !important;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 160% !important;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin: 0px !important;
    width: 170% !important;
  }
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: $secondary;
  border-radius: 10px;
}
.wishlist-icon {
  width: 24px !important;
  height: 24px !important;
  margin-right: 10px !important;
  margin-left: 0px !important;
}
.no-data {
  width: 100% !important;
}
.see-more-btn {
  width: 220px;
  height: 50px;
  border-radius: 10px;
  font-weight: 600;
  margin-top: 20px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-weight: normal;
    // margin-top: 20px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-weight: normal;
    // margin-top: 20px;
  }
}
.spinner-btn-group {
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-bottom: 20px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-top: 10px;
  }
}
</style>
