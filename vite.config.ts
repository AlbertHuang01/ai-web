import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import postcssPxtoRem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        postcss: {
            plugins: [postcssPxtoRem({
                rootValue: 43,
                unitPrecision: 5,
                propList: ['*'],
                selectorBlackList: [],
                replace: true,
                mediaQuery: false,
                minPixelValue: 0,
                exclude: /node_modules/i
            })]
        }
    }
})
