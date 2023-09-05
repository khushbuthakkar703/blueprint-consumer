<template>
  <q-page class="bg-white">
    <div
      style="padding: 20px 15px; background: rgb(232, 237, 242);"
      class="flex justify-between"
    >
      <label class="settings-mobile">Settings</label>
      <label
        class="back-button text-primary cursor-pointer"
        @click="$router.go(-1)"
        >Back</label
      >
    </div>
    <div>
      <div class="account-page">
        <Account />
      </div>
    </div>
  </q-page>
</template>

<script>
import Account from 'src/components/Desktop/Account.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'UserAccountPage',
  components: { Account },
  methods: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
.settings-mobile {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  color: #000000;
}
.back-button {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-decoration-line: underline;
  color: #1652f0;
}
.account-page {
  @media only screen and (min-width: $breakpoint-sm) {
    margin-top: 30px;
  }
}
</style>
