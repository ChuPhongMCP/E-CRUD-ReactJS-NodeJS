/* eslint-disable import/no-anonymous-default-export */
import { axiosAdmin } from "helper/axios";

const getCategoryDetail = async (id) => {
  const url = `/categories/${id}`;

  const response = await axiosAdmin.get(url);

  return {
    ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
  };
}

export default {
  getCategoryDetail,
};