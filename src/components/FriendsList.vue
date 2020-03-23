<template>
  <div class="friends-list">
    <h2>5 Random Friends</h2>
    <b-list-group v-if="friends.length">
      <b-list-group-item class="p-2" v-for="friend in friends" :key="friend.id">
        <img :src="friend.photo_50" class="float-left" alt="Profile photo"/>
        <p class="align-middle">{{ friend.first_name }} {{ friend.last_name }}</p>
      </b-list-group-item>
    </b-list-group>
    <p v-else>No friends found.</p>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    friends: Array,
  },
};
</script>

<style scoped>
    .friends-list {
      padding: 20px;
    }
    p {
      margin-top: 16px;
    }
</style>
