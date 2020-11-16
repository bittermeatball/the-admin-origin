// VueX-State
export default () => ({
  serverReady: false,
  locales: ['en', 'vi'],
  locale: 'vi',
  message: 'Hello from state',
  hasNotifications: false,
  options: {
    sidebarCollapsed: false,
  },
})
