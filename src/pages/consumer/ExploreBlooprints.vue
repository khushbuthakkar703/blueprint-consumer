<template>
  <div>
    <div
      v-if="!isBlooprintSearch"
      class="text-regalBlue f-w-600 q-mb-xs explore-screen-headings"
      style="margin-bottom: 20px"
    >
      Explore all blooprints
    </div>
    <div
      class="row"
      :class="!isBlooprintSearch ? 'filter-m-b' : 'filter-margin'"
    >
      <q-btn-dropdown
        :label="exploreBtnLabel()"
        split
        flat
        no-caps
        unelevated
        :ripple="false"
        color="white"
        v-model="showFilterDropdown"
        content-class="border-radius-lg"
        content-style="margin-top: -10px !important"
        class="explore-dropdown text-body1 f-w-500"
        no-icon-animation
        :text-color="
          exploreBtnLabel() == 'Category' ? 'manateeGrey' : 'regalBlue'
        "
        :menu-offset="menuOffset"
        menu-anchor="bottom left"
        menu-self="top left"
        size="16px"
        dropdown-icon="expand_more"
        @click="showExploreMenu"
        @before-hide="animationEnterClass = ''"
      >
        <span
          v-if="Object.keys(categorySelected).length"
          @click="resetCategoryFilter"
          class="
            q-py-md q-pr-lg
            absolute-right
            text-body2 text-primary
            cursor-pointer
            z-top
          "
          >Clear</span
        >
        <q-scroll-area
          :class="showCategory ? 'category-menu' : 'sub-category-menu'"
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
        >
          <div class="border-radius-lg f-w-500 text-body1">
            <div class="row no-wrap">
              <div class="column">
                <transition-group
                  :class="
                    showCategory ? animationEnterClass : animationLeaveClass
                  "
                >
                  <div class="row" key="1" v-if="showCategory">
                    <div
                      v-for="(category, index) in allCategoriesList"
                      :key="category.value"
                      class="
                        col-md-6 col-sm-6 col-xs-12
                        category-item
                        cursor-pointer
                        text-regalBlue
                        remove-underline
                      "
                      :class="[
                        index + 1 != allCategoriesList.length
                          ? 'q-mb-md'
                          : null,
                        $q.screen.gt.xs && (index + 1) % 2 == 0
                          ? 'q-pl-md'
                          : null
                      ]"
                      @click="onCategorySelect(category)"
                    >
                      <span
                        :key="index"
                        class="word-break-break-word"
                        :class="
                          categorySelected &&
                          categorySelected['label'] == category.label
                            ? 'text-primary f-w-600'
                            : null
                        "
                        >{{ category.label }}
                      </span>
                    </div>
                  </div>
                  <div class="row" key="2" v-else>
                    <div
                      class="
                        f-w-600
                        full-width
                        text-body1 text-regalBlue
                        cursor-pointer
                      "
                      style="margin-bottom: 14px"
                      key="test"
                      @click="backToCategoriesList"
                    >
                      <q-icon
                        size="24px"
                        name="chevron_left"
                        class="text-regalBlue"
                        style="margin-bottom: 2px"
                      />
                      {{ subCategories.label }}
                    </div>
                    <div
                      v-for="(subCategory, index) in subCategories.subCategory"
                      :key="subCategory.value"
                      class="
                        col-md-6 col-sm-6 col-xs-12
                        category-item
                        cursor-pointer
                        text-regalBlue
                        remove-underline
                        sub-category-label
                      "
                      :class="
                        index + 1 != subCategories.subCategory.length
                          ? 'q-mb-md'
                          : null
                      "
                      @click="onSubCategorySelect(subCategory, subCategories)"
                    >
                      <span
                        class="word-break-break-word"
                        :key="index"
                        :class="
                          subCategorySelected &&
                          subCategorySelected['label'] == subCategory.label
                            ? 'text-primary f-w-600'
                            : null
                        "
                        >{{ subCategory.label }}
                      </span>
                    </div>
                  </div>
                </transition-group>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </q-btn-dropdown>

      <q-btn-dropdown
        split
        flat
        no-caps
        unelevated
        :ripple="false"
        color="white"
        :label="sortFilterLabel()"
        content-class="border-radius-lg"
        content-style="margin-top: -10px !important; padding-bottom: 22px"
        class="explore-dropdown sort-filter text-body1 f-w-500"
        no-icon-animation
        text-color="regalBlue"
        :menu-offset="menuOffset"
        menu-anchor="bottom left"
        menu-self="top left"
        size="16px"
        dropdown-icon="expand_more"
        v-model="showSortDropdown"
        @click="showSortDropdown = true"
      >
        <q-list
          v-for="(item, index) in sortOptions"
          :key="item.value"
          @click="onSortItemChange(item)"
        >
          <q-item
            v-close-popup
            class="dropdown-options sort-menu text-regalBlue cursor-pointer"
          >
            <q-item-section :style="index == 0 ? 'padding-top : 22px' : null">
              <q-item-label
                :class="
                  item.value == sortItemSelected ? 'f-w-600 text-primary' : null
                "
              >
                {{ item.label }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <div
        v-if="!isBlooprintSearch"
        class="
          gt-sm
          text-regalBlue
          col
          q-pt-sm
          text-right
          word-break-break-word
        "
        style="font-size: 20px; line-height: 28px"
      >
        <span class="f-w-600"> {{ totalBlooprintCount }}</span>
        <span class="f-w-400"> showing</span>
      </div>
    </div>
    <div
      v-if="!isBlooprintSearch"
      class="lt-md q-mb-md q-pb-xs text-left text-regalBlue"
      style="font-size: 20px; line-height: 28px"
    >
      <span class="f-w-600"> {{ totalBlooprintCount }}</span>
      <span class="f-w-400"> showing</span>
    </div>

    <BlooprintSkeletonCard v-if="isLoading" :totalCards="12" />

    <NoDataMessageDisplay
      v-if="blooprintLibraryList.length == 0 && !isLoading"
      :heading="'More on the way!'"
      :subheading="
        'We have just launched this category and are adding new blooprints every day. Check back soon for more!'
      "
    />
    <div class="row" v-else>
      <div
        class="blooprint-card gt-sm"
        v-for="(blooprint, index) in blooprintLibraryList"
        :key="blooprint.id"
        :class="(index + 1) % 4 == 0 ? 'q-pr-none' : 'card-padding-r'"
      >
        <BlooprintDataCard
          :category="blooprint['attributes']['categories'][0]"
          :authorName="blooprint['attributes']['authorName']"
          :thumbnail="blooprint['attributes']['thumbnail']"
          :rating="blooprint['attributes']['rating']"
          :name="blooprint['attributes']['name']"
          :wishlist="blooprint['attributes']['wishlist']"
          :currency="blooprint['attributes']['currency']"
          :price="blooprint['attributes']['price']"
          :blooprintData="blooprint"
          requestFrom="'explore'"
          @wishlist-click="onWishlistClick"
          :class="
            blooprintSelected['id'] == blooprint['id'] &&
            blooprintSelected['wishlist']
              ? 'on-highlight'
              : null
          "
        />
      </div>
      <div
        class="blooprint-card lt-md"
        v-for="(blooprint, index) in blooprintLibraryList"
        :key="index"
        :class="(index + 1) % 2 == 0 ? 'q-pr-none' : 'card-padding-r'"
      >
        <BlooprintDataCard
          :category="blooprint['attributes']['categories'][0]"
          :authorName="blooprint['attributes']['authorName']"
          :thumbnail="blooprint['attributes']['thumbnail']"
          :rating="blooprint['attributes']['rating']"
          :name="blooprint['attributes']['name']"
          :wishlist="blooprint['attributes']['wishlist']"
          :currency="blooprint['attributes']['currency']"
          :price="blooprint['attributes']['price']"
          :blooprintData="blooprint"
          requestFrom="'explore'"
          @wishlist-click="onWishlistClick"
          :class="
            blooprintSelected['id'] == blooprint['id'] &&
            blooprintSelected['wishlist']
              ? 'on-highlight'
              : null
          "
        />
      </div>
    </div>
    <div class="flex flex-center">
      <q-btn
        v-if="blooprintLibraryList.length < totalBlooprintCount && !showSpinner"
        color="primary"
        class="text-body1 see-more-btn"
        no-caps
        label="See more"
        @click="loadMoreRecords"
      />
      <q-spinner-ios
        v-if="showSpinner"
        class="items-center"
        color="primary"
        size="50px"
      />
    </div>
  </div>
</template>
<script>
import BlooprintSkeletonCard from 'components/Desktop/BlooprintSkeletonCard.vue'
import BlooprintDataCard from 'components/Desktop/BlooprintDataCard.vue'
import NoDataMessageDisplay from 'components/Desktop/NoDataMessageDisplay.vue'
import { mapActions, mapGetters } from 'vuex'

const BLOOPRINT_SHOW_LIMIT = 12

export default {
  name: 'ExploreBlooprints',
  data() {
    return {
      isLoading: true,
      blooprintLibraryList: [],
      blooprintSelected: {},
      sortOptions: [
        { label: 'Most Popular', value: 'popular' },
        { label: 'Recently added', value: 'newest' },
        { label: 'Price (high to low)', value: 'price_desc' },
        { label: 'Price (low to high)', value: 'price_asc' },
        { label: 'A - Z', value: 'asc' },
        { label: 'Z - A', value: 'desc' }
      ],
      allCategoriesList: [],
      subCategories: {},
      sortItemSelected: 'newest',
      categorySelected: {},
      subCategorySelected: {},
      totalBlooprintCount: 0,
      pageNo: 0,
      showSpinner: false,
      isBlooprintSearch: false,
      menuOffset: Array(0, 20),
      showFilterDropdown: false,
      showSortDropdown: false,
      showCategory: true,
      thumbStyle: {
        borderRadius: '10px'
      },
      barStyle: {
        width: '10px'
      },
      animationEnterClass: '',
      animationLeaveClass: 'reveal fade-right active'
    }
  },
  components: {
    BlooprintSkeletonCard,
    BlooprintDataCard,
    NoDataMessageDisplay
  },
  computed: {
    ...mapGetters([
      'blooprintFilterTerm',
      'categoryFilterTerm',
      'blooprintSortOption'
    ])
  },
  watch: {
    blooprintFilterTerm(data) {
      if (
        data !== '' &&
        !this.$route.query['category'] &&
        !this.categoryFilterTerm['category']
      ) {
        this.categorySelected = {}
        this.callBlooprintsAPI()
      }
    },
    categoryFilterTerm(data) {
      if (data['category'] && this.sortItemSelected === 'popular') {
        this.sortItemSelected = 'newest'
        this.updateBlooprintSortOption('Recently added')
      }
      this.fetchSubCategorySelectedDetails(data)
    },
    blooprintSortOption(data) {
      if (data != this.sortItemSelected) {
        let sortItem = this.sortOptions.filter(item => item.label == data)
        if (sortItem && sortItem.length > 0) {
          this.sortItemSelected = sortItem[0]['value']
          this.callBlooprintsAPI()
        } else {
          this.sortItemSelected = 'newest'
          this.onSortItemChange(this.sortOptions[1])
        }
      }
    }
  },
  created() {
    if (this.$route.query['sortoption']) {
      this.fetchSortOption()
    }
    this.getAllCategories()
    let currentRoute = this.$router.history.current.fullPath
    this.isBlooprintSearch =
      currentRoute.includes('explore?search') ||
      currentRoute.includes('&search')
  },
  mounted() {
    if (
      this.blooprintFilterTerm &&
      (!this.$route.query['category'] || !this.$route.query['search'])
    ) {
      this.callBlooprintsAPI()
    } else {
      this.callBlooprintsAPI()
    }
  },
  methods: {
    ...mapActions([
      'retrieveBlooprintList',
      'fetchCategorySubCategoryList',
      'updateBlooprintCategoryFilterTerm',
      'updateBlooprintFilterTerm',
      'updateBlooprintSortOption',
      'fetchPopularBlooprintsList'
    ]),
    fetchSortOption() {
      let sortQuery = this.$route.query['sortoption']
      let sortItem = this.sortOptions.filter(item => item.label == sortQuery)
      if (sortItem && sortItem.length > 0) {
        this.sortItemSelected = sortItem[0]['value']
      } else {
        this.sortItemSelected = 'newest'
        this.onSortItemChange(this.sortOptions[1])
      }
    },
    exploreBtnLabel() {
      if (this.categorySelected && this.categorySelected['label']) {
        return (
          this.categorySelected['label'] +
          (this.subCategorySelected['label']
            ? ' - ' + this.subCategorySelected['label']
            : '')
        ).trim()
      } else {
        return 'Category'
      }
    },
    sortFilterLabel() {
      let data = this.sortOptions.filter(
        item => item.value == this.sortItemSelected
      )
      if (data.length > 0) {
        return data[0]['label']
      } else {
        return ''
      }
    },
    resetCategoryFilter() {
      this.pageNo = 0
      this.showFilterDropdown = false
      this.updateBlooprintCategoryFilterTerm({})
      this.updateNavigation({}, {})
      this.categorySelected = {}
      this.subCategorySelected = {}
      this.callBlooprintsAPI()
    },
    callBlooprintsAPI() {
      let params = {
        limit: BLOOPRINT_SHOW_LIMIT,
        offset: 0
      }
      this.blooprintLibraryList = []
      if (this.sortItemSelected == 'popular') {
        this.updateBlooprintFilterTerm('')
        this.updateBlooprintCategoryFilterTerm({})
        this.getPopularBlooprints()
      } else {
        this.fetchBlooprintsList(params)
      }
    },
    async fetchBlooprintsList(params) {
      let callApi = true
      if (this.sortItemSelected != '') {
        params.sort = this.sortItemSelected
      }
      params.search = this.blooprintFilterTerm
        ? this.blooprintFilterTerm.trim()
        : this.$route.query['search']
        ? this.$route.query['search']
        : ''
      if (this.$route.query['category']) {
        if (
          !this.categorySelected.value &&
          this.$route.query['category'] != 'all'
        ) {
          callApi = false
          if (this.allCategoriesList.length > 0) {
            if (
              !this.categorySelected.value &&
              this.categoryFilterTerm['category']
            ) {
              this.updateNavigation({}, {})
              this.categorySelected = {}
              this.subCategorySelected = {}
              this.callBlooprintsAPI()
            } else {
              callApi = true
            }
          }
        } else {
          callApi = true
        }
      }
      params.categoryID = this.categorySelected?.value

      if (this.subCategorySelected.value) {
        params.categoryID = this.subCategorySelected.value
      }
      if (callApi) {
        this.isLoading = this.pageNo == 0
        this.showSpinner = this.pageNo > 0
        let data = await this.retrieveBlooprintList(params)
        if (this.pageNo == 0) {
          this.blooprintLibraryList = []
        }
        this.isLoading = false
        this.showSpinner = false
        this.totalBlooprintCount = data['totalCount']
        if (this.pageNo > 0) {
          this.blooprintLibraryList = this.blooprintLibraryList.concat(
            data['blooprintList']
          )
        } else {
          this.blooprintLibraryList = data['blooprintList']
        }
        this.$emit('fetch-total-count', this.totalBlooprintCount)
      }
    },
    async getAllCategories() {
      let data = await this.fetchCategorySubCategoryList({ sort: 'name' })
      this.allCategoriesList = data
      this.fetchSubCategorySelectedDetails({ from: 'onPageLoad', sort: 'name' })
    },
    fetchCategorySelectedDetails(category, subCategory) {
      if (category) {
        let isCategoryAvailable = false
        this.allCategoriesList.map(item => {
          if (item['label'] == category) {
            isCategoryAvailable = true
            this.categorySelected = item
            if (subCategory == 'All') {
              this.subCategorySelected = {
                label: 'All',
                value: item.value
              }
            } else {
              this.subCategorySelected = {}
            }
            this.callBlooprintsAPI()
          }
        })
        if (!isCategoryAvailable) {
          this.categorySelected = {}
          this.subCategorySelected = {}
          this.callBlooprintsAPI()
        }
      } else {
        this.categorySelected = {}
        this.subCategorySelected = {}
        if (category == '') {
          this.callBlooprintsAPI()
        }
      }
    },
    fetchSubCategorySelectedDetails(categoryFilter) {
      let category = ''
      let subCategory = ''
      if (categoryFilter['from'] == 'onPageLoad') {
        category = this.$route.query.category
        subCategory = this.$route.query.subcategory
      } else {
        category = categoryFilter['category']
        subCategory = categoryFilter['subcategory']
      }
      if (subCategory) {
        if (subCategory == 'All') {
          this.fetchCategorySelectedDetails(category, subCategory)
        } else {
          let isSubCategoryAvailable = false
          this.allCategoriesList.map(item => {
            if (item['label'] == category) {
              item['subCategory'].map(data => {
                if (data['label'] == subCategory) {
                  isSubCategoryAvailable = true
                  this.subCategorySelected = data
                  this.categorySelected = item
                  this.callBlooprintsAPI()
                }
              })
            }
          })
          if (!isSubCategoryAvailable) {
            this.subCategorySelected = {}
            this.callBlooprintsAPI()
          }
        }
      } else {
        this.fetchCategorySelectedDetails(category, subCategory)
      }
    },

    // *********** Triggers when a Wishlist icon is clicked *******************************
    onWishlistClick(event) {
      this.blooprintSelected = {
        id: event['blooprint']['id'],
        wishlist: event['display']
      }
    },
    onSortItemChange(data) {
      this.sortItemSelected = data.value
      if (data.value == 'popular') {
        this.updateBlooprintSortOption(data.label)
        this.updateBlooprintFilterTerm('')
        this.updateBlooprintCategoryFilterTerm({})
        this.$router.push(
          {
            name: 'explore-screen',
            query: {
              sortoption: 'Most Popular'
            }
          },
          () => {}
        )
        this.getPopularBlooprints()
      } else {
        this.pageNo = 0
        let query = {}
        this.updateBlooprintSortOption(data.label)
        if (this.blooprintFilterTerm) {
          query['search'] = this.blooprintFilterTerm
        }
        if (this.categorySelected['label']) {
          query['category'] = this.categorySelected['label']
        }
        if (this.subCategorySelected['label']) {
          query['subcategory'] = this.subCategorySelected['label']
        }
        query['sortoption'] = data.label
        const { href } = this.$router.resolve({
          name: 'explore-screen',
          query: query
        })
        window.history.pushState({}, null, href)
        // this.$router.push({ name: 'explore-screen', query: query })
        this.callBlooprintsAPI()
      }
    },
    backToCategoriesList() {
      this.subCategories = {}
      this.showCategory = true
    },
    onCategorySelect(data) {
      this.animationEnterClass = 'reveal fade-left active'
      if (data.subCategory.length > 0) {
        this.subCategories = data
        this.showCategory = false
      } else {
        this.updateNavigation(category, {})
      }
    },
    onSubCategorySelect(subCategory, category) {
      this.showFilterDropdown = false
      if (this.sortItemSelected == 'popular') {
        this.sortItemSelected = 'newest'
        this.updateBlooprintSortOption('Recently added')
      }
      this.updateNavigation(category, subCategory)
    },
    updateNavigation(category, subCategory) {
      this.pageNo = 0
      let currentRouteQuery = this.$router.history.current.query
      let query = {}
      if (currentRouteQuery['search']) {
        query['search'] = currentRouteQuery['search']
      }
      query['sortoption'] = this.sortFilterLabel()
      query['category'] = category?.label
      query['subcategory'] = subCategory?.label
      this.updateBlooprintCategoryFilterTerm({
        category: category?.label,
        subcategory: subCategory?.label
      })
      if (this.blooprintFilterTerm && this.blooprintFilterTerm.trim() != '') {
        this.$router.push(
          {
            name: 'explore-screen',
            query: query
          },
          () => {}
        )
      } else {
        const { href } = this.$router.resolve({
          name: 'explore-screen',
          query: query
        })
        window.history.pushState({}, null, href)
        // this.$router.push({ name: 'explore-screen', query: query })
      }

      this.subCategories = {}
      this.showCategory = true
    },
    loadMoreRecords() {
      this.pageNo++
      let params = {
        limit: BLOOPRINT_SHOW_LIMIT,
        offset: this.pageNo * BLOOPRINT_SHOW_LIMIT
      }
      this.fetchBlooprintsList(params)
    },
    showExploreMenu() {
      this.showFilterDropdown = true
    },
    // ************* Method to retrieve Popular Blooprints List **********************
    async getPopularBlooprints() {
      this.isLoading = true
      let response = await this.fetchPopularBlooprintsList()
      this.isLoading = false
      this.blooprintLibraryList = response
      this.totalBlooprintCount = this.blooprintLibraryList.length
    }
  },
  destroyed() {
    this.updateBlooprintFilterTerm('')
    this.updateBlooprintCategoryFilterTerm({})
  }
}
</script>
<style lang="scss" scoped>
.filter-margin {
  margin-bottom: 30px;
}
.filter-m-b {
  margin-bottom: 30px;
  @media only screen and (max-width: $breakpoint-md-max) {
    margin-bottom: 30px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-bottom: 20px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-bottom: 20px;
  }
}
.sort-filter {
  margin-left: 20px;
  @media only screen and (max-width: $breakpoint-md-max) {
    margin-left: 20px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-left: 0px;
    margin-top: 16px;
  }
}

.blooprint-card {
  width: 25%;
  margin-bottom: 40px;
  @media only screen and (max-width: $breakpoint-md-max) {
    margin-bottom: 40px;
    width: 25%;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-bottom: 20px;
    width: 50%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-bottom: 20px;
    width: 100%;
  }
}
.card-padding-r {
  padding-right: 20px;
  @media only screen and (max-width: $breakpoint-md-max) {
    padding-right: 20px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-right: 15px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-right: 0px;
  }
}
.see-more-btn {
  width: 220px;
  height: 50px;
  border-radius: 10px;
  font-weight: 600;
  margin-top: 0px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-weight: normal;
    margin-top: 20px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-weight: normal;
    margin-top: 20px;
  }
}

