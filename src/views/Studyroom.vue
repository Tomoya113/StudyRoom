<template>
  <div style="width:100%; height: 100%;">
    <v-row v-if="!this.isConnected" no-gutters>
      <v-col cols="12">
        <v-row
          class="flex-column"
          no-gutters
          align="center"
          justify="center"
          style="height: 500px;"
        >
          <h2>This is Studyroom Page</h2>
          <div>
            <!-- NOTE ユーザー情報が取得されるまで押せなくしたほうがいいかも -->
            <v-btn href="/studyrooms" v-if="!this.isConnected" rounded color="primary">Leave the room</v-btn>
            <v-btn v-if="!this.isConnected" @click="confirm" rounded color="warning">Join the room</v-btn>
            <div class="lock-button">
              <v-btn @click="changeLockDialog" rounded color="secondary">合言葉を設定</v-btn>
            </div>
          </div>
        </v-row>
      </v-col>
    </v-row>

    <!-- <p class="font-weight-medium">{{ this.logMessage }}</p> -->
    <v-row v-else class="d-flex" style="height: 100%;">
      <v-col class="d-flex flex-column" cols="9">
        <div>
          <video
            width="400px"
            height="400px"
            style="object-fit: cover;"
            v-show="this.isConnected"
            @loadeddata="onLoadedData"
            :srcObject.prop="this.srcObject"
            playsinline
            muted
          ></video>
          <video
            width="400px"
            height="400px"
            style="object-fit: cover;"
            v-for="screen in this.screens"
            :key="screen.id"
            @loadeddata="onLoadedData"
            :srcObject.prop="screen"
            plyasInline
            muted
          ></video>
        </div>
        <div class="d-flex justify-end leave">
          <v-btn @click="changeRoomoutDialog" rounded color="error">Leave the room</v-btn>
        </div>
      </v-col>
      <v-col class="d-flex flex-column chat bms_messages" cols="3">
        <h2>{{ this.$store.state.studyroom.title }}</h2>
        <h4>部屋の目標を設定</h4>
        <p>現在の目標: {{ this.subtitle }}</p>
        <v-text-field
          v-model="subtitleField"
          append-outer-icon="mdi-send"
          solo
          label="部屋の目標を設定"
          type="text"
          :value="this.subtitle"
          @click:append-outer="submitSubtitle"
        ></v-text-field>
        <h2>チャット</h2>
        <div class="line-bc">
          <div
            v-for="message in this.messages"
            :key="message.body"
            :class="userId != message.id? 'balloon6':'mycomment'"
          >
            <div v-if="userId != message.id">
              <v-avatar size="36px" class="faceicon">
                <img alt="Avatar" :src="photoURL" />
              </v-avatar>
              <div class="chatting">
                <div class="says">
                  <small>{{ message.name }}</small>
                  <p>{{ message.body }}</p>
                </div>
              </div>
            </div>

            <div v-else>
              <p>{{ message.body }}</p>
            </div>
          </div>
        </div>
        <div class="d-flex align-center text-form">
          <v-text-field
            v-model="message"
            append-outer-icon="mdi-send"
            solo
            label="テキストを入力"
            type="text"
            @click:append-outer="submit"
          ></v-text-field>
        </div>
      </v-col>
    </v-row>

    <!-- 合言葉（パスワード）を変更を設定するダイアログ -->
    <v-dialog v-model="this.lockDialog" max-width="500px">
      <v-card>
        <v-card-title>合言葉を設定</v-card-title>
        <v-card-text>
          合言葉を設定すると、合言葉を知っている人のみ入室可能となります。
          <v-switch v-model="lockSwitch" label="合言葉を設定する"></v-switch>
          <!-- CHECK: 合言葉入力をrequiredにしてるけど、ロックをしない場合にエラーが起きないか -->
          <v-text-field
            v-model="password"
            v-if="lockSwitch"
            label="合言葉"
            autofocus
            :disabled="!lockSwitch"
          ></v-text-field>
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
  name: 'Studyroom',
  data () {
    return {
      //ダイアログ制御用（合言葉）
      lockSwitch: false,
      message: "",
      displayName: "",
      password: "",
      subtitleField: ""
    };
  },
  async created () {
  },
  methods: {
    // カメラのロードが終わった時
    onLoadedData (event) {
      event.target.play().catch(console.error);
    },
    confirm () {
      this.displayName = this.userName;
      this.changeNameDialog();
    },
    join () {
      this.changeNameDialog();
      this.joinRoom({ roomId: this.$route.params.studyroom_id, photoURL: this.photoURL, displayName: this.displayName })
    },
    submit () {
      if (this.message) {
        this.sendMessage({ message: { id: this.userId, name: this.displayName, photoURL: this.photoURL, body: this.message } })
        this.message = ""
      }
    },
    submitSubtitle () {
      if (this.subtitleField) {
        this.setSubtitle({ roomId: this.$route.params.studyroom_id, subtitle: this.subtitleField })
        this.subtitleField = ""
      }
    },
    makePrivate () {
      this.changeLockDialog();
      this.setPassword({ roomId: this.$route.params.studyroom_id, password: this.password });
    },
    // ルームを退出する時の処理
    leave () {
      this.roomout()
    },
    ...mapActions(['setup', 'joinRoom', 'sendMessage', 'setPassword', 'setSubtitle', 'changeNameDialog', 'changeLockDialog', 'changeRoomoutDialog', 'roomout']),
  },
  computed: {
    ...mapGetters(['userId', 'userName', 'photoURL', 'isConnected', 'title', 'subtitle', 'srcObject', 'screens', 'logMessage', 'messages', 'lockDialog', 'nameDialog', 'roomoutDialog'])
  },
  watch: {
    '$route' (to, from) {
      console.log(to, from)
      console.log('route switched')
    }
  },
  beforeRouteUpdate(to, from, next) {
    let answer = window.confirm("Data you've inputted won't be synced, OK?");
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
};
</script>

