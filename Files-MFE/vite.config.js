import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'files_mfe',
      filename: 'remoteEntry.js',
      remotes: {
        HostApp: "http://localhost:5001/assets/remoteEntry.js",
      },
      exposes: {
        './FileComponent':'./src/Components/FileComponent/FileComponent',
        './CreateFile':'./src/Components/FileComponent/CreateFile',
        './UploadFile':'./src/components/FileComponent/UploadFile',
        './pasteFile':'./src/components/Actions/actionCreators/FileActions/PasteFile',
        // './changeFile':'./src/components/Actions/actionCreators/ActionsFileReducer',
        
    },
      shared: ["react", "react-dom","redux","react-router-dom","react-redux","redux-devtools-extension","redux-thunk","react-toastify"]
  })],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
})
