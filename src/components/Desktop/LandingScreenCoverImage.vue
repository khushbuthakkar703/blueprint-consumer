<template>
  <div>
    <q-img
      src="~/assets/HomePageBanner.png"
      class="relative-position banner-image gt-xs"
      position="center center"
    >
      <div class="row absolute-position transparent" style="left:2%; top:15%">
        <div
          class="col-md-8 col-sm-7 bg-white border-radius-lg padding-mid shadow-2 full-width"
        >
          <div
            class="text-bold explore-heading text-regalBlue text-letter-space"
          >
            Discover the possibilities
          </div>
          <div
            class="responsive-subheading text-regalBlue"
            style="margin-top:20px"
          >
            With easy to follow blooprints
          </div>
        </div>
      </div>
    </q-img>
    <div class="lt-sm">
      <q-img
        class="relative-position"
        src="~/assets/HomePageMobileBanner.png"
        position="right center"
        width="100%"
        height="400px"
      >
        <q-card bordered class="card-xs-border bg-white shadow-3">
          <div
            class="text-bold explore-heading text-black q-pa-xs text-letter-space"
          >
            Discover the possibilities
          </div>

          <div
            class="responsive-subheading text-black q-pa-xs"
            style="margin-top:2px"
          >
            With easy to follow blooprints
          </div>
        </q-card>
      </q-img>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingScreenCoverImage'
}
</script>

<style lang="scss" scoped>
.banner-image {
  height: 550px;
  background-position: 0% 50%;
  @media only screen and (max-width: $breakpoint-md-max) {
    background-position: 0% 50%;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    background-position: 70% 50%;
  }
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
.card-xs-border {
  border-radius: 20px;
  margin: 15px 15px 0px 15px;
}
.explore-heading {
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 35px;
    line-height: 40px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 32px;
    line-height: 36px;
  }
}
</style>
