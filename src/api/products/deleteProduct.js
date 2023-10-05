/* eslint-disable import/no-anonymous-default-export */
import { axiosAdmin } from "helper/axios";

const deleteProduct = async (productId) => {  
  const url = `products/${productId}`;

  const response = await axiosAdmin.delete(url);

  return {
    ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
  };
}

export default {
  deleteProduct,
};