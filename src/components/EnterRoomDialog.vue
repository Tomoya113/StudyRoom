<template>
  <v-row justify="center">
    <!-- ボタン部分 -->
    <!-- ロックモードであるため、鍵のアイコン付きのボタンを表示する -->
    <v-btn rounded @click.stop="dialog = true" color="primary" class="enter-btn">
      <v-icon size="18">mdi-lock</v-icon>入室する
    </v-btn>

    <!-- ダイアログ部分 -->
    <!-- パスワード（合言葉）の入力を求めるダイアログ -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>この部屋に入るには、合言葉が必要です。</v-card-title>
        <v-card-text>
          この部屋に入るには、合言葉が必要です。
          <v-icon size="15">mdi-lock</v-icon>の表示がない場所は、合言葉なしで入室できます。
          <v-text-field v-model="password" label="合言葉を入力" :error-messages="this.errorMessage" autofocus required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">キャンセル</v-btn>
          <v-btn color="green darken-1" text @click="enter">入室する</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      dialog: false,
      password: '',
    }
  },
  props: {
    'roomId': {
      type: String,
      required: true
    },
  },
  methods: {
    enter () {
      console.log(this.password, this.roomId)
      this.enterRoom({ password: this.password, roomId: this.roomId });
    },
    ...mapActions(['enterRoom'])
  },
  computed: {
    ...mapGetters(['errorMessage'])
  }
}
</script>

<style scoped lang="sass">
.enter-btn
  margin-top: 4px
  margin-right: 8px
</style>