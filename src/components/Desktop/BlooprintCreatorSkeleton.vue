<template>
  <div class="bg-white row overflow-hidden creator-section">
    <div class="col-4">
      <q-skeleton class="creator-avatar" type="QAvatar" size="150px" />
      <q-skeleton class="gt-sm creator-image" height="100%" square />
    </div>
    <div class="creator-details col-md-7 col-sm-12 col-xs-12">
      <q-skeleton class="q-my-sm" height="20px" width="200px" />
      <q-skeleton class="q-my-sm" height="20px" width="240px" />
      <q-skeleton class="q-mt-lg q-mb-sm" height="20px" />
      <q-skeleton v-for="i in 3" :key="i" class="q-mb-sm" height="20px" />
      <q-skeleton class="q-mt-lg" height="20px" width="200px" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['picture', 'authorName', 'description', 'location']
}
</script>

<style lang="scss" scoped>
.creator-section {
  border-radius: 20px;
  margin-top: 30px;
  @media only screen and (max-width: 1500px) {
    padding: 24px;
  }
  @media only screen and (max-width: $breakpoint-xs) {
    padding: 20px;
  }
  .creator-details {
    padding: 30px;
    @media only screen and (max-width: 1500px) {
      width: 100%;
    }
    @media only screen and (max-width: $breakpoint-sm) {
      padding: 0px;
    }
  }
  .creator-name {
    @media only screen and (max-width: $breakpoint-sm) {
      margin-top: 30px;
    }
  }
  .creator-image {
    @media only screen and (max-width: 1500px) {
      display: none;
    }
  }
  .creator-avatar {
    display: none;
    @media only screen and (max-width: 1500px) {
      display: inline-block;
    }
  }
  .description {
    margin: 20px 0px;
  }
}
</style>
