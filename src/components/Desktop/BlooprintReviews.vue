<template>
  <div class="col-12 reviews">
    <div class="row justify-between">
      <div
        class="review-container"
        :style="
          blooprintReviewsList.length === 1 ? 'width:100% !important' : ''
        "
        v-for="review in blooprintReviewsList"
        :key="review.id"
      >
        <div class="review text-regalBlue ellipsis-5-lines">
          {{ review.attributes.blooprintReviewDescription }}
        </div>
        <div class="row no-wrap flex items-center q-mt-md">
          <q-avatar size="40px">
            <img
              :src="
                review.attributes.customerPicture
                  ? review.attributes.customerPicture
                  : 'UserImage.svg'
              "
            />
          </q-avatar>
          <div
            class="q-ml-md text-comet text-capitalize customer-name word-break-break-word ellipsis"
          >
            {{ review.attributes.customerName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blooprintReviewsList'],
  methods: {
    // ************** Navigate to customer Screen ***********************
    navigateToCustomerScreen(customerID) {
      this.$router.push({
        name: 'author-view',
        params: {
          profileId: customerID
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.reviews {
  margin-top: 32px;
  @media only screen and (max-width: $breakpoint-xs) {
    margin-top: 30px;
  }
  .review {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
  .customer-name {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  .review-container {
    width: 49%;
    &:nth-child(3) {
      margin-top: 40px;
    }
    &:nth-child(4) {
      margin-top: 40px;
    }
    @media only screen and (max-width: $breakpoint-sm) {
      width: 100%;
      &:nth-child(2) {
        margin-top: 40px;
      }
      &:nth-child(3) {
        margin-top: 40px;
      }
      &:nth-child(4) {
        margin-top: 40px;
      }
    }
  }
}
</style>
