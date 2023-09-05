<template>
  <div>
    <q-img
      src="~/assets/HomePageBanner.png"
      class="relative-position banner-image gt-xs"
      position="right center"
    >
      <div
        class="row absolute-position transparent reveal fade-bottom active"
        style="left: 3%; top: 6%"
      >
        <div
          class="
            col-md-9 col-sm-7
            bg-white
            border-radius-lg
            padding-mid
            shadow-2
          "
          style="min-width: 333px"
        >
          <div
            class="text-bold responsive-heading text-regalBlue text-letter-space"
          >
            Beyond <br />
            Courses!
          </div>
          <div
            class="
              responsive-subheading
              text-regalBlue
              margin-bottom-md
              q-mt-lg
            "
          >
            <div>
              Your audience is begging to follow in your footsteps.
              <br />blooprinted makes it easy to show them how it's done—beyond
              just an online course!
            </div>
          </div>
          <div class="q-mt-sm">
            <q-btn
              color="primary"
              label="Explore blooprints"
              no-caps
              no-wrap
              class="bold-text border-radius-md"
              padding="16px 30px 16px 40px"
              @click="onClickExploreBtn"
            >
              <div class="col text-left relative-position">
                <q-avatar style="margin-left: 17px" class="arrow" size="18px">
                  <img src="~assets/chevron-right.svg" />
                </q-avatar>
              </div>
            </q-btn>
          </div>
        </div>
      </div>
    </q-img>
    <div class="lt-sm">
      <div class="top-container-mobile">
        <div
          class="text-bold responsive-heading text-regalBlue reveal fade-left active text-letter-space"
        >
          Beyond <br />
          Courses!
        </div>
        <div
          class="responsive-subheading text-regalBlue q-mt-md margin-bottom-md reveal fade-left active"
        >
          <div>
            Your audience is begging to follow in your footsteps. blooprinted
            makes it easy to show them how it's done—beyond just an online
            course!
          </div>
        </div>
        <div class="q-mt-sm">
          <q-btn
            color="primary"
            label="Explore blooprints"
            no-caps
            class="bold-text q-px-xs reveal fade-bottom active"
            style="border-radius: 5px; height: 40px"
            @click="onClickExploreBtn"
            ><div class="col text-left">
              <q-avatar style="margin-left: 17px" class="arrow" size="14px">
                <img src="~assets/chevron-right.svg" />
              </q-avatar></div
          ></q-btn>
        </div>
      </div>
      <q-img
        src="~/assets/HomePageMobileBanner.png"
        class="reveal fade-right active"
        :style="defaultImageStyle"
        @load="defaultImageStyle = 'min-height:fit-content'"
        width="100%"
      ></q-img>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultImageStyle: 'min-height:40vh'
    }
  },
  methods: {
    onClickExploreBtn() {
      this.$router.replace({ name: 'explore-screen' })
    }
  }
}
</script>

<style lang="scss" scoped>
.banner-image {
  min-height: 60vh;
  @media only screen and (max-width: $breakpoint-sm-max) {
    height: 60vh !important;
  }
  @media only screen and (min-width: 2000px) {
    height: unset;
    min-height: unset;
  }
}
.arrow {
  margin-bottom: 2px;
}
.margin-bottom-md {
  margin-bottom: 30px;
}
.padding-mid {
  padding: 40px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 24px;
  }
}
.top-container-mobile {
  margin-bottom: 30px;
  margin-top: 25px;
  margin-left: 15px;
  margin-right: 15px;
}
</style>
