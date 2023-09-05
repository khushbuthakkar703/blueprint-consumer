<template>
  <div class="row">
    <div
      class="blooprint-card gt-sm"
      v-for="(blooprint, index) in myBlooprintList"
      :key="blooprint.id"
      :class="(index + 1) % 4 == 0 ? 'q-pr-none' : 'card-padding-r'"
    >
      <BlooprintDataCard
        :category="blooprint['attributes']['categories'][0]"
        :authorName="blooprint['attributes']['authorName']"
        :thumbnail="blooprint['attributes']['thumbnail']"
        :rating="blooprint['attributes']['rating']"
        :name="blooprint['attributes']['name']"
        :wishlist="blooprint['attributes']['wishlist']"
        :currency="blooprint['attributes']['currency']"
        :price="blooprint['attributes']['price']"
        :blooprintData="blooprint"
        :requestFrom="'my-blooprints'"
        :buttonText="buttonText"
      />
    </div>
    <div
      class="blooprint-card lt-md"
      v-for="(blooprint, index) in myBlooprintList"
      :key="index"
      :class="(index + 1) % 2 == 0 ? 'q-pr-none' : 'card-padding-r'"
    >
      <BlooprintDataCard
        :category="blooprint['attributes']['categories'][0]"
        :authorName="blooprint['attributes']['authorName']"
        :thumbnail="blooprint['attributes']['thumbnail']"
        :rating="blooprint['attributes']['rating']"
        :name="blooprint['attributes']['name']"
        :wishlist="blooprint['attributes']['wishlist']"
        :currency="blooprint['attributes']['currency']"
        :price="blooprint['attributes']['price']"
        :blooprintData="blooprint"
        :requestFrom="'my-blooprints'"
        :buttonText="buttonText"
      />
    </div>
  </div>
</template>
<script>
import BlooprintDataCard from './BlooprintDataCard.vue'

export default {
  name: 'MyBlooprintDesktopDataCard',
  data() {
    return {}
  },
  props: ['myBlooprintList', 'buttonText'],
  components: {
    BlooprintDataCard
  }
}
</script>
<style lang="scss" scoped>
.blooprint-card {
  width: 25%;
  margin-bottom: 40px;
  @media only screen and (max-width: $breakpoint-md-max) {
    margin-bottom: 40px;
    width: 25%;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-bottom: 30px;
    width: 50%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-bottom: 30px;
    width: 100%;
  }
}
.card-padding-r {
  padding-right: 20px;
  @media only screen and (max-width: $breakpoint-md-max) {
    padding-right: 20px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-right: 15px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-right: 0px;
  }
}
</style>
