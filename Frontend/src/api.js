import axios from 'axios'

// Base URL from environment variable
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

// Create an Axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
