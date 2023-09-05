<template>
  <div class="full-width card-page">
    <label class="billing-heading">
      <img src="../../assets/billing-blue.svg" class="lt-md card-icon" />
      Billing</label
    >
    <div class="card-information-container" v-if="!isLoading">
      <label class="payment-method">Payment method</label>
      <label class="payment-method-caption"
        >Change how you pay for your plan.</label
      >
      <div class="card-information full-width">
        <div class="card-logo">
          <card-logo
            :brand="cardDetails['brand'].toLowerCase()"
            style="width: 58px !important; height:40px !important"
          />
          <!-- <q-img src="../../assets/visa-logo-blue.svg" width="58px" height="40px" /> -->
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
                  cardDetails['expMonth'].toString().length > 1
                    ? cardDetails['expMonth']
                    : `0${cardDetails['expMonth']}`
                }/${cardDetails['expYear']}`
              }}</label
            >
            <label class="email">
              <q-img
                src="../../assets/mail.svg"
                style="width:16px !important; height: 16px !important; margin-right: 8px !important"
              />
              {{ userProfile.email }}</label
            >
          </div>
          <div class="float-right">
            <q-btn
              flat
              no-caps
              class="float-right edit-replace-button gt-xs"
              @click="editCardPopup = true"
              >Edit/Replace</q-btn
            >
            <q-btn
              flat
              no-caps
              class="float-right edit-replace-button lt-sm"
              @click="editCardPopup = true"
              >Edit</q-btn
            >
            <div
              class="float-right  lt-sm sm-mobile-btn"
              @click="editCardPopup = true"
              :style="`background-image:url(${editIcon})`"
            >
              <!-- <q-img
                src=""
                style="width:30px !important; height: 30px !important; margin-right: 8px !important"
              /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-information-container" v-if="isLoading">
      <label class="payment-method">
        <q-skeleton type="text" width="250px"></q-skeleton>
      </label>
      <label class="payment-method-caption"
        ><q-skeleton type="text" width="250px"></q-skeleton
      ></label>
      <div class="card-information full-width">
        <div class="card-logo">
          <q-skeleton type="text" width="60px" height="40px"></q-skeleton>
          <!-- <q-img src="../../assets/visa-logo-blue.svg" width="58px" height="40px" /> -->
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
          <div class="float-right">
            <q-btn flat no-caps class="float-right edit-replace-button gt-xs"
              ><q-skeleton type="text" width="60px"></q-skeleton
            ></q-btn>
            <q-btn flat round no-caps class="float-right  lt-sm">
              <q-skeleton type="text" width="20px"></q-skeleton>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
    <q-dialog :maximized="maximizePopup" v-model="editCardPopup" persistent>
      <q-card class="full-width edit-card-popup" style="border-radius:20px">
        <q-bar class="bg-transparent full-width close-icon">
          <q-space />
          <q-btn
            dense
            round
            flat
            icon="close"
            size="md"
            color="black"
            v-close-popup
          >
          </q-btn>
        </q-bar>
        <div class="scroll-area full-width">
          <div class="edit-card-heading">
            Edit payment method
          </div>
          <label class="edit-card-caption"
            >Please update your credit card on file</label
          >
          <payment-card-for-signup
            class="full-width"
            @closePopup="val => (editCardPopup = false)"
          />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CardLogo from '../CardLogo.vue'
import PaymentCardForSignup from './PaymentCardForSignup.vue'
export default {
  components: { CardLogo, PaymentCardForSignup },
  name: 'CardInformation',
  data() {
    return {
      isLoading: false,
      editIcon: require('../../assets/EditIcon.svg'),
      editCardPopup: false
    }
  },
  methods: {
    ...mapActions(['getCardDetails'])
  },
  computed: {
    ...mapGetters(['cardDetails', 'userProfile']),
    maximizePopup() {
      return window.innerWidth > 600 ? false : true
    }
  },
  async created() {
    this.isLoading = true
    await this.getCardDetails()
    this.isLoading = false
    if (!this.cardDetails.brand) {
      this.$emit('cardDetails', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.billing-heading {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: center;
  color: #152141;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 24px;
    padding-top: 30px !important;
    color: #000000 !important;
  }
}
.card-icon {
  width: 24px !important;
  height: 24px !important;
  margin-right: 10px !important;
  margin-left: 0px !important;
}
.card-information-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  background: #ffffff;
  border: 1px solid #e8e9ec;
  box-sizing: border-box;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  margin-top: 30px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 20px !important;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 20px !important;
    padding: 0px !important;
    box-shadow: none !important;
    border: none !important;
  }
}
.payment-method {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  color: #101828;
}
.payment-method-caption {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
  margin-top: 4px !important;
}
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
  margin-top: 20px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    border: 1px solid $kashmirBlue !important;
  }
}
.card-page {
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 0px 15px !important;
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
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #344054;
}
.card-expiry {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
}
.email {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
  word-break: break-all !important;
  margin-top: 8px;
}
.edit-replace-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  width: 123px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #344054;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 10px !important;
    width: 80px !important;
    height: 30px !important;
  }
  @media only screen and (max-width: 450px) {
    display: none !important;
  }
}
.sm-mobile-btn {
  display: none !important;
  @media only screen and (max-width: 450px) {
    display: block !important;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center !important;
    width: 25px !important;
    height: 25px !important;
    border-radius: 50% !important;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  }
}
.edit-card-popup {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px 30px 30px 30px;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 15px !important;
    width: 100vw !important;
    margin: 0px !important;
  }
  .scroll-area {
    @media only screen and (min-width: 600px) {
      max-height: 75vh !important;
      overflow-y: auto !important;
      padding: 0px 30px 0px 8px;
      &::-webkit-scrollbar-track {
        margin: 0px 0px;
      }
    }
  }
  @media only screen and (min-width: 600px) {
    overflow-y: hidden !important;
    padding-right: 0px !important;
  }
  .close-icon {
    @media only screen and (min-width: 600px) {
      padding-right: 30px !important;
    }
  }
}
.edit-card-heading {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 36px;
  display: flex;
  align-items: left;
  color: #152141;
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 24px;
    line-height: 32px;
    // padding-top: 30px !important;
    // color: #000000 !important;
  }
}
.q-bar--standard {
  padding: 0px !important;
}
.edit-card-caption {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #5b647a;
  margin-top: 8px !important;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: $secondary;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  margin: 30px 0px;
}
</style>
