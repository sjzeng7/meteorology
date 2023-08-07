// chiayi.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
module.exports = router.get("/", async (req, res) => {
  console.log("=1111");
  try {
    // 發送 GET 請求到外部 API
    const response = await axios.get(
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-031?Authorization=CWB-7BF18B7E-F0E5-45E9-828D-0FB84504F83B&sort=time"
    ); // 替換為外部 API 的 URL
    const data = response.data; // 取得回傳的資料

    // 回傳成功的回應
    res.json(data);
  } catch (error) {
    // 處理錯誤，回傳錯誤的回應
    res.status(error.response?.status || 500).json({
      message: error.message,
      error: error.response?.data,
    });
  }
});
