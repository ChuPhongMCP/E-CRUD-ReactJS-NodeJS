/* eslint-disable import/no-anonymous-default-export */
import { axiosAdmin } from "helper/axios";

const createProduct = async (payload) => {  
  const url = `products`;

  const response = await axiosAdmin.post(url, payload);

  return {
    ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
  };
}

export default {
  createProduct,
};