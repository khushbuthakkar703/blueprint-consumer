<template>
  <q-page>
    <Header
      title="Featured Blooprints"
      titleClass="text-h6"
      showBackIcon="false"
      rightButtonTitle=" "
    />
    <div class="flex flex-center column q-px-md q-mb-xl">
      <div class="q-my-md q-mx-lg full-width">
        <q-form @submit="searchFeatureBlooprint">
          <q-input
            borderless
            clearable
            label="Search"
            @clear="searchFeatureBlooprint"
            v-model.trim="searchText"
            label-color="grey"
            input-class="text-charcoal"
            class="border-secondary bg-white q-px-sm rounded-borders"
          >
            <template v-slot:before>
              <q-btn round dense flat icon="search" />
            </template>
          </q-input>
        </q-form>
      </div>
      <div class="full-width row justify-between q-mb-md">
        <div class="text-manatee">Sort: {{ sortByLabelSelected }}</div>
        <div class="text-primary" @click="openFilterDialog()">Filter</div>
      </div>

      <q-list ref="scrollTargetRef" class="full-width lastBlooprintItem">
        <div v-if="loading">
          <q-item
            class="column full-width border-secondary box-shadow q-mb-md rounded-borders"
            v-for="i in 4"
            :key="i"
          >
            <BlooprintSkeletonCardMobile />
          </q-item>
        </div>
        <div v-if="!loading">
          <div v-if="featuredBlooprintList.length == 0">
            <NoDataMessageDisplay />
          </div>
          <q-infinite-scroll
            @load="loadMoreRecords"
            :offset="250"
            ref="infiniteScroll"
          >
            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>

            <q-item
              class="column itemCard bg-white full-width border-secondary q-mb-md img-border"
              v-for="blooprint in featuredBlooprintList"
              :key="blooprint['id']"
              :class="
                blooprintSelected['id'] == blooprint['id'] &&
                blooprintSelected['wishlist']
                  ? 'on-highlight'
                  : null
              "
            >
              <BlooprintDataCard
                :thumbnailImage="blooprint['attributes']['thumbnail']"
                :authorName="blooprint['attributes']['authorName']"
                :price="blooprint['attributes']['price']"
                :currency="blooprint['attributes']['currency']"
                :blooprintName="blooprint['attributes']['name']"
                :blooprintDescription="blooprint['attributes']['description']"
                :blooprint="blooprint"
                @wishlist-click="onWishlistClick"
              />
            </q-item>
            <div
              class="no-more-results-msg border-bottom-secondary text-body1 text-h5 text-center text-manatee"
              v-if="noMoreResults && featuredBlooprintList.length != 0"
            >
              <span class="bg-whiteSmoke q-px-sm">No more results</span>
            </div>
          </q-infinite-scroll>
        </div>
      </q-list>
    </div>
    <q-dialog v-model="filterDialog" full-width position="bottom">
      <q-card class="dialog-border">
        <q-card-section class="q-mx-md">
          <div class="text-weight-medium text-body1 text-manatee">Sort by</div>
          <div class="row q-my-md">
            <q-btn
              :outline="buttonSelected != SORTBYNEWEST"
              class="q-mr-md"
              no-caps
              color="primary"
              style="color: text-blue-14"
              label="Newest"
              @click="onSortBySelect(SORTBYNEWEST, 'Newest')"
            />
            <q-btn
              :outline="buttonSelected != SORTBYPRICEASC"
              color="primary"
              no-caps
              style="color: text-blue-14"
              label="Price: Low to High"
              @click="onSortBySelect(SORTBYPRICEASC, 'Price: Low to High')"
            />
          </div>
          <q-btn
            :outline="buttonSelected != SORTBYPRICEDESC"
            class="q-mb-md"
            no-caps
            color="primary"
            style="color: text-blue-14"
            label="Price: High to Low"
            @click="onSortBySelect(SORTBYPRICEDESC, 'Price: High to Low')"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Header from 'components/Header.vue'
