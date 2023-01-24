const API_URL = "http://192.168.1.3:8000";

const endpoints = {
  Auth: '/api/auth',
  Products: '/api/products'
};

export function getUrl(endpoint) {
  return API_URL + endpoints[endpoint];
}

export default endpoints;
