<template>
  <div class="redirect">
  </div>
</template>

<script>
export default {
  name: 'Redirect',
  beforeCreate() {
    const query = this.$route.hash.slice(1);
    const accessToken = query.split('&')[0].split('=');
    if (accessToken[0] === 'access_token') {
      localStorage.setItem('access_token', accessToken[1]);
    }
    this.$router.push('/');
  },
};
</script>
