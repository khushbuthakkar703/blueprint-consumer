<template>
  <div class="q-mx-xl">
    <div class="q-mt-lg row justify-between">
      <div class="text-nightRider text-h5 text-weight-medium">
        Blooprinted Creators
        <q-separator width="50%" class="q-mt-xs" color="primary" size="2px" />
      </div>
      <div
        class="q-mt-xs-sm text-bold text-primary text-body1"
        v-if="showBackButton"
      >
        <q-btn
          :to="{ name: 'explore-screen' }"
          flat
          class="bg-white border-secondary"
          no-caps
        >
          <div class="text-dimGrey">
            <q-icon name="reply" class="q-mb-xs" color="indigo-10" size="sm" />
            Back
          </div>
        </q-btn>
      </div>
      <div
        class="
          q-my-xs-sm q-mx-xs-sm
          text-bold text-primary text-body1
          cursor-pointer
        "
        @click="onSeeAllClick"
        v-else
      >
        See All
      </div>
    </div>
    <div class="text-dimGrey q-mt-sm text-body2">
      Build business-relevant skills with blooprints from top creators
    </div>
    <!-- ********************* Skeleton For Creators *********************************** -->
    <div
      class="q-pa-md row q-mt-md q-mx-lg items-start justify-between"
      v-if="isLoading"
    >
      <q-card
        flat
        class="
          col-md-3
          q-pa-md
          col-sm-6 col-xs-12
          q-mb-xl q-my-sm
          bg-whiteSmoke
        "
        v-for="i in showBackButton ? 12 : 4"
        :key="i"
      >
        <q-card-section class="bg-white">
          <div
            class="flex flex-center"
            style="position: relative; bottom: 65px"
          >
            <q-skeleton type="circle" size="100px" />
          </div>
          <div class="flex flex-center">
            <q-skeleton
              type="text"
              width="50%"
              class="text-subtitle1 q-gutter-y-xl"
            />
          </div>
          <div class="flex flex-center">
            <q-skeleton
              type="text"
              width="50%"
              class="text-subtitle1 q-gutter-y-md"
            />
          </div>
          <div class="flex flex-center">
            <q-skeleton
              type="text"
              width="50%"
              class="text-subtitle1 q-gutter-y-sm"
            />
          </div>
          <q-skeleton height="100px" />
          <div class="flex flex-center">
            <q-skeleton
              type="QBtn"
              width="70%"
              class="text-subtitle1 q-mt-sm justify-center"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div
      v-if="
        (errorInGettingAuthorsList.length ||
          errorInGettingPopularAuthors.length) &&
          !isLoading
      "
      class="text-subtitle1 q-pa-md text-center"
      :class="$route.name === 'creators-list' ? 'absolute-center' : ''"
    >
      {{
        errorInGettingPopularAuthors.length
          ? errorInGettingPopularAuthors
          : errorInGettingAuthorsList
      }}
    </div>
    <div v-else-if="creatorsList.length == 0 && !isLoading && !showBackButton">
      <NoDataMessageDisplay />
    </div>

    <!-- ********************* Data For Creators *********************************** -->
    <q-infinite-scroll
      v-else
      @load="loadMoreRecords"
      :offset="250"
      ref="infiniteScroll"
    >
      <template v-slot:loading v-if="showBackButton">
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
      <div class="row q-mt-xl items-start">
        <q-card
          flat
          class="
            col-md-3
            q-pa-md
            col-sm-6 col-xs-12
            q-mb-xl q-my-sm
            bg-whiteSmoke
          "
          v-for="(creatorData, index) in creatorsList"
          :key="index"
        >
          <q-card-section class="bg-white">
            <div
              class="flex flex-center"
              style="position: relative; bottom: 65px"
            >
              <q-avatar
                @click="onAuthorSelect(creatorData)"
                class="flex flex-center cursor-pointer"
                size="120px"
              >
                <q-img
                  :src="
                    creatorData['attributes']['picture']
                      ? creatorData['attributes']['picture']
                      : '~assets/ProfileIcon.svg'
                  "
                  class="full-height full-width"
                >
                  <template v-slot:error>
                    <q-img src="~assets/ProfileIcon.svg" class="full-width" />
                  </template>
                </q-img>
              </q-avatar>
            </div>
            <div class="text-center q-gutter-y-xl ellipsis">
              <span
                class="cursor-pointer text-grey-8 text-weight-medium"
                @click="onAuthorSelect(creatorData)"
              >
                {{ creatorData['attributes']['firstName'] }}
                {{ creatorData['attributes']['lastName'] }}
              </span>
            </div>
            <div class="text-center text-grey-7 q-my-sm ellipsis">
              {{ creatorData['attributes']['location'] }}
            </div>
            <div
              class="text-center text-grey-7 q-my-xs"
              v-if="creatorData['attributes']['rating'] >= 0"
            >
              {{ creatorData['attributes']['rating'].toFixed(1) }}
              <RatingIcon
                class="q-mb-xs"
                ratingClass="q-mb-xs"
                :ratingValue="creatorData['attributes']['rating']"
                iconSize="16px"
                color="smalt"
                :isReadOnly="true"
                isListView="list"
              />
            </div>
            <div
              class="text-left text-grey-7 our overflow-hidden clamp-lines"
              style="height: 150px"
            >
              {{ creatorData['attributes']['yourself'] }}
            </div>
            <div class="flex flex-center">
              <q-btn
                color="primary"
                size="16px"
                :label="
                  creatorData['attributes']['currentUserFollowing']
                    ? 'Following'
                    : 'Follow'
                "
                @click="onFollowClick(creatorData)"
                class="q-my-md flat rounded-borders"
                no-caps
                style="width: 80%"
                type="submit"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div
        class="
          no-more-results-msg
          border-bottom-secondary
          text-body1 text-h5 text-center text-manatee
        "
        v-if="noMoreResults && creatorsList.length != 0"
      >
        <span class="bg-whiteSmoke q-px-sm">No more results</span>
      </div>
    </q-infinite-scroll>
  </div>
