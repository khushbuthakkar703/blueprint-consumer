<template>
  <q-layout class="bg-primary">
    <div class="flex fixed-center" style="width: 80%">
      <div class="text-center full-width">
        <div class="q-mt-md text-h5 text-white">Uh... Error 500!</div>
        <div class="q-mt-md text-body1 text-white">
          Something went wrong at our end. Don't worry, its not you - it's us.
        </div>
        <div class="text-body1 text-white">Sorry about that.</div>
      </div>
      <q-btn
        outline
        style="color: white; border: 1px solid white"
        size="lg"
        label="Go to the Home"
        class="full-width q-my-lg rounded-borders"
        no-caps
        type="submit"
        @click="goToHomePage"
      />
    </div>
  </q-layout>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isMobileApp'])
  },
  methods: {
    goToHomePage() {
      if (this.isMobileApp) {
        this.$router.replace({ name: 'feature-blooprint' }, () => {})
      }
      this.$emit('clicked')
    }
  }
}
</script>
<style lang="scss" scoped></style>
