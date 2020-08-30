import firebase from 'firebase';

export default {
  state: {
    currentDisplayName: null,
    currentDocId: null,
  },
  mutations: {
    initCurrentUser(state, userDoc) {
      let user = userDoc.data();
      state.currentDisplayName = user.currentDisplayName;
      state.currentDocId = userDoc.id;
    },
    createUser(state, { user, doc }) {
      state.currentDisplayName = user.displayName;
      state.currentDocId = doc.id;
    },
    updateDisplayName(state, newName) {
      state.currentDisplayName = newName;
    }
  },
  actions: {
    initCurrentUser({ commit }, user) {
      var userRef = firebase.firestore().collection('users');
      userRef.where('userId', '==', user.uid).get()
        .then( (query) =>  {
          if (query.docs.length == 1 ) {
            query.forEach((doc) => {
              commit('initCurrentUser', doc);
            });
          } else {
            // Note: 初回ログイン時
            userRef.add( {
              name: user.displayName,
              currentDisplayName: user.displayName,
              userId: user.uid
            })
            .then( (doc) => {
              commit('createUser', { user,  doc });
            })
            .catch(function(error) {
              console.log(error);
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updateDisplayName({ commit } , bufData ) {
      /* Note: bufDataの構成
        let bufData = {
          changeName: 'change', //変更する名前
          docId: this.currentDocId // usersのdocumentのID
        }
      */
      if ( bufData.docId != null ) {
        var userRef = firebase.firestore().collection('users').doc(bufData.docId);
        userRef.update({
          currentDisplayName: bufData.changeName
        })
        .then(() => {
          commit('updateDisplayName', bufData.changeName);
        })
        .catch(function(error) {
          console.log(error);
        });
      }
    },
  },
  getters: {
    currentDisplayName: (state) => (state.currentDisplayName ? state.currentDisplayName : ''),
    currentDocId: (state) => (state.currentDocId),
  },
  modules: {},
};
