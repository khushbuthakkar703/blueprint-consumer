<template>
  <div>
    <div
      @click="onClickAuthor"
      class="cursor-pointer overflow-hidden author-image"
    >
      <q-img :ratio="9 / 10" class="grey-scale" :src="picture" />
    </div>
    <div
      @click="onClickAuthor"
      class="creator-name cursor-pointer text-regalBlue ellipsis"
    >
      {{ name }}
    </div>
    <div v-if="jobRole" class="job-title-container">
      <div class="job-title text-regalBlue ellipsis">{{ jobRole }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'picture', 'authorId', 'jobRole'],
  methods: {
    // *********** Navigate to Author Profile **********************************
    onClickAuthor(author) {
      this.$router.push({
        name: 'author-view',
        params: { profileId: this.authorId }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.author-image {
  border-radius: 20px;
  height: 340px;
  box-shadow: 0px 10px 20px $shadow;
  &:hover {
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  }
}
.creator-name {
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  margin-top: 16px;
}

.job-title-container {
  margin-top: 7px;
  padding: 3px 8px;
  background: #ccedff;
  width: max-content;
  border-radius: 5px;
  max-width: 250px;
  .job-title {
    font-size: 12px;
    line-height: 18px;
    font-weight: 400;
  }
}
.grey-scale {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}
</style>
