export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Sandbox Dashboard",
  description:
    "Sandbox Dashboard Description.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: 'Sandboxes',
      href : '/sandboxes'
    }
  ],
  links: {
    twitter: "https://twitter.com/",
    github: "https://github.com/ugurtemiz/sfcc-sandbox-dashboard",
    docs: "https://github.com/ugurtemiz/sfcc-sandbox-dashboard#readme",
  },
}
