<template>
  <div class="container" :breakpoint="1022">
    <div class="text-section f-w-600">
      All categories
    </div>

    <div>
      <div class="row" v-if="isLoading">
        <div
          class="col-lg-3 col-sm-6 col-md-4 col-xs-12 category-box"
          v-for="i in 8"
          :key="i"
        >
          <q-skeleton width="95%" height="320px" style="border-radius:20px" />
          <q-skeleton class="q-my-sm" width="70%" />
        </div>
      </div>
      <div class="row wrap row-margin" v-show="!isLoading">
        <div
          class="col-lg-3 col-sm-6 col-md-4 col-xs-12 category-box"
          v-for="(category, index) in categories"
          :key="index"
          @click="onClickExplorePage(category.label)"
        >
          <div>
            <q-img :src="category.image" class="categoryImg" />
            <h5 class="categoryTitle">{{ category.label }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

const BLOOPRINT_SHOW_LIMIT = 12

export default {
  name: 'AllCategory',
  data() {
    return {
      isLoading: true,
      categories: [],
      pageNo: 0,
      totalBlooprintCount: 0,
      showSpinner: false,
      sortItemSelected: 'newest'
    }
  },
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  methods: {
    ...mapActions(['fetchAllCategoriesList']),
    onClickExplorePage(category) {
      this.$router.push({
        name: 'explore-screen',
        query: {
          category: category
        }
      })
    }
  },
  async mounted() {
    let params = {
      parent: true,
      sort: 'name'
    }
    let data = await this.fetchAllCategoriesList(params)
    this.categories = data
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
  }
}
</script>

<style scoped>
.container {
  margin: 0 53px;
}

.text-section {
  margin: 40px 0 30px;
  font-weight: 600;
  font-size: 32px;
  line-height: 36px;
  color: #152141;
  letter-spacing: 0.75px;
}

.categoryImg {
  height: 320px;
  width: 95%;
  border-radius: 20px;
}

.categoryTitle {
  margin: 15px 15px 15px 0;
  font-weight: 600;
  color: #152141;
  font-size: 24px;
  letter-spacing: 0.15px;
}

.row-margin {
  margin-bottom: 50px;
}

.category-box {
  margin-bottom: 30px;
  cursor: pointer;
}

.category-box:hover .categoryImg {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
}

.moreBtn {
  text-align: center;
  margin-bottom: 100px;
}

.moreBtn button {
  background: none;
  color: #1652f0;
  border: 2px solid #1652f0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  padding: 10px 25px;
  cursor: pointer;
  border-radius: 5px;
}

@media only screen and (max-width: 1024px) {
  .container {
    margin: 0 15px;
  }
}

@media only screen and (max-width: 599px) {
  .categoryImg {
    width: 100%;
    height: auto;
  }
}
</style>
