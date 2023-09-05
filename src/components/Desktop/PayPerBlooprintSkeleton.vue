<template>
  <div class="pay-per-blooprint bg-white row justify-between">
    <div class="col-md-5 col-sm-12 col-xs-12">
      <q-skeleton height="20px" />
      <q-skeleton height="20px" class="q-mt-sm" />
      <div v-for="i in 3" :key="i" style="margin-top: 30px">
        <q-skeleton width="120px" height="17px" />
        <q-skeleton class="q-mt-sm" width="150px" height="17px" />
      </div>
    </div>
    <q-separator class="gt-sm" size="1px" vertical color="#B9BCC6" />
    <q-separator
      class="col-12 lt-md"
      style="margin: 30px 0px"
      size="1px"
      color="#B9BCC6"
    />
    <div class="col-md-5 col-sm-12 col-xs-12">
      <q-skeleton height="20px" />
      <div class="price-button-container">
        <div class="row justify-between">
          <q-skeleton width="80px" height="17px" />
          <q-skeleton width="80px" height="17px" />
        </div>
        <div class="row justify-center">
          <q-skeleton class="q-mt-lg" width="120px" height="40px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.pay-per-blooprint {
  margin-top: 30px;
  border-radius: 20px;
  padding: 44px 38px;
  margin-bottom: 120px;
  @media only screen and (max-width: $breakpoint-xs) {
    margin-bottom: 100px;
    padding: 20px;
  }
  .price-button-container {
    margin-top: 32px;
  }
}
</style>
