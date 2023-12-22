import { resolve } from "node:path"
import vue2 from "vite-plugin-vue2"
import legacy from "vite-plugin-legacy"
import { findWorkSpaceRoot } from "@tzt/utils"
import qiankunPlugin from "vite-plugin-qiankun"
import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite"

const workspaceRoot = findWorkSpaceRoot(__dirname)

export default ({ mode }) => {
  const {
    VITE_PORT,
    VITE_BASE_URL,
    VITE_ORIGIN,
    VITE_LEGACY
  } = loadEnv(mode, process.cwd());
  const isDev = mode === "development";
  const useLegacy = VITE_LEGACY === "true";
  const outDir = resolve(workspaceRoot, '../' + VITE_BASE_URL);

  return defineConfig({
    base: VITE_BASE_URL,
    plugins: [
      vue2(),
      splitVendorChunkPlugin(),
      useLegacy && legacy({ targets: ["last 2 versions, not dead, > 0.5%", "not IE 11"] }),
      qiankunPlugin("<%= microName %>", { useLegacy, useDevMode: isDev }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@components": resolve(workspaceRoot, "./components"),
      },
      extensions: [".js", ".json", ".vue"],
    },
    server: {
      // 是否开启 https
      https: false,
      // 设置地址源
      origin: VITE_ORIGIN,
      // 端口号
      port: VITE_PORT,
      // 监听所有地址
      host: "0.0.0.0",
      // 服务启动时是否自动打开浏览器
      open: false,
      // 允许跨域
      cors: true,
      // 自定义代理规则
      proxy: {}
    },
    build: {
      outDir,
      // 设置最终构建的浏览器兼容目标
      target: "es2015",
      // 构建后是否生成 source map 文件
      sourcemap: false,
      //  chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false
    },
  })
}
