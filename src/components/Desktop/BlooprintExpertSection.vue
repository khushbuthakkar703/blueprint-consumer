<template>
  <q-card class="right-card expert-section">
    <div
      class="explore-screen-headings f-w-600 text-regalBlue text-center text-letter-space"
    >
      Your blooprint expert
    </div>
    <div
      class="
        text-center text-regalBlue text-fs-16 text-lh-24
        f-w-500
        col-md-10 col-xs-12 col-sm-10
        expert-description
        word-break-break-word
      "
      style="margin-top: 16px"
    >
      Featuring industry experts, entrepreneurs, & industry leading
      professionals all accessible to you here in one place
    </div>
    <div class="row justify-around">
      <div class="col-md-3 col-sm-3 col-xs-12 icon-section-header">
        <div class="text-center icon-section">
          <div>
            <q-img src="~assets/Group-00.svg" class="image-01"></q-img>
          </div>
          <div class="row justify-center">
            <div
              class="
                col-md-10 col-xs-12 col-sm-10
                text-primary
                icon-section-text
                f-w-600
              "
            >
              Peer reviewed
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-xs-12 col-sm-3">
        <div class="text-center icon-section">
          <div>
            <q-img src="~assets/Group-01.svg" class="image-02"></q-img>
          </div>
          <div class="row justify-center">
            <div
              class="
                col-md-10 col-xs-12
                text-regalBlue
                icon-section-text
                f-w-600
              "
            >
              <span class="text-primary">Experience </span>Tried and trusted
              methods
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-xs-12 col-sm-3">
        <div class="text-center icon-section last-icon-section">
          <div>
            <q-img src="~assets/Group-02.svg" class="image-03"></q-img>
          </div>
          <div class="row justify-center">
            <div
              class="
                col-md-10 col-xs-12 col-sm-10
                text-regalBlue
                icon-section-text
                f-w-600
              "
            >
              <span class="text-primary">Support</span> relationships with the
              Creators
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>
<script>
export default {
  name: 'BlooprintExpertSection'
}
</script>
<style lang="scss" scoped>
.right-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 10px 20px $shadow;
  border-radius: 20px;

  @media only screen and (max-width: 1023px) and (min-width: 769px) {
    padding-left: 16px;
    padding-right: 16px;
    box-shadow: 0px 10px 20px $shadow;
  }
  @media only screen and (max-width: 1023px) {
    border-radius: 0px !important;
    margin-top: 20px;
  }
}

.expert-section {
  padding: 40px 40px 46px;

  @media only screen and (max-width: 599px) {
    padding: 30px 15px !important;
    margin-top: 20px;
    border: 0px !important;
  }
}

.explore-screen-headings {
  @media only screen and (max-width: 599px) {
    text-align: left;
  }

  @media only screen and (max-width: 1023px) and (min-width: 600px) {
    font-size: 32px;
    line-height: 36px;
  }
}

.expert-description {
  @media only screen and (max-width: 599px) {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    text-align: left;
  }
}

.icon-section-header {
  @media only screen and (max-width: 599px) {
    margin-top: 32px !important;
  }
}
.icon-section {
  margin-top: 48px;
  @media only screen and (max-width: 599px) {
    display: flex;
    align-items: center;
    align-self: center;
    margin-bottom: 30px !important;
    margin-left: 15px !important;
    margin-top: 0px !important;
  }
}

.last-icon-section {
  @media only screen and (max-width: 599px) {
    margin-bottom: 0px !important;
  }
}

.icon-section-text {
  margin-top: 24px;
  font-size: 20px;
  line-height: 28px;
  @media only screen and (max-width: 599px) {
    padding-left: 16px;
    text-align: left !important;
    margin-top: 0px !important;
    font-size: 16px;
    line-height: 24px;
  }
}

.image-01,
.image-02 {
  width: 64.62px !important;
  height: 60px;
  @media only screen and (max-width: 599px) {
    width: 50px !important;
    height: 46.43px;
  }
}

.image-03 {
  width: 90px;
  height: 60px;
  @media only screen and (max-width: 599px) {
    width: 50px !important;
    height: 33.33px;
  }
}
</style>
