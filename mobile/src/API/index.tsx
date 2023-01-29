const baseURL = "http://192.168.1.3:8000";
const endpoints:any = {
  Products: '/api/products'
};

export function getUrl(endpoint: PropertyKey) {
  return baseURL + endpoints[endpoint];
}

export default endpoints;
