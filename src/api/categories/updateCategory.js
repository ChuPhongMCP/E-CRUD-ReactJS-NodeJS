/* eslint-disable import/no-anonymous-default-export */
import { axiosAdmin } from "helper/axios";

const updateCategory = async (payload) => {  
  const url = `categories/${payload.productId}`;

  const response = await axiosAdmin.put(url, payload.updatedValues);

  return {
    ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
  };
}

export default {
  updateCategory,
};