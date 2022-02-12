import axios from "axios"

// console.log('NODE_ENV:', process.env.NODE_ENV)

const base_url = process.env.NODE_ENV === 'production'
    ? 'https://schoolmail.jp/api/v4'
    : 'http://localhost:3000/api/v4';

const ApiBaseUrl = axios.create({
    baseURL: base_url,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    },
})

export default ApiBaseUrl
