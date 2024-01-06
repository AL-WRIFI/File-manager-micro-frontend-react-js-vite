import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'settings_mfe',
      filename: 'remoteEntry.js',
      remotes: {
        HostApp: "http://localhost:5001/assets/remoteEntry.js",
        Auth_MFE:"http://localhost:5005/assets/remoteEntry.js",
       },
      exposes: {
          './settings': './src/Components/SettingsComponent/Settings',
      },
      shared: ["react","react-dom","react-router-dom","redux","react-redux","redux-devtools-extension","redux-thunk","react-toastify"]
  })],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
})
