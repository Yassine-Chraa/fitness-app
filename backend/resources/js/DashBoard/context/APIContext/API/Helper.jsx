const API_URL = "http://127.0.0.1:8000/";

const endpoints = {
    SignIn: 'api/signin',
    SignUp: 'api/signup',
    LogOut: 'api/logout',
    DeleteAccount: 'api/deleteaccount',
    Products: 'api/products',
    Users: 'api/users',
    Meals: 'api/meals',
    Equipments: 'api/equipments',
    Activitys: 'api/activitys',
};

export const currentUser = {
    id: 5,
    role: "client",
    name: "tester",
    email: "tester@gmail.com",
    email_verified_at: null,
    profile: null,
    created_at: "",
    updated_at: "",
    token: "7|QPzOqFEdVNVDavkKBF0wyh0pGyuQIE9uQecRFJaW",
};

export const getUrl = (endpoint) => {
    return API_URL + endpoints[endpoint];
};
