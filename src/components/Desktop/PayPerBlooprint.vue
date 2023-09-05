<template>
  <div class="pay-per-blooprint bg-white row justify-between">
    <div class="col-md-5 col-sm-12 col-xs-12">
      <div
        class="
          section-title
          text-regalBlue
          ellipsis-2-lines
          word-break-break-word
        "
      >
        {{ blooprintName }}
      </div>
      <div
        v-for="(keypoint, index) in blooprintDetails.attributes.keypoints"
        :key="index"
        class="benefit-container"
      >
        <div class="row no-wrap items-center">
          <div style="min-height: 24px; min-width: 24px">
            <q-img src="~assets/coolicon.svg" />
          </div>
          <div class="benefit text-regalBlue word-break-break-word">
            {{ keypoint.label }}
          </div>
        </div>
        <div
          class="q-mt-sm text-comet benefit-description word-break-break-word"
        >
          {{ keypoint.value }}
        </div>
      </div>
    </div>
    <q-separator
      class="gt-sm"
      style="border: 1px solid #b9bcc6"
      size="0px"
      vertical
    />
    <q-separator
      class="col-12 lt-md"
      style="margin: 30px 0px; border: 1px solid rgba(0, 0, 0, 0.2)"
      size="0px"
    />
    <div class="col-md-5 col-sm-12 col-xs-12">
      <div class="section-title text-regalBlue" style="margin-bottom: 0px">
        Start today!
      </div>
      <div class="price-button-container">
        <div
          v-if="isDiscountPresent"
          class="normal-price text-regalBlue row justify-between"
        >
          <div>Normal price:</div>
          <div style="text-decoration-line: line-through;">
            {{ currency + '' + price.toFixed(2) }}
          </div>
        </div>
        <div
          v-if="isDiscountPresent"
          class="normal-price text-regalBlue row justify-between"
          style="color: #D92D20;"
        >
          <div>Discount:</div>
          <div class="f-w-600" style="color: #D92D20;">
            -{{ currency + '' + (price - discountedPrice).toFixed(2) }}
          </div>
        </div>
        <div
          class="price text-regalBlue row justify-between"
          style="margin-top: 32px"
        >
          <div>Total</div>
          <div>
            {{
              currency +
                '' +
                (isDiscountPresent
                  ? discountedPrice
                  : price
                  ? price.toFixed(2)
                  : (0).toFixed(2))
            }}
          </div>
        </div>
        <div class="flex flex-center">
          <q-btn
            :class="purchased ? 'bg-shamrockGreen' : 'bg-primary'"
            :label="purchased ? 'Already purchased' : 'Buy blooprint now'"
            no-caps
            no-wrap
            class="f-w-600 buy-blooprint-btn flex flex-center text-white"
            @click="onBuyNowClick()"
          >
            <div class="col q-py-xs text-left relative-position">
              <q-icon
                v-if="purchased"
                class="q-ml-sm"
                size="28px"
                name="task_alt"
              />
              <q-avatar
                v-else
                class="arrow"
                style="margin-left: 15px"
                size="18px"
              >
                <img src="~assets/chevron-right.svg" />
              </q-avatar>
            </div>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isLogin } from '../../utils/common'
import { mapGetters } from 'vuex'
import { calcDiscountedPrice } from '@utils/common'

export default {
  props: [
    'currency',
    'blooprintName',
    'price',
    'blooprintDetails',
    'purchased'
  ],
  data() {
    return {
      isDiscountPresent: false,
      discountedPrice: 0
    }
  },
  computed: {
    ...mapGetters(['loggedInUserData'])
  },
  mounted() {
    if (this.blooprintDetails['attributes']['discount'] > 0) {
      this.discountedPrice = calcDiscountedPrice(
        this.loggedInUserData['timeZone'],
        this.blooprintDetails['attributes']['discountEndDate'],
        this.price,
        this.blooprintDetails['attributes']['discount'],
        this.blooprintDetails['attributes']['discountStartDate']
      )
      if (this.discountedPrice > 0) {
        this.isDiscountPresent = true
      }
    } else {
      this.discountedPrice = 0
      this.isDiscountPresent = false
    }
  },
  methods: {
    // ************** Navigate to Checkout Screen ***********************
    onBuyNowClick() {
      if (this.purchased) {
        return this.$router.push({
          name: 'purchased-blooprint-landing-page',
          params: {
            blooprintId: this.$route.params['blooprintId']
          }
        })
      }
      this.$router.push({
        name: isLogin() ? 'blooprint-checkout' : 'signup-for-blooprint',
        params: {
          blooprintId: this.$route.params['blooprintId']
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-per-blooprint {
  margin-top: 30px;
  border-radius: 20px;
  padding: 44px 38px;
  margin-bottom: 120px;
  @media only screen and (max-width: $breakpoint-xs) {
    margin-bottom: 100px;
    padding: 20px;
  }
  .section-title {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 2px;
    @media only screen and (max-width: $breakpoint-xs) {
      margin-bottom: 30px;
      line-height: 24px;
    }
  }
  .benefit-container {
    margin-top: 30px;
    @media only screen and (max-width: $breakpoint-xs) {
      margin-top: 24px;
    }
  }
  .benefit {
    margin-left: 15px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  .benefit-description {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin-left: 40px;
  }
  .price-button-container {
    margin-top: 32px;
    .price {
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
      @media only screen and (max-width: $breakpoint-xs-max) {
        line-height: 28px;
      }
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      margin-top: 24px;
    }
  }
  .buy-blooprint-btn {
    border-radius: 10px;
    height: 60px;
    width: 494px;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    margin-top: 16px;
    @media only screen and (max-width: 1300px) {
      font-size: 16px;
      line-height: 24px;
    }
    @media only screen and (max-width: $breakpoint-sm-max) {
      height: 50px;
      width: 256px;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      height: 44px;
      width: 306px;
      margin-top: 10px;
    }
  }
}
.normal-price {
  font-size: 20px;
  line-height: 28px;
  font-weight: 400;
  @media only screen and (max-width: 1100px) {
    font-size: 16px;
    line-height: 24px;
  }
  @media only screen and (max-width: 1020px) {
    font-size: 14px;
    line-height: 22px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 28px;
  }
}
</style>
