<template>
  <div class="col">
    <div
      class="description text-regalBlue word-break-break-word"
      :class="showFullDescription ? 'full-description' : 'min-description'"
    >
      {{ description }}
    </div>
    <div
      v-if="description && description.length > 570"
      @click="handleReadMore"
      class="text-primary cursor-pointer read-more-text"
    >
      {{ readMore ? 'Hide' : 'Read more' }}
    </div>
    <div class="video-container" v-if="video !== undefined && video.length">
      <video controls="true" class="intro-video">
        <source :src="video" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      readMore: false,
      showFullDescription: false
    }
  },
  props: ['description', 'video'],
  methods: {
    handleReadMore() {
      this.showFullDescription = !this.showFullDescription
      setTimeout(
        () => {
          this.readMore = !this.readMore
        },
        this.readMore ? 300 : 200
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.description {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  margin-top: 30px;
}
.min-description {
  max-height: 140px;
  transition: max-height 0.4s ease-out;
  overflow: hidden;
  @media only screen and (max-width: $breakpoint-xs) {
    max-height: 225px;
  }
}
.full-description {
  max-height: 1400px;
  transition: max-height 0.5s ease-in;
  overflow: hidden;
  @media only screen and (max-width: $breakpoint-xs) {
    max-height: 2000px;
  }
}

.read-more-text {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-top: 8px;
  &:hover {
    text-decoration: underline;
  }
}
.video-container {
  margin-top: 60px;
  background: black;
  border-radius: 20px;
  @media only screen and (max-width: $breakpoint-xs) {
    margin-top: 30px;
    border-radius: 10px;
  }
  .intro-video {
    border-radius: 20px;
    aspect-ratio: 16/9;
    width: 100%;
  }
}
</style>
