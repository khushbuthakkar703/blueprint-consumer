<template>
  <q-layout class="" view="lHh lpr lFf" v-if="!isUserLoggedIn">
    <DesktopHeader />
    <DesktopFooter />
    <q-page-container>
      <router-view />
      <LandingScreenCoverImage />
      <PopularBlooprints />
      <BlooprintedCreators />
    </q-page-container>
  </q-layout>
  <div v-else>
    <LandingScreenCoverImage />
    <PopularBlooprints />
    <BlooprintedCreators />
  </div>
</template>
<script>
import DesktopHeader from 'components/DesktopHeader.vue'
import DesktopFooter from 'components/DesktopFooter.vue'
import PopularBlooprints from './PopularBlooprints.vue'
import BlooprintedCreators from './BlooprintedCreators.vue'
import LandingScreenCoverImage from 'components/LandingScreenCoverImage.vue'

import { isLogin } from 'src/utils/common'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      isUserLoggedIn: false
    }
  },
  components: {
    DesktopHeader,
    DesktopFooter,
    PopularBlooprints,
    BlooprintedCreators,
    LandingScreenCoverImage
  },
  mounted() {
    this.isUserLoggedIn = isLogin()
  }
}
</script>

<style lang="scss" scoped></style>
