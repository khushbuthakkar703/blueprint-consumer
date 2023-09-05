<template>
  <q-card-section class="fixed-center full-width">
    <div class="flex flex-center">
      <div>
        <q-img
          v-if="title == 'success'"
          style="width: 150px"
          src="~assets/Success.svg"
        ></q-img>
        <q-img v-else src="~assets/Oops.png" style="width: 150px"></q-img>
      </div>
    </div>
    <div class="text-white text-center q-mt-md q-mb-xl">
      <h1 class="text-h4 text-capitalize">{{ title }}!</h1>
      <h1 class="text-body1">{{ message }}</h1>
    </div>
  </q-card-section>
</template>

<script>
export default {
  name: 'NotificationDialog',
  data() {
    return {}
  },
  props: ['title', 'message']
}
</script>
