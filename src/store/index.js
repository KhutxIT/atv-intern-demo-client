import { createStore } from "vuex";
//import createPersistedState from "vuex-persistedstate";
import auth from "./module/auth.module";

export default createStore({
  modules: {
    auth,
  },
  // plugins: [createPersistedState()] xem lai phan nay sau, nhin no clear hon dung localStorage
});