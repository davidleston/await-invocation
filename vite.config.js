import dts from "vite-plugin-dts";
import {resolve} from 'path'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/await-invocation.ts'),
      name: 'await-invocation',
      // the proper extensions will be added
      fileName: 'await-invocation',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {},
      },
    },
  },
})
