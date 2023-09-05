<template>
  <div class="list-margin">
    <div
      :class="isHomePage ? 'reveal fade-bottom' : ''"
      class="text-black f-w-600 q-mb-xs explore-screen-headings categ-heading"
    >
      More categories
    </div>
    <!-- *********** More Categories Loader **************************** -->
    <div v-if="isLoading">
      <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12" v-for="i in 4" :key="i">
          <q-skeleton type="QBadge" width="40%" />
          <div class="row">
            <div
              class="col-md-12 col-sm-12 col-xs-auto q-mt-md"
              v-for="j in 5"
              :key="j"
            >
              <q-skeleton class="gt-xs" type="QBadge" width="70%" />
              <q-skeleton class="lt-sm q-mr-sm" type="QBadge" width="100px" />
            </div>
          </div>
          <q-skeleton class="q-my-md" type="QBadge" />
        </div>
      </div>
    </div>
    <NoDataMessageDisplay v-if="categoriesList.length == 0 && !isLoading" />
    <div class="row" v-else>
      <div
        class="col-md-3 col-sm-6 col-xs-12 text-black category-text"
        v-for="category in categoriesList"
        :key="category.value"
      >
        <span
          class="word-break-break-word "
          :class="isHomePage ? 'reveal fade-right' : ''"
        >
          {{ category.label }}
        </span>
        <div class="subcategory-container row">
          <div
            v-for="subCategory in category.subCategories"
            :key="subCategory.value"
            class="col-md-12 col-sm-12 col-xs-auto wrapper-container"
          >
            <div
              @click="onClickSubCategory(category.label, subCategory.label)"
              class="wrapper cursor-pointer category-font text-regalBlue word-break-break-word "
              :class="isHomePage ? 'reveal fade-bottom' : ''"
            >
              {{ subCategory.label }}
            </div>
          </div>
          <div
            @click="onCategorySelect(category)"
            class="col-12 cursor-pointer view-all-text text-primary "
            :class="isHomePage ? 'reveal fade-bottom' : ''"
          >
            View all {{ ' ' + category.label }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="explore-btn"
      v-if="isRequestFromHomeScreen && categoriesList.length != 0"
    >
      <q-btn
        color="primary"
        label="Explore all categories"
        no-caps
        no-wrap
        :to="{ name: 'all-category', query: { category: 'all' } }"
        class="f-w-600 more-category-btn"
        :class="isHomePage ? 'reveal fade-bottom' : ''"
      >
        <div class="col q-py-xs text-left relative-position">
          <q-avatar class="arrow" style="margin-left: 15px" size="18px">
            <img src="~assets/chevron-right.svg" />
          </q-avatar>
        </div>
      </q-btn>
    </div>
  </div>
</template>
<script>
const CATEGORIES_SHOW_LIMIT = 4
const SUB_CATEGORIES_SHOW_LIMIT = 6
import { mapActions } from 'vuex'
import NoDataMessageDisplay from 'components/Desktop/NoDataMessageDisplay.vue'

export default {
  data() {
    return {
      categoriesList: [],
      isRequestFromHomeScreen: false,
      isHomePage: false,
      isLoading: true
    }
  },
  components: {
    NoDataMessageDisplay
  },
  mounted() {
    if (this.$route.fullPath == '/home' || this.$route.name == 'home') {
      this.isHomePage = true
    }
    if (this.$route.fullPath == '/explore') {
      this.isRequestFromHomeScreen = false
      this.updateBlooprintCategoryFilterTerm({})
    } else {
      this.isRequestFromHomeScreen = true
    }
    this.getAllCategories()
  },
  methods: {
    ...mapActions([
      'fetchCategorySubCategoryList',
      'updateBlooprintCategoryFilterTerm'
    ]),
    async getAllCategories() {
      this.isLoading = true
      let data = await this.fetchCategorySubCategoryList()
      this.isLoading = false
      this.categoriesList = data
        .filter(category => {
          return !category.parent
        })
        .splice(0, CATEGORIES_SHOW_LIMIT)

      for (let i = 0; i < this.categoriesList.length; i++) {
        this.categoriesList[i].subCategories = this.categoriesList[
          i
        ].subCategory.slice(1, SUB_CATEGORIES_SHOW_LIMIT)
      }
    },
    onCategorySelect(category) {
      this.updateBlooprintCategoryFilterTerm({
        category: category['label'],
        subcategory: ''
      })
      this.$router.push({
        name: 'explore-screen',
        query: {
          category: category['label']
        }
      })
    },
    onClickSubCategory(category, subcategory) {
      this.updateBlooprintCategoryFilterTerm({
        category: category,
        subcategory: subcategory
      })
      this.$router.push({
        name: 'explore-screen',
        query: {
          category,
          subcategory
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.categ-heading {
  margin-bottom: 40px;
  @media only screen and (max-width: $breakpoint-md-max) {
    margin-bottom: 40px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-bottom: 30px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-bottom: 30px;
  }
}
.more-category-btn {
  border-radius: 10px;
  height: 60px;
  width: 319px;
  font-size: 20px;
  line-height: 28px;
  padding-left: 20px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    height: 50px;
    width: 256px;
    font-size: 16px;
    line-height: 24px;
    padding-left: 15px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    height: 50px;
    width: 256px;
    font-size: 16px;
    line-height: 24px;
    padding-left: 15px;
  }
}
.category-text {
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-bottom: 30px;
  }
}
.category-font {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}
.subcategory-container {
  margin-top: 20px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 10px;
  }
  .wrapper {
    width: max-content;
    max-width: 14rem;
    padding: 4px 16px;
    background: #ccedff;
    border-radius: 7px;
    @media only screen and (max-width: $breakpoint-xs-max) {
      max-width: none;
    }
    &:hover {
      background: linear-gradient(
          0deg,
          rgba(0, 163, 255, 0.4),
          rgba(0, 163, 255, 0.4)
        ),
        #ffffff;
    }
  }
}
.wrapper-container {
  margin-bottom: 10px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-right: 10px;
  }
}
.view-all-text {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-top: 10px;
  text-decoration: underline;
}
.list-margin {
  padding-bottom: 120px;
  @media only screen and (max-width: $breakpoint-md-max) {
    padding-bottom: 120px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-bottom: 76px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-bottom: 76px;
  }
}
.explore-btn {
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: $breakpoint-md-max) {
    margin-top: 60px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 10px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 10px;
    align-items: left;
    justify-content: left;
  }
}
</style>
