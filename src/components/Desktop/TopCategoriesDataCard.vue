<template>
  <div>
    <div
      @click="onClickCategory"
      class="cursor-pointer overflow-hidden category-image"
      :class="animateElements ? 'reveal fade-right' : ''"
    >
      <q-img :ratio="14 / 11" :src="picture" />
    </div>
    <div
      @click="onClickCategory"
      class="category-name cursor-pointer text-regalBlue ellipsis"
      :class="animateElements ? 'reveal fade-bottom' : ''"
    >
      {{ name }}
    </div>
    <div
      @click="onClickCategory"
      class="view-all-link text-primary gt-sm "
      :class="animateElements ? 'reveal fade-bottom' : ''"
    >
      Explore blooprints
    </div>
    <div @click="onClickCategory" class="view-all-link text-primary lt-md">
      View all
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['name', 'picture', 'animateElements'],
  methods: {
    ...mapActions(['updateBlooprintCategoryFilterTerm']),
    // *********** Navigate to Categories **********************************
    onClickCategory() {
      this.updateBlooprintCategoryFilterTerm({
        category: this.name,
        subcategory: ''
      })
      this.$router.push({
        name: 'explore-screen',
        query: {
          category: this.name
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.category-image {
  border-radius: 20px;
  height: 100%;
  box-shadow: 0px 10px 20px $shadow;
  &:hover {
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  }
}
.category-name {
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  margin-top: 16px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 20px;
    line-height: 24px;
  }
}
.view-all-link {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-top: 4px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
