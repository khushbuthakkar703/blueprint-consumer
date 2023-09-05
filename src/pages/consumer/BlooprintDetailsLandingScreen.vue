<template>
  <q-page class="full-height">
    <div class="bg-white">
      <div v-if="loading">
        <BlooprintTopSectionSkeleton />
      </div>
      <div v-else>
        <BlooprintTopSection
          :purchased="blooprintDetails['attributes']['purchased']"
          :category="blooprintDetails['attributes']['categories'][0]"
          :authorName="blooprintDetails['attributes']['authorName']"
          :authorId="blooprintDetails['attributes']['authorID']"
          :blooprintName="blooprintDetails['attributes']['name']"
          :isWishlisted="blooprintDetails['attributes']['wishlist']"
          :blooprint="blooprintDetails"
          :rating="rating"
          :reviews="totalReviewCount ? totalReviewCount : 0"
          :authorImage="
            authorDetails['picture']
              ? authorDetails['picture']
              : 'UserImage.svg'
          "
          :thumbnailImage="blooprintDetails['attributes']['thumbnail']"
          @clicked="
            () => {
              if (totalReviewCount > 0) showReviewsPopup = true
            }
          "
        />
      </div>
      <q-dialog :maximized="isMobile" persistent v-model="showReviewsPopup">
        <ReviewsPopup />
      </q-dialog>
    </div>
    <div class="bg-solitudeBlue">
      <div class="row justify-between bottom-section">
        <div class="relative-position">
          <HangingCardSkeleton v-if="loading" />
          <HangingCard
            v-else
            :purchased="blooprintDetails['attributes']['purchased']"
            :blooprintName="blooprintDetails['attributes']['name']"
            :currency="blooprintDetails['attributes']['currency']"
            :price="blooprintDetails['attributes']['price']"
            :rating="rating"
            :video="blooprintDetails['attributes']['video']"
            :description="blooprintDetails['attributes']['description']"
            :milestonesList="milestonesList"
            :keypoints="blooprintDetails['attributes']['keypoints']"
            :blooprintDetails="blooprintDetails"
          />
        </div>
        <div class="col-md-9 col-sm-9 col-xs-12 scrollable-section-container">
          <div class="scrollable-section">
            <div id="intro" class="text-regalBlue heading">
              Intro to the blooprint
            </div>
            <BlooprintIntroSkeleton v-if="loading" />
            <BlooprintIntro
              v-else
              :video="blooprintDetails['attributes']['video']"
              :description="blooprintDetails['attributes']['description']"
            />
            <BlooprintLevelAndDurationSkeleton v-if="loading" />
            <BlooprintLevelAndDuration
              v-else
              :level="
                blooprintDetails['attributes']['level'].length
                  ? blooprintDetails['attributes']['level']
                  : 'Beginner'
              "
              :duration="milestoneDurationDays"
              :hours="milestoneDurationHours"
              :minutes="milestoneDurationMinutes"
              :rating="rating.toFixed(1)"
              :reviews="totalReviewCount ? totalReviewCount : 0"
            />

            <div
              id="milestones"
              class="text-regalBlue subheading"
              style="margin-top: 60px"
              v-if="loading || milestonesList.length"
            >
              Milestones
            </div>
            <MilestonesSkeleton v-if="loading" />
            <Milestones v-else :milestonesList="milestonesList" />
            <div id="creator" class="text-regalBlue subheading">
              Meet your blooprint Creator
            </div>
            <BlooprintCreatorSkeleton v-if="loading" />
            <BlooprintCreator
              v-else
              :picture="
                authorDetails['picture']
                  ? authorDetails['picture']
                  : 'UserImage.svg'
              "
              :authorName="blooprintDetails['attributes']['authorName']"
              :description="authorDetails['yourself']"
              :location="authorDetails['location']"
              :authorId="blooprintDetails['attributes']['authorID']"
              :companyName="authorDetails['companyName']"
              :jobTitle="authorDetails['jobRole']"
            />
            <div
              class="row items-center rating-section flex justify-between"
              v-if="blooprintReviewsList.length != 0"
            >
              <div id="reviews" class="text-regalBlue subheading">
                Rating & Reviews
              </div>
              <div class="row no-wrap rating-container">
                <q-skeleton v-if="loading" width="140px" height="27px" />
                <q-rating
                  v-if="!loading"
                  size="27.87px"
                  :max="parseInt(rating)"
                  :value="parseInt(rating)"
                  readonly
                  icon="img:NoStar.svg"
                  icon-selected="img:FullStar.svg"
                  icon-half="img:HalfStar.svg"
                />
                <q-rating
                  v-if="(rating - parseInt(rating)).toFixed(1) > 0 && !loading"
                  style="margin-left:10.57px"
                  size="27.87px"
                  :max="1"
                  :value="Number((rating - parseInt(rating)).toFixed(1))"
                  readonly
                  :icon-half="
                    selectIcon((rating - parseInt(rating)).toFixed(1))
                  "
                />

                <q-rating
                  v-if="!loading"
                  style="margin-left:10.57px"
                  size="27.87px"
                  :max="parseInt(5 - rating)"
                  :value="Number((rating - parseInt(rating)).toFixed(1))"
                  readonly
                  icon="img:NoStar.svg"
                />

                <q-skeleton
                  v-if="loading"
                  height="33.44px"
                  width="100px"
                  style="margin-left: 23.79px"
                />
                <div v-else class="text-comet flex average-rating-text">
                  Average rating <br />
                  {{ rating.toFixed(1) }} / 5
                </div>
              </div>
              <BlooprintReviewsSkeleton v-if="loading" />
              <BlooprintReviews
                v-else
                :blooprintReviewsList="blooprintReviewsList"
              />
            </div>
            <div id="keypoints">
              <div
                style="margin-top: 60px"
                class="gt-sm text-regalBlue subheading"
              >
                Pay per blooprint
              </div>
              <div
                style="margin-top: 60px"
                class="lt-md text-regalBlue subheading"
              >
                Pay per blooprint
              </div>
            </div>

            <PayPerBlooprintSkeleton v-if="loading" />
            <PayPerBlooprint
              v-else
              :purchased="blooprintDetails['attributes']['purchased']"
              :blooprintName="blooprintDetails['attributes']['name']"
              :currency="blooprintDetails['attributes']['currency']"
              :price="blooprintDetails['attributes']['price']"
              :blooprintDetails="blooprintDetails"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import ReviewsPopup from 'src/components/Desktop/ReviewsPopup.vue'
