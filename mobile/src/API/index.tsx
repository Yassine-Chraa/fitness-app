import {API_URL} from "@env"

const baseURL = API_URL;
const endpoints:any = {
  Auth: '/api/auth',
  Products: '/api/products'
};

export function getUrl(endpoint: PropertyKey) {
  return baseURL + endpoints[endpoint];
}

export default endpoints;
