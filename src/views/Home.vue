<template>
  <v-content>
    <section id="hero">
      <v-row no-gutters>
        <v-img
          height="100vh"
          src="https://images.unsplash.com/photo-1581447109200-bf2769116351?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        >
          <v-theme-provider dark>
            <v-container fill-height>
              <v-row
                align="center"
                class="white--text mx-auto"
                justify="center"
                style="padding-bottom:50px;"
              >
                <v-col class="white--text text-center" cols="12" tag="h1">
                  <span class="font-weight-light display-1">WELCOME TO</span>
                  <br />
                  <span class="font-weight-black display-3" style="margin:30px;">Study Room</span>
                </v-col>
                <v-btn
                  tile
                  style="text-align:center; display: flex; align-items: center; justify-content: center"
                  color="info"
                  @click="login"
                  v-if="$store.state.auth.login_user==null"
                >Googleアカウントでログイン</v-btn>
              </v-row>
            </v-container>
          </v-theme-provider>
        </v-img>
      </v-row>
    </section>

    <section id="features" class="grey lighten-3">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">Study Roomの特徴</h2>

        <v-responsive class="mx-auto mb-12" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-row>
          <v-col v-for="({ icon, title, text }, i) in features" :key="i" cols="12" md="4">
            <v-card class="py-12 px-4" color="grey lighten-5" flat>
              <v-theme-provider dark>
                <div>
                  <v-avatar color="orange darken-2" size="88">
                    <v-icon large v-text="icon"></v-icon>
                  </v-avatar>
                </div>
              </v-theme-provider>

              <v-card-title class="justify-center font-weight-black text-uppercase" v-text="title"></v-card-title>

              <v-card-text class="subtitle-1" v-text="text" style="text-align:left;"></v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <div class="py-12"></div>
    </section>
  </v-content>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      features: [{
        icon: 'mdi-volume-off',
        title: '常に静かな環境',
        text: 'ビデオ通話は、常にミュート状態です。そのため、常に静かな状態を保つことができます。チャット機能を備えているので、わからないことはすぐに聞くことができます',
      },
      {
        icon: 'mdi-calendar-text',
        title: '時間の可視化',
        text: '自習室に入っていた正確な時間を記録しています。それをカレンダー上に視覚的に表示します。そのため、何日にどれくらい勉強していたかが視覚的に一目でわかります',
      },
      {
        icon: 'mdi-layers-outline',
        title: 'シンプルなデザイン',
        text: '毎日使うものだから、シンプルに仕上げました。                                                            　　　　　　　　　　　　　　　　　　　　　　　　　',
      },
      ],
    }
  },
  methods: {
    ...mapActions(['login']),
  },
}
</script>

<style lang="sass">
body
  margin: 0px
</style>