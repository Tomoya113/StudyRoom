export default {
  state: {
    current_user: null,
  },
  mutations: {
    initCurrentUser(state, user) {
      state.current_user = user;
      console.log(user);
    },
  },
  actions: {
    initCurrentUser({ commit }, user) {
      commit('initCurrentUser', user);
    },
  },
  getters: {
  },
  modules: {},
};