.dropdown-options {
  padding: 8px 30px !important;
  font-weight: 500 !important;
  font-size: 16px !important;
  &:hover {
    font-weight: 600 !important;
    color: $primary;
  }
  .q-item__label {
    line-height: 24px !important;
  }
}

.explore-dropdown[aria-expanded='true'] {
  color: $primary;
}
.category-menu {
  min-width: 600px;
  height: 410px;
  padding: 30px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    min-width: auto;
    width: 100%;
  }
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
.sub-category-menu {
  min-width: 600px;
  height: 410px;
  padding: 30px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    min-width: auto;
    width: 100%;
  }
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
.category-item {
  &:hover {
    color: $primary;
    font-weight: 600 !important;
  }
}
.sub-category-label {
  padding-left: 30px;
}
.q-btn-dropdown--split {
  padding-right: 10px !important;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-right: 0px !important;
  }
}
.skeleton-class {
  margin-left: 52px;
  margin-top: 30px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-left: 15px !important;
  }
}

::v-deep {
  .menu-drawer .q-drawer {
    width: 100vw !important;
  }
  .explore-dropdown {
    border: 1px solid $ghost;
    border-radius: 8px;
    .q-item {
      padding-left: 0;
    }
    &:active .q-focus-helper,
    &:focus .q-focus-helper,
    &:hover .q-focus-helper {
      background: transparent !important;
    }
    .q-btn-dropdown--current {
      -webkit-line-clamp: 1;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 24px;
      .q-btn__content {
        max-width: 510px !important;
        text-align: left;
        align-items: left !important;
        justify-content: left !important;
        @media only screen and (max-width: 1075px) {
          max-width: 400px !important;
        }
        @media only screen and (max-width: $breakpoint-sm-max) {
          max-width: 510px !important;
        }
      }
    }

    .q-btn-item {
      .q-btn__content {
        .q-icon {
          font-size: 24px !important;
          color: $regalBlue;
        }
      }
    }
    @media only screen and (max-width: $breakpoint-sm-max) {
      .q-btn__content {
        text-align: left;
        align-items: left !important;
        justify-content: left !important;
        // width: 100%;
        word-break: break-word;
        .q-btn-dropdown__arrow {
          text-align: right !important;
        }
      }
      .q-btn-dropdown__arrow-container {
        margin-right: 10px !important;
      }
      width: 100%;
    }
  }
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: $secondary;
  border-radius: 10px;
}

.reveal {
  &.active {
    opacity: 1;
    &.fade-left {
      animation: fade-left 0.4s ease-out;
    }
    &.fade-right {
      animation: fade-right 0.4s ease-out;
    }
  }
}
@keyframes fade-left {
  0% {
    transform: translateX(-200px);
  }
}

@keyframes fade-right {
  0% {
    transform: translateX(200px);
  }
}
</style>
<style lang="scss">
.sort-menu {
  .q-focus-helper {
    background: white !important;
    opacity: 0.15;
  }
}
</style>
