// const axios = require('axios');
import axios from 'axios';

// module.exports = async function create () {
export async function create () {
    return axios.post(`${process.env.BASE_URL}/users`, null,
    {
        headers: {
            authorization: `Bearer ${process.env.TOKEN}`,
          },
      });
};