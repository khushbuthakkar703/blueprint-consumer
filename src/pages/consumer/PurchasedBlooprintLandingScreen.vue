<template>
  <q-page class="bg-solitudeBlue">
    <div class="row screen-padding" v-if="isLoading">
      <PurchasedBlooprintLandingScreenSkeleton />
    </div>
    <div class="screen-padding" v-else>
      <div class="row" v-if="$q.screen.gt.sm">
        <div class="">
          <div class="full-width">
            <BlooprintProgressInfoCard
              :isMileStoneLoading="isMileStoneLoading"
              :isRatingLoading="isRatingLoading"
              :isReviewCountLoading="isReviewCountLoading"
              :isLoggedInUserReviewLoading="isLoggedInUserReviewLoading"
              :authorDetails="authorDetails"
              :blooprintDetails="blooprintDetails"
              :totalReviewCount="totalReviewCount"
              :rating="rating"
              :blooprintMileStoneList="blooprintMileStoneList"
              @create-review-popup-open="onCreateReviewPopupOpen"
              @is-popup-rescheduled="reschedulePopup"
              :isReviewSubmitted="isReviewSubmitted"
            />
            <AuthorProfileCard :authorDetails="authorDetails" />
          </div>
        </div>
        <div class="col">
          <div style="padding-left:19px">
            <q-card bordered class="milestone-card">
              <q-card-section>
                <DesktopMilestonesList
                  :isMileStoneLoading="isMileStoneLoading"
                  :blooprintMileStoneList="blooprintMileStoneList"
                  :blooprintDetails="blooprintDetails"
                  @on-task-complete="onTaskMarkedAsComplete"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div v-if="$q.screen.lt.md">
        <BlooprintProgressInfoCard
          :isMileStoneLoading="isMileStoneLoading"
          :isRatingLoading="isRatingLoading"
          :isReviewCountLoading="isReviewCountLoading"
          :isLoggedInUserReviewLoading="isLoggedInUserReviewLoading"
          :authorDetails="authorDetails"
          :blooprintDetails="blooprintDetails"
          :totalReviewCount="totalReviewCount"
          :rating="rating"
          :blooprintMileStoneList="blooprintMileStoneList"
          @create-review-popup-open="onCreateReviewPopupOpen"
          @is-popup-rescheduled="reschedulePopup"
          :isReviewSubmitted="isReviewSubmitted"
        />
        <DesktopMilestonesList
          :isMileStoneLoading="isMileStoneLoading"
          :blooprintMileStoneList="blooprintMileStoneList"
          :blooprintDetails="blooprintDetails"
          @on-task-complete="onTaskMarkedAsComplete"
        />
        <AuthorProfileCard :authorDetails="authorDetails" />
      </div>
      <CreateReviewPopup
        v-if="showcreateReviewPopup"
        :requestFrom="requestFrom"
        :blooprintDetails="blooprintDetails"
        @create-review-popup-close="onCreateReviewPopupClose"
      />
    </div>
  </q-page>
