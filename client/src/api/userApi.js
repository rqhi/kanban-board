import axiosClient from './axiosClient'; // Ensure this is correctly set up as shown previously

const userApi = {
  getAll: () => axiosClient.get('/users'),
};

export default userApi;
