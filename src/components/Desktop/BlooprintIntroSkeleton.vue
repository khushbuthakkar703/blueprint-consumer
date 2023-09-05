<template>
  <div class="col">
    <q-skeleton class="description q-mt-sm" v-for="i in 5" :key="i" />
    <div class="video-container">
      <q-skeleton class="intro-video" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.description {
  height: 25px;
}
.video-container {
  margin: 60px 0px;
  @media only screen and (max-width: $breakpoint-xs) {
    margin: 30px 0px;
  }
  .intro-video {
    border-radius: 20px;
    height: 600px;
    @media only screen and (max-width: 1470px) {
      height: 400px;
    }
    @media only screen and (max-width: 1100px) {
      height: 250px;
    }
    @media only screen and (max-width: $breakpoint-xs) {
      border-radius: 10px;
      height: 300px;
    }
  }
}
</style>