</template>
<script>
import BlooprintProgressInfoCard from '../../components/Desktop/BlooprintProgressInfoCard.vue'
import PurchasedBlooprintLandingScreenSkeleton from '../../components/Desktop/PurchasedBlooprintLandingScreenSkeleton.vue'
import AuthorProfileCard from '../../components/Desktop/AuthorProfileCard.vue'
import CreateReviewPopup from '../../components/Desktop/CreateReviewPopup.vue'
import DesktopMilestonesList from './DesktopMilestonesList.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  meta() {
    return {
      title: this.blooprintDetails?.attributes?.name
        ? this.blooprintDetails?.attributes?.name + ' - blooprinted'
        : 'My blooprints - blooprinted'
    }
  },
  data() {
    return {
      isLoading: true,
      isBlooprintLoading: true,
      isProfileLoading: true,
      isMileStoneLoading: true,
      isRatingLoading: true,
      isReviewCountLoading: true,
      isLoggedInUserReviewLoading: true,
      blooprintDetails: {},
      authorDetails: {},
      blooprintReviewsList: [],
      totalReviewCount: 0,
      blooprintMileStoneList: [],
      rating: 0,
      showcreateReviewPopup: false,
      requestFrom: '',
      isReviewSubmitted: false,
      from: null
    }
  },
  components: {
    BlooprintProgressInfoCard,
    PurchasedBlooprintLandingScreenSkeleton,
    AuthorProfileCard,
    DesktopMilestonesList,
    CreateReviewPopup
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.from = from
    })
  },
  mounted() {
    this.getBlooprintDetails()
  },
  computed: {
    ...mapGetters(['userProfile'])
  },
  methods: {
    ...mapActions([
      'getBlooprintDetailsById',
      'fetchProfileInfo',
      'fetchReviewsList',
      'fetchAllMilestonesByBlooprintId',
      'getBlooprintRating',
      'fetchLoggedInUserDetails'
    ]),
    //   ************** Method to fetch Blooprint Details By Id **********************
    async getBlooprintDetails() {
      this.isBlooprintLoading = true
      this.isLoading = true
      this.blooprintId = this.$route.params['blooprintId']
      let data = await this.getBlooprintDetailsById()
      this.isBlooprintLoading = false
      this.isLoading = false
      if (data['attributes'] && data['attributes']['purchased']) {
        this.blooprintDetails = data
        if (data['attributes']['authorID']) {
          this.fetchAuthorDetails(data['attributes']['authorID'])
          this.getAllMilestonesByBlooprintId()
          this.getReviewList()
          this.fetchBlooprintRating()
          this.checkUserIdIsPresent()
        }
      } else {
        if (this.from && this.from.name) {
          this.$router.replace({ name: this.from.name }, () => {})
        } else {
          this.$router.replace(
            {
              name: 'blooprint landing page',
              params: { blooprintId: this.$route.params['blooprintId'] }
            },
            () => {}
          )
        }
      }
    },
    // **************** Method to fetch the Author details Based on ID ***************************
    async fetchAuthorDetails(authorID) {
      this.isProfileLoading = true
      this.isLoading = true
      let userData = await this.fetchProfileInfo({ authorId: authorID })
      this.isLoading = false
      this.isProfileLoading = false
      if (userData['id']) {
        this.authorDetails = userData
      }
    },
    // **************** Method to fetch the Milestones List Based on ID ***************************
    async getAllMilestonesByBlooprintId() {
      this.isMileStoneLoading = true
      this.isLoading = true
      let list = await this.fetchAllMilestonesByBlooprintId()
      this.isMileStoneLoading = false
      this.isLoading = false
      list.map(item => {
        item['isOpened'] = false
        let count = 0
        item['attributes']['tasks'].map(task => {
          task['isOpened'] = false
          if (task['completed']) {
            count++
          }
        })
        item['isCompleted'] = count == item['attributes']['tasks'].length
      })
      this.blooprintMileStoneList = list
    },
    // ************* Method to fetch the Blooprint Rating ***************************
    async fetchBlooprintRating() {
      this.isRatingLoading = true
      let ratingResponse = await this.getBlooprintRating()
      this.isRatingLoading = false
      if (!ratingResponse['isError']) {
        this.rating = ratingResponse['value']
      }
    },
    // ************* Method to fetch the Reviews List ***************************
    async getReviewList() {
      let params = {
        limit: 10,
        offset: 0,
        blooprintID: this.$route.params['blooprintId']
      }
      this.isReviewCountLoading = true
      let list = await this.fetchReviewsList(params)
      this.isReviewCountLoading = false
      if (list && list['data']) {
        this.blooprintReviewsList = list['data']
      }
      if (list && list['meta']) {
        this.totalReviewCount = list['meta']['count']
      }
    },
    async checkUserIdIsPresent() {
      if (this.userProfile?.id) {
        this.getLoggedUserBlooprintReviewDetails()
      } else {
        await this.fetchLoggedInUserDetails()
        this.getLoggedUserBlooprintReviewDetails()
      }
    },
    async getLoggedUserBlooprintReviewDetails() {
      this.isLoggedInUserReviewLoading = true
      let params = {
        limit: 10,
        offset: 0,
        blooprintID: this.$route.params['blooprintId'],
        customerID: this.userProfile?.id
      }
      let data = await this.fetchReviewsList(params)
      this.isLoggedInUserReviewLoading = false
      if (data) {
        this.isReviewSubmitted = Number(data?.meta?.count) != 0
      }
    },
    onCreateReviewPopupOpen(event) {
      this.requestFrom = event['requestFrom']
      this.showcreateReviewPopup = true
    },
    onCreateReviewPopupClose(event) {
      this.showcreateReviewPopup = false
      if (event['isReviewSaved'] && !event['isReviewEdit']) {
        this.getBlooprintDetails()
        this.getLoggedUserBlooprintReviewDetails()
      }
    },
    onTaskMarkedAsComplete(event) {
      this.showcreateReviewPopup = false
      this.blooprintMileStoneList.forEach(milestones => {
        if (milestones['id'] == event['milestoneSelected']['id']) {
          milestones['attributes']['tasks'].forEach(task => {
            if (task['id'] == event['taskSelected']['id']) {
              task['completed'] = true
            }
          })
        }
      })
      this.blooprintMileStoneList.map(item => {
        let count = 0
        item['attributes']['tasks'].map(task => {
          if (task['completed']) {
            count++
          }
        })
        item['isCompleted'] = count == item['attributes']['tasks'].length
      })
      let counter = 0
      this.blooprintMileStoneList.map(item => {
        if (item['isCompleted']) {
          counter++
        }
      })
      if (counter == this.blooprintMileStoneList.length) {
        this.showcreateReviewPopup = true
      }
    },
    reschedulePopup(event) {
      if (event) {
        this.getAllMilestonesByBlooprintId()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.screen-padding {
  padding: 42px 52px 50px 52px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 15px 15px 59px 15px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 15px 15px 59px 15px;
  }
}
.milestone-card {
  filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));
  border-radius: 20px;
  .q-card__section--vert {
    padding: 40px !important;
    @media only screen and (max-width: $breakpoint-sm-max) {
      padding: 20px !important;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      padding: 20px !important;
    }
  }
}
</style>
