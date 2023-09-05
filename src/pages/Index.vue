<template>
  <q-page>
    <!-- <div class="text-center">
      <div>
        <q-img style="width: 110px" src="~assets/AppLogo.svg" />
      </div>
      <div>
        <q-img style="width: 300px" src="~assets/AppName.svg" />
      </div>
    </div> -->
  </q-page>
</template>

<script>
import { constants, isMobileApp } from 'src/utils/common'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['loggedIn', 'isMobileApp'])
  },
  mounted() {
    if (this.loggedIn) {
      if (this.isMobileApp) {
        this.$router.push({ name: constants.PAGE_FEATURE_BLOOPRINT }, () => {})
      } else {
        this.$router.push(
          { name: constants.PAGE_DESKTOP_HOME_SCREEN },
          () => {}
        )
      }
    } else {
      if (isMobileApp()) {
        this.$router.replace({ name: constants.PAGE_AUTH }, () => {})
      } else {
        this.$router.replace(
          { name: constants.PAGE_DESKTOP_LANDING_SCREEN },
          () => {}
        )
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
