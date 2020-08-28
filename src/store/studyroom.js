import router from '../router';
import Peer from 'skyway-js';
import { APIKEY } from "@/apiKey.js";

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
    // ダイアログ
    nameDialog: false,
    lockDialog: false,
    roomoutDialog: false,
  };
}

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
        }).then((stream) => {
          state.localStream = stream;
          state.srcObject = state.localStream;
        })
        .catch(console.error);

      state.peer = new Peer({
        key: APIKEY,
        debug: 1,
      });

      state.peer.on("error", console.error);
    },
    joinRoom(state, { roomId }) {
      console.log(state.localStream)
      console.log(state.peer.open)
      // ロードが終わってなかったらreturn
      if (!state.peer.open) {
        return;
      }

      state.isConnected = true;
      // roomに入出
      state.room = state.peer.joinRoom(`studyRoom-${roomId}`, {
        mode: "sfu",
        stream: state.localStream,
      });

      // roomに入った時
      state.room.once("open", () => {
        state.logMessage = "You joined this room. \n";
      });

      // 他のユーザーが入ってきた時
      state.room.on("peerJoin", (peerId) => {
        state.logMessage = state.logMessage + `${peerId} joined \n`;
      });

      // 他の人のビデオ情報を取得した時
      state.room.on("stream", async (stream) => {
        console.log(state.srcObject, { stream });
        await state.screens.push(stream);
      });

      // 他の人からデータが送信されてきた時
      state.room.on("data", ({ data, src }) => {
        console.log({ data }, { src });
      });

      // 自分以外のメンバーが退出した時の処理
      state.room.on("peerLeave", (peerId) => {
        console.log({ peerId });
        const result = state.screens.findIndex((screen) => screen.peerId);
        console.log({ result });
        state.screens.splice(result, 1);
      });

      // 自分が退出する時
      state.room.once("close", () => {
        console.log("disconnected");
      });
    },
    changeNameD(state) {
      state.nameD = !state.nameDialog;
    },
    changeLockDialog(state) {
      state.lockDialog = !state.lockDialog;
    },
    changeRoomoutDialog(state) {
      state.roomoutDialog = !state.roomoutDialog;
    },
    roomout(state) {
      state.room.close()
      const tracks = state.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      state = Object.assign(state, getDefaultState());
      console.log(state)
    }
  },
  actions: {
    setup({ commit }) {
      commit("setup");
    },
    joinRoom({ commit }, { roomId }) {
      commit("joinRoom", { roomId });
    },
    changeNameDialog({ commit }) {
      commit("changeNameDialog");
    },
    changeLockDialog({ commit }) {
      commit("changeLockDialog");
    },
    changeRoomoutDialog({ commit }) {
      commit("changeRoomoutDialog");
    },
    roomout({ commit }) {
      commit("roomout");
      router.push({ name: "Studyrooms" });
    },
  },
};
