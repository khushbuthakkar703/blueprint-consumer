<template>
  <div class="blooprint-top-section">
    <div class="row justify-between">
      <div class="col-md-5 col-sm-12 col-xs-12">
        <div class="row items-center">
          <div>
            <q-skeleton
              style="height: 32px; width: 102px; margin-right: 24px"
              square
              class="rounded-borders"
            />
          </div>
          <div class="flex author-details-container">
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>
            <div
              class="q-ml-sm row items-center q-mt-md"
              style="width: 150px; display: block"
            >
              <q-skeleton />
            </div>
          </div>
        </div>
        <div class="blooprint-name-container">
          <div>
            <div class="q-mt-sm">
              <q-skeleton width="100%" height="48px" />
            </div>
            <div class="q-mt-sm">
              <q-skeleton width="100%" height="48px" />
            </div>
            <div class="q-mt-sm">
              <q-skeleton width="100%" height="48px" />
            </div>
          </div>
        </div>
        <div class="row items-center">
          <q-skeleton type="QBtn" />
          <div
            class="text-primary cursor-pointer reviews-link"
            style="margin-left: 30px"
          >
            <q-skeleton width="100px" />
          </div>
        </div>
        <q-skeleton
          width="286px"
          height="40px"
          class="rounded-borders q-mt-sm"
          type="QBtn"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <div class="image-container overflow-hidden">
          <q-skeleton height="100%" square />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.blooprint-top-section {
  padding: 60px 52px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-top: 30px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
  }
}

.blooprint-name-container {
  margin: 30px 0px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin: 20px 0px;
  }
}
.image-container {
  border-radius: 20px;
  height: 400px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 32px;
    height: 350px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    height: 250px;
  }
}
.author-details-container {
  @media only screen and (max-width: 378px) {
    margin-top: 20px;
  }
}
</style>
