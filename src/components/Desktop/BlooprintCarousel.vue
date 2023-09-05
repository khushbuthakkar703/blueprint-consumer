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
    height="400px"
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
    </q-carousel-slide>
  </q-carousel>
</template>
<script>
import BlooprintDataCard from 'components/Desktop/BlooprintDataCard.vue'

export default {
  name: 'BlooprintCarousel',
  data() {
    return {
      slide: 1,
      blooprintSelected: {}
    }
  },
  components: {
    BlooprintDataCard
  },
  props: ['carouselFeatureArray'],
  methods: {
    // *********** Triggers when a Wishlist icon is clicked *******************************
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
    right: 20px !important;
  }
  .q-carousel__navigation--bottom {
    bottom: -6px !important;
  }
}
</style>
