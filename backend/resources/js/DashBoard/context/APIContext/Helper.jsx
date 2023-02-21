const API_URL = location.origin;

const endpoints = {
    SignIn: "api/sign_in",
    SignUp: "api/sign_up",
    LogOut: "api/logout",
    DeleteAccount: "api/delete_account",
    Products: "api/products",
    Users: "api/users",
    Meals: "api/meals",
    Activities: "api/activities",
    Programs: "api/programs",
    WorkOuts: "api/workouts",
    Exercises: "api/Exercises",
    Equipments: "api/equipments",
};


export const getUrl = (endpoint) => {
    return `${API_URL}/${endpoints[endpoint]}`;
};
