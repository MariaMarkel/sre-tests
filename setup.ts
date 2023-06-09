import axios from "axios";
import * as dotenv from 'dotenv';
dotenv.config();

before(async () => {
  const response = await axios.post(`${process.env.BASE_URL}/auth`, {
    login: process.env.LOGIN,
    password: process.env.PASSWORD,
  });
  process.env["TOKEN"] = response.data.token;
});
