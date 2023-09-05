<template>
  <div class="row">
    <div
      class="col-md-6 col-sm-12 col-xs-12 q-mt-md q-px-md"
      v-for="i in 10"
      :key="i"
    >
      <div class="border-secondary">
        <div class="row items-center justify-between no-wrap">
          <div class="col-6 items-center">
            <q-skeleton class="row" width="100%" height="200px" square />
          </div>
          <div class="q-pa-md col-6 items-center">
            <div class="row items-center justify-between no-wrap">
              <div class="row col-6 items-center">
                <q-skeleton class="q-my-sm" width="100%" />
              </div>
              <div class="row col-6 justify-end">
                <q-skeleton class="q-my-sm" width="80%" />
              </div>
            </div>
            <q-skeleton class="q-my-sm" width="50%" />
            <q-skeleton type="QInput" class="q-my-sm" width="100%" />
            <q-icon
              v-if="requestFrom == 'wishlist'"
              name="favorite_border"
              color="grey-4"
              class="q-mt-sm"
              size="20px"
            />
            <div class="row" v-else>
              <q-skeleton class="col q-mr-sm" type="QBtn" />
              <q-skeleton class="col q-ml-sm" type="QBtn" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BlooprintSkeletonCardWeb',
  props: ['requestFrom']
}
</script>
