<template>
  <div class="text-center q-mt-xl">
    <q-img class="img-style" src="~assets/NoData.svg" />
    <div class="f-w-600 text-regalBlue no-data-heading">
      {{ heading ? heading : 'No Data Available' }}
    </div>
    <div class="q-mt-md f-w-400 text-regalBlue text-fs-16 text-lh-20">
      {{ subheading ? subheading : 'There is no data to show you right now' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoBlooprintData',
  props: ['heading', 'subheading']
}
</script>
<style lang="scss" scoped>
.no-data-heading {
  margin-top: 40px;
  font-size: 20px;
  line-height: 24px;
}
.text-lh-20 {
  line-height: 20px;
}
.img-style {
  width: 320px;
  height: 235px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 280px;
    height: 200px;
  }
}
</style>
