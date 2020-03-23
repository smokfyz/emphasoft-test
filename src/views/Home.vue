<template>
  <b-container class="home">
    <b-row align-h="center" v-if="authenticated && profile != null && friendsCount != null">
      <b-col lg="3">
        <Profile :photo="profile.photo_200" :count="friendsCount"/>
      </b-col>
      <b-col lg="6">
        <Search :accessToken="accessToken"/>
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
import Search from '@/components/Search.vue';

export default {
  name: 'Home',
  components: {
    Login,
    Profile,
    Loading,
    Search,
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
    async countFriends() {
      const API = process.env.VUE_APP_VK_API;

      this.$jsonp(`${API}/friends.get`, {
        access_token: this.accessToken,
        v: '5.103',
      })
        .then((res) => {
          this.friendsCount = res.response.count;
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
      friendsCount: null,
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
      this.countFriends();
    }
  },
};
</script>
