<template>
  <div class="q-pt-sm q-pl-xs">
    <div
      class="text-regalBlue f-w-600"
      style="font-size: 32px;line-height: 36px;"
    >
      Limited time offers
    </div>
    <BlooprintSkeletonCard />
    <div class="row">
      <div
        class="col-md-3 col-sm-6 col-xs-6 q-mt-md q-pr-lg"
        v-for="i in 4"
        :key="i"
      >
        <BlooprintDataCard />
      </div>
    </div>
  </div>
</template>
<script>
import BlooprintSkeletonCard from '../../components/Desktop/BlooprintSkeletonCard.vue'
import BlooprintDataCard from '../../components/Desktop/BlooprintDataCard.vue'
export default {
  name: 'BlooprintOffers',
  data() {
    return {}
  },
  components: {
    BlooprintSkeletonCard,
    BlooprintDataCard
  }
}
</script>
