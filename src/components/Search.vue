<template>
  <div class="search">
    <b-input-group class="mb-2">
      <b-input-group-prepend is-text>
        <b-icon icon="search"></b-icon>
      </b-input-group-prepend>
      <b-form-input type="search" placeholder="Friend's name"
                    @keyup.native='e => query = e.target.value'>
      </b-form-input>
    </b-input-group>
    <b-list-group v-if="friends.length">
      <b-list-group-item v-for="friend in friends" :key="friend.id">
        {{ `${friend.first_name} ${friend.last_name}` }}
      </b-list-group-item>
    </b-list-group>
    <p v-else>No friends found.</p>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    accessToken: String,
  },
  data() {
    return {
      query: '',
      friends: [],
    };
  },
  watch: {
    query() {
      this.searchFriends();
    },
  },
  created() {
    this.searchFriends = this._.debounce(this.searchFriends, 300);
  },
  methods: {
    searchFriends() {
      const API = process.env.VUE_APP_VK_API;

      this.$jsonp(`${API}/friends.search`, {
        q: this.query,
        access_token: this.accessToken,
        v: '5.103',
      })
        .then((res) => {
          if (!this.query) {
            this.friends = [];
          } else {
            this.friends = res.response.items;
          }
        })
        .catch(() => {
          this.friends = [];
        });
    },
  },
};
</script>

<style scoped>
    .search {
        padding: 20px;
    }
</style>
