<template>
  <q-card-section>
    <div class="flex flex-center">
      <div>
        <img src="~assets/Oops.png" />
      </div>
    </div>
    <div class="text-primary text-center q-mt-md">
      <h1 class="text-h4">Fail!</h1>
      <h1 class="text-body1">{{ message }}</h1>
    </div>
  </q-card-section>
</template>
<script>
export default {
  name: 'FailureDialog',
  data() {
    return {}
  },
  props: ['title', 'message']
}
</script>
