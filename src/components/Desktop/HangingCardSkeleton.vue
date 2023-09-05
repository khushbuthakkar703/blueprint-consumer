<template>
  <div class="hanging-card bg-white">
    <div class="heading text-regalBlue ellipsis-2-lines">
      <q-skeleton height="20px" />
      <q-skeleton class="q-mt-md" height="20px" width="180px" />
    </div>
    <div class="separator">
      <q-separator color="solitudeBlue" size="2px" />
    </div>
    <div>
      <q-skeleton
        v-for="i in 5"
        :key="i"
        class="link"
        height="20px"
        width="250px"
      />
    </div>
    <div class="separator">
      <q-separator color="solitudeBlue" size="2px" />
    </div>
    <q-skeleton height="28px" width="100px" />
    <q-skeleton class="buy-blooprint-btn" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.hanging-card {
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 10px 30px $shadow;
  max-width: 21.188rem;
  @media only screen and (max-width: 950px) {
    max-width: 18.78rem;
    padding: 25px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    max-width: 22.6rem;
    padding: 30px;
  }

  .separator {
    margin: 30px 0px;
    @media only screen and (max-width: 950px) {
      margin: 20px 0px;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      margin: 24px 0px;
    }
  }
  .link {
    margin-bottom: 24px;
    @media only screen and (max-width: 950px) {
      margin-bottom: 18px;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      margin-bottom: 16px;
    }
  }
  .buy-blooprint-btn {
    border-radius: 10px;
    height: 50px;
    width: 279px;
    margin-top: 16px;
    @media only screen and (max-width: 950px) {
      height: 50px;
      width: 250px;
      margin-top: 16px;
    }
    @media only screen and (max-width: $breakpoint-xs) {
      height: 50px;
      width: 286px;
      margin-top: 16px;
    }
  }
}
</style>
