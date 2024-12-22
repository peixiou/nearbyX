![alt text](wucareer-logo.png "WuCareer Logo")

# React 作品訓練營 - nearbyX

**nearbyX** 是 WuCareer 免費前端開發課程中的本地生活網頁應用專案。本專案旨在教授核心前端技能，同時提供一個實用且易用的工具，幫助用戶探索附近的商家。

---

## 功能

### 1. **查看用戶定位**

- 利用瀏覽器地理定位功能自動獲取用戶當前位置。
- 在互動地圖上顯示用戶的位置。

### 2. **根據類型查找附近商戶**

- 用戶可以根據當前位置搜尋商家（例如餐廳、健身房、商店）。
- 提供類別篩選功能，打造個性化體驗。

### 3. **查看商戶評論**

- 提供每個商戶的詳細資訊，包括顧客評論和評分。

### 4. **導航到商戶地址**

- 顯示從用戶位置到選定商戶的逐步導航路徑。
- 與地圖服務集成，提供無縫導航體驗。

---

## 技術棧

### 前端

- **React.js**: 用於構建用戶界面的框架。
- **Tailwind CSS**: 用於快速構建 UI

### API

- **Geolocation API**: 獲取用戶當前位置。
- **Google Maps API**: 提供商戶搜尋、評論和導航功能。

---

## 快速開始

程式碼將依照課程的推進而逐漸釋放出來，day 0 為專案起始檔案，day 1 為第一天上課所完成的程式碼... 以此類推

### 先決條件

- 系統已安裝 Node.js。
- Google Maps API 金鑰（[點此申請](https://developers.google.com/maps)）。

### 安裝

1. 克隆此倉庫：

   ```bash
   git clone https://github.com/yourusername/nearbyX.git
   ```

2. 進入專案目錄：

   ```bash
   cd nearbyX
   ```

3. 安裝依賴：

   ```bash
   npm install
   ```

4. 啟動開發伺服器：

   ```bash
   npm start
   ```

5. 打開瀏覽器訪問 [http://localhost:3000](http://localhost:3000) 查看應用。

---

## 致謝

- 感謝 [吾課校長](https://github.com/Shinyui) 對此專案的發想及設計
- 感謝 [溫攀 Eric Wen 老師](https://github.com/ericfetch) 對此專案的教學及實現
