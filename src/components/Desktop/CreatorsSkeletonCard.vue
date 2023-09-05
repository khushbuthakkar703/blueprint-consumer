<template>
  <div class="row">
    <div
      class="col-md-3 col-sm-6 col-xs-12 q-mt-xs q-mb-md q-pr-lg"
      v-for="i in totalCards ? totalCards : 4"
      :key="i"
    >
      <q-card style="border-radius: 20px">
        <q-skeleton class="row" width="100%" height="270px" square />
        <q-card-section>
          <q-skeleton class="q-my-sm" width="50%" />
          <div class="row items-center justify-between no-wrap">
            <div class="row col-6 items-center">
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
  name: 'CreatorsSkeletonCard',
  props: ['totalCards']
}
</script>
