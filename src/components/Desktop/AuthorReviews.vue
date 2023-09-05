<template>
  <q-card
    class="right-card review-section"
    style="margin-top: 20px"
    v-if="reviewsList.length !== 0"
  >
    <div v-if="reviewsLoading" class="row">
      <div
        class="review-card col-md-6 col-sm-6 col-xs-12"
        style="height: 300px"
        v-for="i in 4"
        :key="i"
      >
        <q-skeleton height="20px" class="q-mb-md" />
        <q-skeleton height="40px" v-for="i in 3" :key="i" />
        <div class="row no-wrap flex items-center q-mt-xl">
          <q-skeleton size="20px" type="QAvatar" />
          <div style="margin-left: 16px">
            <q-skeleton height="20px" width="120px" />
          </div>
        </div>
      </div>
    </div>

    <div
      class="row"
      :class="
        reviewsList.length === 1
          ? 'review-one-card-tablet'
          : 'review-cards-tablet'
      "
    >
      <div
        v-for="(reviews, key) in reviewsList"
        :key="key"
        class="col-sm-12 review-card review-card-tablet"
        :class="
          reviewsList.length === 1
            ? 'col-md one-review'
            : reviewsList.length === 3
            ? 'col-md-6 three-reviews'
            : 'col-md-6'
        "
      >
        <div class="f-w-600 text-fs-24-lh-32 review-title">
          {{
            reviews['attributes']['blooprintReviewTitle']
              ? reviews['attributes']['blooprintReviewTitle']
              : ''
          }}
        </div>
        <div
          class="
            text-fs-16 text-lh-24
            f-w-500
            text-regalBlue
            word-break-break-word
            full-width
          "
          style="margin-top: 20px"
        >
          {{
            reviews['attributes']['blooprintReviewDescription']
              ? reviews['attributes']['blooprintReviewDescription']
              : ''
          }}
        </div>
        <div class="review-avatar-section">
          <div class="flex align-center justify-center">
            <q-avatar size="24px">
              <img
                v-if="reviews['attributes']['customerPicture']"
                contain
                :src="reviews['attributes']['customerPicture']"
              />
              <img v-else contain src="~assets/UserImage.svg" />
            </q-avatar>

            <div
              class="
                q-ml-sm
                items-center
                row
                ellipsis
                text-capitalize text-comet text-fs-14-lh-20
                customerName
                f-w-500
              "
            >
              <span class="ellipsis">
                {{ reviews['attributes']['customerName'] }}</span
              >
            </div>
          </div>
          <div class="col-6 flex justify-end rating-stars">
            <q-rating
              size="20px"
              max="5"
              :value="reviews['attributes']['blooprintRating']"
              readonly
              icon-selected="img:FullStar.svg"
              icon-half="img:HalfStar.svg"
              icon="img:NoStar.svg"
            />
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'AuthorReviews',
  data() {
    return {
      reviews: []
    }
  },
  props: ['reviewsList', 'reviewsLoading'],
  mounted() {
    this.reviews = this.reviewsList[0]
  }
}
</script>

<style lang="scss" scoped>
.right-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 10px 20px $shadow;
  border-radius: 20px;
  margin-bottom: 100px;
  @media only screen and (max-width: 1023px) and (min-width: 600px) {
    margin-bottom: 66px !important;
    border-radius: 0px !important;
    box-shadow: 0px 0px 0px !important;
  }
  @media only screen and (max-width: 599px) {
    border-radius: 0px !important;
    margin-bottom: 0px !important;
  }
}
.review-card {
  padding: 40px;
  &:first-child {
    border-right: 2px solid #e8edf2;
  }

  &:nth-child(3) {
    border-right: 2px solid #e8edf2;
    border-top: 2px solid #e8edf2;
  }

  &:last-child {
    border-top: 2px solid #e8edf2;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 100%;
    padding: 30px !important;
    border-right: 0px !important;
    border-bottom: 2px solid #e8edf2 !important;
    border-top: 0px solid #e8edf2 !important;

    &:last-child {
      border-bottom: 0px !important;
    }
  }
}

