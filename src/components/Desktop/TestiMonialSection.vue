<template>
  <div class="bg-solitudeBlue feature-height overflow-hidden">
    <!-- For Desktop view -->
    <div class="image-container relative-position gt-xs">
      <div>
        <q-img
          class="testimonial-image"
          contain
          src="~assets/testimonial-img.png"
          position="left center"
        >
          <div class="row transparent text-section">
            <div
              class="col-md-7 col-sm-7 col-xs-6 text-container reveal fade-bottom"
            >
              <div class="text-regalBlue image-text text-letter-space">
                “blooprinted is going to transform how you educate the world!”
              </div>
              <div class="row justify-between">
                <div class="flex col-8">
                  <q-avatar size="2rem">
                    <img contain src="~assets/grant-cardone.jpg" />
                  </q-avatar>
                  <div
                    class="
                      q-ml-sm
                      row
                      items-center
                      text-capitalize text-comet
                      avatar-name
                    "
                  >
                    Grant Cardone
                  </div>
                </div>
                <div class="col-4 flex justify-end">
                  <q-rating
                    size="20px"
                    :value="5"
                    :max="5"
                    readonly
                    icon-selected="img:FullStar.svg"
                    icon-half="img:HalfStar.svg"
                    icon="img:NoStar.svg"
                    no-dimming
                    class="text-darkTangerine testimonial-rating"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-img>
      </div>
      <div class="row bg-white reviews-container">
        <div class="col-md-6 col-sm-12">
          <div class="reviews reveal fade-right">
            <div class="reviews-heading">“The Best has yet to come!”</div>
            <div class="reviews-description text-regalBlue">
              blooprinted is the ultimate platform for Creators to build and
              educate their audience. The “Done With You” format I have created
              for this platform provides a frictionless framework to get your
              blooprint to reach thousands that are searching for your
              expertise.
            </div>
            <div class="row justify-between review-avatar-section">
              <div class="flex col-6">
                <q-avatar size="2rem">
                  <img contain src="~assets/mike-c-roc.png" />
                </q-avatar>
                <div
                  class="
                    q-ml-sm
                    row
                    items-center
                    text-capitalize text-comet
                    avatar-name
                  "
                >
                  Mike C-roc
                </div>
              </div>
              <div class="col-6 flex justify-end">
                <q-rating
                  size="20px"
                  :max="5"
                  :value="5"
                  icon-selected="img:FullStar.svg"
                  icon-half="img:HalfStar.svg"
                  icon="img:NoStar.svg"
                  readonly
                  no-dimming
                  class="text-darkTangerine testimonial-rating"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="reviews border-2px-left reveal fade-left">
            <div class="reviews-heading">“What you have been waiting for!”</div>
            <div class="reviews-description text-regalBlue">
              If you are ready to make a difference in people’s lives, this
              platform is for you. blooprint will revolutionize the industry not
              only for creators but also for those that use it. Whether you have
              been thinking about starting a blooprint or want to take one you
              have created to the next level, getting it on the blooprinted
              platform is where it needs to be.
            </div>
            <div class="row justify-between review-avatar-section">
              <div class="flex col-6">
                <q-avatar size="2rem">
                  <img contain src="~assets/jared-yellin.png" />
                </q-avatar>
                <div
                  class="
                    q-ml-sm
                    row
                    items-center
                    text-capitalize text-comet
                    avatar-name
                  "
                >
                  Jared Yellin
                </div>
              </div>
              <div class="col-6 flex justify-end">
                <q-rating
                  size="20px"
                  :max="5"
                  :value="5"
                  readonly
                  no-dimming
                  icon-selected="img:FullStar.svg"
                  icon-half="img:HalfStar.svg"
                  icon="img:NoStar.svg"
                  class="text-darkTangerine testimonial-rating"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- For mobile view -->
    <div class="lt-sm">
      <q-img
        style="min-height:30vh"
        width="100%"
        contain
        src="~assets/testimonial-image-mobile.png"
      >
        <div class="text-container reveal fade-bottom">
          <div class="text-black image-text">
            “blooprinted is going to transform how you educate the world!”
          </div>
          <div class="row justify-between">
            <div class="flex col-8">
              <q-avatar size="2rem">
                <img contain src="~assets/grant-cardone.jpg" />
              </q-avatar>
              <div
                style="margin-left: 10px"
                class="
                  row
                  items-center
                  text-capitalize text-regalBlue
                  avatar-name
                "
              >
                Grant Cardone
              </div>
            </div>
            <div class="col-4 flex justify-end">
              <q-rating
                size="16px"
                :max="5"
                :value="5"
                icon-selected="img:FullStar.svg"
                icon-half="img:HalfStar.svg"
                icon="img:NoStar.svg"
                readonly
                no-dimming
                class="text-darkTangerine testimonial-rating"
              />
            </div>
          </div>
        </div>
      </q-img>
      <div class="row bg-white reviews-container">
        <div class="col-md-6 col-sm-12">
          <div class="reviews reveal fade-right">
            <div class="reviews-heading text-black">
              “The Best has yet to come!”
            </div>
            <div class="reviews-description text-regalBlue">
              blooprinted is the ultimate platform for Creators to build and
              educate their audience. The “Done With You” format I have created
              for this platform provides a frictionless framework to get your
              blooprint to reach thousands that are searching for your
              expertise.
            </div>
            <div class="row justify-between review-avatar-section">
              <div class="flex col-8">
                <q-avatar size="2rem">
                  <img contain src="~assets/mike-c-roc.png" />
                </q-avatar>
                <div style="margin-left: 10px" class="row items-center">
                  <div
                    class="col-12 text-capitalize text-regalBlue avatar-name"
                  >
                    Mike C-roc
                  </div>
                </div>
              </div>
              <div class="col-4 flex justify-end">
                <q-rating
                  size="16px"
                  :max="5"
                  :value="5"
                  icon-selected="img:FullStar.svg"
                  icon-half="img:HalfStar.svg"
                  icon="img:NoStar.svg"
                  readonly
                  no-dimming
                  class="text-darkTangerine testimonial-rating"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="reviews reveal fade-left">
            <div class="reviews-heading text-black">
              “What you have been waiting for!”
            </div>
            <div class="reviews-description text-regalBlue">
              If you are ready to make a difference in people’s lives, this
              platform is for you. blooprint will revolutionize the industry not
              only for creators but also for those that use it. Whether you have
              been thinking about starting a blooprint or want to take one you
              have created to the next level, getting it on the blooprinted
              platform is where it needs to be.
            </div>
            <div class="row justify-between review-avatar-section">
              <div class="flex col-8">
                <q-avatar size="2rem">
                  <img contain src="~assets/jared-yellin.png" />
                </q-avatar>
                <div style="margin-left: 10px" class="row items-center">
                  <div
                    class="col-12 text-capitalize text-regalBlue avatar-name"
                  >
                    Jared Yellin
                  </div>
                </div>
              </div>
              <div class="col-4 flex justify-end">
                <q-rating
                  size="16px"
                  :max="5"
                  :value="5"
                  icon-selected="img:FullStar.svg"
                  icon-half="img:HalfStar.svg"
                  icon="img:NoStar.svg"
                  readonly
                  no-dimming
                  class="text-darkTangerine testimonial-rating"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.feature-height {
  padding-bottom: 158px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-bottom: 60px;
  }
  background: linear-gradient(
    to top,
    white 70%,
    $solitudeBlue 70%,
    $solitudeBlue
  );
}
.testimonial-image {
  border-radius: 20px 20px 0px 0px;
  width: 100%;
  min-height: 23vh;
  @media only screen and (max-width: 1290px) {
    width: 100vw;
    border-radius: 0px 0px 0px 0px;
  }
  @media only screen and (max-width: 765px) {
    width: 140vw;
  }
}
.image-container {
  margin-left: 52px;
  margin-right: 52px;
  @media only screen and (max-width: 1290px) {
    margin-left: 0px;
    margin-right: 0px;
  }
}
.text-section {
  left: 2.2rem;
  top: 2.2rem;
  @media only screen and (max-width: $breakpoint-sm-max) {
    left: 1rem;
    top: 1rem;
  }
}
.text-container {
  background: white;
  padding: 60px;
  border-radius: 20px;
  box-shadow: 0px 10px 20px $shadow;
  @media only screen and (max-width: 1290px) {
    padding: 40px;
  }
  @media only screen and (max-width: 1290px) {
    padding: 30px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 15px;
    padding: 20px;
  }
  .image-text {
    font-weight: 600;
    font-size: 32px;
    line-height: 36px;
    margin-bottom: 32px;
    @media only screen and (max-width: 1290px) {
      margin-bottom: 20px;
      font-weight: 600;
      font-size: 24px;
      line-height: 34px;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      font-weight: 600;
      font-size: 24px;
      line-height: 28px;
    }
  }
}
.avatar-name {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}
.testimonial-rating {
  @media only screen and (max-width: 360px) {
    font-size: 13px !important;
  }
}
.reviews-container {
  border-radius: 0px 0px 20px 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  @media only screen and (max-width: $breakpoint-xs-max) {
    border-radius: 0px 0px 0px 0px;
  }
  .reviews {
    padding: 60px;
    @media only screen and (max-width: $breakpoint-sm-max) {
      border: 2px solid #e8edf2;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      padding: 30px;
      border: 2px solid #e8edf2;
    }
    .reviews-heading {
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
      @media only screen and (max-width: $breakpoint-xs-max) {
        font-size: 20px;
        line-height: 24px;
      }
    }
    .reviews-description {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      margin-top: 20px;
    }
    .review-avatar-section {
      margin-top: 30px;
      @media only screen and (max-width: $breakpoint-xs-max) {
        margin-top: 20px;
      }
    }
  }
  .border-2px-left {
    border-left: 2px solid #e8edf2;
  }
}
::v-deep {
  .q-rating__icon + .q-rating__icon {
    margin-left: 4px;
  }
}
</style>
