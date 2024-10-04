import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.com', // Replace with your API's base URL
  timeout: 10000, // Optional: Set timeout for requests
  headers: {
    'Content-Type': 'application/json' // Set default headers
  }
})

// Optional: You can add interceptors here
axiosInstance.interceptors.request.use(
  (config) => {
    // Add token or other modifications before sending the request
    return config
  },
  (error) => {
    // Handle request error
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    // Handle response data
    return response
  },
  (error) => {
    // Handle response error
    return Promise.reject(error)
  }
)

export default axiosInstance
