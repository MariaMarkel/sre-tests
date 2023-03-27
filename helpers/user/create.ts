import axios from "axios";
import * as dotenv from 'dotenv';
dotenv.config();
import "../../setup";

export async function create () {
    return axios.post(`${process.env.BASE_URL}/users`, null,
    {
        headers: {
            authorization: `Bearer ${process.env.TOKEN}`,
          },
      });
};