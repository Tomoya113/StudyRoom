import firebase from 'firebase'

export default {
  state: {
    rooms: []
  },
  mutations: {
    setRoomInformation(state) {
      const db = firebase.firestore()
      const roomsRef = db.collection('rooms');
      roomsRef.get().then(querySnapshot => {
        querySnapshot.forEach( doc => {
          state.rooms.push(doc.data());
        })
      })
    }
  },
  actions: {
    setRoomInformation({ commit }) {
      commit("setRoomInformation");
    },
  },
  getters : {
    rooms: (state) => (state.rooms ? state.rooms : [])
  }
}