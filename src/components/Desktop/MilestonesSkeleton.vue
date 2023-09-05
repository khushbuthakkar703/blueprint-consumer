<template>
  <div style="margin-top: 30px">
    <div v-for="i in 3" :key="i" style="border-radius: 8px">
      <q-skeleton class="milestone" />
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
.milestone {
  padding: 16px;
  margin-bottom: 10px;
  @media only screen and (max-width: $breakpoint-xs) {
    margin-bottom: 8px;
    padding: 24px 16px;
  }
}
</style>
