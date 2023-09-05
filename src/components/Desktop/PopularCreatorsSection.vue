<template>
  <div>
    <div class="popular-creators-section bg-solitudeBlue">
      <div class="row section-padding reveal fade-bottom">
        <div class="col-md-6 col-sm-10 col-xs-12 heading text-regalBlue">
          Meet some of our Creators
        </div>
        <div
          class="col-md-7 col-sm-12 col-xs-12 description text-regalBlue full-width"
        >
          Get to know some of our top Creators from around the world
        </div>
      </div>
      <div v-if="isLoading" class="q-mt-xl section-padding">
        <CreatorsSkeletonCard />
      </div>
      <NoDataMessageDisplay v-if="!isLoading && creatorsList.length == 0" />
      <div v-else>
        <div v-swiper:mySwiperRef="swiperOption" class="swiper-container">
          <div class="swiper-wrapper">
            <div
              v-for="featureData in creatorsList"
              :key="featureData.id"
              class="swiper-slide card-container reveal fade-right"
            >
              <AuthorDataCard
                :jobRole="featureData.attributes.jobRole"
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
        </div>
      </div>
    </div>
    <div class="image-container relative-position gt-xs overflow-hidden">
      <div>
        <q-img
          class="creators-section-image relative-position"
          contain
          src="~assets/creator-section-image.png"
          position="left center"
        >
          <div class="row transparent text-section">
            <div class="col-md-8 col-sm-7 text-container">
              <div
                class="image-text-heading text-white container-width reveal fade-right"
              >
                Become a blooprinted Creator today
              </div>
              <div class="image-text-description text-white reveal fade-right">
                Create your own blooprint and share your knowledge and skills
                with thousands of blooprinted members!
              </div>
              <q-btn
                color="primary"
                label="Become a Creator"
                no-caps
                no-wrap
                @click="navigateToStudioScreen"
                class="text-body1 f-w-600 creator-btn q-px-md reveal fade-bottom"
                style="border-radius: 10px; height: 60px; width: 287px"
              >
                <div class="col q-py-xs text-left relative-position">
                  <q-avatar class="arrow" style="margin-left: 15px" size="18px">
                    <img src="~assets/chevron-right.svg" />
                  </q-avatar>
                </div>
              </q-btn>
            </div>
          </div>
        </q-img>
      </div>
    </div>
    <div class="relative-position image-mobile-container lt-sm">
      <div>
        <q-img
          class="creators-section-image-mobile relative-position"
          contain
          src="~assets/creator-section-image-mobile.png"
        >
          <div class="row transparent text-section">
            <div class="col-md-8 col-sm-7 col-xs-8 text-container">
              <div class="image-text-heading text-white reveal fade-left">
                Become a blooprinted Creator today
              </div>
              <div class="image-text-description text-white reveal fade-left">
                Create your own blooprint and share your knowledge and skills
                with thousands of blooprinted members!
              </div>
              <q-btn
                color="primary"
                label="Become a Creator"
                no-caps
                no-wrap
                @click="navigateToStudioScreen"
                class="btn-text f-w-600 q-pl-sm reveal fade-bottom"
                style="border-radius: 10px; height: 50px; width: 230px"
              >
                <div class="col q-py-xs text-left relative-position">
                  <q-avatar class="arrow" style="margin-left: 15px" size="18px">
                    <img src="~assets/chevron-right.svg" />
                  </q-avatar>
                </div>
              </q-btn>
            </div>
          </div>
        </q-img>
      </div>
    </div>
    <div style="margin: 100px 52px" class="gt-xs">
      <q-separator color="solitudeBlue" size="5px" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CreatorsSkeletonCard from 'components/Desktop/CreatorsSkeletonCard.vue'
import AuthorDataCard from 'components/Desktop/AuthorDataCard.vue'
import NoDataMessageDisplay from 'components/Desktop/NoDataMessageDisplay.vue'

