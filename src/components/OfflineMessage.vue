<template>
  <q-layout class="bg-primary">
    <div class="fixed-center" style="width: 80%;">
      <div class="text-center full-width">
        <div>
          <q-img style="width: 200px" src="~assets/NoInternet.svg" />
        </div>
        <div class="q-mt-md text-white text-h5">Whoops!</div>
        <div class="q-mt-md text-white text-body1">
          No internet connection found. Check your connection and try again.
        </div>
      </div>
      <q-btn
        outline
        style="color: white;border: 1px solid white;"
        size="lg"
        label="Try Again"
        class="full-width q-my-lg rounded-borders"
        no-caps
        type="submit"
        @click="refreshPage"
      />
    </div>
  </q-layout>
</template>
<script>
export default {
  props: ['status'],
  methods: {
    refreshPage() {
      if (this.status == true) window.location.reload()
    }
  }
}
</script>
<style lang="scss" scoped></style>
