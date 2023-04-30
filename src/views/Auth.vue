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

console.log(client_id + " " + client_secret);

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

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>