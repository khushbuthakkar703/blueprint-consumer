<template>
  <div>
    <q-skeleton
      class="q-pa-xs q-mt-md row"
      width="100%"
      height="160px"
      square
    />
    <div class="q-py-sm">
      <div class="row items-center justify-between no-wrap">
        <div class="row col-6 items-center">
          <q-skeleton class="q-my-sm" width="100%" />
        </div>
        <div class="row col-2 items-center">
          <q-skeleton class="q-my-sm" width="100%" />
        </div>
      </div>
      <div class="row items-center justify-between no-wrap">
        <div class="row col-4 items-center">
          <q-skeleton type="rect" class="q-my-sm" width="100%" />
        </div>
      </div>
      <div class="row items-center justify-between no-wrap">
        <div class="row col-8 items-center">
          <q-skeleton type="rect" class="q-my-sm" width="100%" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BlooprintSkeletonCardMobile'
}
</script>
