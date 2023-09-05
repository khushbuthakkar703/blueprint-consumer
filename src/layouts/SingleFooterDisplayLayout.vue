<template>
  <q-layout class="page" view="lHh lpr lFf">
    <Header v-if="isHeaderPresent" />
    <q-page-container style="padding: 0 !important">
      <router-view />
    </q-page-container>
    <Footer
      :singleLineFooter="true"
      :mediumFooter="false"
      :fullFooter="false"
    />
  </q-layout>
</template>
<script>
import Header from 'components/Desktop/Header.vue'
import Footer from 'components/Desktop/Footer.vue'

export default {
  data() {
    return {
      isHeaderPresent: false
    }
  },
  components: {
    Header,
    Footer
  },
  watch: {
    $route: 'checkToDisplayHeader'
  },
  mounted() {
    this.checkToDisplayHeader()
  },
  methods: {
    checkToDisplayHeader() {
      let selectedRoute = this.$router.history.current.fullPath
      if (
        selectedRoute.includes('register') ||
        selectedRoute.includes('forgot-password')
      ) {
        this.isHeaderPresent = true
      } else {
        this.isHeaderPresent = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 600px !important;
}
</style>
