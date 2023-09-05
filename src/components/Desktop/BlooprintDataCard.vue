<template>
  <q-card bordered class="card-shadow" style="border-radius: 20px">
    <div style="height:150px" class="overflow-hidden">
      <q-img
        v-if="thumbnail != '' && thumbnail != null"
        class="full-width full-height cursor-pointer img-borders relative"
        :ratio="3 / 2"
        cover
        :src="thumbnail"
        @click="navigateToBlooprint(blooprintData)"
      />
      <q-img
        v-else
        class="full-width full-height cursor-pointer img-borders relative"
        :ratio="3 / 2"
        cover
        src="~assets/NoImage.png"
        @click="navigateToBlooprint(blooprintData)"
      />
    </div>

    <div class="absolute wish-icon" v-if="requestFrom != 'my-blooprints'">
      <q-btn
        unelevated
        round
        color="white"
        text-color="primary"
        class="bg-white"
        :icon="wishlist ? 'favorite' : 'favorite_border'"
        @click="onWishListClick(blooprintData)"
      />
    </div>
    <q-separator />
    <q-card-section
      @click="navigateToBlooprint(blooprintData)"
      class="cursor-pointer"
    >
      <q-badge
        v-if="category"
        class="bagde-color text-regalBlue text-caption ellipsis"
        style="line-height: 18px;"
      >
        {{ category }}
      </q-badge>
      <div v-else style="height:24px"></div>
      <div
        class="text-h6 text-regalBlue word-break-break-word ellipsis-3-lines f-w-600"
        style="min-height: 72px; line-height: 24px;margin-top: 10px"
      >
        <span class="cursor-pointer">{{ name }}</span>
      </div>
      <div
        class="text-caption text-regalBlue ellipsis"
        style="margin-top: 5px; line-height: 18px;"
      >
        <span
          class="cursor-pointer"
          @click.stop="navigateToAuthor(blooprintData)"
        >
          {{ authorName }}
        </span>
      </div>
      <div
        v-if="requestFrom != 'my-blooprints'"
        class="row items-center justify-between no-wrap"
        style="margin-top: 10px;height:40px"
      >
        <div
          class="row col-6 items-center text-primary price-section"
          :class="rating > 0 ? 'col-6' : 'col-10'"
        >
          <span class="text-h5 f-w-600 ellipsis" style="line-height: 36px;">
            {{ currency }}{{ displayRupees(price) }}
          </span>
          <span class="text-body1 q-pt-xs f-w-500">
            .{{ displayPaise(price) }}
          </span>
        </div>
        <div class="row col-4 justify-end f-w-600" v-if="rating > 0">
          <q-badge
            outline
            align="middle"
            class="text-solitude"
            style="border-radius: 8px; padding: 8px 12px 8px 8px; border: 2px solid #E8E9EC;"
          >
            <q-rating
              :value="5"
              max="1"
              size="20px"
              icon-selected="img:FullStar.svg"
              icon-half="img:HalfStar.svg"
              icon="img:NoStar.svg"
              readonly
            />
            <span
              class=" f-w-600 text-regalBlue q-ml-sm gt-sm"
              style="line-height: 20px;font-size: 15px;"
            >
              {{ rating.toFixed(1) }}
            </span>
            <span
              class=" f-w-600 text-regalBlue lt-md"
              style="line-height: 20px;font-size: 15px;margin-left: 10px"
            >
              {{ rating.toFixed(1) }}
            </span>
            <q-space style="width:2px" />
            <span
              class="text-body2 text-manateeGrey f-w-600"
              style="line-height: 20px;"
            >
              /
            </span>
            <q-space style="width:2px" />
            <span
              class="text-manateeGrey f-w-600"
              style="font-size: 12px;line-height: 20px;padding-top:2px"
              >5
            </span>
          </q-badge>
        </div>
      </div>
      <div class="row q-mt-sm q-pt-xs" style="margin-bottom: 2px" v-else>
        <q-btn
          :label="buttonText"
          no-caps
          no-wrap
          unelevated
          class="col-12 f-w-600  text-white text-body1 q-pl-md btn-style"
          :class="buttonText == 'Completed' ? 'bg-shamrockGreen' : 'bg-primary'"
          @click="navigateToBlooprint(blooprintData)"
        >
          <div class="q-py-xs text-white relative-position">
            <q-icon
              class="q-ml-sm"
              :class="buttonText != 'Completed' ? 'arrow' : null"
              size="28px"
              :name="buttonText != 'Completed' ? 'navigate_next' : 'task_alt'"
            />
          </div>
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { constants, isLogin, calcDiscountedPrice } from '../../utils/common'
export default {
  name: 'BlooprintDataCard',
  data() {
    return {}
  },
  props: [
    'authorName',
    'thumbnail',
    'rating',
    'name',
    'wishlist',
    'currency',
    'price',
    'blooprintData',
    'requestFrom',
    'buttonText',
    'category'
  ],
  computed: {
    ...mapGetters(['loggedInUserData'])
  },
  methods: {
    ...mapActions(['addToWishList', 'removeFromWishList']),
    displayRupees(price) {
      if (price) {
        if (this.blooprintData['attributes']['discount'] > 0) {
          let discountedPrice = calcDiscountedPrice(
            this.loggedInUserData['timeZone'],
            this.blooprintData['attributes']['discountEndDate'],
            price,
            this.blooprintData['attributes']['discount'],
            this.blooprintData['attributes']['discountStartDate']
          )
          return discountedPrice > 0
            ? discountedPrice.toString().split('.')[0]
            : price.toString().split('.')[0]
        } else {
          return price.toString().split('.')[0]
        }
      }
      return '00'
    },
    displayPaise(price) {
      if (price) {
        if (this.blooprintData['attributes']['discount'] > 0) {
          let discountedPrice = calcDiscountedPrice(
            this.loggedInUserData['timeZone'],
            this.blooprintData['attributes']['discountEndDate'],
            price,
            this.blooprintData['attributes']['discount'],
            this.blooprintData['attributes']['discountStartDate']
          )
          if (discountedPrice > 0) {
            return discountedPrice.toString().split('.')[1]
              ? discountedPrice.toString().split('.')[1]
              : '00'
          } else {
            return price.toString().split('.')[1]
              ? price.toString().split('.')[1]
              : '00'
          }
        } else {
          return price.toString().split('.')[1]
            ? price.toString().split('.')[1]
            : '00'
        }
      }
      return '00'
    },
    navigateToBlooprint(blooprint) {
      if (this.requestFrom == 'my-blooprints') {
        this.$router.push(
          {
            name: 'purchased-blooprint-landing-page',
            params: {
              blooprintId: blooprint['id']
            }
          },
          () => {}
        )
      } else {
        this.$router.push(
          {
            name: 'blooprint landing page',
            params: {
              blooprintId: blooprint['id']
            }
          },
          () => {}
        )
      }
    },
    navigateToAuthor(blooprint) {
      this.$router.push({
        name: 'author-view',
        params: {
          profileId: blooprint['attributes']['authorID']
        }
      })
    },
    // **************** Triggers on WhishList Icon Select *****************************
    onWishListClick(blooprint) {
      if (isLogin()) {
        blooprint['attributes']['wishlist'] = !blooprint['attributes'][
          'wishlist'
        ]
        this.$emit('wishlist-click', { blooprint: blooprint, display: true })
        if (blooprint['attributes']['wishlist']) {
          this.saveToWishList(blooprint)
        } else {
          this.deleteFromWishList(blooprint)
        }
      } else {
        this.$router.push({ name: constants.PAGE_LOGIN })
      }
    },
    // *************** Add to WishList API **************************
    async saveToWishList(blooprint) {
      let params = {
        data: {
          type: 'wishlists',
          attributes: {
            customerID: this.$store.getters.userId,
            blooprintID: blooprint['id']
          }
        }
      }
      let isSuccess = await this.addToWishList(params)
      if (!isSuccess) {
        blooprint['attributes']['wishlist'] = !blooprint['attributes'][
          'wishlist'
        ]
      }
      this.$emit('wishlist-click', { blooprint: blooprint, display: false })
    },
    // *************** Remove from Wishlit API ****************************
    async deleteFromWishList(blooprint) {
      let params = {
        customerID: this.$store.getters.userId,
        blooprintID: blooprint['id']
      }
      let isSuccess = await this.removeFromWishList(params)
      if (!isSuccess) {
        blooprint['attributes']['wishlist'] = !blooprint['attributes'][
          'wishlist'
        ]
      } else {
        this.$emit('remove-from-wishlist', blooprint)
      }
      this.$emit('wishlist-click', { blooprint: blooprint, display: false })
    }
  }
}
</script>
<style lang="scss" scoped>
.bagde-color {
  background: linear-gradient(
      0deg,
      rgba(0, 163, 255, 0.2),
      rgba(0, 163, 255, 0.2)
    ),
    #ffffff;
  border-radius: 5px;
  padding: 3px 8px;
  display: block;
  width: max-content;
  max-width: -webkit-fill-available;
  max-width: -moz-available;
}
.card-shadow {
  box-shadow: 0px 10px 20px $shadow;
}
.wish-icon {
  top: 20px;
  right: 20px;
}
.img-borders {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.q-card__section--vert {
  padding: 20px !important;
}
.card-shadow:hover {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
}
.price-section {
  @media only screen and (max-width: 1080px) {
    width: 70px;
  }
  @media only screen and (max-width: 1020px) {
    width: max-content;
  }
}
.btn-style {
  height: 44px;
  border-radius: 10px;
  width: 223px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 249px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 249px;
  }
}
::v-deep {
  .q-btn--round .q-btn__wrapper {
    min-width: 36px;
    min-height: 36px;
    @media only screen and (max-width: $breakpoint-xs-max) {
      min-width: 34px;
      min-height: 34px;
    }
  }
}
</style>
