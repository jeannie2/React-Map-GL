import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

})

// resolve: {
//     alias: {
//       'process': 'process/browser',
//       'process.env': resolve(process.cwd(), '.env'),
//     }
//   }

// define: {
//     'process.env': {}
//   },
//   build: {
//     outDir: 'build'
//   }
