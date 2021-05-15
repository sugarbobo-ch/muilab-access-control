# muilab-access-control
配合台灣中央流行疫情指揮中心實施實聯制開發的前後端門禁登記系統，2021/5/15 中午心血來潮開發的系統，目的是讓實驗室能夠做到進出實聯制，由於開發時程超級短，目前僅提供基礎的查看人數和進出登記，喜歡此專案可以給我個星星唷，在安裝或部屬上有遇到任何問題也都可以寫信與我聯絡。

![](https://i.imgur.com/MKiz14x.png)

當部署好網站後，使用線上工具生成QRCode，即可進行掃碼登入，目前此專案仍在開發中，尚未支援查詢進出紀錄、密碼管理等功能，有需要者可以直接使用MongoDB的匯出記錄功能。


## Requirements
1. Node [安裝 Node 14.17.0 LTS](https://nodejs.org/en/)
2. MongoDB [安裝 MondgoDB](https://www.mongodb.com/)，也可以額外使用 MongoDB Compass 方便管理資料

## Installation
1. Clone the repo 下載專案
    ```sh
    git clone https://github.com/jinan-tw/muilab-access-control.git
    ```
2. 使用 yarn 或 node package manager 下載專案使用到的套件，此範例使用 yarn 進行安裝
    ```sh
    cd server
    yarn install
    cd ..
    cd frontend
    yarn install
    ```
3. 編輯 backend/config/config.js 設定 `mongoDBUrl: 'YourMongoDBUrl'` 參數
4. 編輯 `.env` 的環境變數，前端變數請至`frontend/.env`，設定`VUE_APP_BASE_URL = "YourUrl"`
    後端則至 `server/.env`，設定 `PORT = "YourServerListenPort"`，預設的 PORT 是 `80`
6. 開發時請開啟兩個終端機至 frontend 以及 server 資料下指令，即可進行開發
    ```sh 
    yarn serve //frontend
    ```
    ```sh
    yarn start //server
    ```
    要注意開發時前端是使用`.env.development`當作環境變數，如果想了解更多Vue CLI是如何使用環境變數可以參考 [Modes and Environment Variables](https://cli.vuejs.org/guide/mode-and-env.html#modes-and-environment-variables) 
7. 正式部屬時，我們是將前端的頁面打包成一個dist資料夾放在`frontend/dist`裡面，讓後端去「相對路徑」抓取網站資料，所以請不要輕易更改資料夾的路徑，或是您可以至`server/src/lib/app.js`做更改
    正式部屬時，先至frontend資料夾下指令：
    ```sh
    yarn build //frontend
    ```
    server端用iisnode、pm2、nginx、apache、docker等可以架Node server的容器、伺服器都可以，最簡單可以使用
    ```sh
    yarn start //server
    ```
9. 完成後請確認網路request呼叫的api路徑是否設置正確，並檢查server的防火牆是否有允許通過
10. 別忘了把文字內容以及圖片 `frontend/src/assets/images/MUILab-logo.jpg` 改成自己的圖片喔
