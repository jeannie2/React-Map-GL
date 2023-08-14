import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
    return {
       plugins: [react()],
        define: {
            'process.env.SUPABASE_URL': JSON.stringify(env.SUPABASE_URL),
            'process.env.ANON_KEY': JSON.stringify(env.ANON_KEY),
            // If you want to exposes all env variables, which is not recommended
            // 'process.env': env
        },
    };
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
