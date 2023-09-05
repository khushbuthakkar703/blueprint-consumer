<template>
  <q-layout class="page" view="lHh Lpr lFf">
    <Header v-if="isHeaderFooterPresent" />
    <!-- <DesktopHeader v-if="isHeaderFooterPresent" /> -->
    <q-page-container style="padding: 0 !important">
      <q-pull-to-refresh bg-color="primary" color="white" @refresh="refresh">
        <router-view />
      </q-pull-to-refresh>
    </q-page-container>
    <!-- <DesktopFooter v-if="isHeaderFooterPresent" /> -->
    <Footer
      v-if="isHeaderFooterPresent || isPaymentSignupScreen"
      :singleLineFooter="false"
      :mediumFooter="true"
      :fullFooter="false"
    />
  </q-layout>
</template>

<script>
import Header from 'components/Desktop/Header.vue'
import Footer from 'components/Desktop/Footer.vue'
// import DesktopHeader from 'components/DesktopHeader.vue'
// import DesktopFooter from 'components/DesktopFooter.vue'
export default {
  name: 'MainLayout',
  data() {
    return {
      leftDrawerOpen: false,
      isHeaderFooterPresent: false,
      isPaymentSignupScreen: false
    }
  },
  components: {
    Header,
    Footer
    // DesktopHeader,
    // DesktopFooter
  },
  watch: {
    $route: 'checkToDisplayHeaderFooter'
  },
  mounted() {
    this.checkToDisplayHeaderFooter()
  },
  methods: {
    refresh(done) {
      setTimeout(() => {
        window.location.reload()
        done()
      }, 1000)
    },
    checkToDisplayHeaderFooter() {
      let selectedRoute = this.$router.history.current.fullPath
      if (
        selectedRoute.includes('login') ||
        selectedRoute.includes('register') ||
        selectedRoute.includes('forgot-password') ||
        selectedRoute.includes('terms') ||
        selectedRoute.includes('privacy') ||
        selectedRoute.includes('reset-password') ||
        selectedRoute.includes('account-activation') ||
        selectedRoute.includes('home')
      ) {
        this.isHeaderFooterPresent = true
      } else {
        this.isHeaderFooterPresent = false
      }
      this.isPaymentSignupScreen = selectedRoute.includes('signup/blooprints')
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 600px !important;
}
</style>
