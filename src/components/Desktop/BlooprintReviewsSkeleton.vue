<template>
  <div class="col-12 reviews">
    <div class="row justify-between">
      <div class="review-container q-mt-md" v-for="i in 4" :key="i">
        <q-skeleton height="20px" v-for="i in 5" :key="i" />
        <div class="row no-wrap flex items-center q-mt-md">
          <q-skeleton size="40px" type="QAvatar" />
          <div style="margin-left: 16px">
            <q-skeleton height="20px" width="120px" />
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
.reviews {
  margin-top: 30px;
  @media only screen and (max-width: $breakpoint-xs) {
    margin-top: 30px;
  }
}
.review-container {
  width: 48%;
  @media only screen and (max-width: $breakpoint-xs) {
    width: 100%;
  }
}
</style>