<style scoped lang="sass">
// 後で消すやつ
.screen
  display: flex
textarea
  border: solid 1px black
.text-form
  margin-top: auto
.chat
  border-left: solid 0.3px gray
  height: 100%
  width: 50%
.leave
  margin-top: auto

.lock-button
  text-align: center
  margin-top: 10px

// チャット用
// TODO:画面の高さに最適になるようにVueを組む
.line-bc
  height: 100%
  overflow-y: scroll
  // この高さを超えるとスクロールするようになる
  // max-height: 500px
  // ワンチャンこれが最強かもしれん
  max-height: 60vh

.balloon6
  width: 100%
  margin: 10px 0
  overflow: hidden

/*以下、②左側のコメント*/
.balloon6
  & .faceicon
    float: left
    margin-right: -50px
    width: 40px

  & .faceicon img
    width: 100%
    height: auto
    border-radius: 50%

  & .chatting
    width: 100%
    text-align: left

.says
  display: inline-block
  position: relative
  margin: 0 0 0 50px
  padding: 10px
  max-width: 250px
  border-radius: 12px
  background: #edf1ee

  &:after
    content: ""
    display: inline-block
    position: absolute
    top: 3px
    left: -19px
    border: 8px solid transparent
    border-right: 18px solid #edf1ee
    -webkit-transform: rotate(35deg)
    transform: rotate(35deg)

  & p
    margin: 0
    padding: 0

/*以下、③右側の緑コメント*/
.mycomment
  margin: 10px 0
  text-align: right

  & p
    display: inline-block
    position: relative
    margin: 0 10px 0 0
    padding: 8px
    max-width: 250px
    border-radius: 12px
    background: #30e852
    font-size: 15px

  & p:after
    content: ""
    position: absolute
    top: 3px
    right: -19px
    border: 8px solid transparent
    border-left: 18px solid #30e852
    -webkit-transform: rotate(-35deg)
    transform: rotate(-35deg)
</style>