import { openStudioScreen } from '../../utils/common'
export default {
  data() {
    return {
      creatorsList: [],

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
          1342: {
            slidesPerView: 3.8
          },
          1060: {
            slidesPerView: 3
          },
          990: {
            slidesPerView: 2.8
          },
          880: {
            slidesPerView: 2.5
          },
          633: {
            slidesPerView: 1.8
          },
          510: {
            slidesPerView: 1.5
          },
          440: {
            slidesPerView: 1.3
          },
          375: {
            slidesPerView: 1.1
          }
        }
      }
    }
  },
  components: { AuthorDataCard, CreatorsSkeletonCard, NoDataMessageDisplay },
  mounted() {
    this.getPopularAuthors()
  },
  methods: {
    ...mapActions(['fetchPopularAuthorsList']),
    navigateToStudioScreen() {
      openStudioScreen()
    },
    // ************* Method to retrieve Popular Authors List **********************
    async getPopularAuthors() {
      this.isLoading = true
      let response = await this.fetchPopularAuthorsList()
      this.isLoading = false
      this.creatorsList = response
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-slide {
  width: 319px !important;
  height: max-content !important;
}
.swiper-wrapper {
  margin-left: 52px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-left: 15px;
  }
}
.card-container {
  margin-top: 60px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 40px;
  }
}
.section-padding {
  padding-left: 52px;
  padding-right: 52px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-left: 15px;
    padding-right: 15px;
  }
}
.popular-creators-section {
  margin-top: 100px;
  padding-top: 60px;
  background: linear-gradient(
    to top,
    white 30%,
    $solitudeBlue 30%,
    $solitudeBlue
  );
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-top: 40px;
    margin-top: 70px;
    background: linear-gradient(
      to top,
      white 40%,
      $solitudeBlue 40%,
      $solitudeBlue
    );
  }
}

.heading {
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 32px;
    line-height: 36px;
    color: black;
  }
}
.description {
  margin-top: 30px;
  font-size: 20px;
  line-height: 28px;
  font-weight: 400;
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 20px;
    font-size: 20px;
    line-height: 28px;
    color: black;
  }
}
.creators-section-image {
  border-radius: 20px 20px 20px 20px;
  width: 100%;
  overflow: unset !important;
  min-height: 40vh;
  @media only screen and (max-width: 1290px) {
    width: 100vw;
    border-radius: 0px 0px 0px 0px;
  }
  @media only screen and (max-width: 1050px) {
    width: 125vw;
  }
  @media only screen and (max-width: 900px) {
    width: 130vw;
  }
  @media only screen and (max-width: 644px) {
    width: 140vw;
  }
}
.creators-section-image-mobile {
  overflow: unset !important;
  min-height: 40vh;
}
.image-mobile-container {
  margin-top: 60px;
}
.image-container {
  margin-left: 52px;
  margin-right: 52px;
  margin-top: 103px;
  @media only screen and (max-width: 1290px) {
    margin-left: 0px;
    margin-right: 0px;
  }
}
.image-text-heading {
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 32px;
    line-height: 36px;
  }
}
.image-text-description {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-top: 20px;
  margin-bottom: 40px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 16px;
    line-height: 24px;
    margin-top: 10px;
    margin-bottom: 30px;
  }
}
::v-deep {
  .creator-btn {
    .block {
      font-size: 20px;
      line-height: 28px;
    }
  }
}
.text-section {
  left: 67%;
  bottom: 10%;
  @media only screen and (min-width: 2000px) {
    left: 70%;
    bottom: 20%;
  }
  @media only screen and (max-width: 1290px) {
    left: 60%;
    bottom: 10%;
  }
  @media only screen and (max-width: 1050px) {
    left: 38%;
    bottom: 5%;
  }
  @media only screen and (max-width: 883px) {
    left: 30%;
    bottom: 5%;
  }
  @media only screen and (max-width: 700px) {
    left: 28%;
    bottom: 2%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    left: 0%;
    bottom: 0%;
    padding: 0px 30px;
    padding-bottom: 60px;
  }
  .container-width {
    width: 25rem;
  }
}
.btn-text {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
}
</style>
