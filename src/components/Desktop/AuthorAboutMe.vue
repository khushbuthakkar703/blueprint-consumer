<template>
  <q-card class="right-card about-me-section">
    <div
      class="img-video-container"
      v-if="profile.video != null && profile.video != ''"
    >
      <video id="video" class="img-video-iframe" controls muted>
        <source :src="profile.video" type="video/mp4" />
      </video>
    </div>
    <q-card-section>
      <div
        class="text-fs-24-lh-32 f-w-600 text-regalBlue"
        :style="profile.video ? 'margin-top:30px' : null"
      >
        About me
      </div>
      <div class="q-mt-lg">
        <div
          class="
          text-fs-16 text-lh-24
          f-w-600
          text-regalBlue
          ellipsis
          about-me-name
        "
        >
          {{ profile.firstName }} {{ profile.lastName }}
        </div>
        <div
          class="
          text-fs-16 text-lh-24
          f-w-600
          text-regalBlue
          word-break-break-word
        "
          v-if="profile.jobRole || profile.companyName"
        >
          {{ profile.jobRole }}
          <span v-if="profile.jobRole && profile.companyName">-</span>
          {{ profile.companyName }}
        </div>
        <div
          class="
          word-break-break-word
          text-fs-16 text-lh-24
          q-mt-lg
          f-w-500
          text-regalBlue
        "
        >
          {{ profile.yourself }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'AuthorAboutMe',
  props: ['profile']
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
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    border-radius: 0px !important;
  }
}
.about-me-section {
  margin-top: 20px;
  padding: 40px;

  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 15px !important;
    padding-bottom: 30px !important;
  }
}

.img-video-container {
  // border-radius: 10px;
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  @media only screen and (max-width: $breakpoint-md-max) {
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-top: 75%; /* 4:3 Aspect Ratio */
  }
}
.img-video-iframe {
  position: absolute;
  border-radius: 10px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.about-me-name {
  width: 40vw;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 60vw;
  }
}

.q-card__section--vert {
  padding: 0px;
}
</style>
