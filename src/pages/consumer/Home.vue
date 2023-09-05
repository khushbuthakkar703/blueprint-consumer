<template>
  <q-page>
    <div>
      <HomePageBanner />
    </div>
    <div>
      <AmazingThingSection />
    </div>
    <div>
      <AmazingThingImageSection />
    </div>
    <div>
      <PopularBlooprintsSection />
    </div>
    <div>
      <ChooseBlooprintedSection />
    </div>
    <div>
      <TestiMonialSection />
    </div>
    <div>
      <TrustedBySection />
    </div>
    <div>
      <CategoriesSection />
    </div>
    <div>
      <PopularCreatorsSection />
    </div>
    <div>
      <FAQSection />
    </div>
  </q-page>
</template>

<script>
import HomePageBanner from 'src/components/Desktop/HomePageBanner.vue'
import CategoriesSection from 'src/components/Desktop/CategoriesSection.vue'
import AmazingThingSection from 'src/components/Desktop/AmazingThingSection.vue'
import PopularCreatorsSection from 'src/components/Desktop/PopularCreatorsSection.vue'
import AmazingThingImageSection from 'src/components/Desktop/AmazingThingImageSection.vue'
import PopularBlooprintsSection from 'src/components/Desktop/PopularBlooprintsSection.vue'
import ChooseBlooprintedSection from 'src/components/Desktop/ChooseBlooprintedSection.vue'
import TestiMonialSection from 'src/components/Desktop/TestiMonialSection.vue'
import TrustedBySection from 'src/components/Desktop/TrustedBySection.vue'
import FAQSection from 'src/components/Desktop/FAQSection.vue'

import image from '../../assets/HomePageBanner.png'
export default {
  meta() {
    return {
      title: this.metaTitle,
      meta: {
        ogImage: {
          property: 'og:image',
          content: image
        },
        ogTitle: {
          property: 'og:title',
          content: this.metaTitle
        },
        ogUrl: {
          property: 'og:url',
          content: this.metaUrl
        },

        twitterCard: {
          name: 'twitter:card',
          content: 'summary'
        },
        twitterSite: {
          name: 'twitter:site',
          content: 'summary'
        },
        twitterImage: {
          name: 'twitter:image',
          content: image
        },
        twitterTitle: {
          name: 'twitter:title',
          content: this.metaTitle
        }
      }
    }
  },
  computed: {
    metaTitle() {
      return `Your audience is begging to follow in your footsteps. blooprinted makes it easy to show them how it's done—beyond just an online course! - blooprinted`
    },
    metaUrl() {
      return window.location
    },
    metaImage() {
      return `~/assets/HomePageBanner.png`
    }
  },
  mounted() {
    //Adding event for animation purpose
    window.addEventListener('scroll', this.reveal)
  },
  components: {
    HomePageBanner,
    AmazingThingSection,
    TestiMonialSection,
    TrustedBySection,
    CategoriesSection,
    FAQSection,
    PopularCreatorsSection,
    PopularBlooprintsSection,
    ChooseBlooprintedSection,
    AmazingThingImageSection
  },
  methods: {
    reveal() {
      var reveals = document.querySelectorAll('.reveal')
      for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight
        var elementTop = reveals[i].getBoundingClientRect().top
        var elementVisible = 150
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
