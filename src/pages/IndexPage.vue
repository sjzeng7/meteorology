<template>
  <link rel="stylesheet" href="../../src/stylesheets/all.scss" />
  <q-page class="flex flex-center">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    /> -->
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      weatherData: null,
    };
  },
  methods: {
    async getWeatherData() {
      const apiUrl =
        "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-7BF18B7E-F0E5-45E9-828D-0FB84504F83B&format=JSON&locationName=&sort=time"; // 替換成您的 API URL
      try {
        const response = await axios.get(apiUrl, {
          params: {
            city: "Taipei", // 根據 API 文件中的參數添加所需的城市名稱
          },
        });

        this.weatherData = response.data; // 將 API 回應資料存儲在 Vue 組件的 data 中
        console.log("=========this.weatherData");
        console.log(this.weatherData);
      } catch (error) {
        console.error("API 請求失敗:", error.message);
      }
    },
  },
  async mounted() {
    await this.getWeatherData();
  },
};
</script>
