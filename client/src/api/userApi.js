import axiosClient from './axiosClient';

const userApi = {
  getAll: () => axiosClient.get('/users'),
  getOne: (userId) => axiosClient.get(`/users/${userId}`),
  update: (userId, userData) => axiosClient.put(`/users/${userId}`, userData),
  delete: (userId) => axiosClient.delete(`/users/${userId}`),
};

export default userApi;
