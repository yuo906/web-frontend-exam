# Yile Frontend Exam

## 1. 如何執行此專案

### 環境需求

* Node.js >= 16（建議 18+）
* npm 或 yarn

### 安裝與啟動

```bash
# 安裝依賴
npm install

# 啟動開發環境
npm start
```

### 建置專案

```bash
npm run build
```

### 其他常用指令

```bash
# 執行測試
npm test

# Lint
npm run lint

# 自動修復 lint
npm run lint:fix

# 格式化
npm run format

# 檢查格式
npm run format:check
```

> 專案使用 `--max-old-space-size=4096` 避免 build / start 時記憶體不足（Node OOM）

---

## 2. 專案架構、邏輯說明

### 技術選型

* React 18
* Material UI + TailwindCSS (搭配使用)
* Swiper (輪播)
* ESLint + Prettier (維護Google Coding Style)

---

### 專案結構

```
public/
├── img/                # 圖片資源
src/
├── components/         # 可重用 UI 元件
│   ├── CustomDialog.js
│   ├── ImageViewer.js
│   ├── SearchForm.js
│   └── JobCardList.js
├── constants/          # 資料層
│   ├── educationList.js
│   ├── jobList.js
│   └── salaryList.js
├── index.css           # 全局樣式
├── index.js            # API
├── theme.js            # MUI 樣式設定
└── App.js              # 首頁

```

---

### 邏輯說明

#### 1. UI 組合

* 使用 **MUI** 提供結構化元件（Dialog / Button / Card / Input / Select 等）
* 使用 **Tailwind** 做 CSS 調整

---

#### 2. APP.js

* 用於呈現背景、人物、LOGO及相關動畫，並引用職缺列表 (jobCardList)

---

#### 3. 圖片輪播 (Swiper)

* 用於圖片展示（ImageViewer），顯示於彈窗中（customDialog）

---

#### 4. 狀態管理

* 使用 React `useState` / `useEffect` 來記錄狀態(或API回傳資料)
* 透過 props 跨元件共享資料

---

## 3. 專案遇到的困難、問題及解決方法

### 問題 1：eslint + prettier 衝突

**問題描述**

* 一開始安裝過多 ESLint 套件
* ESLint 與 Prettier 同時處理格式規則（如分號、縮排、換行）

**解決方法**

1. 安裝並使用：

```bash
npm install eslint-config-prettier --save-dev
```

2. 在 .eslintrc 中加入：

```json
{
  "extends": [
    "react-app",
    "react-app/jest",
    "google",
    "prettier"
  ]
}
```
* 以 react-app 取代 eslint:recommended, plugin:react/recommended, plugin:react-hooks/recommended,

3. 統一責任：

* ESLint：程式邏輯與錯誤檢查
* Prettier：純格式化

---

### 問題 2：InputLabel 與 Select 初始值問題

**問題描述**

* 使用 MUI `TextField` 時：

  * label 與 input border 疊在一起
  * UI 顯示異常（Select的初始值無法顯示）

**解決方法**

一：使用 InputLabel 並加上 shrink，css 樣式加上白色背景及 padding

```jsx
<InputLabel shrink id="company-name" className="bg-[#fff] !px-1.5">
  公司名稱
</InputLabel>
```

二：Select 需加上 displayEmpty

```jsx
<Select
  labelId="education-level-label"
  label="教育程度"
  displayEmpty
  value={filters.educationLevel}
  onChange={handleFilterChange('educationLevel')}
></Select>
```

---

### 問題 3：輪播圖片效果不佳

**問題描述**

* 圖片切換不順
* 圖片輪播到後面有空白畫面
* 純js的圖片滑動功能維護不易(電腦+手機版過於冗長)

**解決方法**

1. 安裝並設定 Swiper

```js
new Swiper('.swiper', {
  modules: [Pagination, Autoplay],
  autoplay: { delay: 3000 },
  loop: true,
  pagination: { clickable: true }
});
```

---

### 問題 4：Swiper 的 pagination 無法正常顯示

**問題描述**

* 頁碼顯示在圖片上面，用 absolute 調整會被吃掉

**解決方法**

* 設定 Swiper 高度（圖片+ 頁碼），並調整頁碼高度到能正常顯示

```css
.swiper {
  width: 100%;
  height: 166px;
}

.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-horizontal > .swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal {
  height: 12px;
}
```

---

### 問題 5：React 記憶體不足（OOM）

**問題描述**

* 啟動或 build 時出現：

  ```
  FATAL ERROR: invalid table size Allocation failed - JavaScript heap out of memory
  ```
* 專案直接 crash

**解決方法**

1. 提升 Node 記憶體限制

```json
"start": "node --max-old-space-size=4096 ...",
"build": "node --max-old-space-size=4096 ..."
```

2. 銷毀舊的 Swiper 實例，避免每次都建立新的實例，導致記憶體崩潰

```js
if (swiperRef.current) {
  swiperRef.current.destroy(true, true);
  swiperRef.current = null;
}
```

---
