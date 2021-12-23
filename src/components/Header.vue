<template>
  <header class="header">
    <div class="container">
      <div class="header-left">
        <p><router-link to="/">Home</router-link></p>
        <p v-show="loggedIn" @click="redirect()">DashBoard</p>
      </div>
      <div class="header-right">
        <div v-if="loggedIn">
          <p>Hello {{ currentUser.name }} </p>
          <p @click="logout()">Logout</p>
        </div>
        <div v-else>
        <router-link to="/login">Login</router-link></div>
        <!-- <p v-show="!loggedIn">test</p> -->
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "Header",
  computed: {
    ...mapGetters('auth', {
      loggedIn: 'loggedIn',
      roleId: "getRoleId",
    }),
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.$router.push({ name: "home" });
    },
    redirect() {
      let role = this.roleId;
      switch (role) {
        case 2: {
          this.$router.push({ name: "employee" });
          break;
        }
        case 3: {
          this.$router.push({ name: "accountant" });
          break;
        }
        case 4: {
          this.$router.push({ name: "manager" });
          break;
        }
        case 5: {
          this.$router.push({ name: "admin" });
          break;
        }
      }
    },
  }
};
</script>

<style>
.header-right {
  padding: 10px;
  /* text-align: right; */
  display: inline-block;
}

.header-right div {
  display: inline;
}

.header-right div p {
  display: inline;
  padding: 10px;
  margin-left: 20px;
}
.header-right div p:hover, .header-left p:hover {
  background-color: aqua;
}

.header-left {
  padding: 10px;
  /* text-align: left; */
  display: inline-block;
}

.header-left p {
  display: inline;
  padding: 10px;
  margin-right: 20px;
}
</style>