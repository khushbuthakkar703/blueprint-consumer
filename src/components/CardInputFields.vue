<template>
  <div>
    <form method="post" id="payment-form">
      <div class="q-my-lg text-left text-h6 text-bold text-dimGrey">
        Pay with Card
      </div>
      <div id="card-errors" class="q-my-lg"></div>
      <div class="q-mb-lg col-md-5 col-sm-12 col-xs-12 text-white">
        <q-input
          class="bg-white border-secondary text-dimGrey rounded-borders"
          style="font-size:18px; padding: 0 12px;"
          placeholder="Email"
          ref="emailInput"
          v-model.trim="email"
          readonly
          hide-bottom-space
          borderless
        ></q-input>
      </div>
      <div class="q-mb-lg col-md-5 col-sm-12 col-xs-12 text-white">
        <label class="text-dimGrey">Name on Card</label>
        <q-input
          borderless
          class="bg-white border-secondary rounded-borders q-mt-sm"
          style="font-size:18px; padding: 0 12px;"
          ref="cardName"
          name="name"
          v-model.trim="cardName"
          maxlength="50"
          id="card-name"
          autocomplete="cc-name"
          placeholder="Name on card"
        />
      </div>
      <div class="q-mb-lg col-md-5 col-sm-12 col-xs-12 text-white">
        <label class="text-dimGrey">Card Information</label>
        <div id="card-number" class="cardInfo border-top-left-right q-mt-sm">
          <!-- a Stripe Element will be inserted. -->
        </div>
        <div id="card-expiry" class="cardInfo halfway border-bottom-left">
          <!-- a Stripe Element will be inserted. -->
        </div>
        <div id="card-cvc" class="cardInfo halfway border-bottom-right">
          <!-- a Stripe Element will be inserted. -->
        </div>

        <!-- Used to display Element errors -->
        <div id="card-errors" role="alert"></div>
      </div>
      <div class="flex justify-center q-my-lg">
        <q-btn
          color="primary"
          @click="onPayButtonClick()"
          label="Pay"
          style="width: 40%"
          no-caps
          size="lg"
        />
      </div>
    </form>
    <div class="text-grey">
      By clicking on Pay button, you allow blooprinted to charge your card for
      this payment.
    </div>
  </div>
</template>
<script>
const stripe = Stripe(`${process.env.BLOOPRINTED_ENV_STRIPE_PUBLISHABLE_KEY}`)
import { mapActions, mapGetters } from 'vuex'
import { getLoggedInUserEmail, getLoggedInUserName } from '@utils/jwt'

export default {
  name: 'CardInputFields',
  data() {
    return {
      email: '',
      contentClass: 'hidden',
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: ''
    }
  },
  props: ['blooprintData'],
  computed: {
    ...mapGetters(['paymentError'])
  },
  mounted() {
    this.setPaymentPage()
    this.email = getLoggedInUserEmail()
  },
  methods: {
    ...mapActions(['buyBlooprint', 'setLoading']),
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
    },
    // *************** Triggers when Pay Button is clicked **************************
    onPayButtonClick() {
      this.checkCardValidity()
    },
    // *************** Method to check card validity **************************
    async checkCardValidity() {
      this.setLoading(true)
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
      if (displayError !== undefined) {
        this.setLoading(false)
        return
      }
      let params = {
        data: {
          type: 'charges',
          attributes: {
            creditCardToken: token,
            blooprintID: this.blooprintData['id'],
            amount: this.blooprintData['attributes']['price']
          }
        }
      }
      let data = await this.buyBlooprint(params)
      if (data && data['id']) {
        this.mac.purchase({
          planName: this.blooprintData['attributes']['name'],
          amount: (this.blooprintData['attributes']['price'] * 100).toString(),
          currency: 'USD',
          email: getLoggedInUserEmail(),
          username: getLoggedInUserName(),
          subscriptionType: 'yearly',
          purchaseType: ''
        })

        this.$router.push({
          name: 'Payment Success',
          query: {
            name: this.blooprintData['attributes']['name'],
            price: this.blooprintData['attributes']['price']
          }
        })
      }
      if (this.paymentError.length > 0) {
        this.$router.push({
          name: 'Payment Decline',
          query: {
            name: this.blooprintData['attributes']['name'],
            price: this.blooprintData['attributes']['price']
          }
        })
      }

      this.setLoading(false)
    },
    createToken() {
      // Gather additional customer data we may have collected in our form.
      var additionalData = { name: this.cardName }
      // Important: Although we're submitting several fields, use cardNumber here instead of 'elements'.
      return stripe.createToken(this.cardNumber, additionalData)
    },
    queryParam(obj) {
      var str = []
      for (var p in obj) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
      }
      return str.join('&')
    }
  }
}
</script>
<style lang="scss" scoped>
#card-errors {
  color: red;
  margin-top: 10px;
}
.cardInfo {
  padding: 16px 12px;
  margin-bottom: -1px;
  border: 0.5px solid #d8d7d7;
}
.halfway {
  display: inline-block;
  width: 50%;
}
</style>
