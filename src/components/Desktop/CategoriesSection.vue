<template>
  <div :class="requestFrom ? '' : 'categories-section'">
    <div :class="requestFrom ? '' : 'row'">
      <div
        class=""
        :class="
          requestFrom
            ? 'bg-white'
            : 'col-md-12 col-sm-12 col-xs-8 reveal fade-bottom'
        "
      >
        <div
          class="text-regalBlue"
          :class="
            requestFrom
              ? 'explore-screen-headings'
              : 'text-center heading-text section-margin text-letter-space'
          "
        >
          Explore top categories
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="q-mt-xl section-margin">
      <CategoriesSkeleton :totalCards="3" />
    </div>
    <NoDataMessageDisplay v-if="!isLoading && categoriesList.length == 0" />
    <div v-else>
      <div v-swiper:mySwiperRef="swiperOption" class="swiper-container">
        <div class="swiper-wrapper">
          <div
            v-for="featureData in categoriesList"
            :key="featureData.id"
            class="swiper-slide"
          >
            <TopCategoriesDataCard
              :animateElements="!requestFrom"
              :name="featureData.attributes.name"
              :picture="featureData.attributes.image"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="separator section-margin">
      <q-separator color="solitudeBlue" size="5px" />
    </div>
    <MoreCategories class="bg-white screen-p-style section-margin" />
  </div>
</template>

<script>
import MoreCategories from 'components/Desktop/MoreCategories.vue'
import CategoriesSkeleton from 'components/Desktop/CategoriesSkeleton.vue'
import TopCategoriesDataCard from 'components/Desktop/TopCategoriesDataCard.vue'
import NoDataMessageDisplay from 'components/Desktop/NoDataMessageDisplay.vue'

import { mapActions } from 'vuex'
export default {
  data() {
    return {
      categoriesList: [],
      isLoading: true,
      swiperOption: {
        slidesPerView: 1,
        freeMode: true,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1600: {
            slidesPerView: 3.8
          },
          1380: {
            slidesPerView: 3
          },
          1286: {
            slidesPerView: 2.8
          },
          905: {
            slidesPerView: 2
          },
          817: {
            slidesPerView: 1.8
          },
          678: {
            slidesPerView: 1.5
          },
          618: {
            slidesPerView: 1.4
          },
          600: {
            slidesPerView: 1.3
          },
          599: {
            slidesPerView: 1.2
          },
          494: {
            slidesPerView: 1.5
          },
          430: {
            slidesPerView: 1.3
          },
          390: {
            slidesPerView: 1.2
          },
          370: {
            slidesPerView: 1.1
          }
        }
      }
    }
  },
  props: ['requestFrom'],
  components: {
    TopCategoriesDataCard,
    CategoriesSkeleton,
    MoreCategories,
    NoDataMessageDisplay
  },
  mounted() {
    this.getTopCategories()
  },
  methods: {
    ...mapActions(['fetchTopCategoriesList']),
    // ************* Method to retrieve Popular Authors List **********************
    async getTopCategories() {
      this.isLoading = true
      let response = await this.fetchTopCategoriesList()
      this.isLoading = false
      this.categoriesList = response
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-slide {
  width: 432px !important;
  height: 432px !important;
  @media only screen and (max-width: $breakpoint-xs) {
    width: 319px !important;
    height: 364px !important;
  }
}
.swiper-wrapper {
  margin-left: 52px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-left: 15px;
  }
}
.section-margin {
  margin-right: 52px;
  margin-left: 52px;
  @media only screen and (max-width: $breakpoint-xs) {
    margin-right: 15px;
    margin-left: 15px;
  }
}
.heading-text {
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  margin-bottom: 40px;
  margin-top: 151px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 60px;
  }
  @media only screen and (max-width: $breakpoint-xs) {
    font-weight: 600;
    font-size: 32px;
    line-height: 36px;
    text-align: left;
    margin-bottom: 30px;
  }
}
.separator {
  margin-top: 76px;
  margin-bottom: 60px;
  @media only screen and (max-width: $breakpoint-xs) {
    margin-top: 56px;
    margin-bottom: 40px;
  }
}
.list-margin {
  padding-bottom: 0px;
}

.explore-screen-headings {
  font-weight: 600;
  margin-top: 60px;
  margin-bottom: 40px;
  margin-left: 52px;
  margin-right: 52px;
  //padding: 60px 0px 40px 52px;

  @media only screen and (max-width: $breakpoint-sm-max) {
    margin: 30px 15px;
  }
}
</style>
