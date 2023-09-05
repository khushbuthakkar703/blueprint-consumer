<template>
  <q-page>
    <DesktopBlooprintDetailsSkeleton v-if="loading" />
    <div
      v-else-if="errorInGettingBlooprintById.length"
      class="absolute-center text-center text-subtitle1 q-my-lg"
    >
      {{ errorInGettingBlooprintById }}
    </div>
    <div v-else>
      <q-img
        loading="eager"
        class="relative-position"
        :src="blooprintDetails['attributes']['banner']"
        style="max-height:53vh"
      >
        <div
          class="q-mx-lg q-pa-md absolute-position rounded-borders description-box"
        >
          <div
            class="q-mb-sm q-pa-sm text-white text-h5 text-weight-medium word-break-break-word"
          >
            {{ blooprintDetails['attributes']['name'] }}
          </div>
          <div
            class="q-mt-sm q-px-sm q-py-xs text-white description-text relative-position word-break-break-word"
            v-if="blooprintDetails['attributes']['description']"
          >
            {{
              seeMore
                ? blooprintDetails['attributes']['description']
                : blooprintDetails['attributes']['description'].slice(0, 400)
            }}
            <div
              v-if="blooprintDetails['attributes']['description'].length > 400"
              class="q-mt-lg"
            >
              <div
                v-if="!seeMore"
                class="absolute-bottom-right cursor-pointer q-px-sm"
                @click="seeMore = !seeMore"
              >
                see more..
              </div>
              <div
                v-else
                class="absolute-bottom-right cursor-pointer q-px-sm"
                @click="seeMore = !seeMore"
              >
                hide more..
              </div>
            </div>
          </div>
        </div>
      </q-img>
      <div class="row flex justify-between q-mx-md-xl q-mx-sm-lg q-mx-xs-lg">
        <div class="col-md-8 col-sm-12 col-xs-12 q-mt-xl blooprint-description">
          <div
            class="text-nightRider text-h5 text-weight-medium word-break-break-word"
          >
            {{ blooprintDetails['attributes']['name'] }}
          </div>
          <div class="q-mt-sm text-dimGrey word-break-break-word">
            {{ blooprintDetails['attributes']['description'] }}
          </div>
        </div>
        <div class="col-md-8 col-sm-12 col-xs-12 q-mb-xl q-mt-lg">
          <div v-if="blooprintDetails['attributes']['video']">
            <div class="text-nightRider text-h5 text-weight-medium ">
              Intro
            </div>
            <div class="q-my-md">
              <q-video
                class="rounded-borders"
                :ratio="21 / 9"
                :src="blooprintDetails['attributes']['video']"
              ></q-video>
            </div>
          </div>
          <div class="text-nightRider text-h5 text-weight-medium q-mt-lg">
            Content
          </div>
          <div class="flex justify-between">
            <div class="text-grey text-body2">
              {{ milestonesList.length }} Milestones .
              {{ getTotalTasksCount() }} Task{{
                getTotalTasksCount() > 1 ? 's' : ''
              }}
            </div>
            <div class="flex text-nightRider">
              <div class="q-mt-xs q-mx-sm text-body1">
                {{ ratingValue.toFixed(1) }}
              </div>
              <RatingIcon
                ratingClass="q-mb-xs"
                :ratingValue="ratingValue"
                iconSize="20px"
                color="primary"
                :isReadOnly="true"
                @fetch-rating="fetchRating"
              />
              <!-- (120) -->
            </div>
          </div>
          <div class="q-my-md">
            <q-list
              class="bg-white"
              bordered
              v-for="(milestone, index) in milestonesList"
              :key="milestone.id"
            >
              <q-expansion-item>
                <template v-slot:header>
                  <q-item-section
                    avatar
                    class="text-nightRider flex flex-center "
                  >
                    {{ index + 1 }}
                  </q-item-section>
                  <q-item-section
                    class="text-nightRider text-weight-medium word-break-break-word"
                  >
                    {{ milestone['attributes']['name'] }}
                  </q-item-section>
                  <div class="row q-ml-lg">
                    <q-item-section class="task-details" side
                      >{{ milestone.attributes.tasks.length }} Task{{
                        milestone.attributes.tasks.length > 1 ? 's' : ''
                      }}
                    </q-item-section>
                    <q-item-section> | </q-item-section>
                    <q-item-section side class="task-details"
                      >{{ totalMileStoneDays(milestone.attributes.tasks) }} Days
                    </q-item-section>
                  </div>
                </template>
                <q-list dense padding class="rounded-borders">
                  <q-item
                    v-ripple
                    v-for="task in milestone.attributes.tasks"
                    :key="task.id"
                  >
                    <q-item-section
                      class="row flex text-center justify-between"
                      no-wrap
                    >
                      <div
                        class="row no-wrap items-center text-nightRider q-pl-md-md q-pl-sm-sm q-pl-xs-sm q-my-xs"
                        :class="
                          blooprintDetails['attributes']['purchased']
                            ? 'cursor-pointer'
                            : null
                        "
                        @click="onTaskSelect(task, milestone)"
                      >
                        <q-avatar
                          size="14px"
                          color="indigo-10"
                          class="q-mr-md"
                        />
                        <div
                          class="q-ml-md-sm q-ml-sm-md q-ml-xs-md text-left col-md-10 col-sm-8 col-xs-8 word-break-break-word"
                          style="white-space:initial"
                        >
                          <div style="max-width:90%">{{ task.name }}</div>
                        </div>
                        <!-- <div class="col-sm col-xs-9 text-right">
                           Scheduled on 1 Feb to 4 Feb 2021
                        </div> -->
                        <div
                          class="col-md-1 q-mx-md text-dimGrey col-sm-2 col-xs-2"
                        >
                          {{ task.days }} day{{ task.days > 1 ? 's' : '' }}
                        </div>
                        <!-- <div class="col-sm-1 col-xs-1 text-right">
                          <q-icon v-if="j % 2 == 0" name="attach_file" />
                        </div> -->
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>
            </q-list>
          </div>
          <div
            class="text-nightRider text-h5 text-weight-medium q-mt-lg q-mb-sm"
          >
            About Author
          </div>
          <div class="row border-secondary q-pa-md bg-white justify-center">
            <div class="col-md-3 col-sm-3 col-xs-5 text-center">
              <q-img
                class="cursor-pointer full-width author-image"
                :src="
                  authorDetails['picture']
                    ? authorDetails['picture']
                    : 'UserImage.svg'
                "
                @click="
                  navigateToAuthorScreen(
                    blooprintDetails['attributes']['authorID']
                  )
                "
                contain
              />
            </div>
            <div
              class="col-md col-sm col-xs-12 q-px-md-md q-px-sm-md text-dimGrey relative-position"
            >
              <div
                class="text-nightRider center-text-display text-bold q-mt-sm word-break-break-word"
              >
                <span
                  class="cursor-pointer"
                  @click="
                    navigateToAuthorScreen(
                      blooprintDetails['attributes']['authorID']
                    )
                  "
                >
                  {{ authorDetails['firstName'] }}
                  {{ authorDetails['lastName'] }}
                </span>
              </div>
              <div
                class="text-nightRider center-text-display text-bold q-mt-sm"
              >
                {{ authorDetails['location'] }}
              </div>
              <div class="gt-xs q-my-sm">
                <span class="gt-sm ellipsis-3-lines word-break-break-word">
                  {{ authorDetails['yourself'] }}
                </span>
                <span class="lt-md ellipsis-2-lines word-break-break-word">
                  {{ authorDetails['yourself'] }}
                </span>
              </div>
              <q-btn
                color="primary"
                size="16px"
                :label="
                  authorDetails['currentUserFollowing'] ? 'Following' : 'Follow'
                "
                class="flat gt-xs absolute author-follow-btn"
                @click="onFollowClick"
                no-caps
                type="submit"
              />
              <div class="lt-sm text-center">
                <q-btn
                  color="primary"
                  size="16px"
                  :label="
                    authorDetails['currentUserFollowing']
                      ? 'Following'
                      : 'Follow'
                  "
                  class="flat"
                  style="width: 40%"
                  @click="onFollowClick"
                  no-caps
                  type="submit"
                />
              </div>
            </div>
          </div>
          <div
            class="text-nightRider text-h5 text-weight-medium q-mt-lg q-mb-md"
          >
            Reviews ({{ totalReviewCount }})
          </div>
          <div
            class="q-mt-sm bg-white text-center q-px-lg q-py-md border-secondary text-body1"
            v-if="blooprintReviewsList.length == 0"
          >
            There are no Reviews to display
          </div>
          <div v-for="review in blooprintReviewsList" :key="review.id">
            <div class="text-grey">
              {{ getFormattedDate(review.attributes.createdDate) }}
            </div>
            <div class="row">
              <div
                class="text-nightRider col text-left text-bold word-break-break-word"
              >
                {{ review.attributes.customerName }}
              </div>
              <div class="col text-right">
                <RatingIcon
                  ratingClass="q-mb-xs"
                  color="primary"
                  :ratingValue="review.attributes.blooprintRating"
                  iconSize="16px"
                  :isReadOnly="true"
                  isListView="list"
                />
              </div>
            </div>

            <div class="text-dimGrey word-break-break-word">
              {{ review.attributes.blooprintReview }}
            </div>
            <q-separator class="q-my-md" />
          </div>
          <div v-if="totalReviewCount >= 3" class="text-smalt q-mb-sm ">
            <span class="cursor-pointer" @click="onShowMoreClick()">
              Show More</span
            >
          </div>
        </div>
        <!-- *************************** Author Details  ******************************** -->
        <div
          class="col-md-4 col-sm-12 col-xs-12 q-pl-md-xl q-ml-md-xl q-my-xl author-view"
        >
          <div class="row flex flex-center">
            <div class="col-10">
              <q-img
                class="border-secondary cursor-pointer"
                :ratio="3 / 2"
                cover
                style="border-bottom-left-radius: 0px !important; border-bottom-right-radius:0px !important"
                :src="
                  blooprintDetails['attributes']['thumbnail']
                    ? blooprintDetails['attributes']['thumbnail']
                    : '~assets/UserImage.svg'
                "
                @click="
                  navigateToAuthorScreen(
                    blooprintDetails['attributes']['authorID']
                  )
                "
              />
              <div
                class="border-secondary q-px-lg q-py-md bg-white"
                style="border-top-left-radius:0px !important; border-top-right-radius: 0px !important"
              >
                <!-- <div class="text-nightRider text-body1 text-bold">
                  <span
                    class="cursor-pointer"
                    @click="
                      navigateToAuthorScreen(
                        blooprintDetails['attributes']['authorID']
                      )
                    "
                  >
                    {{ blooprintDetails['attributes']['authorName'] }}
                  </span>
                </div> -->
                <div
                  class="text-nightRider q-mt-sm q-mb-xs word-break-break-word ellipsis-4-lines"
                >
                  {{ blooprintDetails['attributes']['name'] }}
                </div>
                <div class="text-nightRider text-h6">
                  {{ blooprintDetails['attributes']['currency'] }}
                  {{ blooprintDetails['attributes']['price'] }}
                </div>
                <q-btn
                  color="primary"
                  label="Buy Now"
                  class="q-mt-sm full-width flat q-py-sm text-subtitle1 text-weight-medium"
                  no-caps
                  type="submit"
                  @click="onBuyNowClick"
                />
              </div>
              <q-btn
                v-if="blooprintDetails['attributes']['status'] !== 'delete'"
                outline
                class="q-mt-sm full-width bg-white q-py-sm"
                no-caps
                color="secondary"
                @click="onWhishListButtonClick"
              >
                <div class="text-dimGrey">
                  <q-icon
                    :name="
                      blooprintDetails['attributes']['wishlist']
                        ? 'favorite'
                        : 'favorite_border'
                    "
                    color="red"
                    size="sm"
                    class="q-mr-sm"
                  />
                  {{
                    blooprintDetails['attributes']['wishlist']
                      ? 'Remove from'
                      : 'Add to'
                  }}
                  Wishlist
                </div>
              </q-btn>
              <!-- <q-btn
                outline
                class="q-mt-sm full-width bg-white q-py-sm"
                no-caps
                color="secondary"
              >
                <div class="text-dimGrey">
                  <q-icon
                    name="share"
                    color="primary"
                    class="q-mr-sm"
                    size="sm"
                  />
                  Share
                </div>
              </q-btn> -->
              <q-btn
                v-if="blooprintDetails['attributes']['purchased']"
                outline
                class="q-mt-sm full-width bg-white q-py-sm"
                no-caps
                color="secondary"
                @click="onManageScheduleButtonClick"
              >
                <div class="text-dimGrey">
                  <q-icon
                    name="event"
                    color="primary"
                    class="q-mr-sm"
                    size="sm"
                  />
                  Manage Schedule
                </div>
              </q-btn>
            </div>
          </div>
        </div>

        <!-- following div is for mobile view -->
        <div class="blooprint-actions">
          <div>
            <q-btn
              v-if="blooprintDetails['attributes']['status'] !== 'delete'"
              class="q-mt-sm bg-white q-pa-sm"
              no-caps
              style="width:100%;border-bottom-left-radius: 0px !important; border-bottom-right-radius:0px !important; border-top-right-radius:0px !important;"
              color="secondary"
              @click="onWhishListButtonClick"
            >
              <q-tooltip
                anchor="center left"
                self="center right"
                :offset="[10, 10]"
              >
                <div class="text-body2">
                  Add To Wishlist
                </div>
              </q-tooltip>
              <div class="text-dimGrey">
                <q-icon
                  :name="
                    blooprintDetails['attributes']['wishlist']
                      ? 'favorite'
                      : 'favorite_border'
                  "
                  color="red"
                  size="sm"
                />
              </div>
            </q-btn>
          </div>
          <!-- <q-btn
                outline
                class="q-mt-sm full-width bg-white q-py-sm"
                no-caps
                color="secondary"
              >
                <div class="text-dimGrey">
                  <q-icon
                    name="share"
                    color="primary"
                    class="q-mr-sm"
                    size="sm"
                  />
                  Share
                </div>
              </q-btn> -->
          <div>
            <q-btn
              v-if="blooprintDetails['attributes']['purchased']"
              class="bg-primary q-pa-sm"
              no-caps
              style="width:100%;border-top-left-radius:0px !important; border-top-right-radius: 0px !important; border-bottom-right-radius:0px !important;"
              @click="onManageScheduleButtonClick"
            >
              <q-tooltip
                anchor="center left"
                self="center right"
                :offset="[10, 10]"
                class="myclass"
              >
                <div class="text-body2">
                  Manage Schedule
                </div>
              </q-tooltip>
              <div>
                <q-icon name="event" color="white" size="sm" />
              </div>
            </q-btn>
          </div>
        </div>
        <q-footer
          reveal
          bordered
          style="z-index:2"
          class="fixed-bottom q-pa-md bg-white bottom-pallette"
        >
          <div class="text-nightRider word-break-break-word ellipsis-2-lines">
            {{ blooprintDetails['attributes']['name'] }}
          </div>
          <div class="row items-center justify-between text-nightRider text-h6">
            <span class="q-mt-sm">
              {{ blooprintDetails['attributes']['currency'] }}
              {{ blooprintDetails['attributes']['price'] }}
            </span>
            <span>
              <q-btn
                color="primary"
                label="Buy Now"
                class="text-subtitle1 text-weight-medium"
                no-caps
                type="submit"
                @click="onBuyNowClick"
              />
            </span>
          </div>
        </q-footer>
      </div>
    </div>
    <!-- ******************** Schedule Blooprint Popup *********************************** -->
    <q-dialog no-esc-dismiss no-backdrop-dismiss v-model="openSchedulePopup">
      <ScheduleBlooprintPopup
        requestFrom="desktop"
        :blooprintSelected="blooprintDetails"
        @schedule-popup-close="onSchedulePopupClose"
      />
    </q-dialog>
  </q-page>
