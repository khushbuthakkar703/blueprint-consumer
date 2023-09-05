<template>
  <div class="trustedby-section">
    <div class="heading text-regalBlue text-center reveal fade-bottom">
      There's a blooprint for every skill
    </div>
    <div class="text-center row justify-center reveal fade-bottom">
      <div class="description col-md-8 col-sm-12 col-xs-12 text-regalBlue">
        No matter what skill you've mastered, there's a blooprint to help others
        do the same. From business to book publishing, your blooprint's focus
        will encourage others to follow in your footsteps and master their
        passion!
      </div>
    </div>
    <div class="trustedby-logos row justify-around">
      <div
        class=" col-md-2 col-sm-6 col-xs-5 logo-container text-center reveal fade-left"
      >
        <q-img
          class="image-1"
          src="~assets/trusted by svg.svg"
          img-class="image-1-section"
        />
        <div
          class="text-center text-regalBlue f-w-600 text-fs-24-lh-32"
          style="margin-top: 20px"
        >
          Business
        </div>
      </div>
      <div
        class=" col-md-2 col-sm-6 col-xs-7 logo-container text-center reveal fade-left"
      >
        <q-img
          class="image-2"
          img-class="image-2-section"
          src="~assets/trusted by svg.svg"
        />
        <div
          class="text-center text-regalBlue f-w-600 text-fs-24-lh-32"
          style="margin-top: 20px"
        >
          Relationships
        </div>
      </div>
      <div
        class=" col-md-2  col-sm-6 col-xs-6 logo-container text-center bottom-container reveal fade-bottom"
      >
        <q-img
          class="image-3"
          img-class="image-3-section"
          src="~assets/trusted by svg.svg"
        />
        <div
          class="text-center text-regalBlue f-w-600 text-fs-24-lh-32"
          style="margin-top: 6px"
        >
          Art
        </div>
      </div>
      <div
        class=" col-md-2 col-sm-6 col-xs-6 logo-container text-center bottom-container reveal fade-right"
      >
        <q-img
          class="image-4"
          img-class="image-4-section"
          src="~assets/trusted by svg.svg"
        />
        <div
          class="text-center text-regalBlue f-w-600 text-fs-24-lh-32"
          style="margin-top: 20px"
        >
          Finances
        </div>
      </div>
      <div class="gt-sm justify-center text-center col-md-2 reveal fade-right">
        <q-img
          class="image-5"
          img-class="image-5-section"
          src="~assets/trusted by svg.svg"
        />
        <div
          class="text-center text-regalBlue f-w-600 text-fs-24-lh-32"
          style="margin-top: 20px"
        >
          Book Publishing
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.trustedby-section {
  padding: 0px 52px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 0px 15px !important;
  }
}
.heading {
  font-weight: 600;
  font-size: 32px;
  line-height: 36px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 24px;
    line-height: 28px;
  }
}
.description {
  font-weight: 400;
  margin-top: 30px;
  font-size: 20px;
  line-height: 28px;
}
.trustedby-logos {
  margin-top: 90px;
}

.bottom-container {
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 60px;
  }
}

.image-1 {
  width: 103.25px;
  height: 107px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 76.66px;
    height: 79.73px;
  }
}
::v-deep {
  .image-1-section {
    background-size: 1220px !important;
    background-position: 0px -10px !important;
    @media only screen and (max-width: $breakpoint-sm-max) {
      background-size: 870px !important;
      background-position: 0px -8px !important;
    }
  }
  .image-2-section {
    background-size: 1175px !important;
    background-position: -268px -8px !important;
    @media only screen and (max-width: $breakpoint-sm-max) {
      background-size: 870px !important;
      background-position: -198px -6px !important;
    }
  }
  .image-3-section {
    background-size: 1100px !important;
    background-position: -480px 0px !important;
    @media only screen and (max-width: $breakpoint-sm-max) {
      background-size: 870px !important;
      background-position: -382px 0px !important;
    }
  }
  .image-4-section {
    background-size: 1100px !important;
    background-position: -720px 0px !important;
    @media only screen and (max-width: $breakpoint-sm-max) {
      background-size: 870px !important;
      background-position: -566px -6px !important;
    }
  }
  .image-5-section {
    background-size: 1100px !important;
    background-position: -975px 5px !important;
    @media only screen and (max-width: $breakpoint-sm-max) {
      background-size: 870px !important;
      background-position: -382px 0px !important;
    }
  }
}
.image-2 {
  width: 108.07px;
  height: 108px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 80.05px;
    height: 80px;
  }
}
.image-3 {
  width: 115.8px;
  height: 123.1px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 106.74px;
    height: 96px;
  }
}
.image-4 {
  width: 104.41px;
  height: 109.45px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 85px;
    height: 81px;
  }
}

.image-5 {
  width: 131.11px;
  height: 109px;
}
</style>
