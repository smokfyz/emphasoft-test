<template>
  <div class="profile">
      <img :src="photo" alt="Avatar">
      <p>You have <span class="font-weight-bold">{{ count }}</span> friends.</p>
      <Logout/>
  </div>
</template>

<script>
import Logout from '@/components/Logout.vue';

export default {
  name: 'Profile',
  components: {
    Logout,
  },
  props: {
    photo: String,
    count: Number,
  },
  methods: {
  },
};
</script>

<style scoped>
    .profile {
        padding: 20px;
    }
    p {
        margin-top: 15px;
        font-size: 20px;
    }
</style>
