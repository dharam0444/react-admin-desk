export const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
}

export const setToken = ({token}) => {
    localStorage.setItem("token", token);
}

export const setLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
}
