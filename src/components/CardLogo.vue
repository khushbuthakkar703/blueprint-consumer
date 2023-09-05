<template>
  <span>
    <q-img
      v-if="brand == 'visa'"
      src="../assets/visa-logo-blue.svg"
      spinner-color="white"
      height="40px"
      width="58px"
      class="float-right"
    />
    <q-img
      v-if="brand == 'mastercard'"
      src="~/assets/MasterCardLogo.svg"
      spinner-color="white"
      height="23px"
      width="37px"
      class="float-right q-mt-xs"
    />
    <q-img
      v-if="brand == 'americanexpress'"
      src="~/assets/AmericanExpressLogo.svg"
      spinner-color="white"
      height="23px"
      width="45px"
      class="float-right"
    />
  </span>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: ['brand'],
  methods: {}
}
</script>
<style lang="scss" scoped></style>
