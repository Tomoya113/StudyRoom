import { db } from '@/main'
import router from '@/router'

export default {
  state: {
    rooms: [],
    errorMessage: ''
  },
  mutations: {
    setRoomInformation(state) {
      db.collection("rooms").onSnapshot((snapShot) => {
        state.rooms = [];
        // console.log(state.rooms);
        snapShot.forEach((doc) => {
          state.rooms.push(doc.data());
        });
        state.rooms.sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          } else {
            return 1;
          }
        })
      });
    },
    enterRoom(state, { password, roomId }) {
      const roomRef = db.collection("rooms").doc(roomId);
      // 部屋の参加人数を-1
      roomRef.get().then((doc) => {
        if (doc.data().password === password) {
          router.push({ name: "Studyroom", params: { studyroom_id: roomId } });
        } else {
          state.errorMessage = 'パスワードが違います'
        }
      });
    }
  },
  actions: {
    setRoomInformation({ commit }) {
      commit("setRoomInformation");
    },
    listenChanges({ commit }) {
      commit("listenChanges");
    },
    enterRoom({ commit },{ password, roomId } ){
      commit("enterRoom", { password, roomId });
    }
  },
  getters : {
    rooms: (state) => (state.rooms ? state.rooms : []),
    errorMessage: (state) => (state.errorMessage ? state.errorMessage : '')
  }
}