.one-review {
  border-right: 2px !important;
  .rating-stars {
    margin-top: 0px !important;
  }
  .review-avatar-section {
    @media only screen and (max-width: 1210px) and (min-width: 1024px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    @media only screen and (max-width: 770px) and (min-width: 600px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .customerName {
    @media only screen and (max-width: $breakpoint-xl-max) {
      width: 750px;
    }
    @media only screen and (max-width: $breakpoint-lg-max) {
      width: 500px;
    }
    @media only screen and (max-width: $breakpoint-md-max) {
      width: 300px;
      max-width: 300px;
    }
    @media only screen and (max-width: 1024px) and (min-width: 810px) {
      width: 550px;
      max-width: 550px;
    }
    @media only screen and (max-width: 809px) and (min-width: 750px) {
      width: 500px;
      max-width: 500px;
    }
    @media only screen and (max-width: 749px) and (min-width: 701px) {
      width: 450px;
      max-width: 450px;
    }
    @media only screen and (max-width: 700px) and (min-width: 600px) {
      width: 350px;
      max-width: 350px;
    }

    @media only screen and (max-width: 510px) and (min-width: 470px) {
      width: 250px;
      max-width: 250px;
    }
    @media only screen and (max-width: 469px) and (min-width: 410px) {
      width: 200px;
      max-width: 200px;
    }
    @media only screen and (max-width: 409px) and (min-width: 360px) {
      width: 145px;
      max-width: 145px;
    }
    @media only screen and (max-width: 359px) and (min-width: 300px) {
      width: 100px;
      max-width: 100px;
    }
  }
}
.review-section {
  margin-top: 20px;
}

.review-avatar-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  @media only screen and (max-width: 1210px) and (min-width: 1024px) {
    display: grid;
    grid-template-rows: 1fr 1fr;
  }
  @media only screen and (max-width: 770px) and (min-width: 600px) {
    display: grid;
    grid-template-rows: 1fr 1fr;
  }
}

.customerName {
  //max-width: 80px;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
  width: 200px;
  @media only screen and (max-width: $breakpoint-xl-max) {
    width: 200px;
  }
  @media only screen and (max-width: $breakpoint-md-max) {
    //max-width: 80px;
    max-width: 120px;
  }
  @media only screen and (max-width: 1210px) and (min-width: 1024px) {
    max-width: 150px;
  }
  @media only screen and (max-width: 1024px) and (min-width: 630px) {
    max-width: 150px;
  }
  @media only screen and (max-width: 629px) and (min-width: 600px) {
    width: 100px;
  }
  @media only screen and (max-width: 599px) and (min-width: 550px) {
    width: 320px;
    max-width: 320px;
  }

  @media only screen and (max-width: 549px) and (min-width: 490px) {
    width: 280px;
    max-width: 280px;
  }
  @media only screen and (max-width: 489px) and (min-width: 465px) {
    width: 240px;
    max-width: 240px;
  }
  @media only screen and (max-width: 464px) and (min-width: 415px) {
    width: 200px;
    max-width: 200px;
  }
  @media only screen and (max-width: 414px) and (min-width: 390px) {
    width: 170px;
    max-width: 170px;
  }
  @media only screen and (max-width: 381px) and (min-width: 360px) {
    width: 150px;
    max-width: 150px;
  }

  @media only screen and (max-width: 359px) and (min-width: 335px) {
    width: 120px;
    max-width: 120px;
  }

  @media only screen and (max-width: 334px) and (min-width: 300px) {
    width: 105px;
    max-width: 105px;
  }
}
.rating-stars {
  @media only screen and (max-width: 1210px) and (min-width: 1024px) {
    margin-top: 16px;
    padding-left: 0px;
    justify-content: start;
  }
  @media only screen and (max-width: 770px) and (min-width: 600px) {
    margin-top: 16px;
    padding-left: 0px;
    justify-content: start;
  }
}
.review-title {
  color: #152141;

  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media only screen and (max-width: 1023px) and (min-width: 600px) {
    width: 30vw !important;
  }
  @media screen and (max-width: 1023px) {
    height: auto;
    width: 80vw;
  }

  @media only screen and (max-width: $breakpoint-sm-max) {
    color: #000000;
  }
}
::v-deep {
  .q-rating__icon + .q-rating__icon {
    margin-left: 4px;
  }
}

.review-card-tablet {
  @media only screen and (max-width: 1023px) and (min-width: 600px) {
    border: 0px !important;
    box-shadow: 0px 10px 20px $shadow;
  }
}

.review-cards-tablet {
  @media only screen and (max-width: 1023px) and (min-width: 600px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 20px;
    grid-column-gap: 20px;
  }
}
.review-one-card-tablet {
  @media only screen and (max-width: 1023px) and (min-width: 600px) {
    display: grid;
    grid-template-columns: 1fr;
  }

  .review-title {
    @media only screen and (max-width: 1023px) and (min-width: 600px) {
      width: 80vw !important;
    }
  }
}

.three-reviews {
  &:nth-child(2) {
    border-bottom: 2px solid #e8edf2 !important;
  }
}
</style>
