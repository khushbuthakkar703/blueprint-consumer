<template>
  <div>
    <q-img
      src="~/assets/landingScreenImage.jpg"
      :ratio="25 / 9"
      class="relative-position"
    >
      <div class="row transparent absolute-position cover-heading">
        <div
          class="col-md-7 col-sm-7 col-xs-12 q-px-xl q-py-lg rounded-borders"
          style="background: #00000073"
        >
          <div class="text-weight-medium text-capitalize heading">
            Get <span class="text-lime">Blooprinted</span> for <br />
            your own <span class="text-lime">goals!</span>
          </div>
          <div class="q-mt-md text-weight-regular subheading">
            No matter the market, Blooprinted enables users to create templates
            that others can purchase for their personal, professional, or
            lifestyle goals!
          </div>
        </div>
      </div>
    </q-img>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.cover-heading {
  top: 25%;
  padding: 0px !important;
  .heading {
    font-size: 4vw;
    line-height: 100%;
  }
  .subheading {
    font-size: 1.7vw;
    line-height: 130%;
  }
}
@media only screen and (max-width: $breakpoint-xs-max) {
  .cover-heading {
    position: relative;
    top: 0px;
    height: 100%;
    padding: 0px !important;
    .heading {
      font-size: 5vw;
      line-height: 100%;
      text-align: center;
    }
    .subheading {
      font-size: 2.5vw;
      line-height: 130%;
      text-align: center;
    }
  }
}
.bg-cornflower-blue {
  background: #374391;
}
</style>
