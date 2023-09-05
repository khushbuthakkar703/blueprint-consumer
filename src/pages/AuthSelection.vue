<template>
  <q-page class="flex flex-center q-px-md column bg-whiteSmoke">
    <div class="text-center container">
      <div>
        <q-img style="width: 110px" src="~assets/AuthLogo1.svg" />
      </div>
      <div>
        <q-img style="width: 300px" src="~assets/AuthLogo2.svg" />
      </div>
    </div>
    <div class="button-margin text-grey text-h6 text-center">
      Start by creating an account.
      <q-btn
        :to="{ name: 'signup' }"
        no-caps
        color="primary"
        size="16px"
        class="full-width primary-btn-style flat
      q-my-md"
        label="Create An Account"
      />
      <q-btn
        :to="{ name: 'signin' }"
        no-caps
        color="primary"
        size="16px"
        class="full-width primary-btn-style flat"
        label="Sign In"
      />
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  mounted() {
    this.isRequestFromMobile(true)
  },
  methods: {
    ...mapActions(['isRequestFromMobile'])
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1000px;
  width: 90%;
}
.button-margin {
  margin-top: 120px;
}
</style>
