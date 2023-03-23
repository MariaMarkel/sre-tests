import axios from"axios";

export async function remove() {
  return axios.post(`${process.env.BASE_URL}/users`, null, {
    headers: {
      authorization: `Bearer ${process.env.TOKEN}`,
    },
  });
};
