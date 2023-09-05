<template>
  <div class="q-mt-xs col-4">
    <div
      class="q-pa-md q-mt-sm justify-around main-content text-body1 row flex"
      v-if="showSekelton"
    >
      <q-card class="full-width" flat>
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="q-px-xs q-py-lg">
            <q-skeleton type="QInput" />
          </div>
          <div class="q-px-xs q-py-lg">
            <q-skeleton type="QInput" style="margin-bottom: 1px" />
            <q-skeleton
              type="QInput"
              style="width: 50%; display:inline-block"
            />
            <q-skeleton
              type="QInput"
              style="width: 50%; display:inline-block"
            />
          </div>
          <div class="q-px-sm q-py-lg">
            <q-skeleton type="QInput" style="width: 80%; margin: 0 auto" />
          </div>
        </div>
      </q-card>
    </div>

    <form
      action="/charge"
      method="post"
      id="payment-form"
      :class="contentClass"
    >
      <!-- <div class="text-h6 text-grey-8 text-weight-medium">
        Card Details
      </div> -->
      <div id="card-errors" class="q-my-lg"></div>

      <div class="q-mb-lg col-md-5 col-sm-12 col-xs-12 text-white">
        <q-input
          class="cardInfo rounded-borders"
          style="font-size:18px; padding: 0 10px"
          ref="emailInput"
          name="name"
          v-model.trim="cardName"
          id="card-name"
          autocomplete="cc-name"
          placeholder="Name on card"
        />
      </div>
      <div class="q-mb-lg col-md-5 col-sm-12 col-xs-12 text-white">
        <div id="card-number" class="cardInfo rounded-borders">
          <!-- a Stripe Element will be inserted. -->
        </div>
        <div id="card-expiry" class="cardInfo halfway rounded-borders q-mt-lg">
          <!-- a Stripe Element will be inserted. -->
        </div>
        <div id="card-cvc" class="cardInfo halfway rounded-bordersq-mt-lg">
          <!-- a Stripe Element will be inserted. -->
        </div>

        <!-- Used to display Element errors -->
        <div id="card-errors" role="alert"></div>
      </div>
      <div class="text-center">
        <q-btn
          :loading="loading"
          color="primary"
          @click="UpdateCard()"
          label="Update"
          style="width: 50%;"
          class="q-mt-lg"
        />
      </div>
    </form>
  </div>
</template>

<script>
// eslint-disable-next-line no-undef
const stripe = Stripe(`${process.env.BLOOPRINTED_ENV_STRIPE_PUBLISHABLE_KEY}`)
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UpdateCard',
  data() {
    return {
      plan: '',
      amount: '',
      contentClass: 'hidden',
      showSekelton: true,
      wrongPlan: false,
      loading: false,
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      priceId: ''
    }
  },
  mounted() {
    this.setPaymentPage()
  },
  methods: {
    ...mapActions(['updateCustomerCreditCard']),
    async UpdateCard() {
      this.loading = true
      var token = ''
      var displayError
      await this.createToken().then(function(result) {
        // Stop loading!
        if (result.error) {
          displayError = document.getElementById('card-errors')
          if (result.error) {
            displayError.textContent = result.error.message
          } else {
            displayError.textContent = ''
          }
        } else {
          // Send the token to your server
          token = result.token.id
        }
      })
      if (token.length <= 0 && displayError !== undefined) {
        this.loading = false
        return
      }
      await this.updateCustomerCreditCard(token)
      this.loading = false
      if (this.paymentError.length <= 0) {
        //this.$emit('closeUpdateCardPopup')
      }
    },
    setPaymentPage() {
      const elements = stripe.elements()
      const style = {
        base: {
          iconColor: '#0057d2',
          color: '#525151',
          fontWeight: 500,
          fontSize: '16px',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          '::placeholder': {
            color: '#aaaaaa'
          }
        },
        complete: {
          color: '#525151'
        },
        invalid: {
          color: 'red',
          iconColor: 'red'
        }
      }
      this.cardNumber = elements.create('cardNumber', {
        style: style,
        showIcon: true
      })
      this.cardNumber.mount('#card-number')

      this.cardExpiry = elements.create('cardExpiry', {
        style: style
      })
      this.cardExpiry.mount('#card-expiry')

      this.cardCvc = elements.create('cardCvc', {
        style: style
      })
      this.cardCvc.mount('#card-cvc')

      const displayErrors = document.getElementById('card-errors', {
        style: style
      })

      this.contentClass = ''
      this.showSekelton = false
    },
    createToken() {
      // Gather additional customer data we may have collected in our form.
      var additionalData = { name: this.cardName }
      // Important: Although we're submitting several fields, use cardNumber here instead of 'elements'.
      return stripe.createToken(this.cardNumber, additionalData)
    }
  },
  computed: {
    ...mapGetters(['paymentError'])
  }
}
</script>

<style lang="scss" scoped>
#card {
  padding: 18px;
  border-radius: 4px;
}
#card-errors {
  color: red;
  margin-top: 10px;
}

//labels
#payment-form label {
  border: 0.5px solid #d8d7d7;
}

//line height for 'name'
#payment-form input {
  line-height: 36px;
}

// styles for Chrome autofill
#payment-form .StripeElement--webkit-autofill {
  background: rgba(0, 0, 0, 0.05) !important;
}

.cardInfo {
  padding: 16px 12px;
  margin-bottom: -1px;
  //   background: rgba(0, 0, 0, 0.05);
  border: 0.5px solid #d8d7d7;
}
.halfway {
  display: inline-block;
  width: 50%;
}
.border-top-left-right {
  border-radius: 5px 5px 0px 0px;
}
.border-bottom-left {
  border-radius: 0px 0px 0px 5px;
}
.border-bottom-right {
  border-radius: 0px 0px 5px 0px;
}
.help-text {
  color: #abaaaa;
}
#payment-form .q-field--filled .q-field__control {
  background-color: #35343452;
}
</style>
