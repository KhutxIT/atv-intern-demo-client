<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img src="../assets/images/Customer-Supprt.png" alt="IMG" />
        </div>

        <form class="login100-form validate-form">
          <span class="login100-form-title"> Login </span>
          <Form @submit="handleLogin(email, password)" :validation-schema="schema">
            <div class="wrap-input100 validate-input">
              <Field
                class="input100"
                type="email"
                placeholder="Email"
                name="email"
                v-model="email"
              />
              <ErrorMessage name="email" class="error-danger"/>
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-user" aria-hidden="true"></i>
              </span>
            </div>

            <div class="wrap-input100 validate-input">
              <Field
                class="input100"
                type="password"
                placeholder="Password"
                name="password"
                v-model="password"
              />
              <ErrorMessage name="password" class="error-danger"/>
              <span
                toggle="#password-field"
                class="fa fa-fw fa-eye field-icon toggle-password"
              ></span>
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>
            <div class="container-login100-form-btn">
              <p v-show="errors"> {{ errors }} </p>
              <input
                type="submit"
                value="Login"
                id="submit"
              />
            </div>
          </Form>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export default {
  name: "Login",
  components: {
    Form,
    ErrorMessage,
    Field
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required().min(3)
    });
    return {
      schema,
      email: null,
      password: null,
      errors: null,
    };
  },
  computed: {
    ...mapGetters('auth', {
      loggedIn: 'loggedIn',
      roleId: 'getRoleId',
    }),
  },
  mounted() {
    if (this.loggedIn) {
      this.redirect(this.roleId);
    }
  },
  created() {
    document.title = 'Login'
  },
  methods: {
    handleLogin(email, password) {
      this.$store.dispatch("auth/login", { email, password })
        .then(data => {
          let roleId = data.roles[1].id;
          this.redirect(roleId);
        })
        .catch(err => {
          this.errors = err.data.message;
        })
      ;
    },
    redirect(roleId) {
      switch (roleId) {
        case 2:
          this.$router.push({ name: "employee" });
          break;
        case 3:
          this.$router.push({ name: "accountant" });
          break;
        case 4:
          this.$router.push({ name: "manager" });
          break;
        case 5:
          this.$router.push({ name: "admin" });
          break;
      }
    },
  },
};
</script>

<style>
@import "../assets/login/css/main.css";
@import "../assets/login/css/util.css";
@import "../assets/login/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
@import "../assets/login/vendor/bootstrap/css/bootstrap.min.css";
@import "../assets/login/vendor/animate/animate.css";
@import "../assets/login/vendor/css-hamburgers/hamburgers.min.css";
@import "../assets/login/vendor/select2/select2.min.css";

.error-danger {
  color: red;
}
</style>