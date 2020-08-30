import firebase from 'firebase';

export default {
  state: {
    currentDisplayName: null,
    currentDocId: null,
    studyLog: [],
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
    },
    setStudyLog(state, log) {
      console.log(log);
      state.studyLog = log;
    }
  },
  actions: {
    initCurrentUser({ commit }, user) {
      var db = firebase.firestore()
      var userRef = db.collection('users');
      userRef.where('userId', '==', user.uid).get()
        .then( (query) =>  {
          if (query.docs.length == 1 ) {
            query.forEach((doc) => {
              commit('initCurrentUser', doc);
            });
            var logRef = db.collection('studylog');
            logRef.where('userId', '==', user.uid).get()
              .then( (query) =>  {
                let bufLog = [];
                query.forEach((doc) => {
                  console.log(doc.data());
                  bufLog.push(doc.data());
                });
                commit('setStudyLog', bufLog);
              })
              .catch(function(error) {
                console.log(error);
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