import BlooprintSkeletonCardMobile from 'components/BlooprintSkeletonCardMobile.vue'
import NoDataMessageDisplay from 'components/Desktop/NoDataMessageDisplay.vue'
import BlooprintDataCard from 'components/BlooprintDataCard'
import { mapActions, mapGetters } from 'vuex'

const BLOOPRINT_SHOW_LIMIT = 10

export default {
  name: 'SignUp',
  components: {
    Header,
    NoDataMessageDisplay,
    BlooprintSkeletonCardMobile,
    BlooprintDataCard
  },
  data() {
    return {
      searchText: '',
      loading: true,
      noMoreResults: false,
      featuredBlooprintList: [],
      wishlistActive: true,
      filterDialog: false,
      SORTBYNEWEST: 'newest',
      SORTBYPRICEASC: 'price_asc',
      SORTBYPRICEDESC: 'price_desc',
      buttonSelected: '',
      sortByLabelSelected: 'Newest',
      blooprintSelected: {}
    }
  },
  mounted() {
    this.buttonSelected = this.SORTBYNEWEST
    this.getFeatureBlooprint()
    this.updateBackNavigationScreen('/blooprint/feature')
  },
  methods: {
    ...mapActions([
      'retrieveBlooprintList',
      'addToWishList',
      'updateBackNavigationScreen',
      'isAPIResponseFailed'
    ]),

    // *************** Method to fetch the Blooprint List *********************
    async getFeatureBlooprint() {
      let params = {
        limit: BLOOPRINT_SHOW_LIMIT,
        offset: 0
      }

      if (this.searchText === null || this.searchText.length > 0) {
        params.search = this.searchText === null ? '' : this.searchText
      }
      if (this.buttonSelected != '') {
        params.sort = this.buttonSelected
      }

      this.loading = true
      await this.retrieveBlooprintList(params)
      this.loading = false
    },
    // ************* Triggers when user enters the Search Text ************************
    searchFeatureBlooprint() {
      this.featuredBlooprintList = []
      this.getFeatureBlooprint()
    },
    // ************ On Scroll Pagination Load Blooprint Records *****************************
    async loadMoreRecords(index, done) {
      let blooprintListLengthBeforeLoad = this.featuredBlooprintList.length

      let params = {
        limit: BLOOPRINT_SHOW_LIMIT,
        offset: index * BLOOPRINT_SHOW_LIMIT
      }

      if (this.searchText.length > 0) {
        params.search = this.searchText
      }
      if (this.buttonSelected != '') {
        params.sort = this.buttonSelected
      }
      if (this.featuredBlooprintList.length >= BLOOPRINT_SHOW_LIMIT) {
        await this.retrieveBlooprintList(params)
      }
      let blooprintListLengthAfterLoad = this.featuredBlooprintList.length

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
    },
    openFilterDialog() {
      this.filterDialog = true
    },
    onSortBySelect(sortType, sortLabel) {
      this.buttonSelected = sortType
      this.sortByLabelSelected = sortLabel
      this.filterDialog = false
      this.searchFeatureBlooprint()
    },
    // *********** Triggers when a Wishlist icon is clicked *******************************
    onWishlistClick(event) {
      this.blooprintSelected = {
        id: event['blooprint']['id'],
        wishlist: event['display']
      }
    }
  },
  computed: {
    ...mapGetters(['featureBlooprintsList', 'errorInGettingBlooprintList'])
  },
  watch: {
    featureBlooprintsList(data) {
      if (data.length > 0) {
        this.loading = false
        this.featuredBlooprintList.push(...data)
      }
    },
    errorInGettingBlooprintList() {
      let error = !!this.errorInGettingBlooprintList.length
      this.isAPIResponseFailed(error)
    },
    searchText(data) {
      if (data !== null && data.length === 0) {
        this.searchFeatureBlooprint()
      }
    }
  }
}
</script>
<style lang="scss">
.lastBlooprintItem:last-child {
  margin-bottom: 30px;
}
.itemCard {
  box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
    0 3px 1px -2px rgb(0 0 0 / 12%);
}
.dialog-border {
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
}
.q-dialog__inner--minimized {
  padding: 0px !important;
}
.img-border {
  border-radius: 8px;
}
</style>
