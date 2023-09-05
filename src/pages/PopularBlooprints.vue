<template>
  <div>
    <div class="q-mx-xl q-mt-xl row justify-between">
      <div class="text-nightRider text-h5 text-weight-medium">
        {{
          isPopularBlooprintScreen ? 'Popular Blooprints' : 'Blooprints Library'
        }}
        <q-separator width="60%" class="q-mt-xs" color="primary" size="2px" />
      </div>
      <div class="row justify-end">
        <div
          v-if="!isPopularBlooprintScreen"
          class="q-px-md-md q-px-sm-md q-px-xs-sm text-bold q-mt-md-md q-mt-sm-md q-mt-xs-md text-body1 text-primary cursor-pointer"
        >
          Filter
          <q-menu fit anchor="bottom left" self="top left">
            <div class="row">
              <div class="text-body1 col q-ma-md text-grey text-left">
                Sort By
              </div>
              <div class="col q-mt-sm text-right">
                <q-btn
                  flat
                  class="text-smalt text-bold"
                  no-caps
                  @click="onClearSort"
                  v-close-popup
                  label="Clear"
                />
              </div>
            </div>
            <q-list style="min-width: 100px" class="q-mb-md">
              <q-item v-for="sortItem in sortOrderList" :key="sortItem.value">
                <q-item-section>
                  <q-btn
                    outline
                    :class="
                      sortItemSelected == sortItem.value
                        ? 'bg-primary text-white'
                        : 'text-dimGrey'
                    "
                    :label="sortItem.label"
                    v-close-popup
                    @click="onSortItemClick(sortItem)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        <q-btn
          v-if="!isPopularBlooprintScreen"
          :to="{ name: 'explore-screen' }"
          flat
          @click="onBackClick"
          class="q-mt-xs-sm q-mx-xs-sm bg-white border-secondary"
          no-caps
        >
          <div class="text-dimGrey">
            <q-icon name="reply" class="q-mb-xs" color="indigo-10" size="sm" />
            Back
          </div>
        </q-btn>
        <div
          class="text-bold text-primary text-body1 q-mt-md-xs q-mt-sm-xs q-mt-xs-sm q-mx-xs-sm cursor-pointer"
          @click="onSeeAllClick"
          v-else
        >
          See All
        </div>
      </div>
    </div>
    <div
      class="q-pa-md row q-mt-md q-mx-lg items-start justify-between"
      v-if="isLoading"
    >
      <q-card
        flat
        class="col-md-4 q-pa-md col-sm-6 col-xs-12 q-mb-md bg-whiteSmoke"
        v-for="i in 6"
        :key="i"
      >
        <q-skeleton height="200px" square />
        <q-card-section class="border-secondary bg-white">
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
          <q-skeleton type="text" width="100%" class="text-subtitle1" />
          <q-skeleton type="text" width="100%" class="text-subtitle1" />

          <div class="row justify-between ">
            <q-skeleton width="70%" type="QBtn" />
            <q-icon
              name="favorite_border"
              color="grey-4"
              class="q-mt-sm"
              size="20px"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div
      class="q-pa-md row q-mt-md q-mx-lg justify-center"
      v-if="
        errorInGettingPopularBlooprints.length &&
          isPopularBlooprintScreen &&
          !isLoading
      "
    >
      <div class="q-pa-md text-subtitle1 text-center">
        {{ errorInGettingPopularBlooprints }}
      </div>
    </div>
    <div
      class="q-pa-md row q-mt-md q-mx-lg justify-center"
      v-else-if="
        errorInGettingBlooprintList.length &&
          !isPopularBlooprintScreen &&
          !isLoading
      "
    >
      <div class="q-pa-md absolute-center text-subtitle1 text-center">
        {{ errorInGettingBlooprintList }}
      </div>
    </div>
    <div
      v-else-if="
        ((popularBlooprintList.length == 0 && isPopularBlooprintScreen) ||
          (blooprintLibraryList.length == 0 && !isPopularBlooprintScreen)) &&
          !isLoading
      "
    >
      <NoDataMessageDisplay />
    </div>
    <q-infinite-scroll
      @load="loadMoreRecords"
      :offset="250"
      ref="infiniteScroll"
      v-if="!isLoading"
    >
      <template v-slot:loading v-if="!isPopularBlooprintScreen">
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
      <div class="row q-mx-lg q-mt-md items-start">
        <DesktopFeaturePopularBlooprintsList
          v-for="blooprint in isPopularBlooprintScreen
            ? popularBlooprintList
            : blooprintLibraryList"
          :key="blooprint.id"
          :requestFrom="
            isPopularBlooprintScreen ? 'popularBlooprints' : 'blooprintLibrary'
          "
          :thumbnailImage="blooprint['attributes']['thumbnail']"
          :authorName="blooprint['attributes']['authorName']"
          :price="blooprint['attributes']['price']"
          :currency="blooprint['attributes']['currency']"
          :blooprintName="blooprint['attributes']['name']"
          :blooprint="blooprint"
          :active="blooprint['attributes']['wishlist']"
          :rating="blooprint['attributes']['rating']"
        />
      </div>
      <div
        class="no-more-results-msg border-bottom-secondary text-body1 text-h5 text-center text-manatee"
        v-if="noMoreResults && blooprintLibraryList.length != 0"
      >
        <span class="bg-whiteSmoke q-px-sm">No more results</span>
      </div>
    </q-infinite-scroll>
  </div>
