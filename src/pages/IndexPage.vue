<template>
  <q-page>
    <!-- <link rel="stylesheet" href="../../src/stylesheets/all.scss" /> -->
    <div class="page-content">
      <div class="container">
        <div class="image-container box">
          <img
            class="center-image"
            src="https://images.unsplash.com/photo-1609147110688-83b5fd1288e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
          <div class="box">
            <p class="header-overlay">即時氣象訊息都在這</p>
          </div>
        </div>
      </div>
      <q-space size="64px"></q-space>
      <!-- 64px 間隔 -->
      <div class="container box">
        <div class="row">
          <div class="col-12 col-md-6 container-image">
            <img
              class="image-taiwam"
              src="https://images.unsplash.com/photo-1552993873-0dd1110e025f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
              alt=""
            />
          </div>
          <div class="col-12 col-md-6 text-center q-pl-xl">
            <h4>台灣是一個擁有豐富觀光資源的國家</h4>
            <p style="text-align: justify">
              台灣是一個擁有豐富觀光資源的國家。<br />
              從壯麗的自然景觀到獨特的文化體驗，台灣為遊客提供了多元的旅遊體驗。<br />
              島上蔚藍的海岸線、壯闊的山脈、綿延的茶園，都呈現出大自然的美麗景色。<br />
              此外，台灣的文化傳統也吸引著眾多遊客。<br />
              古老的廟宇、繁華的夜市、傳統工藝，都展示著台灣深厚的歷史和獨特的文化面貌。<br />
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6 text-center">
            <div>
              <h4>同時也是天氣多變的寶島</h4>
              <p style="text-align: justify">
                台灣作為一個多變的寶島，天氣變化豐富多彩，呈現多樣性的氣候特點。<br />
                由於地理位置的影響，台灣地區涵蓋了亞熱帶、溫帶和高山氣候等多種氣候型態。<br />
                北部地區四季分明，冬暖夏涼，適宜的氣候條件使得台灣北部成為綠意盎然的農業區域，擁有豐富的果樹和蔬菜產業。<br />
                中部地區則以溫暖濕潤的氣候為主，同時兼具著各種特殊的生態景觀，如日月潭、阿里山等。<br />
                而南部地區則以炎熱濕潤的熱帶氣候為主，盛產水果和農產品。<br />
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6 container-image">
            <img
              class="image-taiwam"
              src="https://images.unsplash.com/photo-1503505081023-9ab9cf55fec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
      <div style="height: auto; width: auto">
        <!-- 放置容器元素 -->
        <!-- 放QUASAR選擇器 -->
        <div class="q-px-xl q-pt-md">
          <span class="q-pr-md">
            <span class="q-pr-sm">
              <select
                style="
                  height: 50px;
                  width: 200px;
                  font-size: 24px;
                  color: rgb(15, 15, 15);
                "
                id="dataModels"
                v-model="selecteDataModels"
              >
                <option
                  v-for="(dataModel, index) in dataModels"
                  :key="index"
                  :value="dataModel"
                >
                  {{ dataModel }}
                </option>
              </select>
            </span>
            <span class="q-pr-sm">
              <select
                @change="selectCounty(selectedCounty)"
                style="
                  height: 50px;
                  width: 200px;
                  font-size: 24px;
                  background-color: white;
                  color: black;
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
            </span>
            <span
              v-if="
                selectedCounty !== '請選擇縣市' &&
                selecteDataModels === '鄉鎮氣象預報'
              "
              class="q-pr-sm"
            >
              <select
                style="
                  height: 50px;
                  width: 200px;
                  font-size: 24px;
                  background-color: white;
                  color: black;
                "
                id="townships"
                v-model="selecteTownships"
              >
                <option
                  v-for="(township, index) in townships"
                  :key="index"
                  :value="township"
                >
                  {{ township }}
                </option>
              </select>
            </span>
          </span>
          <span class="q-pt-xs">
            <!-- <q-btn  color="primary" ripple outline flat>
              <q-icon name="close" @click="clearSelection" />
            </q-btn> -->
            <q-btn
              outline
              style="color: blue"
              label="清除"
              @click="clearSelection"
            />
            <q-btn
              outline
              style="color: blue"
              label="查詢"
              @click="selectData"
            />
          </span>
        </div>
        <div id="chart"></div>
      </div>
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
.c3-line {
  fill: rgba(0, 0, 0, 0);
}
.container-image {
  display: flex;
  justify-content: center; /* 水平置中 */
  align-items: center; /* 垂直置中 */
  padding: 20px 0px 20px 0px; /* 上下左產生間隔，右不需要間隔 */
  background-color: #f0f0f0;
}
.box {
  margin-bottom: 64px; /* 底部產生 64px 間隔 */
}
.image-taiwam {
  display: flex;
  width: auto;
  height: 360px;
}
.page-content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}
.center-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}
.header-overlay {
  position: absolute;
  top: 20%; /* Adjust the vertical position of the text */
  left: 50%; /* Adjust the horizontal position of the text */
  font-size: 4vw; /* 使用相對單位，隨父容器變化 */
  color: #f0f0f0;
  padding: 8px;
}
.image-container {
  position: relative;
  width: 100%; /* Make sure the container takes full width */
}
</style>
<script>
import EssentialLink from "components/EssentialLink.vue";
import axios from "axios";
import * as d3 from "d3";
import c3 from "c3";
import { defineComponent } from "vue";
import { ref } from "vue";
import { Loading } from "quasar";

