<template>
  <div class="row">
    <div
      :class="
        requestFrom === 'authorblooprint'
          ? 'authorblooprint col-md col-sm col-xs-12'
          : 'col-md-3 col-sm-6 col-xs-12 q-mt-xs q-mb-md q-pr-lg'
      "
      v-for="i in totalCards ? totalCards : 4"
      :key="i"
    >
      <q-card style="border-radius: 20px">
        <q-skeleton class="row" width="100%" height="150px" square />
        <q-card-section>
          <q-skeleton class="q-my-sm" width="50%" />
          <q-skeleton type="QInput" class="q-my-sm" width="100%" />
          <q-skeleton class="q-my-sm" width="50%" />
          <div class="row items-center justify-between no-wrap">
            <div class="row col-6 items-center">
              <q-skeleton class="q-my-sm" width="60%" />
            </div>
            <div class="row col-6 justify-end">
              <q-skeleton class="q-my-sm" width="60%" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BlooprintSkeletonCard',
  props: ['totalCards', 'requestFrom']
}
</script>

<style lang="scss" scoped>
.authorblooprint {
  width: 29vw;
  margin-right: 25px !important;
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 90vw;
    margin-right: 0px !important;
    margin-bottom: 20px !important;
  }
}
</style>
