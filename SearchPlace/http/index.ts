import Axios from 'axios'

const axios = Axios.create({
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    "Access-Control-Allow-Origin": 'http://localhost:3000',
    'Host': 'http://localhost:3000'
  },
  timeout: 60000
})

export default axios