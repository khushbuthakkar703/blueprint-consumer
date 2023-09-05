<template>
  <div class="amazing-thing-image-section image-section-margin">
    <div class="row justify-between">
      <div class="col-md-4 col-sm-6 col-xs-11 text-section relative-position">
        <div class="text-container reveal fade-left">
          <div class="text-heading text-regalBlue text-letter-space">
            Show us how you built it?
          </div>
          <div class="text-description text-regalBlue">
            Whether you've built a business or mastered a unique skill, your
            blooprint shows people how it's done and takes them by the hand to
            follow in your footsteps. Create daily objectives for your followers
            and watch them accomplish their goal in less time than they would
            through a course or in-person training.
          </div>
        </div>
      </div>
      <div
        class="col-md-7 col-sm-5 col-xs-12 overflow-hidden reveal fade-bottom"
      >
        <q-img
          src="~assets/DefaultLogo.png"
          @load="imageStyle = ''"
          :style="imageStyle"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageStyle: 'min-height:50vh'
    }
  }
}
</script>

<style lang="scss" scoped>
.text-heading {
  font-size: 48px;
  line-height: 56px;
  font-weight: 600;
  padding-bottom: 30px;
  @media only screen and (max-width: 1300px) {
    font-size: 28px;
    line-height: 32px;
    padding-bottom: 10px;
  }
  @media only screen and (max-width: 750px) {
    font-size: 20px;
    line-height: 28px;
    padding-bottom: 10px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 32px;
    line-height: 36px;
    padding-bottom: 20px;
    color: black;
  }
}
.image-section-margin {
  margin-top: 30px;
  @media only screen and (max-width: 900px) {
    margin-top: 50px;
  }
  @media only screen and (max-width: 680px) {
    margin-top: 70px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 40px;
  }
}
.text-description {
  font-size: 20px;
  line-height: 28px;
  font-weight: 400;
  @media only screen and (max-width: 1345px) {
    font-size: 16px;
    line-height: 24px;
  }
  @media only screen and (max-width: 1100px) {
    font-size: 14px;
    line-height: 20px;
  }
  @media only screen and (max-width: 780px) {
    font-size: 13px;
    line-height: 17px;
  }
  @media only screen and (max-width: 735px) {
    font-size: 12px;
    line-height: 16px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    margin-bottom: 30px;
    color: black;
  }
}
.text-section {
  margin-left: 52px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-left: 16px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-left: 16px;
    margin-right: 14px;
  }
}
.text-container {
  position: absolute;
  top: 20%;
  @media only screen and (max-width: $breakpoint-sm-max) {
    top: 20%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    position: relative;
    top: 5%;
  }
}
</style>
