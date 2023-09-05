<template>
  <div class="choose-blooprinted-section bg-solitudeBlue">
    <div
      class="text-heading text-center text-regalBlue reveal fade-bottom text-letter-space"
    >
      Not just another e-learning platform
    </div>
    <div class="text-description text-center text-regalBlue reveal fade-bottom">
      blooprinted was built from the ground up to help you impact lives on a
      massive scale. Our team and Creator community are dedicated to helping you
      build your blooprinted sales, while our platform helps you easily organize
      your curriculum into a task-based format.
    </div>
    <div class="vector-container bg-solitudeBlue row justify-around">
      <div class="col-md-3 col-xs-12">
        <div class="text-center reveal fade-left">
          <div>
            <q-img class="image-1"></q-img>
          </div>
          <div class="caption-text row justify-center">
            <div class="col-md-10 col-xs-12 text-regalBlue">
              Receive <span class="text-primary">guidance</span> from our team
              of blooprint experts and other Creators in our community
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-xs-12">
        <div class="text-center reveal fade-bottom">
          <div>
            <q-img class="image-2"></q-img>
          </div>
          <div class="caption-text row justify-center">
            <div class="col-md-10 col-xs-12 text-regalBlue">
              <span class="text-primary">Create </span> task-based curriculum
              that leads to higher completion rates
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-xs-12">
        <div class="text-center reveal fade-right">
          <div>
            <q-img class="image-3"></q-img>
          </div>
          <div class="caption-text row justify-center">
            <div class="col-md-10 col-xs-12 text-regalBlue">
              <span class="text-primary">Build</span> deeper relationships with
              your blooprint members
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.text-heading {
  font-size: 48px;
  line-height: 56px;
  font-weight: 600;
  padding-top: 250px;
  margin: 0px 52px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-top: 250px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 32px;
    line-height: 36px;
    padding-top: 260px;
    margin: 0px 15px;
  }
}
.text-description {
  font-size: 20px;
  line-height: 28px;
  font-weight: 400;
  margin: 30px 52px 0px 52px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 20px;
    line-height: 28px;
    margin: 30px 15px 0px 15px;
  }
}
.vector-container {
  margin-top: 100px;
  margin-left: 52px;
  margin-right: 52px;
  padding-bottom: 169px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 0px;
    padding-bottom: 100px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 0px;
    margin-left: 55px;
    margin-right: 55px;
    padding-bottom: 57px;
  }
}
.caption-text {
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  margin-top: 46px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 30px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 20px;
    line-height: 24px;
    margin-top: 30px;
  }
}
.image-1 {
  background-image: url('~assets/Why choose blooprinted svg.svg');
  background-position: -25px -29px;
  background-size: auto;
  width: 130px;
  height: 120px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    background-position: -17px -22px;
    background-size: 850px;
    width: 110px;
    height: 100px;
    margin-top: 50px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 70px;
  }
}
.image-2 {
  background-image: url('~assets/Why choose blooprinted svg.svg');
  background-position: -477px -30px;
  background-size: auto;
  width: 130px;
  height: 120px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    background-position: -367px -22px;
    background-size: 850px;
    width: 110px;
    height: 100px;
    margin-top: 50px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 80px;
  }
}
.image-3 {
  background-image: url('~assets/Why choose blooprinted svg.svg');
  background-position: -903px -31px;
  background-size: auto;
  width: 180.01px;
  height: 120px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    background-position: -705px -22px;
    background-size: 850px;
    width: 150px;
    height: 100px;
    margin-top: 50px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 80px;
  }
}
</style>
