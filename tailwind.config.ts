import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'media',
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    require('flowbite/plugin')
  ]
}
export default config
