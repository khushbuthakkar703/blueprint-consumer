<template>
  <div>
    <div class="logo-icon-wrapper" @click="onLogoClick">
      <q-img class="cursor-pointer" src="~assets/blooprinted-logo.svg" />
    </div>
    <div
      class="f-w-600 text-body1 gt-sm text-regalBlue cursor-pointer"
      style="margin-top:31px"
      @click="onBackClick"
    >
      Back
    </div>
    <div
      class="q-mt-lg progress-section-style lt-md"
      v-if="showStepWizard && !isLoginPage"
    >
      <q-linear-progress
        color="primary"
        size="10px"
        :value="progressValue"
        class="progress-style"
      />
      <div class="q-mt-sm f-w-600 text-body1">
        <span v-if="progressValue < 0.5">Step 1. Create Account</span>
        <span v-else-if="progressValue == 0.75">Step 2. Payment</span>
        <span v-else>{{ screenType }}</span>
      </div>
    </div>
    <div class="card-section-style">
      <q-card bordered class="blooprint-card">
        <q-card-section v-if="isLoading" class="card-width">
          <q-skeleton type="QToolbar"></q-skeleton>
          <q-skeleton type="QBtn" class="q-mt-sm"></q-skeleton>
          <q-item
            v-for="i in 3"
            :key="i"
            class="gt-sm"
            style="margin-top: 30px"
          >
            <q-item-section avatar>
              <q-skeleton size="sm" type="circle" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
                <q-skeleton type="text" />
                <q-skeleton type="text" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-card-section class="card-width" v-else>
          <div
            class="f-w-600 blooprint-font text-regalBlue word-break-break-word ellipsis-2-lines"
          >
            {{ blooprintDetails.attributes.name }}
            <q-tooltip anchor="bottom middle" self="top middle">
              <div class="word-break-break-word">
                {{ blooprintDetails['attributes']['name'] }}
              </div>
            </q-tooltip>
          </div>
          <div
            class="f-w-600 price-font text-regalBlue"
            v-if="Number(discountedPrice) == 0"
          >
            {{ blooprintDetails.attributes.currency
            }}{{
              blooprintDetails.attributes.price
                ? blooprintDetails.attributes.price.toFixed(2)
                : (0).toFixed(2)
            }}
          </div>
          <div v-else style="margin-top: 10px">
            <div class="text-regalBlue">
              <span class="price" style="color: #D92D20;">
                {{ blooprintDetails.attributes.currency }}{{ discountedPrice }}
              </span>
              <span class="q-ml-md strike-line">
                {{ blooprintDetails.attributes.currency
                }}{{
                  blooprintDetails.attributes.price
                    ? blooprintDetails.attributes.price.toFixed(2)
                    : (0).toFixed(2)
                }}
              </span>
            </div>
          </div>
          <div
            class="row gt-sm"
            style="margin-top: 30px"
            v-for="(keypoint, index) in blooprintDetails.attributes.keypoints"
            :key="index"
          >
            <q-icon color="primary" size="sm" name="check_circle_outline" />
            <div class="col" style="margin-left: 15px">
              <div
                class="f-w-600 text-body1 word-break-break-word text-regalBlue"
              >
                {{ keypoint.label }}
              </div>
              <div
                class="f-w-500 text-body1 word-break-break-word text-comet q-mt-sm"
              >
                {{ keypoint.value }}
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
import { constants } from '../../utils/common'
import { mapGetters } from 'vuex'
import { calcDiscountedPrice } from '@utils/common'

export default {
  name: 'BlooprintInfoInSignupScreen',
  props: [
    'blooprintDetails',
    'isLoading',
    'progressValue',
    'screenType',
    'showStepWizard',
    'showPaymentForm',
    'cardDetails'
  ],
  data() {
    return {
      isLoginPage: false,
      discountedPrice: 0
    }
  },
  watch: {
    $route: 'checkLoginPage',
    blooprintDetails(data) {
      this.checkForDiscount(data)
    }
  },
  computed: {
    ...mapGetters(['loggedInUserData'])
  },
  mounted() {
    this.checkLoginPage()
    this.checkForDiscount(this.blooprintDetails)
  },
  methods: {
    checkLoginPage() {
      let selectedRoute = this.$router.history.current.fullPath
      if (selectedRoute.includes('login/blooprints')) {
        this.isLoginPage = true
        this.showStepWizard = false
      } else {
        this.isLoginPage = false
        this.showStepWizard = true
      }
    },
    onLogoClick() {
      this.$router.push({ name: constants.PAGE_DESKTOP_HOME_SCREEN }, () => {})
    },
    onBackClick() {
      if (this.$route.fullPath.includes('checkout')) {
        if (!this.showPaymentForm || this.cardDetails['expMonth'] == '') {
          this.navigateBack()
        } else {
          this.$emit('show-old-card', true)
        }
      } else {
        this.navigateBack()
      }
    },
    navigateBack() {
      if (this.$route.params['blooprintId']) {
        this.$router.push({
          name: 'blooprint landing page',
          params: {
            blooprintId: this.$route.params['blooprintId']
          }
        })
      } else {
        this.$router.push({ name: 'login' })
      }
    },
    checkForDiscount(data) {
      if (data.attributes && data.attributes.discount > 0) {
        this.discountedPrice = calcDiscountedPrice(
          this.loggedInUserData['timeZone'],
          data['attributes']['discountEndDate'],
          data['attributes']['price'],
          data['attributes']['discount'],
          data['attributes']['discountStartDate']
        )
      } else {
        this.discountedPrice = 0
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.logo-icon-wrapper {
  width: 184px;
  @media only screen and (max-width: $breakpoint-xs) {
    width: 138px;
  }
}
.card-section-style {
  @media only screen and (min-width: $breakpoint-md-min) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
}
.progress-section-style {
  @media only screen and (min-width: $breakpoint-sm-min) {
    max-width: 580px;
    margin-left: auto;
    margin-right: auto;
  }
}
.blooprint-card {
  box-shadow: 0px 10px 30px $shadow;
  border-radius: 20px;
  margin-top: 84px;
  margin-bottom: 80px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    box-shadow: 0px 5px 20px $shadow;
    border-radius: 10px;
    margin-top: 20px;
    margin-bottom: 16px;
    height: 20% !important;
    width: 580px;
    margin-left: auto;
    margin-right: auto;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    box-shadow: 0px 5px 20px $shadow;
    border-radius: 10px;
    margin-top: 20px;
    margin-bottom: 16px;
    width: auto;
  }
  .q-card__section--vert {
    padding: 40px !important;
    @media only screen and (max-width: $breakpoint-sm-max) {
      padding: 15px !important;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      padding: 15px !important;
    }
  }
}
.card-width {
  width: 431px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 100%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 100%;
  }
}
.blooprint-font {
  font-size: 20px;
  line-height: 28px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 16px;
    line-height: 24px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 16px;
    line-height: 24px;
  }
}
.price-font {
  font-size: 24px;
  line-height: 32px;
  margin-top: 10px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 28px;
    margin-top: 8px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 20px;
    line-height: 28px;
    margin-top: 8px;
  }
}
::v-deep {
  .progress-style {
    margin: 8px 0px;
    border-radius: 5px;
    opacity: 1 !important;
    height: 5px;
    .q-linear-progress__track {
      opacity: 1 !important;
    }
    .q-linear-progress__track--light {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
.q-skeleton--type-circle {
  width: 20px !important;
  height: 20px !important;
}
.price {
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
}
.strike-line {
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  text-decoration-line: line-through;
}
</style>
