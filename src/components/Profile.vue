<template>
  <div class="profile">
      <img :src="profile.photo_200" alt="Avatar">
      <p>
        <span class="font-weight-bold">
          {{ this.profile.first_name }} {{ this.profile.last_name }}
        </span>
      </p>
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
    profile: Object,
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
