<template>
  <div>
    <h2>This is Studyroom Page</h2>
    <div class="screen">
      <video v-show="this.isConnected" width="200px" @loadeddata="onLoadedData" :srcObject.prop="this.srcObject" playsInline muted></video>
      <video width="200px" v-for="screen in this.screens" :key="screen.id" @loadeddata="onLoadedData" :srcObject.prop="screen" plyasInline muted></video>
    </div>
    <v-btn v-if="this.isConnected" @click="changeRoomoutDialog" rounded color="secondary">Leave the room</v-btn>
    <!-- NOTEが取得されるまで押せなくしたほうがいいかも -->
    <v-btn v-else @click="confirm" rounded color="primary">Join the room</v-btn>
    <v-btn @click="changeLockDialog" rounded color="secondary">合言葉を設定</v-btn>
    <p class="font-weight-medium">{{ this.logMessage }}</p>

    <div v-show="this.isConnected">
      <h2>チャットログ</h2>
      <div v-for="message in this.messages" :key="message.body">
        <h4>{{ message.name }}</h4>
        <p>{{ message.body }}</p>
      </div>
      <div>
        <textarea v-model="message" name="message" id="" cols="30" rows="10"></textarea>
        <button @click="submit">メッセージを送信</button>
      </div>
    </div>

    <!-- 合言葉（パスワード）を変更を設定するダイアログ -->
    <v-dialog v-model="this.lockDialog" max-width="500px">
      <v-card>
        <v-card-title>合言葉を設定</v-card-title>
        <v-card-text>
          合言葉を設定すると、合言葉を知っている人のみ入室可能となります。
          <v-switch v-model="lockSwitch" label="合言葉を設定する"></v-switch>
          <!-- CHECK: 合言葉入力をrequiredにしてるけど、ロックをしない場合にエラーが起きないか -->
          <v-text-field v-model="password" v-if="lockSwitch" label="合言葉" autofocus :disabled="!lockSwitch"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click.stop="changeLockDialog">キャンセル</v-btn>
          <v-btn color="green darken-1" text @click.stop="makePrivate">決定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 名前を変更を設定するダイアログ -->
    <v-dialog v-model="this.nameDialog" max-width="500px">
      <v-card>
        <v-card-title>表示名を変更</v-card-title>
        <v-card-text>
          チャットやビデオ画面に表示される表示名を変更することができます。
          <v-text-field label="表示名" v-model="displayName" required autofocus></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click.stop="changeNameDialog">キャンセル</v-btn>
          <v-btn color="green darken-1" text @click.stop="join">決定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 部屋から退出するか確認のダイアログ -->
    <v-dialog v-model="this.roomoutDialog" max-width="500px">
      <v-card>
        <v-card-title>本当に退出しますか？</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click.stop="changeRoomoutDialog">キャンセル</v-btn>
          <v-btn color="green darken-1" text @click.stop="roomout">決定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      //ダイアログ制御用（合言葉）
      lockSwitch: false,
      message: "",
      displayName: "",
      password: "",
    };
  },
  async created() {
    await this.setup();
  },
  methods: {
    // カメラのロードが終わった時
    onLoadedData(event) {
      event.target.play().catch(console.error);
    },
    confirm() {
      this.displayName = this.userName;
      this.changeNameDialog();
    },
    join() {
      this.changeNameDialog();
      this.joinRoom({ roomId: this.$route.params.studyroom_id, displayName: this.displayName })
    },
    submit() {
      if (this.message) {
        this.sendMessage({ message: { name: this.displayName , body: this.message } })
        this.message = ""
      }
    },
    makePrivate() {
      this.changeLockDialog();
      this.setPassword({ password: this.password });
    },
    // ルームを退出する時の処理
    leave() {
      this.roomout()
    },
    ...mapActions(['setup', 'joinRoom', 'sendMessage', 'setPassword', 'changeNameDialog', 'changeLockDialog', 'changeRoomoutDialog', 'roomout']),
  },
  computed: {
    ...mapGetters(['userName', 'isConnected', 'srcObject', 'screens', 'logMessage', 'messages', 'lockDialog', 'nameDialog', 'roomoutDialog'])
  }
};
</script>

<style scoped lang="sass">
// 後で消すやつ
.screen
  display: flex
textarea
  border: solid 1px black
</style>
