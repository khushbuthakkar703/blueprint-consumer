<template>
  <div>
    <div
      class="q-ma-md-xl q-ma-sm-xl q-ma-xs-md page-height column border-secondary bg-white flex flex-center flex column main q-px-md"
    >
      <div
        class="text-dimGrey text-h5 text-weight-medium text-center q-mx-lg q-mt-xl q-mb-md"
      >
        Oh no! What could I have done differently?
      </div>
      <q-img
        class="q-my-md-xl q-my-sm-lg q-my-xs-md img-width"
        src="~assets/AuthLogo1.svg"
      />
      <div class="row justify-center q-my-lg">
        <div
          class="col-md-5 col-sm-9 col-xs-10 text-dimGrey text-body1 text-center"
        >
          Well, the good news is that you are ALWAYS welcome to return when the
          time is right. We value every person in our ecosystem and we would
          LOVE for you to join us again soon. Best of luck - I will be thinking
          about you!
        </div>
      </div>
      <div class="row q-mx-md q-mt-lg q-mb-xl">
        <q-btn
          no-caps
          size="16px"
          flat
          class="bg-white text-smalt col q-mr-md-lg q-mr-sm-md q-mr-xs-sm border-smalt btn-width"
          label="Cancel"
          @click="onCancelClick"
        />
        <q-btn
          no-caps
          color="white"
          size="16px"
          flat
          class="col bg-smalt rounded-borders btn-width"
          label="Confirm"
          @click="onConfirmClick"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'DeleteAccountConfirmation',
  data() {
    return {
      backTargetUrl: '/profiles'
    }
  },
  methods: {
    ...mapActions(['deleteUser']),
    // **************** Triggers when Cancel Button is clicked ********************
    onCancelClick() {
      let selectedRoute = this.$router.history.current.fullPath
      if (selectedRoute.includes('profiles/delete-account')) {
        this.$router.push({ name: 'user-profile' })
      } else if (selectedRoute.includes('delete-account')) {
        this.$router.push({ name: 'my-profile' })
      }
    },
    // **************** Triggers when Confirm Button is clicked to Delete the User ********************
    onConfirmClick() {
      this.deleteUser()
    }
  }
}
</script>
<style lang="scss" scoped>
.page-height {
  min-height: 70vh !important;
}
.btn-width {
  width: 150px;
}
.img-width {
  width: 13%;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 20%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 30%;
  }
}
.text-width {
  width: 60%;
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 70%;
  }
}
</style>
