<template>
  <div class="blooprint-top-section">
    <div class="row justify-between">
      <div class="col-md-6 col-sm-12 col-xs-12 title-container">
        <div class="row items-center">
          <div v-if="category">
            <div style="margin: 7px 30px 7px 0px;">
              <div
                class="category-name ellipsis text-regalBlue"
                style="
                  padding: 4px 16px;
                  background: #ccedff;
                  border-radius: 7px;
                "
              >
                {{ category }}
              </div>
            </div>
          </div>
          <div class="flex">
            <q-avatar size="2.5rem">
              <q-img contain :src="authorImage" />
            </q-avatar>
            <div
              @click="navigateToAuthorScreen(authorId)"
              class="
                row
                items-center
                text-capitalize text-comet
                author-name
                ellipsis
                q-mt-sm
                cursor-pointer
              "
              style="width: 140px; display: block; margin-left: 10px"
            >
              {{ authorName }}
            </div>
          </div>
        </div>
        <div class="blooprint-name-container">
          <div class="blooprint-name text-regalBlue ellipsis-3-lines">
            {{ blooprintName }}
          </div>
        </div>
        <div class="row items-center" v-if="rating > 0">
          <q-badge
            outline
            align="middle"
            class="text-solitude"
            style="
              border-radius: 8px;
              padding: 8px 12px 8px 8px;
              border: 2px solid #e8e9ec;
            "
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
              class="f-w-600 text-regalBlue q-ml-sm gt-sm"
              style="line-height: 20px; font-size: 15px"
            >
              {{ rating.toFixed(1) }}
            </span>
            <span
              class="f-w-600 text-regalBlue lt-md"
              style="line-height: 20px; font-size: 15px; margin-left: 8px"
            >
              {{ rating.toFixed(1) }}
            </span>
            <q-space style="width: 2px" />
            <span
              class="text-body2 text-manateeGrey f-w-600"
              style="line-height: 20px"
            >
              /
            </span>
            <q-space style="width: 2px" />
            <span
              class="text-manateeGrey f-w-600"
              style="font-size: 12px; line-height: 20px; padding-top: 2px"
              >5
            </span>
          </q-badge>
          <div
            class="text-primary cursor-pointer reviews-link"
            style="margin-left: 30px"
            @click="onClickReviews"
          >
            Reviews{{ ' (' + reviews + ')' }}
          </div>
        </div>
        <q-btn
          :class="
            purchased ? 'bg-shamrockGreen purchased-btn-padding' : 'bg-primary'
          "
          :label="purchased ? 'Already purchased' : 'Buy blooprint now'"
          no-caps
          no-wrap
          class="f-w-600 buy-blooprint-btn text-white"
          @click="onBuyNowClick()"
        >
          <div class="q-py-xs text-left relative-position">
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
      <div class="col-md-6 col-sm-12 col-xs-12 relative-position">
        <div class="image-container overflow-hidden">
          <q-img height="100%" :ratio="16 / 9" :src="thumbnailImage" />
        </div>
        <div class="absolute wish-icon">
          <q-btn
            unelevated
            round
            color="white"
            text-color="primary"
            class="bg-white"
            :icon="isWishlisted ? 'favorite' : 'favorite_border'"
            @click="onWishListClick(blooprint)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { constants, isLogin } from '../../utils/common'
import { mapActions } from 'vuex'

export default {
  props: [
    'purchased',
    'authorName',
    'authorId',
    'authorImage',
    'blooprintName',
    'rating',
    'reviews',
    'thumbnailImage',
    'category',
    'isWishlisted',
    'blooprint'
  ],
  methods: {
    ...mapActions(['addToWishList', 'removeFromWishList']),
    // ************** Navigate to Authors's Screen ***********************
    navigateToAuthorScreen(authorID) {
      this.$router.push({
        name: 'author-view',
        params: {
          profileId: authorID
        }
      })
    },
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
    // ************** Navigate to Blooprint reviews Screen ***********************
    onClickReviews() {
      this.$emit('clicked', true)
    },
    // **************** Triggers on WhishList Icon Select *****************************
    onWishListClick(blooprint) {
      if (isLogin()) {
        blooprint['attributes']['wishlist'] = !blooprint['attributes'][
          'wishlist'
        ]
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
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.blooprint-top-section {
  padding: 60px 52px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-top: 30px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
  }
}
.author-name {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}
.category-name {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: block;
  width: max-content;
  max-width: 380px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    max-width: 280px;
  }
}
.blooprint-name-container {
  margin: 30px 0px;
  @media only screen and (max-width: 1300px) {
    margin: 22px 0px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin: 20px 0px;
  }
  .blooprint-name {
    font-weight: 600;
    font-size: 48px;
    line-height: 56px;
    @media only screen and (max-width: 1300px) {
      font-size: 36px;
      line-height: 40px;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      font-size: 32px;
      line-height: 36px;
    }
  }
}
.reviews-link {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  &:hover {
    text-decoration: underline;
  }
}
.image-container {
  box-shadow: 0px 10px 30px $shadow;
  border-radius: 20px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 32px;
  }
}
.buy-blooprint-btn {
  border-radius: 10px;
  height: 60px;
  width: 286px;
  font-size: 20px;
  line-height: 28px;
  margin-top: 30px;
  padding-left: 20px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 20px;
    height: 50px;
    width: 229px;
    font-size: 16px;
    line-height: 24px;
    padding-left: 15px;
  }
}
.purchased-btn-padding {
  padding: 0px 15px !important ;
}
::v-deep {
  .q-rating__icon + .q-rating__icon {
    margin-left: 4px;
  }
}
.title-container {
  @media only screen and (min-width: 1024px) {
    padding-right: 20px !important;
  }
}
.wish-icon {
  top: 24px;
  right: 24px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    top: 48px;
    right: 16px;
  }
}
::v-deep {
  .q-btn--round .q-btn__wrapper {
    min-width: 40px;
    min-height: 40px;
    @media only screen and (max-width: $breakpoint-xs-max) {
      min-width: 30px;
      min-height: 30px;
    }
  }
}
</style>
