<template>
  <q-page>
    <q-card-section class="fixed-center full-width">
      <div class="flex flex-center">
        <div>
          <q-img
            v-if="errorInAccountActivation.length === 0 && !loading"
            style="width: 150px"
            src="~assets/Success.svg"
          ></q-img>
          <q-img v-else src="~assets/Oops.png" style="width: 150px"></q-img>
        </div>
      </div>
      <div
        class="text-primary text-center q-mt-md q-mb-xl"
        v-if="errorInAccountActivation.length && !loading"
      >
        <h1 class="text-h4 text-capitalize text-center">
          {{ errorInAccountActivation }}!
        </h1>
        <h1 class="text-body1 text-center">{{ 'Please try again' }}</h1>
      </div>
      <div v-else class="text-primary text-center q-mt-md q-mb-xl">
        <h1 class="text-h4 text-capitalize">
          {{ 'Your account is successfully activated !!' }}
        </h1>
        <h1 class="text-body1">{{ 'Redirecting to home page...' }}</h1>
      </div>
    </q-card-section>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      loading: false
    }
  },
  mounted() {
    this.activateUserAccount()
  },
  methods: {
    ...mapActions(['userAccountActivation']),

    async activateUserAccount() {
      const token = this.$route.query.secure
      this.loading = true
      await this.userAccountActivation(token)
      this.loading = false
      setTimeout(this.redirectToHome, 8000)
    },
    redirectToHome() {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(['errorInAccountActivation'])
  }
}
</script>

<style lang="scss" scoped></style>
