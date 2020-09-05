import firebase from 'firebase';
export default {
  state: {
    login_user: null,
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user;
    },
    deleteLoginUser(state) {
      state.login_user = null;
    },
  },
  actions: {
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user);
    },
    deleteLoginUser({ commit }) {
      commit('deleteLoginUser');
    },
    logout() {
      firebase.auth().signOut();
    },
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(google_auth_provider);
    },
  },
  getters: {
    userId: (state) => (state.login_user ? state.login_user.uid : ''),
    userName: (state) => (state.login_user ? state.login_user.displayName : ''),
    photoURL: (state) => (state.login_user ? state.login_user.photoURL : ''),
  },
  modules: {},
};
