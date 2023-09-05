<template>
  <q-dialog v-model="confirmationPopup" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm text-h6">{{ popupMsg }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="No" color="primary" @click="closePopup('no')" />
        <q-btn flat label="Yes" color="primary" @click="closePopup('yes')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  data() {
    return {
      confirmationPopup: true
    }
  },
  props: ['popupMsg'],
  methods: {
    //   ***************** Triggers when Yes/No button is clicked ***********************8
    closePopup(type) {
      this.$emit('on-confirm-popup-close', { confirmStatus: type })
    }
  }
}
</script>
<style lang="scss" scoped></style>
