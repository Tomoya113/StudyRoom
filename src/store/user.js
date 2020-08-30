import firebase from 'firebase';

export default {
  state: {
    current_user: null,
  },
  mutations: {
    initCurrentUser(state, user) {
      state.current_user = user;
      console.log(user.userId);
      console.log(user.name);
    },
  },
  actions: {
    initCurrentUser({ commit }, user) {
      var userRef = firebase.firestore().collection('users');
      userRef.where('userId', '==', user.uid).get()
        .then( (query) =>  {
          if (query.docs.length == 1 ) {
            query.forEach((doc) => {
              commit('initCurrentUser', doc.data());
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  getters: {
  },
  modules: {},
};
