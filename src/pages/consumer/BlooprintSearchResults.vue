<template>
  <div>
    <div class="bg-solitudeBlue search-margin text-regalBlue">
      <div class="search-heading f-w-400">Search results for</div>
      <div class="search-text-style f-w-600 q-mb-md ellipsis">
        {{ blooprintFilterTerm }}
      </div>
      <div class="search-heading q-pt-xs">
        <span class="f-w-600">{{ totalSearchResultCount }}</span>
        <span class="f-w-400"> showing</span>
      </div>
    </div>
    <ExploreBlooprints
      class="explore-margin"
      @fetch-total-count="fetchTotalCount"
    />
  </div>
</template>
<script>
import ExploreBlooprints from './ExploreBlooprints.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'BlooprintSearchResults',
  data() {
    return {
      totalSearchResultCount: 0
    }
  },
  components: {
    ExploreBlooprints
  },
  computed: {
    ...mapGetters(['blooprintFilterTerm'])
  },
  methods: {
    fetchTotalCount(count) {
      this.totalSearchResultCount = count
    }
  }
}
</script>
<style lang="scss" scoped>
.search-margin {
  height: 192px;
  padding: 30px 52px;
  @media only screen and (max-width: $breakpoint-md-max) {
    height: 192px;
    padding: 30px 52px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    height: 172px;
    padding: 30px 15px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    height: 172px;
    padding: 30px 15px;
  }
}
.search-heading {
  font-size: 20px;
  line-height: 28px;
}
.search-text-style {
  font-size: 48px;
  line-height: 56px;
  @media only screen and (max-width: $breakpoint-md-max) {
    font-size: 48px;
    line-height: 56px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 32px;
    line-height: 36px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 32px;
    line-height: 36px;
  }
}
.explore-margin {
  padding: 30px 52px;
  padding-bottom: 100px;
  @media only screen and (max-width: $breakpoint-md-max) {
    padding: 30px 52px;
    padding-bottom: 100px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 20px 15px;
    padding-bottom: 60px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 20px 15px;
    padding-bottom: 60px;
  }
}
</style>
