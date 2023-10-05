/* eslint-disable import/no-anonymous-default-export */
import { axiosAdmin } from "helper/axios";

const deleteCategory = async (productId) => {  
  const url = `categories/${productId}`;

  const response = await axiosAdmin.delete(url);

  return {
    ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
  };
}

export default {
  deleteCategory,
};