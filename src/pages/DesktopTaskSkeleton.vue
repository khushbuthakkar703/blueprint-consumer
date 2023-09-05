<template>
  <q-page>
    <div class="row q-mx-md-xl q-mx-sm-lg q-mx-xs-lg">
      <div
        class="col-md-8 col-sm-12 col-xs-12 shadow-1 bg-white q-pa-md-lg q-pa-sm-md q-pa-xs-md"
      >
        <q-skeleton width="35%" />
        <div class="row q-mt-md">
          <div class="col">
            <div class="row items-center">
              <q-avatar
                class="q-mr-sm text-weight-bold bg-solitude"
                square
                size="35px"
              />
              <q-skeleton type="text" width="35%" />
            </div>
          </div>
          <div class="col text-right flex justify-end">
            <q-skeleton type="QBtn" />
          </div>
        </div>
        <div class="q-mt-sm">
          <div class="row items-center">
            <q-avatar size="14px" color="indigo-10" class="q-mr-md q-mt-xs" />
            <q-skeleton type="text" width="35%" />
          </div>
          <q-skeleton class="q-mt-sm" height="200px" square />
          <q-skeleton class="q-mt-sm" height="200px" square />
          <q-skeleton class="q-mt-sm" height="200px" square />

          <div class="row q-mt-lg">
            <div class="col">
              <q-skeleton type="QBtn" />
            </div>
            <div class="col flex text-right justify-end">
              <q-skeleton type="QBtn" />
              <q-skeleton class="q-ml-sm" type="QBtn" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-12 col-xs-12 q-pl-md-lg q-py-lg">
        <div class="flex justify-end">
          <q-skeleton type="QBtn" />
        </div>
        <div class="q-mt-md">
          <q-skeleton height="150px" square />
          <q-skeleton class="q-mt-sm" width="35%" />
          <q-skeleton class="q-mt-sm" height="50px" square />
        </div>
        <div class="q-my-md">
          <q-list v-for="i in 10" :key="i">
            <q-skeleton class="q-mt-xs" width="100%" />
          </q-list>
        </div>
      </div>
    </div>
  </q-page>
</template>
