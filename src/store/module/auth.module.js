import AuthService from "../../services/auth.service";

const user = JSON.parse(localStorage.getItem('user'));

const state = {
  user: user ? user : {},
  loggedIn: user ? true : false
};

const getters = {
  getRoleId(state) {
    return state.user.roles[1].id;
  },

  loggedIn(state) {
    return state.loggedIn;
  },

  getErrors(state) {
    return state.errors;
  }
}

const actions = {
  async login({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      AuthService.login(email, password)
        .then(({ data }) => {
          commit('loginSuccess', data);
          localStorage.setItem("user", JSON.stringify(data));
          resolve(data);
        })
        .catch(({ response }) => {
          commit('loginFailure');
          reject(response);
        });
    });
  },

  logout({ commit }) {
    localStorage.clear();
    commit("logout");
  },
}

const mutations = {
  loginSuccess(state, user) {
    state.loggedIn = true;
    state.user = user;
  },

  loginFailure(state) {
    state.loggedIn = false;
    state.user = null;
  },

  logout(state) {
    state.loggedIn = false;
    state.user = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}