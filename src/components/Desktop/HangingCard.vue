<template>
  <div
    class="hanging-card bg-white"
    style="position: sticky; top: 10%; right: 0"
  >
    <div class="heading text-regalBlue word-break-break-word ellipsis-2-lines">
      {{ blooprintName }}
      <q-tooltip anchor="bottom middle" self="top middle">
        <div class="word-break-break-word">
          {{ blooprintName }}
        </div>
      </q-tooltip>
    </div>
    <div class="separator">
      <q-separator color="solitudeBlue" size="2px" />
    </div>
    <div>
      <div
        @click="GoToTop('intro')"
        class="link text-regalBlue cursor-pointer"
        v-if="video !== '' || description !== ''"
      >
        Intro to the blooprint
      </div>

      <div
        @click="GoToTop('milestones')"
        class="link text-regalBlue cursor-pointer"
        v-if="milestonesList.length !== 0"
      >
        blooprint milestones
      </div>
      <div
        @click="GoToTop('creator')"
        class="link text-regalBlue cursor-pointer"
      >
        About the Creator
      </div>
      <div
        @click="GoToTop('reviews')"
        class="link text-regalBlue cursor-pointer"
        v-if="rating !== 0"
      >
        Rating & reviews
      </div>
      <div
        class="link text-regalBlue cursor-pointer"
        v-if="keypoints"
        @click="GoToTop('keypoints')"
      >
        Key points
      </div>
    </div>
    <div class="separator">
      <q-separator color="solitudeBlue" size="2px" />
    </div>
    <div class="price text-regalBlue" v-if="Number(discountedPrice) == 0">
      {{ currency }}{{ price ? price.toFixed(2) : (0).toFixed(2) }}
    </div>
    <div v-else>
      <div class="text-regalBlue">
        <span class="price" style="color: #D92D20;">
          {{ currency }}{{ discountedPrice }}
        </span>
        <span class="q-ml-md strike-line">
          {{ currency }}{{ price.toFixed(2) }}
        </span>
      </div>
    </div>
    <q-btn
      :class="purchased ? 'bg-shamrockGreen' : 'bg-primary'"
      :label="purchased ? 'Already purchased' : 'Buy blooprint now'"
      no-caps
      class="f-w-600 text-white buy-blooprint-btn flex flex-center"
      @click="onBuyNowClick()"
    >
      <div class="col q-py-xs text-left relative-position">
        <q-icon v-if="purchased" class="q-ml-sm" size="28px" name="task_alt" />
        <q-avatar v-else class="arrow" style="margin-left: 15px" size="18px">
          <img src="~assets/chevron-right.svg" />
        </q-avatar>
      </div>
    </q-btn>
  </div>
</template>

<script>
import { scroll } from 'quasar'
import { isLogin, calcDiscountedPrice } from '../../utils/common'
import { mapGetters } from 'vuex'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  data() {
    return {
      discountedPrice: 0
    }
  },
  props: [
    'blooprintName',
    'currency',
    'price',
    'purchased',
    'rating',
    'video',
    'description',
    'milestonesList',
    'keypoints',
    'blooprintDetails'
  ],
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
    } else {
      this.discountedPrice = 0
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
    },
    GoToTop(el) {
      const ele = document.getElementById(el)
      const target = getScrollTarget(ele)
      const offset = ele.offsetTop
      setScrollPosition(target, offset, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.hanging-card {
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 10px 30px $shadow;
  max-width: 21.188rem;
  margin-bottom: 20px;
  @media only screen and (max-width: 950px) {
    max-width: 18.78rem;
    padding: 25px;
  }
  @media only screen and (max-width: 840px) {
    margin-bottom: 0px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    max-width: 22.6rem;
    padding: 30px;
    border-radius: 10px;
  }
  .heading {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    @media only screen and (max-width: 950px) {
      font-size: 16px;
      line-height: 22px;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      font-size: 20px;
      line-height: 28px;
    }
  }
  .separator {
    margin: 30px 0px;
    @media only screen and (max-width: 950px) {
      margin: 20px 0px;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      margin: 24px 0px;
    }
  }
  .link {
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 24px;
    @media only screen and (max-width: 950px) {
      font-size: 16px;
      line-height: 22px;
      margin-bottom: 18px;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 16px;
    }
  }
  .price {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
  }
  .buy-blooprint-btn {
    border-radius: 10px;
    height: 50px;
    width: 279px;
    font-size: 16px;
    line-height: 24px;
    margin-top: 16px;
    @media only screen and (max-width: 950px) {
      height: 50px;
      width: 250px;
      font-size: 16px;
      line-height: 24px;
      margin-top: 16px;
    }
    @media only screen and (max-width: $breakpoint-xs) {
      height: 50px;
      width: 286px;
      font-size: 16px;
      line-height: 24px;
      margin-top: 16px;
    }
  }
}
.strike-line {
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  text-decoration-line: line-through;
}
</style>
