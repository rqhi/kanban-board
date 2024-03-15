import axiosClient from './axiosClient'

const commentsApi = {
  create: (taskId, params) => axiosClient.post(`/tasks/${taskId}/comments`, params),
  delete: (taskId, commentId) => axiosClient.delete(`/tasks/${taskId}/comments/${commentId}`),
  update: (taskId, commentId, params) => axiosClient.put(
    `/tasks/${taskId}/comments/${commentId}`,
    params
  ),
  list: (taskId) => axiosClient.get(`/tasks/${taskId}/comments`),
}

export default commentsApi