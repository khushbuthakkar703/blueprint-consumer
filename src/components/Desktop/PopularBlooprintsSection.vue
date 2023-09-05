<template>
  <div class="popular-blooprints-section feature-height">
    <div class="text-heading text-regalBlue reveal fade-bottom">
      Popular blooprints
    </div>
    <div class="popular-blooprints-container">
      <div
        class="explore-all-link text-primary cursor-pointer reveal fade-bottom"
        @click="onClickExploreAll"
      >
        Explore all
      </div>
      <BlooprintSkeletonCard v-if="loading" />
      <NoDataMessageDisplay v-if="featuredList.length == 0 && !loading" />
      <div v-else>
        <div
          v-swiper:mySwiperRef="swiperOption"
          style="height:400px"
          class="swiper-container"
        >
          <div class="swiper-wrapper">
            <div
              v-for="featureData in featuredList"
              :key="featureData.id"
              class="swiper-slide reveal fade-right"
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
  </div>
</template>

<script>
import BlooprintSkeletonCard from './BlooprintSkeletonCard.vue'
import NoDataMessageDisplay from './NoDataMessageDisplay.vue'
import { mapActions } from 'vuex'
import BlooprintDataCard from './BlooprintDataCard.vue'
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
    NoDataMessageDisplay,
    BlooprintDataCard
  },
  mounted() {
    this.getFeaturedBlooprintsList()
  },
  methods: {
    ...mapActions(['fetchPopularBlooprintsList', 'updateBlooprintSortOption']),
    // ********** Emits the data back to parent when WIshlist is clicked **************************
    onWishlistClick(event) {
      this.$emit('wishlist-click', event)
    },
    async getFeaturedBlooprintsList() {
      this.loading = true
      let data = await this.fetchPopularBlooprintsList()
      this.loading = false
      this.featuredList = data
    },
    onClickExploreAll() {
      this.updateBlooprintSortOption('Most Popular')
      this.$router.replace({
        name: 'explore-screen',
        query: {
          sortoption: 'Most Popular'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-slide {
  width: 319px !important;
  height: 365px !important;
}
.swiper-wrapper {
  margin-left: 52px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-left: 15px;
  }
}
.popular-blooprints-section {
  margin-top: 30px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 60px;
  }
}
.text-heading {
  font-weight: 600;
  font-size: 32px;
  line-height: 36px;
  margin-left: 52px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    margin-left: 15px;
  }
}
.feature-height {
  height: 400px;
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
.explore-all-link {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-top: 28px;
  margin-bottom: 46px;
  text-decoration: underline;
  margin-left: 52px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-left: 15px;
  }
}
::v-deep {
  .blooprint-container {
    align-items: baseline;
    .card-container {
      margin-top: 2px;
    }
  }
}
</style>
