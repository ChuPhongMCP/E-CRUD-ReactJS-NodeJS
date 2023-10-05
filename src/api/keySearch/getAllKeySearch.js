/* eslint-disable import/no-anonymous-default-export */
import { axiosAdmin } from "helper/axios";

const getAllKeySearch = async () => {
  localStorage.setItem('KEY_SEARCH', JSON.stringify([]));

  const url = "/keySearch";

  const response = await axiosAdmin.get(url);

  localStorage.setItem('KEY_SEARCH', JSON.stringify(response.data.payload));

  return {
    ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
  };
}

export default {
  getAllKeySearch,
};