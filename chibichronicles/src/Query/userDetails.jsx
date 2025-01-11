import axios from "axios"


export const createUser = async (user) => {
    const response = await axios.post('http://localhost:8000/auth/signup' , user);
    return response;
};

export const getUserDetails = async (user) => {
    const response = await axios.post('http://localhost:8000/auth/login' , user);
    return response;
}