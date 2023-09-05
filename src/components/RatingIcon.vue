<template>
  <q-rating
    v-if="!hasError && isReadOnly && isListView == 'list'"
    :value="ratingValue"
    :class="
      isReadOnly
        ? 'cursor-not-allowed ratingClass'
        : 'cursor-pointer ratingClass'
    "
    :size="iconSize"
    :color="color"
    icon="star_border"
    icon-selected="star"
    icon-half="star_half"
    :readonly="isReadOnly"
    @input="onRatingChange"
    @click="onRatingClick"
  />
  <q-rating
    v-else-if="!hasError && isListView != 'list'"
    :value="rating"
    :class="
      isReadOnly
        ? 'cursor-not-allowed ratingClass'
        : 'cursor-pointer ratingClass'
    "
    :size="iconSize"
    :color="color"
    v-model="rating"
    icon="star_border"
    icon-selected="star"
    icon-half="star_half"
    :readonly="isReadOnly"
    @input="onRatingChange"
    @click="onRatingClick"
  />
</template>
<script>
import { mapActions } from 'vuex'
import { constants } from 'src/utils/common'

export default {
  name: 'RatingIcon',
  props: [
    'ratingValue',
    'ratingClass',
    'isReadOnly',
    'iconSize',
    'ratingFrom',
    'isListView',
    'color'
  ],
  data() {
    return {
      rating: 0,
      hasError: false
    }
  },
  mounted() {
    this.rating = this.ratingValue
    if (this.isReadOnly && this.isListView != 'list') {
      this.fetchRatingValue()
    }
  },
  updated() {
    this.rating = this.ratingValue
  },
  methods: {
    ...mapActions(['getBlooprintRating']),
    // *********** Triggers when the Rating Value changes ************************
    onRatingChange(value) {
      let rating = value
      let data = {
        from: this.ratingFrom,
        value: rating
      }
      this.$emit('rating-change', data)
    },
    // ************* Method to fetch the Rating Value ***********************************
    async fetchRatingValue() {
      if (
        this.ratingFrom != constants.AUTHOR_RATING &&
        this.ratingFrom != constants.USER_BLOOPRINT_RATING
      ) {
        let ratingResponse = await this.getBlooprintRating()
        this.hasError = ratingResponse['isError']
        let data = {
          from: this.ratingFrom,
          ...ratingResponse
        }
        if (!ratingResponse['isError']) {
          this.rating = ratingResponse['value']
        }
        this.$emit('fetch-rating', data)
      }
    },
    onRatingClick() {
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss" scoped></style>
