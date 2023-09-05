<template>
  <div>
    <label class="text-primary">{{ label }} </label>
    <q-file
      borderless
      color="primary"
      v-model="fileModel"
      label-color="primary"
      input-class="text-primary"
      class="border-secondary rounded-borders text-primary q-mb-lg q-px-md q-pb-none"
      style="width: 250px; height: 150px; position: relative"
      @input="onFileUpload($event, index)"
      id="index"
    >
      <div
        class="border-secondary  q-pa-auto q-px-xs text-secondary"
        :class="[
          fileModel.name
            ? 'file-after-upload'
            : 'file-before-upload cursor-pointer'
        ]"
      >
        +
      </div>
    </q-file>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileUploaded: {}
    }
  },
  props: ['fileModel', 'label', 'index'],
  methods: {
    onFileUpload(event, index) {
      this.fileUploaded = event
      if (this.label == 'Welcome / Promo Video') {
        this.$emit('file-uploaded', event)
      } else if (this.label == 'Add Video') {
        this.$emit('file-uploaded', {
          file: event,
          from: 'video',
          index: index
        })
      } else if (this.label == 'Add Audio') {
        this.$emit('file-uploaded', {
          file: event,
          from: 'audio',
          index: index
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.file-before-upload {
  position: absolute;
  left: 40%;
  top: 15%;
  display: block;
  font-size: 20px;
}
.file-after-upload {
  display: none;
}
</style>
