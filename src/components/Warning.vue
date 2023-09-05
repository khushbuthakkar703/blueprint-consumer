<template>
  <q-card class="warning-card relative-position bg-whiteSmoke">
    <q-card-section class="full-height">
      <div class="relative-position">
        <q-btn
          icon="close"
          class="text-dimGrey"
          flat
          style="position:absolute; right:0px"
          round
          dense
          v-close-popup
        />
        <div class="text-h6 text-dimGrey q-ml-sm q-ml-xs-xs">
          {{ heading }}
        </div>
      </div>

      <q-separator color="grey-4" class="q-my-sm full-width no-padding" />
      <div class="q-mx-sm-md q-mx-xs-xs text-subtitle1 text-dimGrey q-my-xl">
        {{ message }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'Warning',
  props: ['message', 'heading']
}
</script>

<style lang="scss" scoped>
.warning-card {
  min-height: 20vh;
  min-width: 50vw;
}
</style>
