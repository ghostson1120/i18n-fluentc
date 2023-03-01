<template>
  <section id="download">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col sm="4" class="hidden-xs-only">
              <v-img src="@/assets/img/ill2.svg" class="d-block ml-auto mr-auto" max-width="350px" />
            </v-col>
            <v-col cols="12" sm="8" class="white--text text-left">
              <h1 class="font-weight-light display-2 mb-2">{{ $t('download') }}</h1>
              <h1 class="font-weight-light">
                {{ $t('plugin-description') }}
              </h1>
              <v-btn rounded outlined href="https://www.figma.com/community/plugin/1131290121606601469/FluentC-Translate" target="_blank" large color="white" class="mt-4 mr-2">
                Figma
              </v-btn>
              <v-btn rounded outlined href="https://adobe.com/go/cc_plugins_discover_plugin?pluginId=d9a03ca8&workflow=share" target="_blank" large color="white" class="mt-4 mr-2">
                Adobe XD
              </v-btn>
              <v-btn rounded outlined href="https://www.fluentc.io/sketch-plug-in/" target="_blank" large color="white" class="mt-4 mr-2">
                Sketch
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
#download {
  background-image: url("~@/assets/img/bgDownload.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 500px;
}

#download .container,
#download .row {
  height: 100%;
}
</style>