<template>
  <div class="logout">
      <b-button variant="outline-primary" v-on:click="logout()">Logout</b-button>
  </div>
</template>

<script>
export default {
  name: 'Logout',
  methods: {
    logout() {
      localStorage.removeItem('access_token');
      this.$router.go();
    },
  },
};
</script>
