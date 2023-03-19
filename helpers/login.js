const axios = require('axios');

module.exports = async function login (login, password) {
    return axios.post(`${process.env.BASE_URL}/auth`, {
        login,
        password,
      });
};
