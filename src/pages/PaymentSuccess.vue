<template>
  <div>
    <div class="success-page-margin bg-white">
      <div
        class="bg-white text-regalBlue text-center q-mb-xl q-pb-md"
        style=" border: solid 1px #d8d8d8; border-radius: 20px"
      >
        <q-img
          src="../assets/success.png"
          :ratio="16 / 9"
          contain
          class="q-mt-lg success-logo"
        />
        <div class="text-regalBlue q-my-md text-fs-32-lh-36 f-w-600">
          Payment Success!
        </div>
        <div class="text-h6">Your payment has been processed</div>
        <div class="text-h6">
          Details of the transition has been included below
        </div>
        <div class="q-mt-lg q-mx-md-lg q-mx-sm-lg q-mx-xs-xs text-h6 row">
          <div class="col-12">
            <div class="row q-mb-xs-sm">
              <div class="col-6 text-regalBlue text-right q-pr-md">
                Amount:
              </div>
              <div class="col-6 text-left">${{ paymentInfo.price }}</div>
            </div>
          </div>
          <div class="col-12">
            <div class="row q-mx-xs-sm">
              <div class="col-6 text-regalBlue text-right q-pr-md">
                Blooprint Name:
              </div>
              <div
                class="col-6 word-break-break-word ellipsis-2-lines text-left"
              >
                {{ paymentInfo.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="q-mt-lg q-mx-md text-h6 text-regalBlue">
          Page will automatically redirect to another page in
          <b> {{ countDown }} </b> {{ countDown == 1 ? 'second' : 'seconds' }}
          <br />
          or click button to redirect to home page
        </div>
        <div class="q-mt-lg q-mb-md text-body1 q-mx-md">
          <q-btn
            :to="{ name: 'explore-screen' }"
            text-color="white"
            color="primary"
            no-caps
            class="text-capitalize text-h6 q-px-md-xl q-px-sm-xl q-px-xs-sm f-w-600"
            style="border-radius: 10px"
            label="Go to Home Page"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  name: 'PaymentSuccess',
  props: ['paymentInfo'],
  data() {
    return {
      countDown: 10,
      redirectUser: true
    }
  },
  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      } else {
        if (this.redirectUser) {
          this.$router.push({ name: 'desktop-my-blooprints' })
        }
      }
    }
  },
  mounted() {
    this.countDownTimer()
  },
  beforeDestroy() {
    this.redirectUser = false
  }
}
</script>

<style lang="scss" scoped>
.text-fs-32-lh-36 {
  font-size: 32px;
  line-height: 36px;
}
.success-page-margin {
  width: 480px;
  margin-bottom: 100px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin: 30px 15px 80px 15px;
    width: auto;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin: 30px 15px 80px 15px;
    width: auto;
  }
}
.success-logo {
  width: 20%;
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 30%;
  }
}
</style>
