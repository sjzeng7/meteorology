// server.js
const express = require("express");
const app = express();

// 使用 body-parser 中介軟體來解析 POST 請求中的 JSON 資料
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// 引入路由處理器
const chiayi = require("./controllers/chiayi");
const weatherForecast36Hr = require("./controllers/weatherForecast36Hr");

// 未來的全國36小時氣象
app.use("/api/weatherForecast36Hr", weatherForecast36Hr);

// 請求嘉義縣未來一周預報
app.use("/api/chiayi", chiayi);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
