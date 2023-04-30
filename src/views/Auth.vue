<template>
  <div>
    <Spinner />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import qs from "qs";
import { Buffer } from "buffer";
// window.Buffer = Buffer;

import Spinner from "../components/Spinner.vue";

// TO-DO env values are seen as undefined thats why the api returns with 400
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const auth_token = Buffer.from(
  `${client_id}:${client_secret}`,
  "utf-8"
).toString("base64");

export default {
  components: {
    Spinner,
  },

  mounted() {
    this.getToken();
    this.requestAuthorization();
  },
  methods: {
    async getToken() {
      let data = qs.stringify({
        'grant_type': 'client_credentials'
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${auth_token}`,
        },
        data: data
      };

      try {
        const response = await axios.request(config);
        return response.data.access_token;
      }
      catch (error) {
        console.log(error);
      }
    },
    async requestAuthorization() {
      console.log('Requesting authorization')

      let redirectUri = encodeURI('http://localhost:5173/profile');
      let url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirectUri}&show_dialog=true&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private playlist-modify-public playlist-modify-private`;

      // let config = {
      //   method: 'get',
      //   maxBodyLength: Infinity,
      //   url: `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirectUri}&scope=playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public\n&scope=34fFs29kd09`,
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //   }
      // };

      window.location.href = url;

      // try {
      //   const response = await axios.request(config);
      //   console.log(JSON.stringify(response.data));
      // }
      // catch (error) {
      //   console.log(error);
      // }

    }
  },
};
</script>