</template>
<script>
import RatingIcon from 'components/RatingIcon.vue'
import DesktopBlooprintDetailsSkeleton from 'components/DesktopBlooprintDetailsSkeleton.vue'
import { mapActions, mapGetters } from 'vuex'
import ScheduleBlooprintPopup from 'components/ScheduleBlooprintPopup.vue'
import { getDateFormat, formatDateToRespectiveTimeZone } from '../utils/common'

export default {
  meta() {
    return {
      title: this.metaTitle,
      meta: {
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
      isOpened: false,
      loading: true,
      seeMore: false,
      blooprintMileStoneList: [],
      blooprintDetails: {},
      authorDetails: {},
      blooprintReviewsList: [],
      ratingValue: 0,
      milestonesList: [],
      openSchedulePopup: false,
      totalReviewCount: 0
    }
  },
  components: {
    RatingIcon,
    DesktopBlooprintDetailsSkeleton,
    ScheduleBlooprintPopup
  },
  mounted() {
    this.getBlooprintDetails()
  },
  serverPrefetch() {},
  computed: {
    ...mapGetters(['loggedInUserData', 'errorInGettingBlooprintById']),
    metaTitle() {
      return this.blooprintDetails['attributes'] !== undefined
        ? this.blooprintDetails['attributes']['name']
        : ''
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
        ? this.blooprintDetails['attributes']['banner']
        : ''
    }
  },
  methods: {
    ...mapActions([
      'getBlooprintDetailsById',
      'fetchProfileInfo',
      'followAuthor',
      'unFollowAuthor',
      'fetchReviewsList',
      'addToWishList',
      'removeFromWishList',
      'fetchAllMilestonesByBlooprintId'
    ]),
    getFormattedDate(value) {
      if (
        this.loggedInUserData['timeZone'] &&
        this.loggedInUserData['timeZone'] != ''
      ) {
        return getDateFormat(
          formatDateToRespectiveTimeZone(
            value,
            this.loggedInUserData['timeZone']
          )
        )
      } else {
        return getDateFormat(value)
      }
    },
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
          this.getAllMilestonesByBlooprintId()
          this.getReviewList()
        }
      }
    },
    // **************** Method to fetch the Milestones List Based on ID ***************************
    async getAllMilestonesByBlooprintId() {
      this.loading = true
      let list = await this.fetchAllMilestonesByBlooprintId()
      this.loading = false
      this.milestonesList = list
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
    // ************* Triggeres Follow API when a Follow Button is Clicked ***************************
    async onFollowClick() {
      if (this.authorDetails['currentUserFollowing']) {
        // ************ API to Un-Follow ********************
        let followResponse = await this.unFollowAuthor({
          authorID: this.blooprintDetails['attributes']['authorID']
        })
        if (followResponse) {
          this.authorDetails['currentUserFollowing'] = !followResponse
        }
      } else {
        // ************ API to Follow ********************
        let followResponse = await this.followAuthor({
          authorID: this.blooprintDetails['attributes']['authorID']
        })
        if (followResponse) {
          this.authorDetails['currentUserFollowing'] = followResponse
        }
      }
    },
    // ************* Method to fetch the Reviews List ***************************
    async getReviewList() {
      let params = {
        limit: 2,
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
    // **************** Triggers on WhishList Icon Select *****************************
    onWhishListButtonClick() {
      this.blooprintDetails['attributes']['wishlist'] = !this.blooprintDetails[
        'attributes'
      ]['wishlist']
      if (this.blooprintDetails['attributes']['wishlist']) {
        this.saveToWishList(this.blooprintDetails)
      } else {
        this.deleteFromWishList(this.blooprintDetails)
      }
    },
    // *************** Add to WishList API **************************
    async saveToWishList(blooprint) {
      let params = {
        data: {
          type: 'blooprint',
          attributes: {
            customerID: this.$store.getters.userId,
            blooprintID: blooprint['id']
          }
        }
      }
      let isSuccess = await this.addToWishList(params)
      if (!isSuccess) {
        this.blooprintDetails['attributes']['wishlist'] = !this
          .blooprintDetails['attributes']['wishlist']
      }
    },
    // *************** Remove from Wishlit API ****************************
    async deleteFromWishList(blooprint) {
      let params = {
        customerID: this.$store.getters.userId,
        blooprintID: blooprint['id']
      }
      let isSuccess = await this.removeFromWishList(params)
      if (!isSuccess) {
        this.blooprintDetails['attributes']['wishlist'] = !this
          .blooprintDetails['attributes']['wishlist']
      }
    },
    // ************** Fetching the Blooprint Rating Value from Component *****************************
    fetchRating(event) {
      this.ratingValue = parseFloat(event['value'].toFixed(1))
    },
    // ************** Navigate to Checkout Screen ***********************
    onBuyNowClick() {
      this.$router.push({
        name: 'blooprint-checkout',
        params: {
          blooprintId: this.$route.params['blooprintId']
        }
      })
    },
    // ************** Navigate to View All Reviews Screen ***********************
    onShowMoreClick() {
      this.$router.push({
        name: 'blooprint desktop reviews',
        params: {
          blooprintId: this.$route.params['blooprintId']
        }
      })
    },
    // ************** Navigate to Authors's Screen ***********************
    navigateToAuthorScreen(authorID) {
      this.$router.push({
        name: 'author-view',
        params: {
          profileId: authorID
        }
      })
    },
    // ***************** Method to retreive Total Tasks Days *********************
    totalMileStoneDays(tasks) {
      let totalDays = 0
      if (tasks) {
        tasks.forEach(item => {
          totalDays = totalDays + item['days']
        })
      }
      return totalDays
    },
    // ***************** Method to retreive Total Tasks Count *********************
    getTotalTasksCount() {
      let taskCount = 0
      this.milestonesList.forEach(item => {
        if (item['attributes']['tasks']) {
          taskCount = taskCount + item['attributes']['tasks'].length
        }
      })
      return taskCount
    },
    onTaskSelect(task, milestone) {
      if (this.blooprintDetails['attributes']['purchased']) {
        this.$router.push({
          name: 'desktop-blooprint-task-landing-page',
          params: {
            blooprintId: this.blooprintDetails['id'],
            milestoneId: milestone['id'],
            taskId: task['id']
          }
        })
      }
    },
    // *********** On Manage Schedule Blooprint Click **********************************
    onManageScheduleButtonClick() {
      this.openSchedulePopup = true
    },
    // ******* Triggers when the popup is closed ******************************
    onSchedulePopupClose(event) {
      this.blooprintSelected = {}
      this.openSchedulePopup = false
    }
  }
}
</script>
<style lang="scss">
.author-follow-btn {
  right: 0px;
  bottom: 0px;
  width: 40%;
}
.center-text-display {
  @media only screen and (max-width: $breakpoint-xs-max) {
    text-align: center;
  }
}
.description-box {
  bottom: -2%;
  width: 65vw;
  background-color: #000000a6;

  @media only screen and (max-width: $breakpoint-sm-max) {
    display: none;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    display: none;
  }
}
.blooprint-actions {
  display: none;
  position: fixed;
  top: 250px;
  right: 0;
  @media only screen and (max-width: $breakpoint-sm-max) {
    display: block;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    display: block;
  }
}

.bottom-pallette {
  display: none;
  @media only screen and (max-width: $breakpoint-sm-max) {
    display: block;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    display: block;
  }
}

.blooprint-description {
  display: none;
  @media only screen and (max-width: $breakpoint-sm-max) {
    display: block;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    display: block;
  }
}

.author-view {
  position: fixed;
  right: 25px;
  top: 6%;
  @media only screen and (max-width: $breakpoint-sm-max) {
    display: none;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    display: none;
  }
}
.author-image {
  width: 170px;
  height: 170px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 100%;
    height: auto;
    max-height: 300px;
  }
}

.q-page-container {
  padding-top: 6.7vh !important;
  padding-bottom: 7vh !important;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-bottom: 10vh !important;
    padding-top: 10vh !important;
  }
}

.task-details {
  width: 55px;
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>
