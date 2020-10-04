const authentication = async ({ store, redirect, $auth, $axios }) => {
  if (!store.$auth.loggedIn) {
    if (!store.$auth.$storage._state['_token.local']) {
      return redirect('/login')
    }
  }

  await Promise.resolve()
}

export default authentication