export default {
  data() {
    const leftDrawerOpen = ref(false);
    return {
      type: "bar",
      ruralWeather: "", // 鄉鎮天氣
      townships: [],
      dataModels: ["查詢資料", "36小時氣象資料", "鄉鎮氣象預報"],
      selecteDataModels: "查詢資料",
      selecteTownships: "",
      maxTemp: [0],
      minTemp: [0],
      pop: [0],
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
  watch: {
    selecteDataModels(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.selectedCounty = "請選擇縣市"; // 清空選中
      }
    },
  },
  methods: {
    selectCounty(selectedCounty) {
      // 如果所選為鄉鎮氣象預報
      if (this.selecteDataModels === "鄉鎮氣象預報") {
        if (selectedCounty === "嘉義縣") {
          this.townships = [
            "義竹鄉",
            "東石鄉",
            "六腳鄉",
            "太保市",
            "水上鄉",
            "鹿草鄉",
            "布袋鎮",
            "竹崎鄉",
            "朴子市",
            "中埔鄉",
            "民雄鄉",
            "番路鄉",
            "大林鎮",
            "梅山鄉",
            "新港鄉",
            "阿里山鄉",
            "溪口鄉",
            "大埔鄉",
          ];
          this.selecteTownships = "義竹鄉";
        }
        if (selectedCounty === "新北市") {
          this.townships = [
            "板橋區",
            "三重區",
            "中和區",
            "永和區",
            "新莊區",
            "新店區",
            "樹林區",
            "鶯歌區",
            "三峽區",
            "淡水區",
            "汐止區",
            "瑞芳區",
            "土城區",
            "蘆洲區",
            "五股區",
            "泰山區",
            "林口區",
            "深坑區",
            "石碇區",
            "坪林區",
            "三芝區",
            "石門區",
            "八里區",
            "平溪區",
            "雙溪區",
            "貢寮區",
            "金山區",
            "萬里區",
            "烏來區",
          ];
          this.selecteTownships = "板橋區";
        }
        if (selectedCounty === "嘉義市") {
          this.townships = ["東區", "西區"];
          this.selecteTownships = "東區";
        }
        if (selectedCounty === "新竹縣") {
          this.townships = [
            "竹北市",
            "竹東鎮",
            "新埔鎮",
            "關西鎮",
            "湖口鄉",
            "新豐鄉",
            "芎林鄉",
            "橫山鄉",
            "北埔鄉",
            "寶山鄉",
            "峨眉鄉",
            "尖石鄉",
            "五峰鄉",
          ];
          this.selecteTownships = "竹北市";
        }
        if (selectedCounty === "新竹市") {
          this.townships = ["東區", "北區", "香山區"];
          this.selecteTownships = "東區";
        }
        if (selectedCounty === "臺北市") {
          this.townships = [
            "中正區",
            "大同區",
            "中山區",
            "松山區",
            "大安區",
            "萬華區",
            "信義區",
            "士林區",
            "北投區",
            "內湖區",
            "南港區",
            "文山區",
          ];
          this.selecteTownships = "中正區";
        }
        if (selectedCounty === "臺南市") {
          this.townships = [
            "中西區",
            "東區",
            "南區",
            "北區",
            "安平區",
            "安南區",
            "永康區",
            "歸仁區",
            "新化區",
            "左鎮區",
            "玉井區",
            "楠西區",
            "南化區",
            "仁德區",
            "關廟區",
            "龍崎區",
            "官田區",
            "麻豆區",
            "佳里區",
            "西港區",
            "七股區",
            "將軍區",
            "學甲區",
            "北門區",
            "新營區",
            "後壁區",
            "白河區",
            "東山區",
            "六甲區",
            "下營區",
            "柳營區",
            "鹽水區",
            "善化區",
            "大內區",
            "山上區",
            "新市區",
            "安定區",
          ];
          this.selecteTownships = "中西區";
        }
        if (selectedCounty === "宜蘭縣") {
          this.townships = [
            "宜蘭市",
            "頭城鎮",
            "礁溪鄉",
            "壯圍鄉",
            "員山鄉",
            "羅東鎮",
            "三星鄉",
            "大同鄉",
            "五結鄉",
            "冬山鄉",
            "蘇澳鎮",
            "南澳鄉",
          ];
          this.selecteTownships = "宜蘭市";
        }
        if (selectedCounty === "苗栗縣") {
          this.townships = [
            "苗栗市",
            "通霄鎮",
            "苑裡鎮",
            "竹南鎮",
            "頭份市",
            "後龍鎮",
            "卓蘭鎮",
            "大湖鄉",
            "公館鄉",
            "銅鑼鄉",
            "南莊鄉",
            "頭屋鄉",
            "三義鄉",
            "西湖鄉",
            "造橋鄉",
            "三灣鄉",
            "獅潭鄉",
            "泰安鄉",
          ];
          this.selecteTownships = "苗栗市";
        }
        if (selectedCounty === "雲林縣") {
          this.townships = [
            "斗六市",
            "斗南鎮",
            "虎尾鎮",
            "西螺鎮",
            "土庫鎮",
            "北港鎮",
            "古坑鄉",
            "大埤鄉",
            "莿桐鄉",
            "林內鄉",
            "二崙鄉",
            "崙背鄉",
            "麥寮鄉",
            "東勢鄉",
            "褒忠鄉",
            "台西鄉",
            "元長鄉",
            "四湖鄉",
            "口湖鄉",
            "水林鄉",
          ];
          this.selecteTownships = "斗六市";
        }
        if (selectedCounty === "花蓮縣") {
          this.townships = [
            "花蓮市",
            "鳳林鎮",
            "玉里鎮",
            "新城鄉",
            "吉安鄉",
            "壽豐鄉",
            "光復鄉",
            "豐濱鄉",
            "瑞穗鄉",
            "富里鄉",
            "秀林鄉",
            "卓溪鄉",
          ];
          this.selecteTownships = "花蓮市";
        }
        if (selectedCounty === "臺中市") {
          this.townships = [
            "中區",
            "東區",
            "南區",
            "西區",
            "北區",
            "北屯區",
            "西屯區",
            "南屯區",
            "太平區",
            "大里區",
            "霧峰區",
            "烏日區",
            "豐原區",
            "后里區",
            "石岡區",
            "東勢區",
            "和平區",
            "新社區",
            "潭子區",
            "大雅區",
            "神岡區",
            "大肚區",
            "沙鹿區",
            "龍井區",
            "梧棲區",
            "清水區",
            "大甲區",
            "外埔區",
            "大安區",
          ];
          this.selecteTownships = "中區";
        }
        if (selectedCounty === "臺東縣") {
          this.townships = [
            "臺東市",
            "成功鎮",
            "關山鎮",
            "卑南鄉",
            "鹿野鄉",
            "池上鄉",
            "東河鄉",
            "長濱鄉",
            "太麻里鄉",
            "大武鄉",
            "綠島鄉",
            "海端鄉",
            "延平鄉",
            "金峰鄉",
            "達仁鄉",
            "蘭嶼鄉",
          ];
          this.selecteTownships = "臺東市";
        }
        if (selectedCounty === "桃園市") {
          this.townships = [
            "桃園區",
            "中壢區",
            "平鎮區",
            "八德區",
            "楊梅區",
            "蘆竹區",
            "大溪區",
            "龍潭區",
            "龜山區",
            "大園區",
            "觀音區",
            "新屋區",
            "復興區",
          ];
          this.selecteTownships = "桃園區";
        }
        if (selectedCounty === "南投縣") {
          this.townships = [
            "南投市",
            "埔里鎮",
            "草屯鎮",
            "竹山鎮",
            "集集鎮",
            "名間鄉",
            "鹿谷鄉",
            "中寮鄉",
            "魚池鄉",
            "國姓鄉",
            "水里鄉",
            "信義鄉",
            "仁愛鄉",
          ];
          this.selecteTownships = "南投市";
        }
        if (selectedCounty === "高雄市") {
          this.townships = [
            "楠梓區",
            "左營區",
            "鼓山區",
            "三民區",
            "鹽埕區",
            "前金區",
            "新興區",
            "苓雅區",
            "前鎮區",
            "旗津區",
            "小港區",
            "鳳山區",
            "大寮區",
            "鳥松區",
            "林園區",
            "仁武區",
            "大社區",
            "岡山區",
            "路竹區",
            "阿蓮區",
            "田寮區",
            "燕巢區",
            "橋頭區",
            "梓官區",
            "彌陀區",
            "永安區",
            "湖內區",
            "鳳山區",
            "大寮區",
            "林園區",
            "鳥松區",
            "仁武區",
            "大社區",
            "岡山區",
            "路竹區",
            "阿蓮區",
            "田寮區",
            "燕巢區",
            "橋頭區",
            "梓官區",
            "彌陀區",
            "永安區",
            "湖內區",
            "鳳山區",
            "大寮區",
            "林園區",
            "鳥松區",
            "仁武區",
            "大社區",
            "岡山區",
            "路竹區",
            "阿蓮區",
            "田寮區",
            "燕巢區",
            "橋頭區",
            "梓官區",
            "彌陀區",
            "永安區",
            "湖內區",
            "鳳山區",
            "大寮區",
            "林園區",
            "鳥松區",
            "仁武區",
            "大社區",
            "岡山區",
            "路竹區",
            "阿蓮區",
            "田寮區",
            "燕巢區",
            "橋頭區",
            "梓官區",
            "彌陀區",
            "永安區",
            "湖內區",
            "鳳山區",
            "大寮區",
            "林園區",
            "鳥松區",
            "仁武區",
            "大社區",
            "岡山區",
            "路竹區",
            "阿蓮區",
            "田寮區",
            "燕巢區",
            "橋頭區",
            "梓官區",
            "彌陀區",
            "永安區",
            "湖內區",
            "鳳山區",
            "大寮區",
            "林園區",
            "鳥松區",
            "仁武區",
            "大社區",
            "岡山區",
            "路竹區",
            "阿蓮區",
            "田寮區",
            "燕巢區",
            "橋頭區",
            "梓官區",
            "彌陀區",
            "永安區",
            "湖內區",
            "茄萣區",
            "茂林區",
            "桃源區",
            "那瑪夏區",
          ];
          this.selecteTownships = "楠梓區";
        }
        if (selectedCounty === "金門縣") {
          this.townships = [
            "金城鎮",
            "金沙鎮",
            "金湖鎮",
            "金寧鄉",
            "烈嶼鄉",
            "烏坵鄉",
          ];
          this.selecteTownships = "金城鎮";
        }
        if (selectedCounty === "屏東縣") {
          this.townships = [
            "屏東市",
            "潮州鎮",
            "東港鎮",
            "恆春鎮",
            "萬丹鄉",
            "長治鄉",
            "麟洛鄉",
            "九如鄉",
            "里港鄉",
            "鹽埔鄉",
            "高樹鄉",
            "萬巒鄉",
            "內埔鄉",
            "竹田鄉",
            "新埤鄉",
            "枋寮鄉",
            "新園鄉",
            "崁頂鄉",
            "林邊鄉",
            "南州鄉",
            "佳冬鄉",
            "琉球鄉",
            "車城鄉",
            "滿州鄉",
            "枋山鄉",
            "霧台鄉",
            "瑪家鄉",
            "泰武鄉",
            "來義鄉",
            "春日鄉",
            "獅子鄉",
            "牡丹鄉",
          ];
          this.selecteTownships = "屏東市";
        }
        if (selectedCounty === "基隆市") {
          this.townships = [
            "中正區",
            "七堵區",
            "暖暖區",
            "仁愛區",
            "中山區",
            "安樂區",
            "信義區",
          ];
          this.selecteTownships = "中正區";
        }
        if (selectedCounty === "澎湖縣") {
          this.townships = [
            "馬公市",
            "西嶼鄉",
            "望安鄉",
            "七美鄉",
            "白沙鄉",
            "湖西鄉",
          ];
          this.selecteTownships = "馬公市";
        }
        if (selectedCounty === "連江縣") {
          this.townships = ["南竿鄉", "北竿鄉", "莒光鄉", "東引鄉"];
          this.selecteTownships = "南竿鄉";
        }
      }
    },
    async selectData() {
      if (this.selecteDataModels === "36小時氣象資料") {
        this.type = "bar";
        const selectedCounty = this.selectedCounty;
        try {
          // 未來的全國36小時氣象
          const response = await axios.post("/api/weatherForecast36Hr", {
            selectedCounty,
          });
          // 請求成功後，將資料存入組件的 data 中
          const weatherForecast36Hr = response.data;
          this.weatherForecast36Hr = weatherForecast36Hr;
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        this.chartWeatherForecast36HrStart();
      }
      if (this.selecteDataModels === "鄉鎮氣象預報") {
        this.type = "line";
        // selecteTownships為所選的鄉鎮區，發送API請求時夾帶此字串，在後端做篩選後回傳資料回來
        const selecteTownships = this.selecteTownships;
        // selectedCounty為所選擇的縣市
        const selectedCounty = this.selectedCounty;
        const selecteData = { selecteTownships, selectedCounty };
        try {
          // 未來的全國36小時氣象
          const response = await axios.post("/api/ruralWeather", {
            selecteData,
          });
          // 請求成功後，將資料存入組件的 data 中
          const ruralWeather = response.data;
          console.log("=======ruralWeather");
          console.log(ruralWeather);
          this.ruralWeather = ruralWeather;
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        this.chartCountyWeatherStart();

        Loading.show();
      }
    },
    clearSelection() {
      this.selectedCounty = "請選擇縣市"; // 清空選中
      this.selecteDataModels = "查詢資料"; // 清空選中
      this.maxTemp = [0];
      this.minTemp = [0];
      this.pop = [0];
      this.toDay();
      this.chartWeatherForecast36HrStart();
    },
    toDay() {
      const toDay = new Date();
      const yy = toDay.getFullYear();
      const mm = toDay.getMonth() + 1; // 注意要加 1，因為月份是從 0 到 11，需要轉換成 1 到 12
      const dd = toDay.getDate();
      const h = toDay.getHours();
      const m = toDay.getMinutes();
      const s = toDay.getSeconds();
      this.timeArray = [`${yy}-${mm}-${dd} ${h}:${m}:${s}`];
    },
    async chartCountyWeatherStart() {
      const ruralWeather = this.ruralWeather;
      const PoP12h = ruralWeather.PoP12h;
      const T = ruralWeather.T;
      const RH = ruralWeather.RH;
      const MinCI = ruralWeather.MinCI;
      const WS = ruralWeather.WS;
      const MaxAT = ruralWeather.MaxAT;
      const Wx = ruralWeather.Wx;
      const MaxCI = ruralWeather.MaxCI;
      const MinT = ruralWeather.MinT;
      const UVI = ruralWeather.UVI;
      const MinAT = ruralWeather.MinAT;
      const MaxT = ruralWeather.MaxT;
      const WD = ruralWeather.WD;
      const Td = ruralWeather.Td;
      console.log(
        "=======PoP12h, T, RH, MinCI, WS, MaxAT, Wx, MaxCI, MinT, UVI, MinAT, MaxT, WD ,Td"
      );
      console.log(
        PoP12h,
        T,
        RH,
        MinCI,
        WS,
        MaxAT,
        Wx,
        MaxCI,
        MinT,
        UVI,
        MinAT,
        MaxT,
        WD,
        Td
      );
      // 初始化 C3.js 圖表
      this.chart = null;
      this.chart = c3.generate({
        data: {
          // PoP12h=12小時降雨機率
          // T=平均溫度
          // RH=平均相對濕度
          // MinCI=最小舒適度指數
          // WS=最大風速
          // MaxAT=最高體感溫度
          // Wx=天氣現象
          // MaxCI=最大舒適度指數
          // MinT=最低溫度 OK
          // UVI=紫外線指數
          // MinAT=最低體感溫度
          // MaxT=最高溫度
          // WD=風向
          // Td=平均露點溫度
          x: "x",
          xFormat: "%Y-%m-%d %H:%M:%S", // 指定 X 軸上時間格式
          columns: [
            ["x"].concat(PoP12h.time),
            ["12小時降雨機率"].concat(PoP12h.Mint),
            ["平均溫度"].concat(T.Mint),
            ["平均相對濕度"].concat(RH.Mint),
            ["最小舒適度指數"].concat(MinCI.Mint),
            ["最大風速"].concat(WS.Mint),
            ["最高體感溫度"].concat(MaxAT.Mint),
            ["天氣現象"].concat(Wx.Mint),
            ["最大舒適度指數"].concat(MaxCI.Mint),
            ["最低溫度"].concat(MinT.Mint),
            ["紫外線指數"].concat(UVI.Mint),
            ["最低體感溫度"].concat(MinAT.Mint),
            ["最高溫度"].concat(MaxT.Mint),
            ["風向"].concat(WD.Mint),
            ["平均露點溫度"].concat(Td.Mint),
          ],
          point: {
            show: true,
            r: 4, // 节点的半径
            focus: {
              expand: {
                r: 6, // 获得焦点时节点的半径
              },
            },
          },
          type: this.type,
        },
        point: {
          r: 3,
        },
        zoom: {
          enabled: true,
        },
        legend: {
          position: "right",
        },
        axis: {
          x: {
            type: "timeseries", // 設定 X 軸為時間序列
            tick: {
              format: "%m-%d %H:%M", // 設定 X 軸刻度顯示的時間格式
            },
          },
        },
      });
    },
    async chartWeatherForecast36HrStart() {
      if (this.selecteDataModels === "36小時氣象資料") {
        const weatherForecast36Hr = this.weatherForecast36Hr;
        this.maxTemp = weatherForecast36Hr.maxTemp;
        this.minTemp = weatherForecast36Hr.minTemp;
        this.pop = weatherForecast36Hr.pop;
        this.timeArray = weatherForecast36Hr.timeArray;
      }
      // 初始化 C3.js 圖表
      this.chart = c3.generate({
        data: {
          // Wx:天氣狀態
          // PoP:降雨機率
          // MinT:最低溫度
          // CI:舒適度
          // MaxT:最高溫度
          x: "x",
          xFormat: "%Y-%m-%d %H:%M:%S", // 指定 X 軸上時間格式
          columns: [
            ["x"].concat(this.timeArray),
            ["最高溫度"].concat(this.maxTemp),
            ["最低溫度"].concat(this.minTemp),
            ["降雨機率"].concat(this.pop),
          ],
          type: this.type,
        },
        legend: {
          position: "right",
        },
        axis: {
          x: {
            type: "timeseries", // 設定 X 軸為時間序列
            tick: {
              format: "%%m-%d %H:%M", // 設定 X 軸刻度顯示的時間格式
            },
          },
        },
      });
    },
  },
  async mounted() {
    await this.toDay();
    await this.chartWeatherForecast36HrStart();
  },
  beforeUnmount() {
    // 在組件銷毀前，銷毀 C3.js 圖表
    if (this.chart) {
      this.chart.destroy();
    }
  },
};
</script>
