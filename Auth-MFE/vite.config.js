import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'auth_mfe',
      filename: 'remoteEntry.js',
      remotes: {
       HostApp: "http://localhost:5001/assets/remoteEntry.js",

      },
      exposes: {
        './Login':'./src/Components/AuthComponet/Login',
        './Register':'./src/Components/AuthComponet/Register',
        './authActions':'./src/Components/Actions/actionCreators/authActions'
      },
      shared: ["react", "react-dom","redux","react-router-dom","react-redux","redux-devtools-extension","redux-thunk"]
  })],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
})