import BlooprintLevelAndDuration from 'src/components/Desktop/BlooprintLevelAndDuration.vue'
import BlooprintLevelAndDurationSkeleton from 'src/components/Desktop/BlooprintLevelAndDurationSkeleton.vue'
import PayPerBlooprint from 'src/components/Desktop/PayPerBlooprint.vue'
import PayPerBlooprintSkeleton from 'src/components/Desktop/PayPerBlooprintSkeleton.vue'
import BlooprintReviews from 'src/components/Desktop/BlooprintReviews.vue'
import BlooprintReviewsSkeleton from 'src/components/Desktop/BlooprintReviewsSkeleton.vue'
import BlooprintCreator from 'src/components/Desktop/BlooprintCreator.vue'
import BlooprintCreatorSkeleton from 'src/components/Desktop/BlooprintCreatorSkeleton.vue'
import Milestones from 'src/components/Desktop/Milestones.vue'
import MilestonesSkeleton from 'src/components/Desktop/MilestonesSkeleton.vue'
import HangingCard from 'src/components/Desktop/HangingCard.vue'
import HangingCardSkeleton from 'src/components/Desktop/HangingCardSkeleton.vue'
import BlooprintIntro from 'src/components/Desktop/BlooprintIntro.vue'
import BlooprintIntroSkeleton from 'src/components/Desktop/BlooprintIntroSkeleton.vue'
import BlooprintTopSection from 'src/components/Desktop/BlooprintTopSection.vue'
import BlooprintTopSectionSkeleton from 'src/components/Desktop/BlooprintTopSectionSkeleton.vue'

