import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "today-1-minute",

  brand: {
    // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
    primaryColor: "#FD9B3C"
  },

  permissions: [],
  webBundleDir: "dist"
});
