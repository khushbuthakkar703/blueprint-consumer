<template>
  <div
    class="flex  bg-lightGrey full-width rounded-borders justify-center items-center video-height"
  >
    <q-video
      frameborder="0"
      v-if="src != ''"
      :src="src"
      class="full-width"
      style="height: 100%"
    />
    <img v-else src="~assets/NoImage.png" style="height: 200px" />
  </div>
</template>
<script>
export default {
  props: ['src']
}
</script>
<style lang="scss" scoped>
.video-height {
  height: 200px;
  @media only screen and (max-width: $breakpoint-xs) {
    height: 300px;
  }
  @media only screen and (max-width: $breakpoint-sm) {
    height: 400px;
  }
  @media only screen and (max-width: $breakpoint-md) {
    height: 200px;
  }
}
</style>
