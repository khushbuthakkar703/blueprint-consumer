<template>
  <q-layout>
    <Header />
    <q-page-container style="padding: 0 !important;">
      <div class="bg-solitudeBlue">
        <div class="heading text-regalBlue">
          404 Error. <span>Page not found.</span>
        </div>
        <div class="text-regalBlue responsive-subheading">
          You’re in the right place, but on page you’re looking for does not
          exist
        </div>
      </div>
      <div>
        <CategoriesSection requestFrom="error404" style="margin-bottom:100px" />
      </div>
    </q-page-container>
    <Footer
      :singleLineFooter="false"
      :mediumFooter="false"
      :fullFooter="true"
    />
  </q-layout>
</template>

<script>
import Header from 'components/Desktop/Header.vue'
import Footer from 'components/Desktop/Footer.vue'
import CategoriesSection from 'components/Desktop/CategoriesSection.vue'
export default {
  name: 'Error404',
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  components: { Header, CategoriesSection, Footer }
}
</script>

<style lang="scss" scoped>
.heading {
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  padding: 40px 52px 0px 52px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 30px 15px 0px 15px;
    font-size: 32px;
    margin-top: 0px;
    line-height: 36px;
    span {
      content: '\a';
      white-space: pre;
    }
  }
}

.responsive-subheading {
  font-weight: normal;
  width: 668px;
  padding: 20px 52px 40px 52px;

  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 20px 15px 30px 15px;
    font-size: 20px;
    width: 600px;
    line-height: 28px;
  }

  @media only screen and (max-width: $breakpoint-md-max) {
    padding: 20px 52px 40px 52px;
    font-size: 20px;
    line-height: 28px;
  }

  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 20px 15px 30px 15px;
    font-size: 20px;
    width: auto;
    line-height: 28px;
  }
}

.explore-screen-headings {
  font-weight: 600;
  padding: 60px 0px 40px 52px;

  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 30px 15px 0 15px;
  }
}

.more-categories {
  padding: 60px 52px 100px 52px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 40px 15px 100px 15px;
  }
}
</style>
