<template>
  <q-layout
    class="bg-whiteSmoke"
    view="lHh lpr lFf"
    style="min-height: inherit"
  >
    <Header404 @on-header-icon-click="onLogoClick" />

    <q-page-container>
      <q-page
        class="q-ma-md-xl q-ma-sm-xl q-ma-xs-lg margin border-secondary shadow-1 bg-white flex flex-center text-center"
      >
        <div class="q-mb-xl q-mt-md">
          <div class="text-smalt text-bold text-h3">
            Oops!!
          </div>
          <q-img
            class="q-my-xl"
            style="width: 145px"
            src="~assets/404Icon.svg"
          />
          <div class="text-grey text-h5 q-px-xs-md text-center">
            The page you're looking for <br />
            can't be found.
          </div>
          <div
            class="q-mt-lg text-grey cursor-pointer q-px-xs-md"
            @click="onLogoClick"
          >
            <span class="text-h4 gt-sm">
              Click here to go back to Blooprinted App
            </span>
            <span class="text-h6 lt-md">
              Click here to go back to Blooprinted App
            </span>
          </div>
        </div>
      </q-page>
    </q-page-container>
    <DesktopFooter />
  </q-layout>
</template>

<script>
import Header404 from 'components/Header404.vue'
import DesktopFooter from 'components/DesktopFooter.vue'
import { isMobileApp } from '../utils/common'
import { constants } from 'src/utils/common'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  name: 'Error404',
  components: {
    Header404,
    DesktopFooter
  },
  methods: {
    // ************ Navigate back to default page *****************************8
    onLogoClick() {
      if (isMobileApp()) {
        this.$router.replace({ name: constants.PAGE_FEATURE_BLOOPRINT })
      } else {
        this.$router.replace({ name: constants.PAGE_DESKTOP_HOME_SCREEN })
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
