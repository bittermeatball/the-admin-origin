// Read pages configuration
// You can pass variables to middleware through meta
// This middleware support the meta config below:
/*
  meta: {
    config: {
      authNotRequired: Boolean,
      auth: Boolean,
      permission: Array,
    }
  }
*/
import { roles } from '~/constants/config/base/auth'
export default function ({ route, store, redirect }) {
  const config = route?.meta[0]?.config
  const auth = store.state.auth?.data
  // Check if authentication is not require
  if (config?.authNotRequired) {
    // Then redirect user to somewhere if they're authenticated
    if (auth) {
      return redirect('/')
    }
  }
  // Check authentication
  if (config?.auth) {
    if (!auth) {
      return redirect('/login')
    }
  }
  // Check authorization
  if (config?.permission) {
    // Check if configurated role if valid
    if (process.env.NODE_ENV === 'development') {
      config?.permission.forEach((role) => {
        if (!roles.includes(role)) {
          throw new Error(
            `"${role}" is not in the roles collection in ~/constants/config/base/roles, must be included in ${JSON.stringify(
              roles
            )}, please check your page configuration`
          )
        }
      })
    }
    // Proceed checking
    if (!config?.permission?.includes('ALL')) {
      if (!config?.permission?.includes(auth.role)) {
        // Back to home
        redirect('/')
      }
    }
  }
}
