<template>
  <q-layout class="page" view="lHh lpr lFf">
    <!-- <DesktopHeader :displaySearchField="displaySearchField" /> -->
    <Header v-if="isHeaderPresent" />
    <q-page-container class="bg-whiteSmoke" style="padding: 0 !important">
      <router-view />
    </q-page-container>
    <!-- <DesktopFooter /> -->
    <Footer
      :singleLineFooter="false"
      :mediumFooter="true"
      :fullFooter="false"
    />
  </q-layout>
</template>
<script>
// import DesktopHeader from 'components/DesktopHeader.vue'
// import DesktopFooter from 'components/DesktopFooter.vue'
import Header from 'components/Desktop/Header.vue'
import Footer from 'components/Desktop/Footer.vue'

import { mapActions } from 'vuex'

export default {
  data() {
    return {
      displaySearchField: true,
      isHeaderPresent: false,
      searchBarDisplayList: ['/explore', '/blooprint-library']
    }
  },
  components: {
    Header,
    Footer
  },
  watch: {
    $route: 'checkToDisplayHeaderFooter'
  },
  mounted() {
    this.checkToDisplayHeaderFooter()
  },
  methods: {
    ...mapActions(['isRequestFromMobile']),
    checkToDisplayHeaderFooter() {
      let selectedRoute = this.$router.history.current.fullPath
      if (selectedRoute.includes('payment/blooprints')) {
        this.isHeaderPresent = false
      } else {
        this.isHeaderPresent = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 600px !important;
  // min-height: 100vh !important;
}
</style>
