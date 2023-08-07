import { defineConfig } from 'vitepress'
import getSideBar from './getSideBar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vue",
  description: "vue",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/docs/1_api-examples' }
    ],

    sidebar: getSideBar(),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/GreenMashimaro/demo-vitepress' }
    ]
  }
})
