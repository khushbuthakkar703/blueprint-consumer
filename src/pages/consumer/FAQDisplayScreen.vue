<template>
  <q-page class="bg-white">
    <FAQSection :isFAQRoute="true" />
  </q-page>
</template>
<script>
import FAQSection from '../../components/Desktop/FAQSection.vue'
export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  components: {
    FAQSection
  }
}
</script>