</template>

<script>
import RatingIcon from 'components/RatingIcon.vue'
import NoDataMessageDisplay from 'components/Desktop/NoDataMessageDisplay.vue'

import { mapActions, mapGetters } from 'vuex'

const CREATORS_SHOW_LIMIT = 8

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      isLoading: true,
      showBackButton: true,
      creatorsList: [],
      noMoreResults: false
    }
  },
  components: {
    RatingIcon,
    NoDataMessageDisplay
  },
  mounted() {
    let currentRoute = this.$router.history.current.fullPath
    if (currentRoute.includes('creators')) {
      this.getAllBlooprintCreators()
      this.showBackButton = true
    } else {
      this.showBackButton = false
      this.getPopularAuthors()
    }
  },
  computed: {
    ...mapGetters(['errorInGettingPopularAuthors', 'errorInGettingAuthorsList'])
  },
  methods: {
    ...mapActions([
      'fetchAllAuthorsList',
      'followAuthor',
      'unFollowAuthor',
      'fetchPopularAuthorsList'
    ]),
    onSeeAllClick() {
      this.$router.push({ name: 'creators-list' })
    },
    // ************* Method to retrieve Popular Authors List **********************
    async getPopularAuthors() {
      this.isLoading = true
      let response = await this.fetchPopularAuthorsList()
      this.isLoading = false
      this.creatorsList = response
    },
    // ************* Method to retrieve All the Authors List **********************
    async getAllBlooprintCreators() {
      let params = {
        limit: CREATORS_SHOW_LIMIT,
        offset: 0
      }
      this.isLoading = true
      let authorsData = await this.fetchAllAuthorsList(params)
      this.isLoading = false
      this.creatorsList = authorsData
    },
    // ************ On Scroll Pagination Load Authors Records *****************************
    async loadMoreRecords(index, done) {
      if (this.showBackButton) {
        let creatorsLengthBeforeLoad = this.creatorsList.length

        let params = {
          limit: CREATORS_SHOW_LIMIT,
          offset: index * CREATORS_SHOW_LIMIT
        }

        let data = await this.fetchAllAuthorsList(params)
        if (data.length > 0) {
          this.creatorsList = this.creatorsList.concat(data)
        }
        let creatorsLengthAfterLoad = this.creatorsList.length

        if (creatorsLengthBeforeLoad == creatorsLengthAfterLoad) {
          if (creatorsLengthBeforeLoad > 0) {
            this.noMoreResults = true
          }
          this.$refs.infiniteScroll.stop()
        }
        done()
      } else {
        this.$refs.infiniteScroll.stop()
        done()
      }
    },
    // ************* Triggeres Follow API when a Follow Button is Clicked ***************************
    async onFollowClick(author) {
      if (author['attributes']['currentUserFollowing']) {
        // ************ API to Un-Follow ********************
        let followResponse = await this.unFollowAuthor({
          authorID: author['id']
        })
        if (followResponse) {
          author['attributes']['currentUserFollowing'] = !followResponse
        }
      } else {
        // ************ API to Follow ********************
        let followResponse = await this.followAuthor({
          authorID: author['id']
        })
        if (followResponse) {
          author['attributes']['currentUserFollowing'] = followResponse
        }
      }
    },
    // *********** Navigate to Author Profile **********************************
    onAuthorSelect(author) {
      this.$router.push({
        name: 'author-view',
        params: { profileId: author['id'] }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.clamp-lines {
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
</style>
