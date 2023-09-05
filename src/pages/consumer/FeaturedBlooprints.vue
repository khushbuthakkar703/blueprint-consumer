<template>
  <div class="feature-height">
    <div
      class="text-regalBlue f-w-600 explore-screen-headings screen-p-style"
      style="margin-bottom: 10px"
    >
      Featured blooprints
    </div>

    <BlooprintSkeletonCard
      v-if="loading && $q.screen.width > 1200"
      class="skeleton-class"
      :totalCards="4"
    />
    <BlooprintSkeletonCard
      v-if="loading && $q.screen.width < 1201 && $q.screen.width > 790"
      class="skeleton-class"
      :totalCards="3"
      requestFrom="authorblooprint"
    />
    <BlooprintSkeletonCard
      v-if="loading && $q.screen.width < 791 && $q.screen.width > 600"
      class="skeleton-class"
      :totalCards="2"
      requestFrom="authorblooprint"
    />
    <BlooprintSkeletonCard
      v-if="loading && $q.screen.width <= 600"
      class="skeleton-class"
      :totalCards="1"
      requestFrom="authorblooprint"
    />

    <NoDataMessageDisplay v-if="featuredList.length == 0 && !loading" />
    <div v-else>
      <div
        v-swiper:mySwiperRef="swiperOption"
        style="height: 400px; margin-top: 30px"
        class="swiper-container"
      >
        <div class="swiper-wrapper">
          <div
            style="height: 365px"
            v-for="featureData in featuredList"
            :key="featureData.id"
            class="swiper-slide"
          >
            <BlooprintDataCard
              :category="featureData['attributes']['categories'][0]"
              :authorName="featureData['attributes']['authorName']"
              :thumbnail="featureData['attributes']['thumbnail']"
              :rating="featureData['attributes']['rating']"
              :name="featureData['attributes']['name']"
              :wishlist="featureData['attributes']['wishlist']"
              :currency="featureData['attributes']['currency']"
              :price="featureData['attributes']['price']"
              :blooprintData="featureData"
              requestFrom="'feature'"
              @wishlist-click="onWishlistClick"
              :class="
                blooprintSelected['id'] == featureData['id'] &&
                blooprintSelected['wishlist']
                  ? 'on-highlight'
                  : null
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BlooprintSkeletonCard from 'components/Desktop/BlooprintSkeletonCard.vue'
import NoDataMessageDisplay from 'components/Desktop/NoDataMessageDisplay.vue'
import BlooprintDataCard from 'components/Desktop/BlooprintDataCard.vue'
import { mapActions } from 'vuex'
export default {
  name: 'FeaturedBlooprints',
  data() {
    return {
      loading: true,
      featuredList: [],
      blooprintSelected: {},
      swiperOption: {
        slidesPerView: 1,
        freeMode: true,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1321: {
            slidesPerView: 3.8
          },
          1042: {
            slidesPerView: 3
          },
          950: {
            slidesPerView: 2.8
          },
          750: {
            slidesPerView: 2
          },
          610: {
            slidesPerView: 1.8
          },
          510: {
            slidesPerView: 1.5
          },
          440: {
            slidesPerView: 1.3
          },
          370: {
            slidesPerView: 1.1
          }
        }
      }
    }
  },
  components: {
    BlooprintSkeletonCard,
    BlooprintDataCard,
    NoDataMessageDisplay
  },
  mounted() {
    this.getFeaturedBlooprintsList()
  },
  methods: {
    ...mapActions(['fetchFeaturedBlooprintsList']),
    // ********** Emits the data back to parent when WIshlist is clicked **************************
    onWishlistClick(event) {
      this.$emit('wishlist-click', event)
    },
    async getFeaturedBlooprintsList() {
      this.loading = true
      let data = await this.fetchFeaturedBlooprintsList()
      this.loading = false
      this.featuredList = data
    }
  }
}
</script>
<style lang="scss" scoped>
.swiper-slide {
  width: 319px !important;
}
.swiper-wrapper {
  margin-left: 52px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-left: 15px;
  }
}
.feature-height {
  max-height: 400px;
  @media only screen and (max-width: $breakpoint-md-max) {
    max-height: 400px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    max-height: 330px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    max-height: 330px;
  }
}
.screen-p-style {
  padding-top: 60px;
  padding-left: 52px;
  @media only screen and (max-width: $breakpoint-md-max) {
    padding-top: 60px;
    padding-left: 52px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-top: 40px;
    padding-left: 15px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-top: 40px;
    padding-left: 15px;
  }
}

.skeleton-class {
  margin-left: 52px;
  margin-top: 30px;

  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-left: 15px;
  }
}
</style>
