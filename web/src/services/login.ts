import axios from 'axios'

const API_URL = 'http://localhost:4000/api/v1/users/login'

const logIn = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(API_URL, credentials, {
    withCredentials: true,
  })
  return response.data
}

export default { logIn }
