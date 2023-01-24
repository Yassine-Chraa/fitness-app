const API_URL = "http://127.0.0.1:8000/";

const endpoints = {
    Auth: 'api/auth',
    Products: 'api/products',
    Users: 'api/users',
    Meals: 'api/meals',
    Equipments: 'api/equipments',
    Activitys: 'api/activitys',
};

export function getUrl(endpoint) {
    return API_URL + endpoints[endpoint];
}

export default endpoints;
