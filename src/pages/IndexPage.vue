<template>
  <q-page class="flex flex-center">
    <link rel="stylesheet" href="../../src/stylesheets/all.scss" />
    <div>
      <img
        class="header"
        src="https://images.unsplash.com/photo-1609147110688-83b5fd1288e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        alt=""
      />
      <!-- <h1 class="header-text">即時氣象訊息都在這</h1> -->
      <div class="header-text">即時氣象訊息都在這</div>
    </div>
    <div class="container mt-6">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <img
            class="height-s5 w-100 object-fit-cover"
            src="https://images.unsplash.com/photo-1552993873-0dd1110e025f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
            alt=""
          />
        </div>
        <div class="col-md-5 d-flex align-items-center">
          <div>
            <h2>台灣是一個擁有豐富觀光資源的國家</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Tempor porttitor accumsan
              vestibulum vitae felis. Nunc molestie etiam pellentesque neque
              aliquet augue mi vitae leo. Lorem ipsum dolor sit amet
              consectetur. Tempor porttitor accumsan vestibulum vitae felis.
              Nunc molestie etiam pellentesque neque aliquet augue mi vitae leo.
            </p>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-4">
        <div class="col-md-5 d-flex align-items-center">
          <div>
            <h2>同時也是天氣多變的寶島</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Tempor porttitor accumsan
              vestibulum vitae felis. Nunc molestie etiam pellentesque neque
              aliquet augue mi vitae leo. Lorem ipsum dolor sit amet
              consectetur. Tempor porttitor accumsan vestibulum vitae felis.
              Nunc molestie etiam pellentesque neque aliquet augue mi vitae leo.
            </p>
          </div>
        </div>
        <div class="col-md-5">
          <img
            class="height-s5 w-100 object-fit-cover"
            src="https://images.unsplash.com/photo-1503505081023-9ab9cf55fec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
        </div>
      </div>
    </div>
    <div
      class="mt-6"
      style="background-color: black; height: 900px; width: auto"
    >
      <!-- 放置容器元素 -->
      <!-- 放QUASAR選擇器 -->
      <div class="q-px-xl q-pt-md">
        <select
          @change="selectData"
          style="
            height: 50px;
            width: 200px;
            font-size: 24px;
            background-color: black;
            color: white;
          "
          id="countys"
          v-model="selectedCounty"
        >
          <option
            v-for="(county, index) in countys"
            :key="index"
            :value="county"
          >
            {{ county }}
          </option>
        </select>
        <q-btn class="q-px-xs q-pb-md" color="primary" ripple outline flat>
          <q-icon name="close" @click="clearSelection" />
        </q-btn>
      </div>
      <div id="chart"></div>
    </div>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    /> -->
  </q-page>
</template>
<style>
#chart {
  background-color: #373739; /* 設置圖表的背景顏色為黑色 */
  color: white;
  fill: #6b6b68;
  height: 600px;
  margin: 20px;
}
.custom-header {
  background-color: #171719; /* 設置自定義的背景顏色，這裡使用紅色作為範例 */
  /* 可以添加其他的 CSS 屬性來定義樣式 */
}
.left-component {
  display: flex;
  justify-content: flex-start;
}
.header-text {
  position: absolute;
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  top: 20%;
  left: 70%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 46px;
  font-weight: bold;
  /* 添加其他樣式，例如文字顏色、字體大小等 */
}
</style>
<script>
import EssentialLink from "components/EssentialLink.vue";
import axios from "axios";
import * as d3 from "d3";
import c3 from "c3";
import { defineComponent } from "vue";
import { ref } from "vue";

export default {
  data() {
    const leftDrawerOpen = ref(false);
    return {
      maxTemp: [],
      minTemp: [],
      pop: [],
      weatherForecast36Hr: [],
      selectedCounty: "請選擇縣市",
      chart: null,
      model: ref(null),
      countys: [
        "請選擇縣市",
        "嘉義縣",
        "新北市",
        "嘉義市",
        "新竹縣",
        "新竹市",
        "臺北市",
        "臺南市",
        "宜蘭縣",
        "苗栗縣",
        "雲林縣",
        "花蓮縣",
        "臺中市",
        "臺東縣",
        "桃園市",
        "南投縣",
        "高雄市",
        "金門縣",
        "屏東縣",
        "基隆市",
        "澎湖縣",
        "連江縣",
      ],
      leftDrawerOpen,
    };
  },
  methods: {
    async selectData() {
      const selectedCounty = this.selectedCounty;
      try {
        // 未來的全國36小時氣象
        const response = await axios.post("/api/weatherForecast36Hr", {
          selectedCounty,
        });
        // 請求成功後，將資料存入組件的 data 中
        const weatherForecast36Hr = response.data;
        console.log("======weatherForecast36Hr");
        console.log(weatherForecast36Hr);
        this.weatherForecast36Hr = weatherForecast36Hr;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      this.chartStart();
    },
    clearSelection() {
      this.selectedCounty = "請選擇縣市"; // 清空選中
      this.maxTemp = [0];
      this.minTemp = [0];
      this.pop = [0];
      console.log("===============1======this.maxTemp, this.minTemp, this.pop");
      console.log(this.maxTemp, this.minTemp, this.pop);
      this.chartStart();
    },
    async chartStart() {
      if (this.selectedCounty !== "請選擇縣市") {
        const weatherForecast36Hr = this.weatherForecast36Hr;
        this.maxTemp = weatherForecast36Hr.maxTemp;
        this.minTemp = weatherForecast36Hr.minTemp;
        this.pop = weatherForecast36Hr.pop;
      }
      console.log("===============2======this.maxTemp, this.minTemp, this.pop");
      console.log(this.maxTemp, this.minTemp, this.pop);
      // 初始化 C3.js 圖表
      this.chart = c3.generate({
        data: {
          // Wx:天氣狀態
          // PoP:降雨機率
          // MinT:最低溫度
          // CI:舒適度
          // MaxT:最高溫度
          columns: [
            ["最高溫度"].concat(this.maxTemp),
            ["最低溫度"].concat(this.minTemp),
            ["降雨機率"].concat(this.pop),
          ],
          type: "bar",
        },
      });
    },
    async getWeatherData() {
      try {
        // 未來的全國36小時氣象
        const response = await axios.get("/api/weatherForecast36Hr");

        // 請求成功後，將資料存入組件的 data 中
        const data = response.data;
        console.log("======data");
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      // try {
      //   // 嘉義縣
      //   const response = await axios.get("/api/chiayi");

      //   // 請求成功後，將資料存入組件的 data 中
      //   const data = response.data;
      //   console.log("======data");
      //   console.log(data);
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      // }
    },
  },
  async mounted() {
    await this.getWeatherData();
    await this.chartStart();
  },
  beforeUnmount() {
    // 在組件銷毀前，銷毀 C3.js 圖表
    if (this.chart) {
      this.chart.destroy();
    }
  },
};
</script>
