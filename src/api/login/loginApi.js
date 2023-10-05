/* eslint-disable import/no-anonymous-default-export */
import { axiosAdmin } from "helper/axios";

const url = "/authEmployee/login";

export default {
  async PushLogin(data) {
    try {
      const response = await axiosAdmin.post(url, data);

      return {
        ...response.data, //return 1 bản sao của response.data trả về từ api
      };

    } catch (err) {
      const response = err.response //return lỗi từ api nằm trong err.response.data

      return (
        response.data //return lỗi từ api nằm trong err.response.data
      );
    }
  },
};