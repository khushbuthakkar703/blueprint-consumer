<template>
  <q-dialog no-esc-dismiss no-backdrop-dismiss v-model="showSharePopup">
    <q-card class="share-card bg-white">
      <div align="right">
        <q-btn
          icon="close"
          flat
          round
          dense
          @click="closePopup"
          style="color: #152141;top:10px;right:10px"
          v-close-popup
        />
      </div>
      <q-card-section>
        <div class="text-center f-w-600 text-fs-24-lh-32 text-regalBlue">
          Share blooprint
        </div>
        <div class="text-body1 f-w-600 text-regalBlue" style="margin-top:32px">
          Copy link to share
        </div>
        <q-input
          borderless
          readonly
          class="border-input-field input-style q-mt-xs q-pl-md q-pb-none"
          v-model.trim="shareURL"
          ref="mylink"
        >
          <template v-slot:append>
            <div
              class="bg-kashmirBlue cursor-pointer copy-icon-style text-center q-pt-xs"
              @click="onCopyClick"
            >
              <q-avatar size="20px">
                <img src="~assets/copy.svg" />
              </q-avatar>
            </div>
            <q-tooltip
              v-if="showTooltip"
              v-model="showTooltip"
              anchor="bottom middle"
              self="top middle"
              :hide-delay="500"
            >
              <div class="word-break-break-word">
                Copied
              </div>
            </q-tooltip>
          </template>
        </q-input>
        <div class="line-style text-center full-width">
          <span class="f-w-400 q-px-xs bg-white" style="font-size: 12px;">
            OR
          </span>
        </div>
        <div class="f-w-600 text-body1 text-regalBlue">
          Share via
        </div>
        <div class="row q-mt-xs justify-center">
          <div
            class="icons-border cursor-pointer text-center"
            @click="onLogoClick('facebook')"
          >
            <q-avatar square>
              <img src="~assets/facebook-logo.svg" />
            </q-avatar>
          </div>
          <div
            class="icons-border cursor-pointer text-center"
            @click="onLogoClick('twitter')"
          >
            <q-avatar square>
              <img src="~assets/twitter-logo.svg" />
            </q-avatar>
          </div>
          <div
            class="icons-border cursor-pointer text-center"
            @click="onLogoClick('linkedin')"
          >
            <q-avatar square>
              <img src="~assets/linkedin-logo.svg" />
            </q-avatar>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: 'ShareBlooprintPopup',
  props: ['shareURL'],
  data() {
    return {
      showSharePopup: true,
      showTooltip: false
    }
  },
  methods: {
    closePopup() {
      this.showSharePopup = false
      this.$emit('on-share-popup-close')
    },
    onCopyClick() {
      let url = this.$refs.mylink
      url.innerHTML = this.shareURL
      url.select()
      document.execCommand('copy')
      this.showTooltip = true
    },
    onLogoClick(logoType) {
      switch (logoType) {
        case 'facebook':
          window.open(
            `https://www.facebook.com/sharer/sharer.php?display=page&u=${this.shareURL}`
          )
          break
        case 'linkedin':
          window.open(
            `https://www.linkedin.com/shareArticle?url=${this.shareURL}`
          )
          break
        case 'twitter':
          window.open(
            `https://www.twitter.com/intent/tweet?url=${this.shareURL}`
          )
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.share-card {
  max-width: 1500px;
  width: 658px;
  box-shadow: 0px 10px 20px $shadow;
  border-radius: 20px;
  .q-card__section--vert {
    padding: 7px 113px 60px 113px;
    @media only screen and (max-width: $breakpoint-sm-max) {
      padding: 7px 30px 60px 30px;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      padding: 7px 30px 60px 30px;
    }
  }
}
::v-deep {
  .input-style {
    height: 48px;
    border-radius: 8px;
    .q-avatar__content {
      border-radius: initial !important;
    }
  }
}
.copy-icon-style {
  width: 48px;
  height: 48px;
  border-radius: 0px 8px 8px 0px;
}
.line-style {
  border-bottom: 2px solid #dddddd;
  line-height: 0.1em;
  color: $lynch;
  height: 1.36px;
  margin-top: 26px;
  margin-bottom: 27px;
}
.icons-border {
  border: 1px solid #d0d5dd;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  padding: 10px 40px;
  margin: 3px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 10px 30px;
  }
}
</style>
