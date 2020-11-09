export const sidebar = {
  config: {},
  components: [
    {
      module: 'blog', // Module name for localization
      icon: ['fas', 'newspaper'], // Fontawesome or Element UI icon
      color: 'var(--color-yellow)', // Must be CSS variables
      to: '/blogs', // path or route object ({ name: 'route-name',... })
      permission: ['ALL'], // ALL or match ./auth.js
      children: [],
    },
  ],
}
