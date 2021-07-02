import axios from 'axios'

const API_URL = 'http://localhost:4000/api/v1/users'

const logIn = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, credentials, {
    withCredentials: true,
  })
  return response.data
}

const logOut = async () => {
  const response = await axios.get(`${API_URL}/logout`, {
    withCredentials: true,
  })
  return response.data
}

export default { logIn, logOut }
