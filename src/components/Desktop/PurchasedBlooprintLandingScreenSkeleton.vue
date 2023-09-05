<template>
  <div class="full-width">
    <div class="row">
      <div class="col-md-4 col-sm-12 col-xs-12">
        <div class="column">
          <!-- Blooprint Skeleton -->
          <q-card bordered class="card-style" style="border-radius: 20px">
            <q-card-section>
              <div class="row">
                <q-skeleton
                  type="QBtn"
                  class=" q-mt-sm"
                  width="40%"
                  height="32px"
                />
                <q-skeleton class="q-ml-md" type="QAvatar" />
                <q-skeleton class="q-ml-md q-mt-md" type="QBadge" width="20%" />
              </div>

              <q-skeleton class="blooprint-name" type="QToolbar" />
              <div class="row">
                <q-skeleton type="QBtn" width="86px" />
                <q-skeleton
                  type="QBtn"
                  class="q-ml-md-xl q-ml-sm-lg q-ml-xs-md"
                />
              </div>
              <q-skeleton type="text" height="5px" class="q-my-md" />
              <q-skeleton type="QBadge" width="40%" />
              <q-skeleton type="text" class="q-my-sm" />
              <div class="row items-center justify-between no-wrap">
                <div class="col text-left">
                  <q-skeleton type="QBadge" width="60%" />
                </div>
                <div class="row col justify-end">
                  <q-skeleton type="QBadge" width="20%" />
                </div>
              </div>
              <q-skeleton type="text" height="5px" class="q-my-md" />
              <div class="row">
                <q-skeleton class="col q-mr-sm" type="QBtn" />
                <q-skeleton class="col q-ml-sm" type="QBtn" />
              </div>
            </q-card-section>
          </q-card>
          <!-- MileStone Skeleton for Mobile and Tab View ********************* -->
          <div class="lt-md">
            <div class="row q-my-lg q-pb-md">
              <div class="col text-left">
                <q-skeleton type="QSlider" width="30%" />
              </div>
              <div class="row col justify-end">
                <q-skeleton type="QBtn" width="30%" />
              </div>
            </div>
            <div
              v-for="i in 10"
              :key="i"
              style="margin-left:-15px;margin-right:-15px"
            >
              <q-skeleton type="QBtn" class="q-mb-md full-width" />
            </div>
          </div>

          <!-- Author Skeleton -->
          <div style="margin-top: 40px">
            <q-skeleton type="text" class="q-mb-md gt-sm" width="40%" />
            <q-skeleton type="text" class="q-mb-md lt-md" width="50%" />
            <q-card bordered class="card-style" style="border-radius: 20px">
              <q-card-section>
                <q-item>
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" size="100px" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>
                      <q-skeleton width="80%" />
                      <q-skeleton class="q-my-sm" width="80%" />
                      <q-skeleton width="80%" />
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-skeleton height="150px" square />

                <div class="row q-mt-md gt-sm">
                  <q-skeleton class="col q-mr-sm" type="QBtn" />
                  <q-skeleton class="col q-ml-sm" type="QBtn" />
                </div>
                <div class="column q-mt-md lt-md">
                  <q-skeleton class="full-width q-mb-md" type="QBtn" />
                  <q-skeleton class="full-width" type="QBtn" />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col">
        <!-- ************* MileStones Skeleton ********************* -->
        <div class="q-ml-md">
          <q-card
            bordered
            class="milestone-card-style"
            style="border-radius: 20px"
          >
            <q-card-section>
              <div class="row q-mb-lg q-pb-md">
                <div class="col text-left">
                  <q-skeleton type="QSlider" width="30%" />
                </div>
                <div class="row col justify-end">
                  <q-skeleton type="QBtn" width="30%" />
                </div>
              </div>
              <div v-for="i in 10" :key="i" class="">
                <q-skeleton type="QBtn" class="q-mb-md full-width" />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PurchasedBlooprintLandingScreenSkeleton'
}
</script>
<style lang="scss" scoped>
.card-style {
  // max-width: 432px;
  border-radius: 20px;
  box-shadow: 0px 10px 20px $shadow;
  .q-card__section--vert {
    padding: 30px !important;
    @media only screen and (max-width: $breakpoint-sm-max) {
      padding: 20px !important;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      padding: 20px !important;
    }
  }
}
.milestone-card-style {
  border-radius: 20px;
  box-shadow: 0px 10px 20px $shadow;
  .q-card__section--vert {
    padding: 30px !important;
    @media only screen and (max-width: $breakpoint-sm-max) {
      padding: 20px !important;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      padding: 20px !important;
    }
  }
}
.blooprint-name {
  font-size: 32px;
  line-height: 36px;
  margin: 20px 0px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 24px;
    line-height: 28px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 24px;
    line-height: 28px;
  }
}
</style>
