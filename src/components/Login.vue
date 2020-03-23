<template>
  <div class="login">
      <b-button variant="outline-primary" v-on:click="login()">Login</b-button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    login() {
      window.location.href = 'https://oauth.vk.com/authorize?'
                                + `client_id=${process.env.VUE_APP_CLIENT_ID}&`
                                + `redirect_uri=${process.env.VUE_APP_HOST}/redirect&`
                                + 'response_type=token&'
                                + 'scope=offline,friends';
    },
  },
};
</script>

<style scoped>
    .login {
        margin-top: 100px;
    }
</style>
