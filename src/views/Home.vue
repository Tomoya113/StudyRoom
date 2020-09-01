<template>
  <div class="home">
    <v-row style="height: 100%;" justify="center" align-content="center">
      <v-col>
        <h1>
          タスク管理付きの
          <br />オンライン自習室で集中した環境を！
        </h1>
        <h3>会員登録は、不要です！自分のGoogleアカウントを使用してサービスを利用することができます。</h3>
        <v-btn
          style="text-align:center; margin:auto; display: flex; align-items: center; justify-content: center"
          color="info"
          @click="login"
          v-if="$store.state.auth.login_user==null"
        >Googleアカウントでログイン</v-btn>
        <div style="margin-bottom: 150px;"></div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex'
export default {
  created () {

  },
  methods: {
    ...mapActions(['login']),
  },
}
</script>

<style lang="sass">
.home
  height: 100%
h1
  font-size: 48px
  text-align: center
h3
  text-align: center
  padding-bottom: 30px
</style>