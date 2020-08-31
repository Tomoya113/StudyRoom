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
            <v-btn @click="changeLockDialog" rounded color="secondary">合言葉を設定</v-btn>
            <!-- NOTE ユーザー情報が取得されるまで押せなくしたほうがいいかも -->
            <v-btn v-if="!this.isConnected" @click="confirm" rounded color="primary">Join the room</v-btn>
          </div>
        </v-row>
      </v-col>
    </v-row>

    <!-- <p class="font-weight-medium">{{ this.logMessage }}</p> -->
    <v-row v-else class="d-flex" style="height: 100%;">
      <v-col class="d-flex flex-column" cols="9">
        <div>
          <video
            width="400"
            v-show="this.isConnected"
            @loadeddata="onLoadedData"
            :srcObject.prop="this.srcObject"
            playsinline
            muted
          ></video>
          <video
            width="400"
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
        <h2>チャット</h2>
        <!-- タイムライン部分③ -->
        <div id="bms_messages">
          <div v-for="message in this.messages" :key="message.body">
            <!-- <div class="bms_message bms_left"> -->
            <v-avatar size="30px" style="margin-top:auto;float:left">
              <img alt="Avatar" :src="photoURL" />
            </v-avatar>
            <div class="bms_message bms_left">
              <span style="padding-left:15px;">{{ message.name }}</span>
              <div class="bms_message_box">
                <div class="bms_message_content">
                  <div class="bms_message_text">{{ message.body }}</div>
                </div>
              </div>
            </div>
            <div class="bms_clear"></div>
          </div>

          <!--メッセージ２（右側）-->
          <div class="bms_message bms_right">
            <div class="bms_message_box">
              <div class="bms_message_content">
                <div class="bms_message_text">うん、まあまあいけとるな</div>
              </div>
            </div>
          </div>
          <div class="bms_clear"></div>
        </div>

        <!-- <div v-for="message in this.messages" :key="message.body">
          <div class="message">
            <v-avatar size="30px" style="float:left">
              <img alt="Avatar" :src="photoURL" />
            </v-avatar>
            <div class="message_box">
              <h4>{{ message.name }}</h4>
              <div class="message_content">{{ message.body }}</div>
            </div>
        </div>-->

        <!-- <div class="d-flex">
            <v-avatar size="36px">
              <img alt="Avatar" :src="photoURL" />
            </v-avatar>
            <h4>{{ message.name }}</h4>
          </div>
        <p>{{ message.body }}</p>-->
        <!-- </div> -->

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
        <!-- </div> -->
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
  data () {
    return {
      //ダイアログ制御用（合言葉）
      lockSwitch: false,
      message: "",
      displayName: "",
      password: "",
    };
  },
  async created () {
    await this.setup();
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
        this.sendMessage({ message: { name: this.displayName, photoURL: this.photoURL, body: this.message } })
        this.message = ""
      }
    },
    makePrivate () {
      this.changeLockDialog();
      this.setPassword({ password: this.password });
    },
    // ルームを退出する時の処理
    leave () {
      this.roomout()
    },
    ...mapActions(['setup', 'joinRoom', 'sendMessage', 'setPassword', 'changeNameDialog', 'changeLockDialog', 'changeRoomoutDialog', 'roomout']),
  },
  computed: {
    ...mapGetters(['userName', 'photoURL', 'isConnected', 'srcObject', 'screens', 'logMessage', 'messages', 'lockDialog', 'nameDialog', 'roomoutDialog'])
  }
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
// .chat
//   border-left: solid 0.3px gray
.leave
  margin-top: auto

// .chat
//   height: 100%
//   width: 50%

// チャットの外側部分①
#bms_messages_container
  border-left: solid 0.3px gray
  height: 600px
  width: 100%

// ヘッダー部分②
#bms_chat_header
  padding: 6px
  font-size: 16px
  height: 34px
  border: 1px solid #ccc

/* ステータスマークとユーザー名 */
#bms_chat_user_status
  float: left

/* ステータスマーク */
#bms_status_icon
  float: left
  line-height: 2em

/* ユーザー名 */
#bms_chat_user_name
  float: left
  line-height: 2em
  padding-left: 8px

/* タイムライン部分③ */
#bms_messages
  overflow: auto
  height: 100%

/* メッセージ全般のスタイル */
.bms_message
  margin: 0px
  padding: 0 14px
  font-size: 16px
  word-wrap: break-word
  white-space: normal

  &_box
    margin-bottom: 20px
    max-width: 100%
    font-size: 16px

  &_content
    padding: 5px 10px 5px 10px

/* メッセージ１（左側） */
.bms_left
  float: left
  line-height: 1.3em

  & .bms_message_box
    color: #333
    background: #fff
    border: 2px solid #13178E
    border-radius: 20px 20px 20px 0px
    margin-right: 50px

/* メッセージ２（右側） */
.bms_right
  float: right
  line-height: 1.3em

  & .bms_message_box
    color: #fff
    background: #13178E
    border: 2px solid #13178E
    border-radius: 20px 20px 0px 20px
    margin-left: 50px

/* 回り込みを解除 */
.bms_clear
  clear: both
</style>
