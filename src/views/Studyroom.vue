<template>
  <div>
    <h2>This is Studyroom Page</h2>
    <div class="screen">
      <video v-show="$store.state.studyroom.isConnected" width="200px" @loadeddata="onLoadedData" :srcObject.prop="$store.state.studyroom.srcObject" playsInline muted></video>
      <video width="200px" v-for="screen in $store.state.studyroom.screens" :key="screen.id" @loadeddata="onLoadedData" :srcObject.prop="screen" plyasInline muted></video>
    </div>
    <v-btn v-if="$store.state.studyroom.isConnected" @click="changeRoomoutDialog" rounded color="secondary">Leave the room</v-btn>
    <v-btn v-else @click="join" rounded color="primary">Join the room</v-btn>
    <p class="font-weight-medium">{{ $store.state.studyroom.logMessage }}</p>

    <!-- 合言葉（パスワード）を変更を設定するダイアログ -->
    <v-dialog v-model="$store.state.studyroom.lockDialog" max-width="500px">
      <v-card>
        <v-card-title>合言葉を設定</v-card-title>
        <v-card-text>
          合言葉を設定すると、合言葉を知っている人のみ入室可能となります。
          <v-switch v-model="lockSwitch" label="合言葉を設定する"></v-switch>
          <!-- CHECK: 合言葉入力をrequiredにしてるけど、ロックをしない場合にエラーが起きないか -->
          <v-text-field v-if="lockSwitch" label="合言葉" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click.stop="changeLockDialog">キャンセル</v-btn>
          <v-btn color="green darken-1" text @click.stop="changeLockDialog">決定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 名前を変更を設定するダイアログ -->
    <v-dialog v-model="$store.state.studyroom.nameDialog" max-width="500px">
      <v-card>
        <v-card-title>表示名を変更</v-card-title>
        <v-card-text>
          チャットやビデオ画面に表示される表示名を変更することができます。
          <v-text-field label="表示名" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click.stop="changeNameDialog">キャンセル</v-btn>
          <v-btn color="green darken-1" text @click.stop="changeNameDialog">決定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 部屋から退出するか確認のダイアログ -->
    <v-dialog v-model="$store.state.studyroom.roomoutDialog" max-width="500px">
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
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      //ダイアログ制御用（合言葉）
      lockSwitch: false,
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
    join() {
      this.joinRoom({ roomId: this.$route.params.studyroom_id });
    },
    // ルームを退出する時の処理
    leave() {
      this.room.close();
      const tracks = this.srcObject.getTracks();
      console.log(tracks);
      tracks.forEach(track => {
        track.stop();
      });
    },
    ...mapActions(['setup', 'joinRoom', 'changeNameDialog', 'changeLockDialog', 'changeRoomoutDialog', 'roomout']),
  },
};
</script>

<style scoped lang="sass">
.screen
  display: flex
</style>
