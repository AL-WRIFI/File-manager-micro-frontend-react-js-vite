import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shared',
      filename: 'remoteEntry.js',
      remotes: {
        Folders_MFE: "http://localhost:5002/assets/remoteEntry.js",
        // Files_MFE: "http://localhost:5003/assets/remoteEntry.js",
      },
      exposes: {
        './ShowItems':'./src/Components/ShowItemsComponent/ShowItems',
        './FilterPage':'./src/Components/FilterPageComponent/FilterPage',        
    },
    shared: ["react", "react-dom","react-router-dom","redux","react-redux","redux-devtools-extension","redux-thunk","react-toastify"]
  })],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
})
