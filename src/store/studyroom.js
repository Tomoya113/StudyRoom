import router from '../router';
import Peer from 'skyway-js';
import { APIKEY } from '@/apiKey.js';
import { db } from '@/main';

// NOTE: 初期化用
const getDefaultState = () => {
  return {
    // カメラ用
    peer: null,
    localStream: null,
    srcObject: null,
    isConnected: false,
    screens: [],
    logMessage: null,
    room: null,
    // テキストチャット
    messages: [],
    // サブタイトル
    title: '',
    subtitle: '',
    // ダイアログ
    nameDialog: false,
    lockDialog: false,
    roomoutDialog: false,
  };
};

export default {
  state: {
    // カメラ用
    peer: null,
    localStream: null,
    srcObject: null,
    isConnected: false,
    screens: [],
    logMessage: null,
    room: null,
    // テキストチャット
    messages: [],
    // サブタイトル
    title: '',
    subtitle: '',
    // ダイアログ
    nameDialog: false,
    lockDialog: false,
    roomoutDialog: false,
  },
  mutations: {
    setup(state) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true,
        })
        .then((stream) => {
          state.localStream = stream;
          state.srcObject = state.localStream;
        })
        .catch(console.error);

      state.peer = new Peer({
        key: APIKEY,
        debug: 1,
      });

      state.peer.on('error', console.error);
    },
    joinRoom(state, { roomId, displayName, photoURL }) {
      // ロードが終わってなかったらreturn
      if (!state.peer.open) {
        return;
      }

      const roomRef = db.collection('rooms').doc(roomId);

      state.isConnected = true;
      // roomに入室
      state.room = state.peer.joinRoom(`studyRoom-${roomId}`, {
        mode: 'sfu',
        stream: state.localStream,
      });

      // roomに入った時
      state.room.once('open', () => {
        state.logMessage = 'You joined this room.\n';
        state.room.send({
          name: displayName,
          photoURL: photoURL,
          body: 'ルームに入室しました',
        });
        roomRef.update({
          screensnum: 1,
        });
      });

      // 他のユーザーが入ってきた時
      state.room.on('peerJoin', (peerId) => {
        console.log('peer joined');
        state.logMessage = state.logMessage + `${peerId} joined` + '\n';
      });

      // 他の人のビデオ情報を取得した時
      state.room.on('stream', async (stream) => {
        await state.screens.push(stream);
        roomRef.update({
          screensnum: 1 + state.screens.length,
        });
      });

      // 他の人からデータが送信されてきた時
      state.room.on('data', ({ data }) => {
        console.log({ data });
        state.messages.push(data);
        console.log(state.messages);
      });

      // 自分以外のメンバーが退出した時の処理
      state.room.on('peerLeave', () => {
        const result = state.screens.findIndex((screen) => screen.peerId);
        state.screens.splice(result, 1);
        roomRef.update({
          screensnum: 1 + state.screens.length,
        });
      });

      // 自分が退出する時
      state.room.once('close', () => {
        console.log('disconnected');
        roomRef.update({
          screensnum: state.screens.length,
        });
        // 部屋の参加人数を-1
        roomRef.get().then((doc) => {
          console.log('before update', doc.data().activeUsers);
          if (doc.data().screensnum - 1 === 0) {
            roomRef
              .update({
                activeUsers: doc.data().activeUsers - 1,
                password: '',
                subtitle: '',
              })
              .then(() => {
                console.log('after update', doc.data().activeUsers);
                roomRef.get().then((doc) => {
                  console.log('get document again', doc.data().activeUsers);
                });
              });
          } else {
            roomRef.update({
              activeUsers: doc.data().activeUsers - 1,
            });
          }
        });
      });
      // 部屋の参加人数を+1
      roomRef.get().then((doc) => {
        roomRef.update({
          activeUsers: doc.data().activeUsers + 1,
        });
        state.subtitle = doc.data().subtitle;
        console.log(doc.data().title);
        state.title = doc.data().title;
        console.log(state.title);
      });
      // 変更を監視
      roomRef.onSnapshot(function(doc) {
        // console.log("Current data: ", doc && doc.data());
        state.subtitle = doc.data().subtitle;
      });
    },
    sendMessage(state, { message }) {
      console.log('seding message');
      state.messages.push(message);
      state.room.send(message);
    },
    setPassword(state, { password, roomId }) {
      console.log({ password });
      const roomRef = db.collection('rooms').doc(roomId);
      roomRef.update({
        password: password,
      });
    },
    setSubtitle(state, { roomId, subtitle }) {
      console.log({ subtitle }, { roomId });
      const roomRef = db.collection('rooms').doc(roomId);
      roomRef.update({
        subtitle: subtitle,
      });
    },
    recieveMessage(state, { message }) {
      console.log(message);
      state.message.push(message);
    },
    changeNameDialog(state) {
      state.nameDialog = !state.nameDialog;
    },
    changeLockDialog(state) {
      state.lockDialog = !state.lockDialog;
    },
    changeRoomoutDialog(state) {
      state.roomoutDialog = !state.roomoutDialog;
    },
    roomout(state) {
      state.room.close();
      const tracks = state.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      state = Object.assign(state, getDefaultState());
      console.log(state);
    },
  },
  actions: {
    setup({ commit }) {
      commit('setup');
    },
    joinRoom({ commit }, { roomId, displayName }) {
      commit('joinRoom', { roomId, displayName });
    },
    sendMessage({ commit }, { message }) {
      commit('sendMessage', { message });
    },
    setPassword({ commit }, { password, roomId }) {
      commit('setPassword', { password, roomId });
    },
    setSubtitle({ commit }, { roomId, subtitle }) {
      commit('setSubtitle', { roomId, subtitle });
    },
    recieveMessage({ commit }, { message }) {
      commit('recieveMessage', { message });
    },
    changeNameDialog({ commit }) {
      commit('changeNameDialog');
    },
    changeLockDialog({ commit }) {
      commit('changeLockDialog');
    },
    changeRoomoutDialog({ commit }) {
      commit('changeRoomoutDialog');
    },
    roomout({ commit }) {
      commit('roomout');
      router.push({ name: 'Studyrooms' });
    },
  },
  getters: {
    isConnected: (state) => state.isConnected,
    subtitle: (state) => state.subtitle,
    title: (state) => state.title,
    srcObject: (state) => state.srcObject,
    screens: (state) => state.screens,
    logMessage: (state) => state.logMessage,
    messages: (state) => state.messages,
    lockDialog: (state) => state.lockDialog,
    nameDialog: (state) => state.nameDialog,
    roomoutDialog: (state) => state.roomoutDialog,
  },
};
