<template>
  <q-footer
    class="bg-regalBlue text-white"
    :class="{
      'single-footer-padding': singleLineFooter,
      'medium-footer-padding': mediumFooter,
      'full-footer-padding': fullFooter
    }"
    style="z-index: 1; position: static ;"
  >
    <div>
      <div class="row" v-if="fullFooter || mediumFooter">
        <div
          :class="{
            'col-md-6 col-sm-6 col-xs-12': mediumFooter,
            'col-md-3 col-sm-12 col-xs-12': fullFooter
          }"
        >
          <span
            v-if="mediumFooter"
            class="f-w-600 auth-learn-font text-letter-space"
          >
            Beyond Courses!
          </span>
          <span v-if="fullFooter" class="learn-font f-w-600">
            Beyond<br class="gt-sm" />
            Courses!
          </span>
          <div
            v-if="fullFooter"
            class="icon-style remove-underline cursor-pointer"
          >
            <a href="https://www.facebook.com/blooprintedapp/" target="_blank">
              <q-avatar square size="sm" class="q-mr-md">
                <img src="~assets/facebook.svg" /> </q-avatar
            ></a>
            <a href="https://www.instagram.com/blooprintedapp/" target="_blank">
              <q-avatar square size="sm">
                <img src="~assets/instagram.svg" />
              </q-avatar>
            </a>
            <a href="https://twitter.com/blooprintedapp" target="_blank">
              <q-avatar square size="sm" class="q-mx-md">
                <img src="~assets/twitter.svg" />
              </q-avatar>
            </a>
            <a
              href="https://www.linkedin.com/company/blooprinted/mycompany/"
              target="_blank"
            >
              <q-avatar square size="sm">
                <img src="~assets/linkedin.svg" />
              </q-avatar>
            </a>
          </div>
        </div>
        <div
          v-if="mediumFooter"
          class="
            col-md-6 col-sm-6 col-xs-12
            q-mt-sm
            text-body2 text-right text-display-align
            q-pt-md-none q-pt-sm-none q-pt-xs-md
            remove-underline
            cursor-pointer
          "
        >
          <a href="https://www.facebook.com/blooprintedapp/" target="_blank">
            <q-avatar square size="sm" class="q-mr-md">
              <img src="~assets/facebook.svg" /> </q-avatar
          ></a>
          <a href="https://www.instagram.com/blooprintedapp/" target="_blank">
            <q-avatar square size="sm">
              <img src="~assets/instagram.svg" />
            </q-avatar>
          </a>
          <a href="https://twitter.com/blooprintedapp" target="_blank">
            <q-avatar square size="sm" class="q-mx-md">
              <img src="~assets/twitter.svg" />
            </q-avatar>
          </a>
          <a
            href="https://www.linkedin.com/company/blooprinted/mycompany/"
            target="_blank"
          >
            <q-avatar square size="sm">
              <img src="~assets/linkedin.svg" />
            </q-avatar>
          </a>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-6" v-if="fullFooter">
          <div
            v-for="menu in menuOptions"
            :key="menu.label"
            class="text-body1 f-w-500 q-mb-md"
          >
            <span class="menu-text cursor-pointer" @click="onMenuSelect(menu)">
              {{ menu.label }}
            </span>
          </div>
          <div class="text-body1 f-w-500 q-mb-md">
            <a
              href="https://inside.blooprinted.com/"
              class="text-white blog-link"
              target="_blank"
            >
              Blog
            </a>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-6" v-if="fullFooter">
          <div
            v-for="category in categoryOptions"
            :key="category.label"
            class="text-body1 f-w-500 q-mb-md word-break-break-word"
          >
            <span
              @click="onCategorySelect(category)"
              class="menu-text cursor-pointer"
            >
              {{ category.label }}
            </span>
          </div>
          <div class="text-body1 f-w-500 q-mb-md">
            <span
              @click="onCategorySelect({})"
              class="menu-text cursor-pointer"
            >
              All Categories
            </span>
          </div>
        </div>
        <div
          class="col-md-3 col-sm-12 col-xs-12 margin-t-60 text-body1 f-w-600"
          v-if="fullFooter"
        >
          <div>Share your knowledge with 1000s of blooprinted members.</div>
          <q-btn
            color="primary"
            label="Become a Creator"
            no-caps
            no-wrap
            @click="navigateToStudioScreen"
            class="text-body1 f-w-600 q-mt-lg creator-btn"
          >
            <div class="col q-pb-xs text-left relative-position">
              <q-avatar class="arrow" style="margin-left: 15px" size="18px">
                <img src="~assets/chevron-right.svg" />
              </q-avatar>
            </div>
          </q-btn>
        </div>
      </div>
      <q-separator
        v-if="fullFooter || mediumFooter"
        color="primary"
        style="height: 2px"
        :class="{
          'auth-line-margin': mediumFooter,
          'line-margin': fullFooter
        }"
      />
      <div class="row">
        <div class="col-md-6 col-sm-6 col-xs-12 text-body2 f-w-500 text-left">
          &#169; {{ currentYear }} blooprinted. All rights reserved
        </div>
        <div
          class="
            col-md-6 col-sm-6 col-xs-12
            text-body2 text-display-align
            f-w-500
            q-mt-md-none q-mt-sm-none q-mt-xs-lg
            remove-underline
            cursor-pointer
          "
        >
          <span @click="onClickTerms"> Terms of Use </span>
          <span @click="onClickPrivacy" class="q-ml-lg q-pl-md">
            Privacy Policy
          </span>
        </div>
      </div>
    </div>
  </q-footer>
