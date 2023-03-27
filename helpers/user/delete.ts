import axios from"axios";
import * as dotenv from 'dotenv';
dotenv.config();

export async function remove() {
  return axios.post(`${process.env.BASE_URL}/users`, null, {
    headers: {
      authorization: `Bearer ${process.env.TOKEN}`,
    },
  });
};
