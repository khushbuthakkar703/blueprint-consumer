<template>
  <div>
    <div class="card-information" v-if="isLoading">
      <div class="card-logo">
        <q-skeleton type="text" width="60px" height="40px"></q-skeleton>
      </div>
      <div class="full-width flex justify-between no-wrap">
        <div class="flex column">
          <label class="card-number"
            ><q-skeleton type="text" width="200px"></q-skeleton
          ></label>
          <label class="card-expiry"
            ><q-skeleton type="text" width="200px"></q-skeleton
          ></label>
          <label class="email"> <q-skeleton type="text"></q-skeleton></label>
        </div>
      </div>
    </div>
    <div class="card-information" v-else>
      <div class="card-logo">
        <CardLogo
          :brand="
            cardDetails['brand'] ? cardDetails['brand'].toLowerCase() : ''
          "
          style="width: 58px !important; height:40px !important"
        />
      </div>
      <div class="full-width flex justify-between no-wrap">
        <div class="flex column">
          <label class="card-number"
            >{{ cardDetails['brand'] }} ending in
            {{ cardDetails['last4'] }}</label
          >
          <label class="card-expiry"
            >Expiry
            {{
              `${
                cardDetails['expMonth']
                  ? cardDetails['expMonth'].toString().length > 1
                    ? cardDetails['expMonth']
                    : `0${cardDetails['expMonth']}`
                  : ''
              }/${cardDetails['expYear'] ? cardDetails['expYear'] : ''}`
            }}</label
          >
          <label class="email">
            <q-img
              src="../../assets/mail.svg"
              style="width:16px !important; height: 16px !important; margin-right: 8px !important"
            />
            {{ loggedUserDetails.email ? loggedUserDetails.email : '' }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CardLogo from '../CardLogo.vue'

export default {
  name: 'SavedCardDetails',
  props: ['isLoading', 'cardDetails', 'loggedUserDetails'],
  components: {
    CardLogo
  }
}
</script>

<style lang="scss" scoped>
.card-information {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  background: #ffffff;
  border: 1px solid #e4e7ec;
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  @media only screen and (max-width: $breakpoint-xs-max) {
    border: 1px solid $kashmirBlue !important;
  }
}
.card-logo {
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 6px;
  margin-right: 16px !important;
  // @media only screen and (max-width: 374px) {
  //   display: none !important;
  // }
}
.card-number {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #344054;
}
.card-expiry {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
}
.email {
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
  word-break: break-all !important;
  margin-top: 8px;
  max-width: 400px;
}
</style>
