/* eslint-disable import/no-anonymous-default-export */
import { axiosAdmin } from "helper/axios";

const endpoint = '/authEmployee/profile'; //api giả định profile

export default {
  async getMyProfile() {
    const response = await axiosAdmin.get(endpoint); //get theo api giả định

    return {
      ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
      // avt: 'https://i.pravatar.cc/300', //avt là hình ảnh giả định lấy từ url 'https://i.pravatar.cc/300'
    };
  },
};
