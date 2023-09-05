<template>
  <q-carousel
    class="categories-carousel"
    v-model="slide"
    transition-prev="slide-right"
    transition-next="slide-left"
    swipeable
    animated
    control-color="primary"
    control-type="regular"
    control-text-color="white"
    arrows
  >
    <q-carousel-slide
      v-for="i in carouselFeatureArray.length"
      :key="i"
      :name="i"
      class="column no-wrap"
    >
      <div class="row fit justify-start items-center blooprint-container">
        <div
          class="col-md-4 col-sm-6 col-xs-12 card-container"
          style="padding-right: 20px"
          v-for="featureData in carouselFeatureArray[i - 1]"
          :key="featureData.id"
        >
          <TopCategoriesDataCard
            :name="featureData.attributes.name"
            :picture="featureData.attributes.image"
          />
        </div>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>
<script>
import TopCategoriesDataCard from 'components/Desktop/TopCategoriesDataCard.vue'

export default {
  name: 'CategoriesCarousel',
  data() {
    return {
      slide: 1
    }
  },
  components: {
    TopCategoriesDataCard
  },
  props: ['carouselFeatureArray']
}
</script>
<style lang="scss" scoped>
.q-carousel {
  background-color: transparent !important;
  overflow: hidden !important;
}
::v-deep {
  .q-carousel__slide {
    padding: 0px 2px !important;
  }
  .q-carousel__arrow .q-btn {
    background: $primary !important;
    color: white !important;
    opacity: 1 !important;
    @media only screen and (max-width: $breakpoint-md-max) {
      opacity: 1 !important;
    }
    @media only screen and (max-width: $breakpoint-sm-max) {
      opacity: 0.5 !important;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      opacity: 0.5 !important;
    }
  }
  .q-carousel__prev-arrow--horizontal {
    left: 0px !important;
  }
  .q-carousel__next-arrow--horizontal {
    right: 0px !important;
  }
  .q-carousel__navigation--bottom {
    bottom: -6px !important;
  }
}
.categories-carousel {
  height: auto;
  @media only screen and (max-width: $breakpoint-xs-max) {
    height: auto;
  }
}
.card-container {
  padding-top: 0px !important;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 0px !important;
  }
}
</style>
