import { db } from '@/main'

export default {
  state: {
    rooms: []
  },
  mutations: {
    setRoomInformation(state) {
      db.collection("rooms").onSnapshot((snapShot) => {
        state.rooms = [];
        console.log(state.rooms);
        snapShot.forEach((doc) => {
          state.rooms.push(doc.data());
        });
      });
      // const roomsRef = db.collection("rooms");
      // roomsRef.get().then(querySnapshot => {
      //   querySnapshot.forEach(doc => {
      //     console.log(doc.data());
      //     state.rooms.push(doc.data());
      //   })
      // })
    },
    // listenChanges(state) {
    // }
  },
  actions: {
    setRoomInformation({ commit }) {
      commit("setRoomInformation");
    },
    listenChanges({ commit }) {
      commit("listenChanges");
    }
  },
  getters : {
    rooms: (state) => (state.rooms ? state.rooms : [])
  }
}