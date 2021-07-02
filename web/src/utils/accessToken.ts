export const setAccessToken = (token: string) => {
  window.localStorage.setItem('user', JSON.stringify(token))
}

export const getAccessToken = () => {
  const loggedUserJSON = window.localStorage.getItem('user')
  if (loggedUserJSON) {
    const user = loggedUserJSON
    return user
  } else {
    console.log('no token')
  }
}
