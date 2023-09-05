<template>
  <q-carousel
    class="blooprint-carousel"
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
          class="col-md-3 col-sm-6 col-xs-12 q-mt-md card-container"
          style="padding-right: 20px"
          v-for="featureData in carouselFeatureArray[i - 1]"
          :key="featureData.id"
        >
          <AuthorDataCard
            :name="
              featureData.attributes.firstName +
                ' ' +
                (featureData.attributes.lastName
                  ? featureData.attributes.lastName
                  : '')
            "
            :picture="featureData.attributes.picture"
            :authorId="featureData.id"
          />
        </div>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>
<script>
import AuthorDataCard from 'components/Desktop/AuthorDataCard.vue'

export default {
  name: 'CreatorsCarousel',
  data() {
    return {
      slide: 1
    }
  },
  components: {
    AuthorDataCard
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
.blooprint-carousel {
  height: auto;
  @media only screen and (max-width: $breakpoint-xs-max) {
    height: auto;
  }
}
.card-container {
  margin-top: 60px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 40px;
    padding-right: 10px !important;
    padding-left: 8px !important;
  }
}
</style>
