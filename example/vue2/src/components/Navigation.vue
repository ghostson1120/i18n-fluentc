<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      dark
      src="https://i.postimg.cc/qRpcDpMH/bgDrawer.jpg"
    >
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img src="@/assets/img/logo.png" alt="Logo" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">FluentC</v-list-item-title>
            <v-list-item-subtitle>i18n</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense>
        <v-list-item
          v-for="([icon, text, link], i) in items"
          :key="i"
          link
          @click="$vuetify.goTo(link)"
        >
          <v-list-item-icon class="justify-center">
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">{{
              text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      :color="color"
      :flat="flat"
      dark
      class="px-15"
      :class="{ expand: flat }"
    >
      <v-toolbar-title>
        <v-img src="@/assets/img/logo.png" max-width="50px" />
      </v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="mr-4"
        v-if="isXs"
      />
      <div v-else class="v-nav">
        <v-btn text @click="$vuetify.goTo('#hero')">
          <span class="mr-2">{{$t('home')}}</span>
        </v-btn>
        <v-btn text @click="$vuetify.goTo('#features')">
          <span class="mr-2">{{$t('about')}}</span>
        </v-btn>
        <v-btn text @click="$vuetify.goTo('#download')">
          <span class="mr-2">{{$t('download')}}</span>
        </v-btn>
        <v-btn rounded outlined text @click="$vuetify.goTo('#contact')">
          <span class="mr-2">{{$t('contact-us')}}</span>
        </v-btn>        
        <select class="lang-switcher ml-2" @change="switchLanguage" :value="lang">
          <option v-for="lang in languages" :key="lang.code" :value="lang.code">{{ lang.localLabel || lang.label }}</option>
        </select>
      </div>
    </v-app-bar>
  </div>
</template>

<style scoped>
.v-nav {
  display: flex;
  align-items: center;
}
.lang-switcher {
  color: inherit;
  border:none;
  outline: none;
  width: 100px;
}
.lang-switcher option {
  color: black;
}
.v-toolbar {
  transition: 0.6s;
}

.expand {
  height: 80px !important;
  padding-top: 10px;
}
</style>

<script>
export default {
  data: () => ({
    drawer: null,
    isXs: false,
    languages: [
      { code: 'en', label: 'English', localLabel: 'English' },
    ]
  }),
  props: {
    color: String,
    flat: Boolean,
  },
  computed: {
    items () {
      return [
        ["mdi-home-outline", this.$t("home"), "#hero"],
        ["mdi-information-outline", this.$t("about"), "#features"],
        ["mdi-download-box-outline", this.$t("download"), "#download"],
        ["mdi-email-outline", this.$t("contact-us"), "#contact"],
      ]
    },
    lang () {
      return this.$i18next.language;
    }
  },
  methods: {
    onResize() {
      this.isXs = window.innerWidth < 850;
    },
    switchLanguage(evt) {
      this.$i18next.changeLanguage(evt.target.value);
    }
  },

  watch: {
    isXs(value) {
      if (!value) {
        if (this.drawer) {
          this.drawer = false;
        }
      }
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });

    const getLanguages = async () => {
      const langs = await this.$i18next.services.backendConnector.backend.getLanguages();
      if (langs && langs.length) {
        this.languages = langs;
      }
    }

    getLanguages();
  },
};
</script>
