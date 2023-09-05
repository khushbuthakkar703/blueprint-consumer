<template>
  <q-page v-if="isSearchTermPresent()">
    <LandingScreenCoverImage />
    <FeaturedBlooprints class="bg-solitudeBlue" />
    <div class="bg-white screen-p-style">
      <ExploreBlooprints ref="exploreBlooprintsView" class="explore-p-bottom" />
      <!-- <BlooprintOffers class="q-mt-xl q-ml-xl" /> -->
    </div>
    <div class="bg-white">
      <q-separator
        class="separator-style bg-solitudeBlue"
        style="height: 5px"
      />
    </div>

    <MoreCategories class="bg-white screen-p-style" style="padding-top: 60px" />
  </q-page>
  <q-page v-else>
    <BlooprintSearchResults />
  </q-page>
</template>
<script>
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll
import LandingScreenCoverImage from 'components/Desktop/LandingScreenCoverImage.vue'
import FeaturedBlooprints from 'pages/consumer/FeaturedBlooprints.vue'
import ExploreBlooprints from 'pages/consumer/ExploreBlooprints.vue'
import BlooprintSearchResults from 'pages/consumer/BlooprintSearchResults.vue'

// import BlooprintOffers from 'src/pages/consumer/BlooprintOffers.vue'
import MoreCategories from 'src/components/Desktop/MoreCategories.vue'

import { isLogin } from 'src/utils/common'
import { mapActions } from 'vuex'

export default {
  name: 'ExploreLandingScreen',
  meta() {
    return {
      title: this.metaTitle
    }
  },
  data() {
    return {
      isUserLoggedIn: false,
      routeQueryTerm: {
        search: '',
        category: '',
        subcategory: '',
        sortoption: ''
      }
    }
  },
  computed: {
    metaTitle() {
      let searchTerm = this.$route.query.search
      return searchTerm
        ? `${searchTerm} - blooprinted`
        : 'Find your next blooprint - blooprinted'
    }
  },
  watch: {
    $route(to, from) {
      if (!to['query']['search']) {
        this.updateBlooprintFilterTerm('')
        this.routeQueryTerm['search'] = ''
      } else {
        this.updateBlooprintFilterTerm(to['query']['search'])
        this.routeQueryTerm['search'] = to['query']['search']
      }
      if (!to['query']['sortoption']) {
        this.updateBlooprintSortOption('')
        this.routeQueryTerm['sortoption'] = ''
      } else {
        this.updateBlooprintSortOption(to['query']['sortoption'])
        this.routeQueryTerm['sortoption'] = to['query']['sortoption']
      }
      if (!to['query']['category']) {
        this.updateBlooprintCategoryFilterTerm({})
        this.routeQueryTerm['category'] = ''
        this.routeQueryTerm['subcategory'] = ''
      } else {
        this.updateBlooprintCategoryFilterTerm({
          category: to['query']['category'],
          subcategory: to['query']['subcategory']
        })
        this.routeQueryTerm['category'] = to['query']['category']
        this.routeQueryTerm['subcategory'] = to['query']['subcategory']
        this.$nextTick(() => {
          // this.$refs.exploreBlooprintsView.$el.scrollIntoView({behavior: 'smooth', block: 'start'})
          const ele = this.$refs?.exploreBlooprintsView?.$el
          if (ele) {
            const target = getScrollTarget(ele)
            const offset = ele.offsetTop
            const duration = 500
            setScrollPosition(target, offset, duration)
          }
        })
      }
    }
  },
  components: {
    LandingScreenCoverImage,
    FeaturedBlooprints,
    ExploreBlooprints,
    BlooprintSearchResults,
    // BlooprintOffers,
    MoreCategories
  },
  created() {
    this.exploreScreenUpdate()
  },
  mounted() {
    this.isUserLoggedIn = isLogin()
  },
  updated() {
    this.exploreScreenUpdate()
  },
  methods: {
    ...mapActions([
      'updateBlooprintFilterTerm',
      'updateBlooprintCategoryFilterTerm',
      'updateBlooprintSortOption'
    ]),
    exploreScreenUpdate() {
      let currentRouteQuery = this.$router.history.current.query
      if (currentRouteQuery && currentRouteQuery['category']) {
        this.updateBlooprintCategoryFilterTerm({
          category: currentRouteQuery['category'],
          subcategory: currentRouteQuery['subcategory']
            ? currentRouteQuery['subcategory']
            : ''
        })
        this.routeQueryTerm['category'] = currentRouteQuery['category']
        this.routeQueryTerm['subcategory'] = currentRouteQuery['subcategory']
      } else {
        this.updateBlooprintCategoryFilterTerm({})
        this.routeQueryTerm['category'] = ''
        this.routeQueryTerm['subcategory'] = ''
      }
      if (currentRouteQuery && currentRouteQuery['search']) {
        this.updateBlooprintFilterTerm(currentRouteQuery['search'])
        this.routeQueryTerm['search'] = currentRouteQuery['search']
      } else {
        this.updateBlooprintFilterTerm('')
        this.routeQueryTerm['search'] = ''
        if (currentRouteQuery['sortoption'] || currentRouteQuery['category']) {
          this.$nextTick(() => {
            // this.$refs.exploreBlooprintsView.$el.scrollIntoView()
            const ele = this.$refs.exploreBlooprintsView.$el
            const target = getScrollTarget(ele)
            const offset = ele.offsetTop
            const duration = 2000
            setScrollPosition(target, offset, duration)
          })
        }
      }
      if (currentRouteQuery && currentRouteQuery['sortoption']) {
        this.updateBlooprintSortOption(currentRouteQuery['sortoption'])
        this.routeQueryTerm['sortoption'] = currentRouteQuery['sortoption']
      } else {
        this.updateBlooprintSortOption('')
        this.routeQueryTerm['sortoption'] = ''
      }
    },
    isSearchTermPresent() {
      if (this.routeQueryTerm) {
        if (this.routeQueryTerm['search'] != '') {
          return false
        } else {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.screen-p-style {
  padding-top: 60px;
  padding-left: 52px;
  @media only screen and (max-width: $breakpoint-md-max) {
    padding-top: 60px;
    padding-left: 52px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-top: 40px;
    padding-left: 15px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-top: 40px;
    padding-left: 15px;
  }
}
.category-padding {
  padding-left: 52px;
  @media only screen and (max-width: $breakpoint-md-max) {
    padding-left: 52px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-left: 15px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-left: 15px;
  }
}
.explore-p-bottom {
  padding-top: 90px;
  padding-bottom: 100px;
  padding-right: 52px;
  @media only screen and (max-width: $breakpoint-md-max) {
    padding-bottom: 100px;
    padding-right: 52px;
    padding-top: 90px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-bottom: 60px;
    padding-right: 15px;
    padding-top: 150px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-bottom: 60px;
    padding-right: 15px;
    padding-top: 150px;
  }
}
.separator-style {
  margin: 0px 52px;
  @media only screen and (max-width: $breakpoint-md-max) {
    margin: 0px 52px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin: 0px 15px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin: 0px 15px;
  }
}
</style>
