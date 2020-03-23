<template>
  <b-container class="home">
    <b-row align-h="center" v-if="authenticated && profile != null && friends != null">
      <b-col lg="3">
        <Profile :profile="profile"/>
      </b-col>
      <b-col lg="4">
        <FriendsList :friends="friends"/>
      </b-col>
    </b-row>
    <b-row align-h="center" v-else-if="error">
      <b-col>
        <p>{{ this.error }}</p>
      </b-col>
    </b-row>
    <b-row align-h="center" v-else-if="authenticated">
      <b-col>
        <Loading/>
      </b-col>
    </b-row>
    <b-row align-h="center" v-else>
      <b-col>
        <Login/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Login from '@/components/Login.vue';
import Profile from '@/components/Profile.vue';
import Loading from '@/components/Loading.vue';
import FriendsList from '@/components/FriendsList.vue';

export default {
  name: 'Home',
  components: {
    Login,
    Profile,
    Loading,
    FriendsList,
  },
  methods: {
    async getProfile() {
      const API = process.env.VUE_APP_VK_API;

      this.$jsonp(`${API}/users.get`, {
        access_token: this.accessToken,
        fields: 'photo_200',
        v: '5.103',
      })
        .then((res) => {
          [this.profile] = res.response;
        })
        .catch(() => {
          this.error = 'Error while loading profile data.';
          localStorage.removeItem('access_token');
        });
    },
    async getFriends() {
      const API = process.env.VUE_APP_VK_API;

      this.$jsonp(`${API}/friends.get`, {
        access_token: this.accessToken,
        order: 'random',
        count: 5,
        fields: 'first_name,last_name,photo_50',
        v: '5.103',
      })
        .then((res) => {
          this.friends = res.response.items;
        })
        .catch(() => {
          this.error = 'Error while loading friends list.';
          localStorage.removeItem('access_token');
        });
    },
  },
  data() {
    return {
      authenticated: false,
      accessToken: null,
      profile: null,
      friends: null,
      error: null,
    };
  },
  created() {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      this.authenticated = true;
      this.accessToken = accessToken;
    }

    if (this.authenticated) {
      this.getProfile();
      this.getFriends();
    }
  },
};
</script>
