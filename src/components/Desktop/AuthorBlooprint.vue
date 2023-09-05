<template>
  <q-card
    class="right-card bloooprint-section overflow-hidden nowrap"
    v-if="authorBlooprints.length !== 0"
  >
    <div v-if="profile.firstName">
      <div class="text-regalBlue text-fs-24-lh-32 f-w-600 about-me-name">
        {{ profile.firstName }}
      </div>

      <span class="text-regalBlue text-fs-24-lh-32 f-w-600 span-class"
        >'s blooprints</span
      >
    </div>
    <div v-else>
      <q-skeleton
        type="text"
        width="25%"
        height="50px"
        style="border-radius: 0px"
      />
    </div>
    <div class="q-mt-xl q-mb-lg" v-if="blooprintsLoading">
      <BlooprintSkeletonCard :totalCards="2" requestFrom="authorblooprint" />
    </div>

    <div v-else class="row full-width" style="margin-top: 30px">
      <div
        v-swiper:mySwiperRef="swiperOption"
        style="height:400px; width:100%"
        class="swiper-container"
      >
        <div class="swiper-wrapper">
          <div
            v-for="featureData in authorBlooprints"
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
  </q-card>
</template>

<script>
import BlooprintDataCard from 'src/components/Desktop/BlooprintDataCard'
import BlooprintSkeletonCard from 'src/components/Desktop/BlooprintSkeletonCard'
export default {
  name: 'AuthorBlooprint',
  props: ['profile', 'authorBlooprints', 'blooprintsLoading'],
  components: { BlooprintDataCard, BlooprintSkeletonCard },
  data() {
    return {
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
          1630: {
            slidesPerView: 2.99
          },
          1600: {
            slidesPerView: 2.9
          },
          1582: {
            slidesPerView: 2.8
          },
          1450: {
            slidesPerView: 2.4
          },
          1377: {
            slidesPerView: 2.2
          },
          1288: {
            slidesPerView: 2
          },
          1240: {
            slidesPerView: 1.8
          },
          1150: {
            slidesPerView: 1.7
          },
          1102: {
            slidesPerView: 1.6
          },
          1030: {
            slidesPerView: 1.5
          },
          1023: {
            slidesPerView: 1.4
          },
          1008: {
            slidesPerView: 2.8
          },
          905: {
            slidesPerView: 2.5
          },
          872: {
            slidesPerView: 2.4
          },
          837: {
            slidesPerView: 2.3
          },
          750: {
            slidesPerView: 2
          },
          668: {
            slidesPerView: 1.8
          },
          634: {
            slidesPerView: 1.7
          },
          568: {
            slidesPerView: 1.6
          },
          534: {
            slidesPerView: 1.5
          },
          500: {
            slidesPerView: 1.4
          },
          466: {
            slidesPerView: 1.3
          },
          432: {
            slidesPerView: 1.2
          },
          426: {
            slidesPerView: 1.18
          },
          409: {
            slidesPerView: 1.13
          },
          398: {
            slidesPerView: 1.1
          },
          381: {
            slidesPerView: 1.05
          },
          373: {
            slidesPerView: 1.025
          },
          365: {
            slidesPerView: 1
          },
          345: {
            slidesPerView: 1.1
          },
          340: {
            slidesPerView: 1.05
          },
          300: {
            slidesPerView: 1
          }
        }
      }
    }
  },
  methods: {
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
.swiper-slide {
  width: 319px !important;
  height: 365px !important;
  @media only screen and (max-width: 365px) {
    width: 270px !important;
  }
}
.right-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 10px 20px $shadow;
  border-radius: 20px;

  @media only screen and (max-width: $breakpoint-sm-max) {
    border-radius: 0px !important;
  }
  @media only screen and (max-width: 1023px) and (min-width: 600px) {
    box-shadow: 0px 0px 0px !important;
  }
}
.bloooprint-section {
  margin-top: 20px;
  padding: 40px 40px 10px 40px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 30px 15px 0px 15px !important;
  }
}

.author-name {
  width: 40vw;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 60vw;
  }
}

.blooprint-name {
  width: 20vw;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 30vw;
  }
}

.blooprint-2-cards {
  &:first-child {
    margin-right: 25px !important;
    @media only screen and (max-width: 1023px) and (min-width: 600px) {
      margin-right: 20px !important;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      margin-right: 0px !important;
      margin-bottom: 20px !important;
    }
  }
}

.blooprint-card {
  width: 29vw;

  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 90vw;
  }
}
.blooprint-card-1 {
  width: 28vw;
  margin-right: 0px !important;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 45vw;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 100vw;
  }
}
.about-me-name {
  max-width: 30vw;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.about-me-name {
  float: left;
}

.span-class {
  clear: left;
}
</style>