</template>
<script>
import DesktopFeaturePopularBlooprintsList from 'components/DesktopFeaturePopularBlooprintsList.vue'
import NoDataMessageDisplay from 'components/Desktop/NoDataMessageDisplay.vue'

import { mapActions, mapGetters } from 'vuex'

const BLOOPRINT_SHOW_LIMIT = 10

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      isLoading: true,
      noMoreResults: false,
      isPopularBlooprintScreen: true,
      popularBlooprintList: [],
      blooprintLibraryList: [],
      sortOrderList: [
        { label: 'Newest', value: 'newest' },
        { label: 'Price: Low to High', value: 'price_asc' },
        { label: 'Price: High to Low', value: 'price_desc' }
      ],
      sortItemSelected: 'newest'
    }
  },
  components: {
    DesktopFeaturePopularBlooprintsList,
    NoDataMessageDisplay
  },
  mounted() {
    let currentRoute = this.$router.history.current.fullPath
    if (currentRoute.includes('blooprint-library')) {
      this.isPopularBlooprintScreen = false
      this.fetchBlooprintsList()
    } else {
      this.isPopularBlooprintScreen = true
      this.getPopularBlooprints()
    }
  },
  computed: {
    ...mapGetters([
      'featureBlooprintsList',
      'blooprintFilterTerm',
      'errorInGettingPopularBlooprints',
      'errorInGettingBlooprintList'
    ])
  },
  watch: {
    featureBlooprintsList(data) {
      if (data.length > 0) {
        this.isLoading = false
        this.blooprintLibraryList.push(...data)
      }
    },
    blooprintFilterTerm(data) {
      if (!this.isPopularBlooprintScreen) {
        this.fetchBlooprintsList()
      }
    }
  },
  methods: {
    ...mapActions([
      'retrieveBlooprintList',
      'addToWishList',
      'fetchPopularBlooprintsList',
      'updateBlooprintFilterTerm'
    ]),
    // *************** Method to fetch the Blooprint List *********************
    async fetchBlooprintsList() {
      let params = {
        limit: BLOOPRINT_SHOW_LIMIT,
        offset: 0,
        search: this.blooprintFilterTerm
      }
      if (this.sortItemSelected != '') {
        params.sort = this.sortItemSelected
      }
      this.isLoading = true
      this.blooprintLibraryList = []
      await this.retrieveBlooprintList(params)
      this.isLoading = false
    },
    // ************ On Scroll Pagination Load Blooprint Records *****************************
    async loadMoreRecords(index, done) {
      if (!this.isPopularBlooprintScreen) {
        let blooprintListLengthBeforeLoad = this.blooprintLibraryList.length

        let params = {
          limit: BLOOPRINT_SHOW_LIMIT,
          offset: index * BLOOPRINT_SHOW_LIMIT,
          search: this.blooprintFilterTerm
        }
        if (this.sortItemSelected != '') {
          params.sort = this.sortItemSelected
        }
        if (this.blooprintLibraryList.length >= BLOOPRINT_SHOW_LIMIT) {
          await this.retrieveBlooprintList(params)
        }
        let blooprintListLengthAfterLoad = this.blooprintLibraryList.length

        if (
          blooprintListLengthBeforeLoad == blooprintListLengthAfterLoad ||
          blooprintListLengthAfterLoad - blooprintListLengthBeforeLoad <
            BLOOPRINT_SHOW_LIMIT
        ) {
          if (blooprintListLengthBeforeLoad > 0) {
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
    // *************** Triggers when Sort By Item is selected ***************************
    onSortItemClick(item) {
      this.sortItemSelected = item['value']
      if (!this.isPopularBlooprintScreen) {
        this.blooprintLibraryList = []
        this.fetchBlooprintsList()
      }
    },
    // *************** Triggers when Sort By Item is Cleared ***************************
    onClearSort() {
      if (!this.isPopularBlooprintScreen) {
        this.sortItemSelected = ''
        this.blooprintLibraryList = []
        this.fetchBlooprintsList()
      }
    },
    onBackClick() {
      this.updateBlooprintFilterTerm('')
    },
    //  ************ Triggers when Select All is Clicked ***************************
    onSeeAllClick() {
      this.$router.push({ name: 'blooprint-library' })
    },
    // ************* Method to retrieve Popular Blooprints List **********************
    async getPopularBlooprints() {
      let response = await this.fetchPopularBlooprintsList()
      this.isLoading = false
      this.popularBlooprintList = response
    }
  }
}
</script>
<style lang="scss" scoped>
.q-card > div {
  border: 1px solid $secondary !important;
}
</style>
