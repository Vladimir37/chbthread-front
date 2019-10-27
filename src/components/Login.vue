<template>
  <div class="container">
    <div class="loginContainer">
      <b-form-input type="text" class="elem" placeholder="Логин" v-model="login" />
      <b-form-input type="password" class="elem" placeholder="Пароль" v-model="pass" />
      <b-button variant="outline-primary" class="elem" @click="auth">Войти</b-button>
      <b-button variant="outline-primary" class="elem" @click="check">Проверка</b-button>
      <b-button variant="outline-primary" class="elem" @click="logout">Выйти</b-button>
    </div>
  </div>
</template>

<script>
import { BFormInput, BButton } from "bootstrap-vue";
import provider from '../utils/provider';

export default {
  name: 'Login',
  components: {
    BFormInput,
    BButton,
  },
  data () {
    return {
      login: '',
      pass: '',
    }
  },
  methods: {
    auth() {
      const authData = {
        username: this.login,
        password: this.pass,
      };
      provider.post('/auth/login', authData).then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      });
    },
    check() {
      provider.get('/auth/status').then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      });
    },
    logout() {
      provider.post('/auth/logout').then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      });
    }
  },
}
</script>

<style scoped>
.loginContainer {
  max-width: 350px;
  margin: 0 auto;
}
.elem {
  margin-bottom: 30px;
}
</style>