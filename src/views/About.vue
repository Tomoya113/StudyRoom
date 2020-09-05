<template>
  <v-content>
    <section id="hero">
      <v-row no-gutters>
        <v-theme-provider dark>
          <v-container fill-height>
            <v-row
              align="center"
              class="white--text mx-auto"
              justify="center"
              style="padding-bottom:50px;"
            >
              <v-col class="black--text text-center" cols="12" tag="h1">
                <div style="margin-top: 40px;">
                  <span class="font-weight-black display-3" style="margin:30px;">Study Roomの使い方</span>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-theme-provider>
      </v-row>
    </section>

    <section id="features" class="grey lighten-3">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">カレンダーについて</h2>
        <v-row>
          <v-col v-for="({ text }, i) in features" :key="i">
            <v-card-title class="justify-center font-weight-black text-uppercase" v-text="title"></v-card-title>
            <p>まずはこのカレンダー機能について、マスターしていきましょう！</p>
            <p>カレンダーは、右上にある自分のアイコンを押すと表示されます。今日の日付には青い円がついています。自習室の滞在時間に応じて、日付のマスの色が変化します。また、色のついている場所にカーソルを当てると勉強時間(自習室の入室時間)が表示されます。</p>
            <p>このカレンダーはみなさんの勉強時間を管理することが可能です！</p>
            <p>毎日勉強して、カレンダーに色をたくさんつけましょう！</p>
            <img height="200vh" v-bind:src="imgPath" />

            <v-card-text class="subtitle-1" v-text="text" style="text-align:left;"></v-card-text>
          </v-col>
        </v-row>
      </v-container>

      <div class="py-12"></div>
    </section>

    <section id="features" class="grey lighten-5">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">ルームについて</h2>

        <v-responsive class="mx-auto mb-12" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-row>
          <v-col v-for="({ text }, i) in features" :key="i">
            <v-theme-provider dark></v-theme-provider>
            <v-card-title class="justify-center font-weight-black text-uppercase" v-text="title"></v-card-title>
            <p>Study Roomの自習室は6つあります。自分の目標にあったルームに参加してみてください！また、自習室は入室人数が一目でわかります。</p>
            <p>自習室には鍵をかけることが可能です。合言葉を設定から必要に応じてやってみましょう。</p>
            <p>カメラがついていますが、音声はありません。雑談をしない環境で勉強に集中して取り組むことができます。</p>
            <p>チャット機能がついているので質問したいことがあれば聞いてみましょう。</p>
            <img height="200vh" v-bind:src="imgPath2" />
            <img height="200vh" v-bind:src="imgPath3" />
            <v-card-text class="subtitle-1" v-text="text" style="text-align:left;"></v-card-text>
          </v-col>
        </v-row>
      </v-container>

      <div class="py-12"></div>
    </section>
    <section id="features" class="grey lighten-3">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">オススメの活用法</h2>

        <v-responsive class="mx-auto mb-12" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-row>
          <v-col v-for="({ text }, i) in features" :key="i">
            <v-theme-provider dark></v-theme-provider>
            <p>ここで少しおすすめの活用法を紹介します。</p>
            <p>やらなきゃいけない勉強のやる気が垂れてきた…。人に見られている状態で勉強したり、人が勉強をしている姿を見ると刺激になります！</p>
            <p>友達と勉強したい人は部屋に合言葉を設定するのがおすすめです。合言葉を知っている人しか入室できない状態になります。友達ともくもく勉強しよう！</p>
            <p>ビデオ通話は常にミュート状態なので好きな音楽を大音量で流すのもいいかもしれません。</p>
            <p>各自習室にはチャット機能があります。わからないことを自習室のメンバーに聞いてみてはどうでしょう？</p>

            <v-card-title class="justify-center font-weight-black text-uppercase" v-text="title"></v-card-title>

            <v-card-text class="subtitle-1" v-text="text" style="text-align:left;"></v-card-text>
          </v-col>
        </v-row>
      </v-container>

      <div class="py-12"></div>
    </section>
  </v-content>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";
export default {
  data () {
    return {
      imgPath: require("@/assets/calender.png"),
      imgPath2: require("@/assets/chat.png"),
      imgPath3: require("@/assets/word.png"),
      features: [
        {
          icon: "mdi-calendar-text",
          text: "",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["login"]),
  },
};
</script>
<style lang="sass">
body
  margin: 0px
img
  margin-top: 15px
</style>