import { mapActions } from 'vuex'
import { isLogin } from 'src/utils/common'
export default {
  meta() {
    return {
      title: this.metaTitle,
      meta: {
        description: {
          property: 'description',
          content: this.metaDesc
        },
        ogImage: {
          property: 'og:image',
          content: this.metaImage
        },
        ogTitle: {
          property: 'og:title',
          content: this.metaTitle
        },
        ogDesc: {
          property: 'og:description',
          content: this.metaDesc
        },
        ogUrl: {
          property: 'og:url',
          content: this.metaUrl
        },
        ogType: {
          property: 'og:type',
          content: 'blooprint'
        },
        twitterCard: {
          name: 'twitter:card',
          content: 'summary'
        },
        twitterSite: {
          name: 'twitter:site',
          content: 'summary'
        },
        twitterDesc: {
          name: 'twitter:description',
          content: this.metaDesc
        },
        twitterImage: {
          name: 'twitter:image',
          content: this.metaImage
        },
        twitterTitle: {
          name: 'twitter:title',
          content: this.metaTitle
        }
      }
    }
  },
  data() {
    return {
      loading: true,
      showReviewsPopup: false,
      blooprintDetails: {},
      authorDetails: {},
      totalReviewCount: 0,
      rating: 0,
      blooprintReviewsList: [],
      milestonesList: [],
      milestoneDuration: 0,
      milestoneDurationDays: 0,
      milestoneDurationMinutes: 0,
      milestoneDurationHours: 0,
      additionalHours: 0
    }
  },
  mounted() {
    this.getBlooprintDetails()
  },
  computed: {
    metaTitle() {
      return this.blooprintDetails['attributes'] !== undefined
        ? this.blooprintDetails['attributes']['name'] + ' - blooprinted'
        : 'blooprinted'
    },
    metaDesc() {
      return this.blooprintDetails['attributes'] !== undefined
        ? this.blooprintDetails['attributes']['description']
        : ''
    },
    metaUrl() {
      return window.location
    },

    metaImage() {
      return this.blooprintDetails['attributes'] !== undefined
        ? this.blooprintDetails['attributes']['thumbnail']
        : ''
    },
    isMobile() {
      return window.innerWidth < 601
    }
  },
  methods: {
    ...mapActions([
      'getBlooprintDetailsById',
      'fetchProfileInfo',
      'fetchReviewsList',
      'getBlooprintRating',
      'fetchAllMilestonesByBlooprintId'
    ]),
    //   ************** Method to fetch Blooprint Details By Id **********************
    async getBlooprintDetails() {
      this.loading = true
      this.blooprintId = this.$route.params['blooprintId']
      let data = await this.getBlooprintDetailsById()
      this.loading = false
      if (data['attributes']) {
        this.blooprintDetails = data
        if (data['attributes']['authorID']) {
          this.fetchAuthorDetails(data['attributes']['authorID'])
          this.getReviewList()
          this.getAllMilestonesByBlooprintId()
          this.fetchBlooprintRating()
        }
      }
    },
    // **************** Method to fetch the Milestones List Based on ID ***************************
    async getAllMilestonesByBlooprintId() {
      this.loading = true
      let list = await this.fetchAllMilestonesByBlooprintId()
      this.loading = false
      this.milestonesList = list
      this.getMilestoneDuration()
    },
    // **************** Method to fetch the Author details Based on ID ***************************
    async fetchAuthorDetails(authorID) {
      this.loading = true
      let userData = await this.fetchProfileInfo({ authorId: authorID })
      if (userData['id']) {
        this.loading = false
        this.authorDetails = userData
      }
    },
    // ************* Method to fetch the Reviews List ***************************
    async getReviewList() {
      let params = {
        limit: 4,
        offset: 0,
        blooprintID: this.$route.params['blooprintId']
      }
      this.loading = true
      let list = await this.fetchReviewsList(params)
      this.loading = false
      if (list && list['data']) {
        this.blooprintReviewsList = list['data']
      }
      if (list && list['meta']) {
        this.totalReviewCount = list['meta']['count']
      }
    },
    // ************* Method to fetch the Blooprint Rating ***************************
    async fetchBlooprintRating() {
      let ratingResponse = await this.getBlooprintRating()
      if (!ratingResponse['isError']) {
        this.rating = ratingResponse['value']
      }
    },
    // ***************** Method to retreive Total Tasks Days *********************
    getMilestoneDuration() {
      let days = 0
      let hours = 0
      let minutes = 0
      this.milestonesList.map(milestone => {
        milestone.attributes.tasks.map(task => {
          if (task['duration']['days']) {
            days += task['duration']['days']
          }
          if (task['duration']['hours']) {
            hours += task['duration']['hours']
          }
          if (task['duration']['minutes']) {
            minutes += task['duration']['minutes']
          }
        })
      })
      //get hours
      let totalHours = hours + this.additionalHours
      let seconds = Number(totalHours * 60 * 60) // total hours convert into second
      this.additionalDays = Math.floor(seconds / (3600 * 24)) // total second convert into days
      let hrs = Math.floor((seconds % (3600 * 24)) / 3600) // seconds convert into hours
      //get minutes
      this.additionalHours = Math.floor(minutes / 60)
      let totalMinutes = minutes % 60

      console.log('days', days, this.additionalDays)
      this.milestoneDurationDays = days + this.additionalDays
      this.milestoneDurationHours = hrs + this.additionalHours
      this.milestoneDurationMinutes = totalMinutes
    },

    selectIcon(value) {
      return `img:${value * 100}Star.svg`
    }
  },
  components: {
    ReviewsPopup,
    PayPerBlooprint,
    PayPerBlooprintSkeleton,
    BlooprintReviews,
    BlooprintReviewsSkeleton,
    BlooprintCreator,
    BlooprintCreatorSkeleton,
    Milestones,
    MilestonesSkeleton,
    HangingCard,
    HangingCardSkeleton,
    BlooprintIntro,
    BlooprintIntroSkeleton,
    BlooprintTopSection,
    BlooprintTopSectionSkeleton,
    BlooprintLevelAndDuration,
    BlooprintLevelAndDurationSkeleton
  }
}
</script>
<style lang="scss" scoped>
.bottom-section {
  padding-top: 62px;
  padding-left: 52px;
  padding-right: 52px;
  @media only screen and (max-width: $breakpoint-xs) {
    padding-top: 18px;
    padding-left: 15px;
    padding-right: 14px;
  }
  @media only screen and (max-width: 840px) {
    justify-content: center;
  }
  @media only screen and (max-width: 330px) {
    overflow: hidden;
  }
}

