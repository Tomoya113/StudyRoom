export default {
  // NOTE: stateのD付きはダイアログ制御用
  state: {
    nameD: false,
    lockD: false,
    roomoutD: false,
  },
  mutations: {
    changeNameD(state) {
      state.nameD = !state.nameD;
    },
    changeLockD(state) {
      state.lockD = !state.lockD;
    },
    changeRoomoutD(state) {
      state.roomoutD = !state.roomoutD;
    },
  },
  actions: {
    changeNameD({ commit }) {
      commit('changeNameD');
    },
    changelockD({ commit }) {
      commit('changeLockD');
    },
    changeroomoutD({ commit }) {
      commit('changeRoomoutD');
    },
  },
};