</template>
<script>
import { isMobileApp, openStudioScreen } from '../../utils/common'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      currentYear: this.getCurrentYear(),
      termsAndConditionsPopup: false,
      privacyPolicyPopup: false,
      menuOptions: [
        { label: 'Home', value: 'Home', routeLink: 'home' },
        {
          label: 'Explore blooprints',
          value: 'Explore blooprints',
          routeLink: 'explore-screen'
        },
        { label: 'FAQs', value: 'FAQs', routeLink: 'faqs' },
        {
          label: 'Contact',
          value: 'Contact'
        }
      ],
      categoryOptions: []
    }
  },
  props: ['singleLineFooter', 'mediumFooter', 'fullFooter'],
  mounted() {
    this.getAllCategories()
  },
  methods: {
    ...mapActions([
      'fetchAllCategoriesList',
      'updateBlooprintCategoryFilterTerm',
      'updateBlooprintFilterTerm',
      'updateBlooprintSortOption'
    ]),
    clickHubspotChat() {
      window.HubSpotConversations.widget.open()
    },
    async getAllCategories() {
      let data = await this.fetchAllCategoriesList({
        parent: true,
        sort: 'name'
      })
      this.categoryOptions = data.slice(0, 5)
    },
    getCurrentYear() {
      return new Date().getFullYear()
    },
    onClickTerms() {
      if (isMobileApp()) {
        this.termsAndConditionsPopup = true
      } else {
        this.$router.push({ name: 'terms-and-conditions' }, () => {})
      }
    },
    onClickPrivacy() {
      if (isMobileApp()) {
        this.privacyPolicyPopup = true
      } else {
        this.$router.push({ name: 'privacy-policy' }, () => {})
      }
    },
    onMenuSelect(menu) {
      if (menu['routeLink']) {
        this.updateBlooprintFilterTerm('')
        this.updateBlooprintSortOption('')
        this.updateBlooprintCategoryFilterTerm({})
        this.$router.push({ name: menu['routeLink'] }, () => {})
      }
      if (menu.label == 'Contact') {
        this.clickHubspotChat()
      }
    },
    navigateToStudioScreen() {
      openStudioScreen()
    },
    onCategorySelect(category) {
      this.updateBlooprintFilterTerm('')
      this.updateBlooprintSortOption('')
      this.updateBlooprintCategoryFilterTerm({
        category: category && category['label'] ? category['label'] : '',
        subcategory: ''
      })
      let query = {}
      if (category['label']) {
        query = {
          category: category['label']
        }
      } else {
        query = { category: 'all' }
      }
      if (query['category'] == 'all') {
        this.$router.push(
          {
            name: 'all-category',
            query: { category: 'all' }
          },
          () => {}
        )
      } else {
        this.$router.push(
          {
            name: 'explore-screen',
            query: query
          },
          () => {}
        )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-text:hover {
  text-decoration: underline;
}
.single-footer-padding {
  padding: 40px 52px 40px 52px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 40px 15px 37px 15px;
  }
}
.medium-footer-padding {
  padding: 30px 52px 40px 52px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 40px 15px 39px 15px;
  }
}
.full-footer-padding {
  padding: 60px 52px 40px 52px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 60px 15px 47px 15px;
  }
}
.auth-learn-font {
  font-size: 32px;
  line-height: 36px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 24px;
    line-height: 28px;
  }
}
.learn-font {
  font-size: 48px;
  line-height: 56px;
  @media only screen and (max-width: 1150px) {
    font-size: 32px;
    line-height: 36px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 32px;
    line-height: 36px;
  }
}
.margin-t-60 {
  margin-top: 0px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 40px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 60px;
  }
}
.auth-line-margin {
  margin-top: 30px;
  margin-bottom: 30px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 40px;
    margin-bottom: 32px;
  }
}
.line-margin {
  margin-top: 60px;
  margin-bottom: 30px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 40px;
    margin-bottom: 40px;
  }
}
.icon-style {
  margin-top: 32px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 24px;
    margin-bottom: 42px;
  }
}
::v-deep {
  .creator-btn {
    border-radius: 10px;
    .q-btn__wrapper {
      padding: 10px 20px 10px 30px !important;
    }
  }
}
.text-display-align {
  text-align: right;
  @media only screen and (max-width: $breakpoint-sm-max) {
    text-align: right;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    text-align: left;
  }
}

.blog-link {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
