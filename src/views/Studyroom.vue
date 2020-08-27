<template>
  <div>
    <h2>This is Studyroom Page</h2>
    <div class="screen">
      <video v-show="isConnected" width="200px" @loadeddata="onLoadedData" :srcObject.prop="srcObject" playsInline muted></video>
      <video width="200px" v-for="screen in screens" :key="screen.id" @loadeddata="onLoadedData" :srcObject.prop="screen" plyasInline muted></video>
    </div>
    <v-btn v-if="isConnected" @click="leave" rounded color="secondary">Leave the room</v-btn>
    <v-btn v-else @click="join" rounded color="primary">Join the room</v-btn>
    <p class="font-weight-medium">{{ logMessage }}</p>

    <!-- 合言葉を設定するダイアログを追加 -->
    <v-dialog v-model="$store.state.studyroom.lockD" max-width="500px">
      <v-card>
        <v-card-title><v-icon size="15">mdi-lock</v-icon>合言葉を設定する</v-card-title>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Peer from 'skyway-js';
import { APIKEY } from '@/apiKey.js';

export default {
  data() {
    return {
      peer: null,
      srcObject: null,
      roomId: null,
      localStream: null,
      logMessage: null,
      screens: [],
      isConnected: false,
      room: null,
    };
  },
  async created() {
    // カメラの許可取得
    this.localStream = await navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .catch(console.error);

    // カメラのデータを変数に格納
    this.srcObject = this.localStream;

    // SkyWayAPIで使うクラスの初期化
    this.peer = await new Peer({
      key: APIKEY,
      debug: 1,
    });

    this.peer.on('error', console.error);
  },
  methods: {
    // カメラのロードが終わった時
    onLoadedData(event) {
      event.target.play().catch(console.error);
    },
    join() {
      // ロードが終わってなかったらreturn
      if (!this.peer.open) {
        return;
      }

      this.isConnected = true;

      // roomに入出
      this.room = this.peer.joinRoom(`studyRoom-${this.$route.params.studyroom_id}`, {
        mode: 'sfu',
        stream: this.localStream,
      });

      // roomに入った時
      this.room.once('open', () => {
        this.logMessage = 'You joined this room. \n';
      });

      // 他のユーザーが入ってきた時
      this.room.on('peerJoin', peerId => {
        this.logMessage = this.logMessage + `${peerId} joined \n`;
      });

      // 他の人のビデオ情報を取得した時
      this.room.on('stream', async stream => {
        console.log(this.srcObject, { stream });
        await this.screens.push(stream);
      });

      // 他の人からデータが送信されてきた時
      this.room.on('data', ({ data, src }) => {
        console.log({ data }, { src });
      });

      // 自分以外のメンバーが退出した時の処理
      this.room.on('peerLeave', peerId => {
        console.log({ peerId });
        const result = this.screens.findIndex(screen => screen.peerId);
        console.log({ result });
        this.screens.splice(result, 1);
      });

      // 自分が退出する時
      this.room.once('close', () => {
        this.$router.push('/studyrooms');
      });
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
  },
};
</script>
<style scoped lang="sass">
.screen
  display: flex
</style>
