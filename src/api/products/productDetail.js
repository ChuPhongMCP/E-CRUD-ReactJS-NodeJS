/* eslint-disable import/no-anonymous-default-export */
import { axiosAdmin } from "helper/axios";

const getProductDetail = async (id) => {
  const url = `/products/${id}`;

  const response = await axiosAdmin.get(url);

  return {
    ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
  };
}

export default {
  getProductDetail,
};