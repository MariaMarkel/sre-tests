import axios from "axios";

export async function login (login, password) {
    return axios.post(`${process.env.BASE_URL}/auth`, {
        login,
        password,
      });
};
