import api, {setAuthToken} from "./api.jsx";

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('jwt', response.data.token);
    localStorage.setItem('role', response.data.role);
    setAuthToken(response.data.token);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    setAuthToken(null);
};