.scrollable-section {
  margin-left: 40px;
  .heading {
    font-weight: 600;
    font-size: 48px;
    line-height: 56px;
    @media only screen and (max-width: $breakpoint-xs) {
      font-size: 32px;
      line-height: 36px;
    }
  }
  .subheading {
    font-weight: 600;
    font-size: 32px;
    line-height: 36px;
    @media only screen and (max-width: $breakpoint-xs) {
      font-size: 24px;
      line-height: 28px;
    }
  }
  @media only screen and (max-width: 840px) {
    margin-left: 0px;
  }
}
.scrollable-section-container {
  @media only screen and (max-width: 1480px) {
    width: 65%;
  }
  @media only screen and (max-width: 1100px) {
    width: 58%;
  }
  @media only screen and (max-width: 840px) {
    width: 100%;
    margin-top: 60px;
  }
}
.rating-section {
  margin-top: 62px;
  .average-rating-text {
    margin-left: 21px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    @media only screen and (max-width: $breakpoint-xs) {
      color: #7d8089;
    }
    @media only screen and (max-width: 348px) {
      margin-left: 4px;
      margin-top: 10px;
    }
    @media only screen and (max-width: 340px) {
      margin-right: 20px;
    }
  }
  #reviews {
    @media only screen and (max-width: 700px) and (min-width: 683px) {
      width: 100%;
    }
    @media only screen and (max-width: 560px) and (min-width: 540px) {
      width: 100%;
    }
  }
  .rating-container {
    @media only screen and (max-width: 1100px) {
      margin-top: 16px;
    }
    @media only screen and (max-width: 840px) and (min-width: 701px) {
      margin-top: 0px;
    }
    @media only screen and (max-width: 599px) and (min-width: 561px) {
      margin-top: 0px;
    }
    @media only screen and (max-width: 350px) {
      flex-wrap: wrap;
    }
  }
  @media only screen and (max-width: $breakpoint-sm) {
    margin-top: 60px;
  }
  .subheading {
    @media only screen and (max-width: $breakpoint-xs) {
      color: black;
    }
  }
}
::v-deep {
  .q-rating__icon + .q-rating__icon {
    margin-left: 10.57px;
  }
}
</style>
