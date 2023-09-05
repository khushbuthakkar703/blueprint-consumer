<template>
  <div>
    <Header />
    <div
      class="flex justify-between settings-page"
      style="padding: 20px 15px; background: rgb(232, 237, 242);"
    >
      <label class="settings-mobile">Settings</label>
      <label class="back-button text-primary cursor-pointer" @click="close()"
        >Back</label
      >
    </div>
    <div
      class="full-width right-container"
      :style="getWindowHeight > 1370 ? 'min-height: 65vh !important' : ''"
    >
      <q-card
        flat
        class="dialog-card"
        style="margin-bottom:20px; box-shadow: none;"
        v-if="tab === 'billing' && displayCardInformation"
      >
        <card-information
          @cardDetails="val => (displayCardInformation = val)"
        />
      </q-card>
      <q-card flat class="dialog-card" v-if="tab === 'myProfile'">
        <user-profile :profileData="userProfile" />
      </q-card>
      <q-card flat class="dialog-card" v-if="tab === 'account'">
        <Account />
        <DeleteAccount />
      </q-card>
      <q-card flat class="dialog-card" v-if="tab === 'notifications'">
        <Notifications />
      </q-card>
      <q-card flat class="dialog-card" v-if="tab === 'wishlist'">
        <wish-list />
      </q-card>
      <q-card flat class="dialog-card" v-if="tab === 'myReviews'">
        <MyReviews />
      </q-card>
      <q-card flat class="dialog-card" v-if="tab === 'billing'">
        <order-history />
      </q-card>
    </div>
    <Footer
      :singleLineFooter="false"
      :mediumFooter="false"
      :fullFooter="true"
    />
  </div>
</template>
<script>
import Header from 'components/Desktop/Header.vue'
import Footer from 'components/Desktop/Footer.vue'
import { mapActions, mapGetters } from 'vuex'
import UserProfile from 'src/components/Desktop/UserProfile.vue'
import Account from 'src/components/Desktop/Account.vue'
import DeleteAccount from 'src/components/Desktop/DeleteAccount.vue'
import WishList from 'src/components/Desktop/WishList.vue'
import MyReviews from 'src/components/Desktop/MyReviews.vue'
import Notifications from 'src/components/Desktop/Notifications.vue'
import OrderHistory from 'src/components/Desktop/OrderHistory.vue'
import CardInformation from 'src/components/Desktop/CardInformation.vue'
export default {
  components: {
    Header,
    Footer,
    DeleteAccount,
    UserProfile,
    Account,
    Notifications,
    WishList,
    MyReviews,
    OrderHistory,
    CardInformation
  },
  props: ['tab'],
  name: 'SettingsContent',
  data() {
    return {
      displayCardInformation: true
    }
  },
  computed: {
    ...mapGetters(['userProfile']),
    getWindowHeight() {
      return window.innerHeight
    }
  },
  methods: {
    ...mapActions(['fetchProfileInfo']),
    close() {
      this.$emit('closeDialog', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-card,
.dialog-card .main-container {
  box-shadow: none !important;
}
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
</style>
