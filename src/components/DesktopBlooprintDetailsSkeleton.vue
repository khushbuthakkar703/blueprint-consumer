<template>
  <div class="row flex justify-between">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <div class="q-pa-md-lg q-pa-sm-md q-pa-xs-sm bg-white shadow-1">
        <q-skeleton width="35%" />
        <q-skeleton class="q-mt-sm" height="200px" square />
      </div>
      <div class="q-my-lg q-mx-md-xl q-mx-sm-lg q-mx-xs-lg">
        <q-skeleton width="35%" />

        <div class="flex q-mt-xs justify-between">
          <q-skeleton width="35%" />
          <q-skeleton width="35%" />
        </div>
        <div class="q-my-md">
          <q-list bordered v-for="i in 10" :key="i">
            <q-skeleton width="100%" />
          </q-list>
        </div>
      </div>
      <!-- ***************** About Author Skeleton ******************************** -->
      <div class="q-my-xl q-mx-md-xl q-mx-sm-lg q-mx-xs-lg">
        <q-skeleton width="35%" />
        <div class="row q-pa-md q-my-md bg-white">
          <div class="col">
            <q-skeleton height="100px" square />
            <q-skeleton class="q-mt-xs" width="50%" />
          </div>
          <div class="col-8 q-px-md">
            <q-skeleton height="70%" />
            <q-skeleton class="q-mt-md" width="25%" />
          </div>
        </div>
      </div>
      <!-- ***************** Reviews Skeleton ******************************** -->
      <div class="q-mb-xl q-mx-md-xl q-mx-sm-lg q-mx-xs-lg">
        <q-skeleton width="35%" />
        <div v-for="i in 2" :key="i">
          <q-skeleton class="q-mt-sm" width="20%" />
          <q-skeleton class="q-mt-sm" width="20%" />
          <q-skeleton class="q-mt-sm" height="75px" width="100%" />
          <q-separator class="q-my-md" />
        </div>
      </div>
    </div>
    <div class="col-md-4 col-sm-12 col-xs-12 q-pl-md-xl q-my-xl q-pr-xl">
      <q-skeleton class="q-mt-sm" height="200px" square />
      <div class="border-secondary q-pa-lg bg-white">
        <q-skeleton width="75%" />
        <q-skeleton class="q-mt-sm" width="75%" />
        <q-skeleton class="q-mt-sm" width="75%" />
        <q-skeleton class="q-mt-sm" width="50%" />
        <q-skeleton type="QBtn" class="q-mt-md full-width" width="50%" />
      </div>
      <q-skeleton type="QBtn" class="q-mt-md full-width" width="50%" />
      <q-skeleton type="QBtn" class="q-mt-md full-width" width="50%" />
      <q-skeleton type="QBtn" class="q-mt-md full-width" width="50%" />
    </div>
  </div>
</template>
