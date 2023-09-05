<template>
  <q-page>
    <DeleteAccountConfirmation />
  </q-page>
</template>
<script>
import { mapActions } from 'vuex'
import DeleteAccountConfirmation from 'src/components/DeleteAccountConfirmation.vue'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  components: {
    DeleteAccountConfirmation
  },
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
  min-height: 532px !important;
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
