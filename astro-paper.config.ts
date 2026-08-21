import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://susc.github.io/",
    title: "EastAzure",
    description: "专注于 C++、系统工程、Linux 与 AI 基础设施。",
    author: "susc",
    lang: "zh-CN",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 8,
    perIndex: 6,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    {
      name: "github",
      url: "https://github.com/susc",
      linkTitle: "在 GitHub 上访问 EastAzure",
    },
    {
      name: "mail",
      url: "mailto:susc@eastazure.com",
      linkTitle: "给 EastAzure 发送邮件",
    },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    {
      name: "mail",
      url: "mailto:?subject=%E6%8E%A8%E8%8D%90%E9%98%85%E8%AF%BB%E8%BF%99%E7%AF%87%E6%96%87%E7%AB%A0&body=",
    },
  ],
});