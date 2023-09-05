<template>
  <div class="amazing-thing-section row justify-between reverse-wrap">
    <div
      class="col-md-6 col-sm-7 col-xs-12 relative-position reveal fade-left active"
    >
      <q-img
        class="section-parent-image"
        src="~assets/blooprint-detail-prepurchase.jpg"
        @load="parentClass = ''"
        :class="parentClass"
      >
      </q-img>
      <q-img
        class="section-child-image absolute-position"
        src="~assets/blooprint-detail-prepurchasemobile.png"
      >
      </q-img>
    </div>
    <div class="col-md-6 col-sm-5 col-xs-12 relative-position">
      <div class="section-text-content reveal fade-right active">
        <div class="text-heading text-regalBlue text-letter-space">
          Nobody likes to sit through an online course!
        </div>
        <div class="text-subheading text-regalBlue">
          blooprinted makes it easy for people to follow in your footsteps
          through task-based learning!
        </div>
        <div class="text-description text-regalBlue">
          It's estimated that only 3% of online courses are ever completed by
          students. blooprinted takes a different approach. Instead of forcing
          people to sit through hours of video content without ever implementing
          anything, they're given short daily objectives that add up to
          tangible, real-world results.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parentClass: 'default-height'
    }
  }
}
</script>

<style lang="scss" scoped>
$shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
$border: 2px solid #ffffff;
.amazing-thing-section {
  margin-top: 100px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 44px;
  }
}
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
.text-subheading {
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  padding-bottom: 20px;
  @media only screen and (max-width: 1345px) {
    font-size: 16px;
    line-height: 24px;
    padding-bottom: 8px;
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
    padding-bottom: 20px;
    color: black;
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
    margin-bottom: 20px;
    color: black;
  }
}
.section-text-content {
  position: absolute;
  left: 8%;
  top: 2%;
  margin: 50px 40px;
  // width: 65%;
  @media only screen and (max-width: $breakpoint-sm-max) {
    left: 0;
    top: 0;
    // width: 80%;
    margin: 10px 25px;
  }
  @media only screen and (max-width: 645px) {
    position: relative;
    // width: 90%;
    left: 0;
    top: 0;
    margin: 0px 14px 0px 16px;
  }
}
.section-parent-image {
  width: 80%;
  background: #ffffff;
  border: $border;
  box-shadow: $shadow;
  border-radius: 20px;
}
.section-child-image {
  width: 31%;
  left: 68%;
  border-radius: 10px;
  margin-top: -45%;
  border: $border;
  box-shadow: $shadow;
  @media only screen and (max-width: $breakpoint-xs-max) {
    left: 68%;
  }
}
.default-height {
  min-height: 28vw;
  @media only screen and (max-width: $breakpoint-xs-max) {
    min-height: 60vw;
  }
}
</style>
